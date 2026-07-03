import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma.js';
import { Request, Response } from 'express';

export const requestAppointment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const data = req.body;
  const appt = await prisma.dietAppointment.create({
    data: { ...data, userId: user?.id }
  });
  res.status(201).json({ ok: true, data: appt });
});

export const listAppointments = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const appts = await prisma.dietAppointment.findMany({ where: { userId: user?.id }});
  res.json({ ok: true, data: appts });
});
