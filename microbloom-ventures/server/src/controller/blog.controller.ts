import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import slugify from "slugify";

/**
 * Helper: safely extract param
 */
function getParam(param: string | string[] | undefined): string {
  if (!param) throw new Error("Missing route parameter");
  return Array.isArray(param) ? param[0] : param;
}

/**
 * Helper: estimate read time (200 words/min)
 */
function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * GET /api/blogs
 * Public - only published blogs
 */
export const getAllBlogs = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      author: true,
      category: true,
      coverImage: true,
      readTime: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { publishedAt: "desc" },
  });

  res.json({ ok: true, data: blogs });
});

/**
 * GET /api/blogs/:slug
 * Public - single published blog by slug
 */
export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = getParam(req.params.slug);

  const blog = await prisma.blogPost.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!blog) {
    res.status(404).json({ ok: false, message: "Blog not found" });
    return;
  }

  res.json({ ok: true, data: blog });
});

/**
 * POST /api/admin/blogs
 * Admin - create new blog
 */
export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    content,
    slug,
    published,
    readTime,
    ...rest
  } = req.body;

  if (!title || !content) {
    res.status(400).json({
      ok: false,
      message: "Title and content are required",
    });
    return;
  }

  const generatedSlug = slug || slugify(title, { lower: true, strict: true });

  // optional: prevent duplicate slug
  const existingSlug = await prisma.blogPost.findUnique({
    where: { slug: generatedSlug },
  });

  if (existingSlug) {
    res.status(400).json({
      ok: false,
      message: "A blog with this slug already exists",
    });
    return;
  }

  const blog = await prisma.blogPost.create({
    data: {
      ...rest,
      title,
      content,
      slug: generatedSlug,
      readTime: readTime ?? calculateReadTime(content),
      published: published ?? false,
      publishedAt: published ? new Date() : null,
    },
  });

  res.status(201).json({ ok: true, data: blog });
});

/**
 * PUT /api/admin/blogs/:id
 * Admin - update blog by ID
 */
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const existing = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existing) {
    res.status(404).json({ ok: false, message: "Blog not found" });
    return;
  }

  const {
    title,
    content,
    slug,
    published,
    readTime,
    ...rest
  } = req.body;

  // Decide final title/content values
  const finalTitle = title ?? existing.title;
  const finalContent = content ?? existing.content;

  // If slug is manually provided use it, else if title changed regenerate it, else keep old slug
  const updatedSlug =
    slug?.trim()
      ? slugify(slug, { lower: true, strict: true })
      : title
      ? slugify(title, { lower: true, strict: true })
      : existing.slug;

  // optional: prevent duplicate slug (except current blog)
  const duplicateSlug = await prisma.blogPost.findFirst({
    where: {
      slug: updatedSlug,
      NOT: { id },
    },
  });

  if (duplicateSlug) {
    res.status(400).json({
      ok: false,
      message: "Another blog already uses this slug",
    });
    return;
  }

  // Handle published state safely
  const finalPublished = published ?? existing.published;

  let finalPublishedAt = existing.publishedAt;

  // If changing from draft -> published, set publishedAt
  if (finalPublished && !existing.published) {
    finalPublishedAt = new Date();
  }

  // If changing from published -> draft, clear publishedAt
  if (!finalPublished) {
    finalPublishedAt = null;
  }

  const blog = await prisma.blogPost.update({
    where: { id },
    data: {
      ...rest,
      title: finalTitle,
      content: finalContent,
      slug: updatedSlug,
      readTime: readTime ?? calculateReadTime(finalContent),
      published: finalPublished,
      publishedAt: finalPublishedAt,
    },
  });

  res.json({ ok: true, data: blog });
});

/**
 * DELETE /api/admin/blogs/:id
 * Admin - delete blog
 */
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const existing = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!existing) {
    res.status(404).json({ ok: false, message: "Blog not found" });
    return;
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  res.json({ ok: true, message: "Blog deleted" });
});

/**
 * GET /api/admin/blogs
 * Admin - all blogs (published + unpublished)
 */
export const getAllBlogsAdmin = asyncHandler(async (_req: Request, res: Response) => {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json({ ok: true, data: blogs });
});

/**
 * GET /api/admin/blogs/:id
 * Admin - single blog by ID (for edit form prefill)
 */
export const getBlogByIdAdmin = asyncHandler(async (req: Request, res: Response) => {
  const id = getParam(req.params.id);

  const blog = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!blog) {
    res.status(404).json({ ok: false, message: "Blog not found" });
    return;
  }

  res.json({ ok: true, data: blog });
});