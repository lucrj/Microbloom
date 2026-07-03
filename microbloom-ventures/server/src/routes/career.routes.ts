import { Router } from 'express';
import {
  listJobs,
  getJobById,
  createJob,
  deactivateJob,
  restoreJob,
  deleteJob,
  applyJob,
  getHRContact,
  upsertHRContact,
} from '../controller/career.controller.js';

const router = Router();

/**
 * @openapi
 * /api/careers/jobs:
 *   get:
 *     tags:
 *       - Careers
 *     summary: Get all active job listings
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get('/jobs', listJobs);

/**
 * @openapi
 * /api/careers/jobs/{id}:
 *   get:
 *     tags:
 *       - Careers
 *     summary: Get a single active job by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get('/jobs/:id', getJobById);

/**
 * @openapi
 * /api/careers/jobs:
 *   post:
 *     tags:
 *       - Careers
 *     summary: Create a new job (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobCreateInput'
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post('/jobs', createJob);

/**
 * @openapi
 * /api/careers/jobs/{id}/deactivate:
 *   patch:
 *     tags:
 *       - Careers
 *     summary: Soft delete (deactivate) a job (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deactivated successfully
 *       404:
 *         description: Job not found
 */
router.patch('/jobs/:id/deactivate', deactivateJob);

/**
 * @openapi
 * /api/careers/jobs/{id}/restore:
 *   patch:
 *     tags:
 *       - Careers
 *     summary: Restore a deactivated job (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job restored successfully
 *       404:
 *         description: Job not found
 */
router.patch('/jobs/:id/restore', restoreJob);

/**
 * @openapi
 * /api/careers/jobs/{id}:
 *   delete:
 *     tags:
 *       - Careers
 *     summary: Permanently delete a job (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job permanently deleted
 *       400:
 *         description: Cannot delete job with applications
 *       404:
 *         description: Job not found
 */
router.delete('/jobs/:id', deleteJob);

/**
 * @openapi
 * /api/careers/apply:
 *   post:
 *     tags:
 *       - Careers
 *     summary: Apply for a job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobApplicationInput'
 *     responses:
 *       201:
 *         description: Job application submitted
 *       404:
 *         description: Job not found
 */
router.post('/apply', applyJob);

/**
 * @openapi
 * /api/careers/hr-contact:
 *   get:
 *     tags:
 *       - Careers
 *     summary: Get HR contact details
 *     responses:
 *       200:
 *         description: HR contact information
 */
router.get('/hr-contact', getHRContact);

/**
 * @openapi
 * /api/careers/hr-contact:
 *   post:
 *     tags:
 *       - Careers
 *     summary: Create or update HR contact (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HRContactInput'
 *     responses:
 *       200:
 *         description: HR contact saved
 */
router.post('/hr-contact', upsertHRContact);

export default router;