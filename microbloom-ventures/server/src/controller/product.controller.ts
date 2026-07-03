import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import prisma from "../lib/prisma.js";
import slugify from "slugify";

//////////////////////////////
// TYPES
//////////////////////////////
type SlugParams = {
  slug: string;
};

type IdParams = {
  id: string;
};

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all active products
 *     responses:
 *       200:
 *         description: A list of active products.
 */
export const listProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });

  res.status(200).json({
    success: true,
    data: products,
  });
});

/**
 * @openapi
 * /api/products/slug/{slug}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a single product by its slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested product.
 */
export const getProductBySlug = asyncHandler(
  async (req: Request<SlugParams>, res: Response) => {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product || !product.isActive) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created successfully.
 */
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    tagline,
    description,
    imageUrl,
    gallery,
    category,
    benefits,
    nutrition,
    featured,
  } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Name and description are required");
  }

  const slug = slugify(name, { lower: true, strict: true });

  const existing = await prisma.product.findUnique({
    where: { slug },
  });

  if (existing) {
    res.status(400);
    throw new Error("Product with same name already exists");
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      tagline,
      description,
      imageUrl,
      gallery,
      category,
      benefits,
      nutrition,
      featured: featured ?? false,
    },
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully.
 */
export const updateProduct = asyncHandler(
  async (req: Request<IdParams>, res: Response) => {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404);
      throw new Error("Product not found");
    }

    const {
      name,
      tagline,
      description,
      imageUrl,
      gallery,
      category,
      benefits,
      nutrition,
      featured,
      isActive,
    } = req.body;

    const newSlug = name ? slugify(name, { lower: true, strict: true }) : existing.slug;

    // Prevent duplicate slug on update
    if (name && newSlug !== existing.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists) {
        res.status(400);
        throw new Error("Another product with same name already exists");
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        slug: newSlug,
        tagline: tagline ?? existing.tagline,
        description: description ?? existing.description,
        imageUrl: imageUrl ?? existing.imageUrl,
        gallery: gallery ?? existing.gallery,
        category: category ?? existing.category,
        benefits: benefits ?? existing.benefits,
        nutrition: nutrition ?? existing.nutrition,
        featured: featured ?? existing.featured,
        isActive: isActive ?? existing.isActive,
      },
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  }
);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 */
export const deleteProduct = asyncHandler(
  async (req: Request<IdParams>, res: Response) => {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404);
      throw new Error("Product not found");
    }

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);