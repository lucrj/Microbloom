import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt.js';
import prisma from '../lib/prisma.js';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized',
      });
    }

    const token = auth.split(' ')[1];
    const payload = verifyToken(token) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: 'Unauthorized',
      });
    }

    (req as any).user = user;

    return next(); // ✅ MUST return
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({
      ok: false,
      error: 'Invalid token',
    });
  }
};

// ADMIN
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({ ok: false, error: 'Forbidden' });
    return;
  }

  next();
};
