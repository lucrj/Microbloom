import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma.js';

/**
 * POST /api/enrollments
 * USER only
 */
export const enroll = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { courseId } = req.body;
    const user = (req as any).user;

    if (!courseId) {
      res.status(400).json({ ok: false, error: 'courseId required' });
      return;
    }

    // 🔒 USER only
    if (user.role !== 'USER') {
      res.status(403).json({
        ok: false,
        error: 'Only users can enroll',
      });
      return;
    }

    // 🚫 Prevent duplicate enrollment
    const exists = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (exists) {
      res.status(409).json({
        ok: false,
        error: 'Already enrolled',
      });
      return;
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
    });

    res.status(201).json({ ok: true, data: enrollment });
  }
);

/**
 * GET /api/enrollments
 * USER only
 */
export const listEnrollments = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;

    if (user.role !== 'USER') {
      res.status(403).json({
        ok: false,
        error: 'Only users can view enrollments',
      });
      return;
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: true },
    });

    res.json({ ok: true, data: enrollments });
  }
);
