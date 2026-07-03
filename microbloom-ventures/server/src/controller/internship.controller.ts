import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma.js';
import { Request, Response } from 'express';

/* ======================================================
   GET /internships
====================================================== */
export const listInternships = asyncHandler(
  async (_req: Request, res: Response) => {
    const internships = await prisma.internship.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ ok: true, data: internships });
  }
);

/* ======================================================
   GET /internships/:id
====================================================== */
export const getInternshipById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      res.status(400).json({
        ok: false,
        error: 'Invalid internship id',
      });
      return;
    }

    const internship = await prisma.internship.findUnique({
      where: { id },
    });

    if (!internship) {
      res.status(404).json({
        ok: false,
        error: 'Internship not found',
      });
      return;
    }

    res.json({
      ok: true,
      data: internship,
    });
  }
);

/* ======================================================
   POST /internships
   (Admin / internal use)
====================================================== */
export const createInternship = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, location, stipend, duration } = req.body;

    // ---- validation ----
    if (!title || !description) {
      res.status(400).json({
        ok: false,
        error: 'title and description are required',
      });
      return;
    }

    const internship = await prisma.internship.create({
      data: {
        title,
        description,
        location: location ?? null,
        stipend: stipend ?? null,
        duration: duration ?? null,
      },
    });

    res.status(201).json({ ok: true, data: internship });
  }
);

/* ======================================================
   POST /internships/apply
====================================================== */
export const apply = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const { internshipId, resumeUrl, message } = req.body;

    if (!user) {
      res.status(401).json({ ok: false, error: 'Unauthorized' });
      return;
    }

    if (!internshipId || !resumeUrl) {
      res.status(400).json({
        ok: false,
        error: 'internshipId and resumeUrl are required',
      });
      return;
    }

    const application = await prisma.application.create({
      data: {
        internshipId,
        resumeUrl,
        message: message ?? null,
        userId: user.id,
      },
    });

    res.status(201).json({ ok: true, data: application });
  }
);

/* ======================================================
   GET /internships/:id/applications
   (Admin only)
====================================================== */
export const ApplicationWithUser = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      res.status(400).json({
        ok: false,
        error: 'Invalid internship id',
      });
      return;
    }

    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!internship) {
      res.status(404).json({
        ok: false,
        error: 'Internship not found',
      });
      return;
    }

    res.json({
      ok: true,
      data: internship.applications,
    });
  }
);