import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import slugify from "slugify";

/* ======================================================
   Types
====================================================== */
type IdParam = { id: string };
type SlugParam = { slug: string };

/* ======================================================
   GET /services
   List all services
====================================================== */
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

/* ======================================================
   GET /services/:id
   Get single service by ID
====================================================== */
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

/* ======================================================
   GET /services/slug/:slug
   Get single service by slug
====================================================== */
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

/* ======================================================
   POST /services
   Create a new service
====================================================== */
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

/* ======================================================
   PUT /services/:id
   Update a service
====================================================== */
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

/* ======================================================
   DELETE /services/:id
   Delete a service
====================================================== */
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