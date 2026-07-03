import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

import prisma from "../lib/prisma.js";
import { toCourseDTO } from "../types/course.dto.js";

/* ======================================================
   Types for Params
====================================================== */
type IdParam = { id: string };
type SlugParam = { slug: string };

/* ======================================================
   GET /courses
====================================================== */
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

/* ======================================================
   GET /courses/:id
====================================================== */
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

/* ======================================================
   GET /courses/slug/:slug
====================================================== */
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

/* ======================================================
   POST /courses
====================================================== */
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

/* ======================================================
   DELETE /courses/:id
====================================================== */
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