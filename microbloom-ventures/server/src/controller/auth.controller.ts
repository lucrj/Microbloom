import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { hash, compare } from '../lib/hash';
import { signToken } from '../lib/jwt';

// SIGNUP
export const signup = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email?.toLowerCase();
    const { name, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ ok: false, error: 'email & password required' });
      return;
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      res.status(409).json({
        ok: false,
        error: 'Email already used',
      });
      return;
    }

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    res.status(201).json({
      ok: true,
      data: {
        user,
        token,
      },
    });
  }
);

// CREATE ADMIN (ADMIN ONLY)
export const createAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email?.toLowerCase();
    const { name, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ ok: false, error: 'email & password required' });
      return;
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      res.status(409).json({
        ok: false,
        error: 'Email already used',
      });
      return;
    }

    const passwordHash = await hash(password);

    const admin = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      ok: true,
      data: admin,
    });
  }
);

// LOGIN
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email?.toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        ok: false,
        error: 'email & password required',
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      res.status(401).json({
        ok: false,
        error: 'Invalid credentials',
      });
      return;
    }

    const isValid = await compare(password, user.passwordHash);

    if (!isValid) {
      res.status(401).json({
        ok: false,
        error: 'Invalid credentials',
      });
      return;
    }

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    res.json({
      ok: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  }
);

// LIST USERS (ADMIN)
export const listUsers = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({
      ok: true,
      data: users,
    });
  }
);

// GET USER BY ID (ADMIN)
export const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        ok: false,
        error: 'User not found',
      });
      return;
    }

    res.json({
      ok: true,
      data: user,
    });
  }
);
