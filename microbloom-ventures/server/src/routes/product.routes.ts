import { Router } from "express";
import {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all active products
 *     description: Returns all active products ordered by featured first, then newest.
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProducts'
 */
router.get("/", listProducts);

/**
 * @openapi
 * /api/products/slug/{slug}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by slug
 *     description: Fetch a single active product using its slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Product slug
 *         schema:
 *           type: string
 *           example: wheatgrass-powder
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProduct'
 *       404:
 *         description: Product not found
 */
router.get("/slug/:slug", getProductBySlug);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product (Admin only)
 *     description: Creates a new product. Slug is auto-generated from the product name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProduct'
 *       400:
 *         description: Invalid input or duplicate product
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post("/", requireAuth, requireAdmin, createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product (Admin only)
 *     description: Updates product details by ID. If the name changes, the slug is regenerated automatically.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: clx123abc456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProduct'
 *       400:
 *         description: Invalid input or duplicate slug
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Product not found
 */
router.put("/:id", requireAuth, requireAdmin, updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product (Admin only)
 *     description: Deletes a product by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: clx123abc456
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseMessage'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Product not found
 */
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;