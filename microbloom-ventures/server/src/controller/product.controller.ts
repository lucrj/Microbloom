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

//////////////////////////////
// GET ALL PRODUCTS
//////////////////////////////
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

//////////////////////////////
// GET PRODUCT BY SLUG
//////////////////////////////
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

//////////////////////////////
// CREATE PRODUCT (optional admin use)
//////////////////////////////
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

//////////////////////////////
// UPDATE PRODUCT (optional admin use)
//////////////////////////////
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

//////////////////////////////
// DELETE PRODUCT
//////////////////////////////
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