import { Router } from "express";
import {
  getAllBlogs,
  getBlogBySlug,
} from "../controller/blog.controller.js";

const router = Router();

/**
 * @openapi
 * /api/blogs:
 *   get:
 *     summary: Get all published blog posts
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: List of published blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogPreview'
 */
router.get("/", getAllBlogs);

/**
 * @openapi
 * /api/blogs/{slug}:
 *   get:
 *     summary: Get a published blog post by slug
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Blog slug
 *         schema:
 *           type: string
 *           example: my-first-blog
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BlogDetail'
 *       404:
 *         description: Blog not found
 */
router.get("/slug/:slug", getBlogBySlug);

export default router;