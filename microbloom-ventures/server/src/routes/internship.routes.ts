import { Router } from 'express';
import {
  listInternships,
  createInternship,
  apply,
   getInternshipById,
  ApplicationWithUser,
} from '../controller/internship.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

/* ======================================================
   GET /api/internships  (PUBLIC)
====================================================== */
/**
 * @openapi
 * /api/internships:
 *   get:
 *     tags: [Internships]
 *     summary: Get all internships
 *     responses:
 *       200:
 *         description: List of internships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Internship'
 */
router.get('/', listInternships);

/* ======================================================
   POST /api/internships  (ADMIN ONLY)
====================================================== */
/**
 * @openapi
 * /api/internships:
 *   post:
 *     tags: [Internships]
 *     summary: Create a new internship (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InternshipCreateInput'
 *     responses:
 *       201:
 *         description: Internship created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Internship'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.post('/', requireAuth, requireAdmin, createInternship);

/* ======================================================
   POST /api/internships/apply  (AUTH REQUIRED)
====================================================== */
/**
 * @openapi
 * /api/internships/apply:
 *   post:
 *     tags: [Internships]
 *     summary: Apply for an internship
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InternshipApplicationCreateInput'
 *     responses:
 *       201:
 *         description: Application submitted
 *       401:
 *         description: Unauthorized
 */
router.post('/apply', requireAuth, apply);

/* ======================================================
   GET /api/internships/{id}  (PUBLIC)
====================================================== */
/**
 * @openapi
 * /api/internships/{id}:
 *   get:
 *     tags: [Internships]
 *     summary: Get internship by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Internship details
 *       404:
 *         description: Internship not found
 */
router.get('/:id', getInternshipById);

/* ======================================================
   GET /api/internships/{id}/applications  (ADMIN ONLY)
====================================================== */
/**
 * @openapi
 * /api/internships/{id}/applications:
 *   get:
 *     tags: [Internships]
 *     summary: Get applications for an internship (Admin only)
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
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ApplicationWithUser'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Internship not found
 */
router.get('/:id/applications', requireAuth, requireAdmin, ApplicationWithUser);

export default router;
