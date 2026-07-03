import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

import prisma from "../lib/prisma.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 */

type IdParam = { id: string };
type SlugParam = { slug: string };

/**
 * @openapi
 * /api/services:
 *   get:
 *     tags: [Services]
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: A list of services.
 */
export const listServices = asyncHandler(
  async (_req: Request, res: Response) => {
    const services = await prisma.service.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    res.json({
      ok: true,
      data: services,
    });
  }
);

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     tags: [Services]
 *     summary: Get a single service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested service.
 */
export const getServiceById = asyncHandler(
  async (req: Request<IdParam>, res: Response) => {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    res.json({
      ok: true,
      data: service,
    });
  }
);

/**
 * @openapi
 * /api/services/slug/{slug}:
 *   get:
 *     tags: [Services]
 *     summary: Get a single service by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested service.
 */
export const getServiceBySlug = asyncHandler(
  async (req: Request<SlugParam>, res: Response) => {
    const { slug } = req.params;

    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    res.json({
      ok: true,
      data: service,
    });
  }
);

/**
 * @openapi
 * /api/services:
 *   post:
 *     tags: [Services]
 *     summary: Create a new service (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Service created successfully.
 */
export const createService = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      title,
      shortDescription,
      description,
      image,
      featured,
      order,
    } = req.body;

    if (!title || !shortDescription || !description) {
      res.status(400);
      throw new Error("title, shortDescription and description are required");
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingSlug = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      res.status(400);
      throw new Error("A service with this title already exists");
    }

    const created = await prisma.service.create({
      data: {
        title,
        shortDescription,
        description,
        image: image ?? null,
        featured: featured ?? false,
        order: order ?? 0,
        slug,
      },
    });

    res.status(201).json({
      ok: true,
      message: "Service created successfully",
      data: created,
    });
  }
);

/**
 * @openapi
 * /api/services/{id}:
 *   put:
 *     tags: [Services]
 *     summary: Update a service (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service updated successfully.
 */
export const updateService = asyncHandler(
  async (req: Request<IdParam>, res: Response) => {
    const { id } = req.params;
    const {
      title,
      shortDescription,
      description,
      image,
      featured,
      order,
    } = req.body;

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404);
      throw new Error("Service not found");
    }

    const newSlug = title
      ? slugify(title, { lower: true, strict: true })
      : existing.slug;

    const slugConflict = await prisma.service.findFirst({
      where: {
        slug: newSlug,
        NOT: { id },
      },
    });

    if (slugConflict) {
      res.status(400);
      throw new Error("Another service with this title already exists");
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        shortDescription: shortDescription ?? existing.shortDescription,
        description: description ?? existing.description,
        image: image ?? existing.image,
        featured: featured ?? existing.featured,
        order: order ?? existing.order,
        slug: newSlug,
      },
    });

    res.json({
      ok: true,
      message: "Service updated successfully",
      data: updated,
    });
  }
);

/**
 * @openapi
 * /api/services/{id}:
 *   delete:
 *     tags: [Services]
 *     summary: Delete a service (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service deleted successfully.
 */
export const deleteService = asyncHandler(
  async (req: Request<IdParam>, res: Response) => {
    const { id } = req.params;

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404);
      throw new Error("Service not found");
    }

    await prisma.service.delete({
      where: { id },
    });

    res.json({
      ok: true,
      message: "Service deleted successfully",
    });
  }
);