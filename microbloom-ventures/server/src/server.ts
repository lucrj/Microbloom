/**
 * ======================================================
 *  Application Entry Point
 *  Tech: Express + Prisma + PostgreSQL
 * ======================================================
 */

import dotenv from 'dotenv';
import path from 'path';

/**
 * ------------------------------------------------------
 * Environment Variables
 * ------------------------------------------------------
 * Explicitly load .env from project root.
 * This is important in monorepos to avoid ambiguity.
 */
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

import prisma from './lib/prisma';

/**
 * ------------------------------------------------------
 * Route Imports
 * ------------------------------------------------------
 */
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import serviceRoutes from './routes/service.routes';
import internshipRoutes from './routes/internship.routes';
import appointmentRoutes from './routes/appointment.routes';
import blogPublicRoutes from './routes/blog.public.routes';
import blogAdminRoutes from './routes/blog.admin.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import careerRoutes from './routes/career.routes';
import productRoutes from './routes/product.routes';

import { errorHandler } from './middleware/errorHandler';

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  ...(process.env.FRONTEND_URLS?.split(',') ?? []),
]
  .map((origin) => origin.trim())
  .filter(Boolean);

/**
 * ======================================================
 * Global Middleware
 * ======================================================
 */

/**
 * Security headers
 * Protects against common vulnerabilities
 */
app.use(helmet());

/**
 * CORS Configuration
 * - Allow frontend (Next.js) only
 * - Enable credentials for cookies / auth
 */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/**
 * JSON body parser
 */
app.use(express.json());

/**
 * ======================================================
 * Swagger API Documentation
 * ======================================================
 * Must be registered BEFORE 404 handler
 */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * ======================================================
 * Health Check
 * ======================================================
 * Used by:
 * - Load balancers
 * - Deployment platforms (Railway / Render)
 * - Monitoring tools
 */
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      ok: true,
      status: 'up',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 'down',
      database: 'disconnected',
    });
  }
});

/**
 * ======================================================
 * API Routes
 * ======================================================
 * All feature routes are mounted here
 */
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blogs', blogPublicRoutes);
app.use('/api/admin/blogs', blogAdminRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/products', productRoutes);
/**
 * ======================================================
 * 404 Handler
 * ======================================================
 * Must come AFTER all routes
 */
app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Route not found',
  });
});

/**
 * ======================================================
 * Global Error Handler
 * ======================================================
 * Centralized error formatting
 */
app.use(errorHandler);

/**
 * ======================================================
 * Server Startup
 * ======================================================
 */
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api/docs`);
});

/**
 * ======================================================
 * Graceful Shutdown
 * ======================================================
 * Ensures Prisma disconnects cleanly
 */
const shutdown = async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
