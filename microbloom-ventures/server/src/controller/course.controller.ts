import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

import prisma from "../lib/prisma.js";
import { toCourseDTO } from "../types/course.dto.js";

type IdParam = { id: string };
type SlugParam = { slug: string };

/**
 * @openapi
 * /api/courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: A list of courses.
 */
export const listCourses = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      ok: true,
      data: courses.map(toCourseDTO),
    });
  }
);

/**
 * @openapi
 * /api/courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested course.
 */
export const getCourse = asyncHandler(
  async (req: Request<IdParam>, res: Response): Promise<void> => {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      res.status(404).json({
        ok: false,
        error: "Course not found",
      });
      return;
    }

    res.json({
      ok: true,
      data: toCourseDTO(course),
    });
  }
);

/**
 * @openapi
 * /api/courses/slug/{slug}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get a course by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested course.
 */
export const getCourseBySlug = asyncHandler(
  async (req: Request<SlugParam>, res: Response): Promise<void> => {
    const { slug } = req.params;

    const course = await prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      res.status(404).json({
        ok: false,
        error: "Course not found",
      });
      return;
    }

    res.json({
      ok: true,
      data: toCourseDTO(course),
    });
  }
);

/**
 * @openapi
 * /api/courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created successfully.
 */
export const createCourse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      title,
      description,
      slug,
      curriculum,
      duration,
      fees,
      eligibility,
    } = req.body;

    /* ---------- Validation ---------- */
    if (!title || !description) {
      res.status(400).json({
        ok: false,
        error: "title and description are required",
      });
      return;
    }

    /* ---------- Slug generation ---------- */
    const baseSlug = slug
      ? slugify(slug, { lower: true, strict: true })
      : slugify(title, { lower: true, strict: true });

    let finalSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.course.findUnique({
        where: { slug: finalSlug },
      });

      if (!existing) break;

      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    /* ---------- Create course ---------- */
    const created = await prisma.course.create({
      data: {
        title,
        description,
        slug: finalSlug,
        curriculum: Array.isArray(curriculum) ? curriculum : [],
        duration: duration ?? null,
        fees: fees ?? null,
        eligibility: eligibility ?? null,
      },
    });

    res.status(201).json({
      ok: true,
      data: toCourseDTO(created),
    });
  }
);

/**
 * @openapi
 * /api/courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Course updated successfully.
 */
export const updateCourse = asyncHandler(
  async (req: Request<IdParam>, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
      title,
      description,
      slug,
      curriculum,
      duration,
      fees,
      eligibility,
    } = req.body;

    const existing = await prisma.course.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ ok: false, error: "Course not found" });
      return;
    }

    const newSlug = slug
      ? slugify(slug, { lower: true, strict: true })
      : title
      ? slugify(title, { lower: true, strict: true })
      : existing.slug;

    if (newSlug !== existing.slug) {
      const slugConflict = await prisma.course.findFirst({
        where: { slug: newSlug, NOT: { id } },
      });
      if (slugConflict) {
        res.status(400).json({ ok: false, error: "Slug is already in use" });
        return;
      }
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        description: description ?? existing.description,
        slug: newSlug,
        curriculum: curriculum ?? existing.curriculum,
        duration: duration ?? existing.duration,
        fees: fees ?? existing.fees,
        eligibility: eligibility ?? existing.eligibility,
      },
    });

    res.json({ ok: true, data: toCourseDTO(updated) });
  }
);

/**
 * @openapi
 * /api/courses/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 */
export const deleteCourse = asyncHandler(
  async (req: Request<IdParam>, res: Response): Promise<void> => {
    const { id } = req.params;

    const existing = await prisma.course.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({
        ok: false,
        error: "Course not found",
      });
      return;
    }

    await prisma.course.delete({
      where: { id },
    });

    res.json({
      ok: true,
      message: "Course deleted successfully",
    });
  }
);