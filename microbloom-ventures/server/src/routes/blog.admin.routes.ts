import { Router } from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsAdmin,
  getBlogByIdAdmin,
} from "../controller/blog.controller.js";
// import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * @openapi
 * /api/admin/blogs:
 *   get:
 *     summary: Get all blog posts (including unpublished)
 *     tags:
 *       - Blog (Admin)
 *     responses:
 *       200:
 *         description: List of all blog posts
 */
router.get(
  "/",
  // requireAuth,
  // requireAdmin,
  getAllBlogsAdmin
);

/**
 * @openapi
 * /api/admin/blogs/{id}:
 *   get:
 *     summary: Get a single blog post by ID (admin, used for edit prefill)
 *     tags:
 *       - Blog (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post fetched successfully
 *       404:
 *         description: Blog not found
 */
router.get(
  "/:id",
  // requireAuth,
  // requireAdmin,
  getBlogByIdAdmin
);

/**
 * @openapi
 * /api/admin/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags:
 *       - Blog (Admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogCreate'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Invalid request body
 */
router.post(
  "/",
  // requireAuth,
  // requireAdmin,
  createBlog
);

/**
 * @openapi
 * /api/admin/blogs/{id}:
 *   put:
 *     summary: Update an existing blog post by ID
 *     tags:
 *       - Blog (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogUpdate'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
router.put(
  "/:id",
  // requireAuth,
  // requireAdmin,
  updateBlog
);

/**
 * @openapi
 * /api/admin/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags:
 *       - Blog (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete(
  "/:id",
  // requireAuth,
  // requireAdmin,
  deleteBlog
);

export default router;