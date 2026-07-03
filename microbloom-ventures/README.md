# Microbloom Ventures

Full-stack monorepo for the Microbloom Ventures platform, including the public website, API, and admin dashboard.

This repository contains:

- `apps/frontend/` - Next.js frontend built with React, TypeScript, and Tailwind CSS.
- `apps/admin/` - Next.js admin dashboard for content management.
- `server/` - Express API with TypeScript, Prisma, PostgreSQL, JWT auth, and AdminJS.
- `prisma/` - Shared Prisma schema and seed logic.

## Tech Stack

- Monorepo: npm workspaces
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS
- Backend: Node.js, Express 4, TypeScript, Prisma, PostgreSQL
- Admin: AdminJS with React
- Auth: bcrypt password hashing, JWT bearer tokens, and session-based auth for AdminJS
- API docs: Swagger UI
- Database: PostgreSQL with Prisma schema at `prisma/schema.prisma`

## Project Structure

```text
microbloom-ventures/
  apps/
    admin/
    frontend/
      app/
      components/
      lib/api.ts
  server/
    src/
      controller/
      routes/
      middleware/
      docs/
      lib/
  prisma/
    schema.prisma
    seed.ts
```

## Frontend

The frontend includes pages for:

- home
- about
- blog and blog detail
- careers and job detail
- contact
- courses and course detail
- dietician services
- internships and internship detail
- login
- products and product detail
- services and service detail

All API calls should use the shared helper:

```ts
import { apiUrl } from "@/lib/api";

fetch(apiUrl("/api/products"));
```

The helper lives in `apps/frontend/lib/api.ts`.

In development, it falls back to:

```text
http://localhost:4000
```

In production, set:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
```

Do not include a trailing slash.

## Backend

The backend exposes the following API routes. For detailed request/response models, see the Swagger documentation.

### Public Routes
- `GET /api/health`: Health check for the server and database.
- `GET /api/blogs`: Get all published blog posts.
- `GET /api/blogs/slug/:slug`: Get a single published blog post by slug.
- `GET /api/courses`: Get all courses.
- `GET /api/courses/slug/:slug`: Get a course by slug.
- `GET /api/internships`: Get all internships.
- `GET /api/internships/:id`: Get an internship by ID.
- `GET /api/products`: Get all active products.
- `GET /api/products/slug/:slug`: Get a product by slug.
- `GET /api/services`: Get all services.
- `GET /api/services/slug/:slug`: Get a service by slug.
- `GET /api/careers/jobs`: Get all active jobs.
- `GET /api/careers/jobs/:id`: Get a job by ID.
- `POST /api/careers/apply`: Submit a job application.
- `GET /api/careers/hr-contact`: Get HR contact info.

### User Authenticated Routes (`requireAuth`)
- `POST /api/enrollments`: Enroll the current user in a course.
- `GET /api/enrollments`: List enrollments for the current user.
- `POST /api/appointments`: Request a dietician appointment.
- `GET /api/appointments`: List appointments for the current user.
- `POST /api/internships/apply`: Apply for an internship.

Useful backend URLs:
```text
Health check: http://localhost:4000/api/health
Swagger docs: http://localhost:4000/api/docs
AdminJS UI:   http://localhost:4000/admin
```

## Auth

Available auth endpoints:

```text
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/admins
GET  /api/auth/users
GET  /api/auth/users/:id
```

Notes:

- Passwords are hashed with bcrypt before saving.
- Login returns a JWT bearer token.
- `POST /api/auth/admins` is protected by `requireAuth` and `requireAdmin`.
- Normal signup creates regular `USER` accounts.
- Admin-only requests should include:

```http
Authorization: Bearer YOUR_TOKEN
```

## Environment Variables

Create a root `.env` file for the backend:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/microbloom_db"
PORT=4000
FRONTEND_URLS="http://localhost:3000,https://your-vercel-app.vercel.app"
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=7d
```

Create `apps/frontend/.env.local` for local frontend development:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

For Vercel, set the same variable in the Vercel project settings:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
```

For Render or another backend host, set:

```env
DATABASE_URL=your-production-postgres-url
PORT=4000
FRONTEND_URLS=https://your-vercel-app.vercel.app
JWT_SECRET=your-strong-production-secret
JWT_EXPIRES_IN=7d
```

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Run database migrations:

```bash
npm run migrate
```

Seed the database:

```bash
npm run seed
```

Generate Prisma client manually if needed:

```bash
npm --workspace server run prisma:generate
```

Start frontend and backend together:

```bash
npm run dev
```

Local URLs:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:4000
Swagger:  http://localhost:4000/api/docs
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Build

Build both frontend and backend:

```bash
npm run build
```

Build individually:

```bash
npm --workspace apps/frontend run build
npm --workspace server run build
```

## Deployment

Recommended pre-production setup:

```text
Frontend: Vercel
Backend:  Render
Database: Neon Postgres
```

### Vercel Frontend

Use these settings:

```text
Root directory: apps/frontend
Build command: npm run build
Output: .next
```

Required Vercel env var:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
```

### Render Backend

Use these settings:

```text
Root directory: server
Build command: npm install && npm run build
Start command: npm start
```

Required backend env vars:

```env
DATABASE_URL=your-production-postgres-url
FRONTEND_URLS=https://your-vercel-app.vercel.app
JWT_SECRET=your-strong-production-secret
JWT_EXPIRES_IN=7d
```

If deploying from the monorepo root instead of the `server` directory, make sure the install/build commands match the npm workspace setup.

## Security Notes

Before production:

- Use HTTPS for frontend and backend.
- Set a strong `JWT_SECRET`; do not rely on development defaults.
- Keep real credentials out of `.env.example`.
- Protect or disable Swagger docs in production.
- Confirm all create/update/delete admin routes use `requireAuth` and `requireAdmin`.
- Do not send sensitive data in GET query strings.

## Scripts

```text
npm run dev              Start frontend and backend
npm run dev:frontend     Start only the frontend
npm run dev:server       Start only the backend
npm run build            Build frontend and backend
npm run build:frontend   Build only the frontend
npm run build:server     Build only the backend
npm run lint             Lint frontend and backend
npm run migrate          Run Prisma migrations
npm run seed             Seed the database
```