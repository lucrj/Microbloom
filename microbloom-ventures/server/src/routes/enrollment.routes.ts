import { Router } from 'express';
import {
  enroll,
  listEnrollments,
} from '../controller/enrollment.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * @openapi
 * /api/enrollments:
 *   post:
 *     tags:
 *       - Enrollments
 *     summary: Enroll logged-in USER into a course
 *     description: |
 *       Allows an authenticated USER to enroll in a course.
 *       Admins and staff are not allowed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentCreateInput'
 *     responses:
 *       201:
 *         description: Enrollment successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseEnrollment'
 *       400:
 *         description: Missing courseId
 *       401:
 *         description: Unauthorized (no token)
 *       403:
 *         description: Only users can enroll
 *       409:
 *         description: Already enrolled
 */
router.post('/', requireAuth, enroll);

/**
 * @openapi
 * /api/enrollments:
 *   get:
 *     tags:
 *       - Enrollments
 *     summary: Get logged-in USER enrollments
 *     description: Returns all courses the logged-in USER is enrolled in.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseEnrollments'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only users can view enrollments
 */
router.get('/', requireAuth, listEnrollments);

export default router;
