# Project Quickstart: Steps to Run

This guide provides a complete walkthrough to set up and run the entire Microbloom Ventures platform, including the backend server, the public-facing frontend, and the admin dashboard.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18 or newer.
-   **npm**: Version 8 or newer.
-   **PostgreSQL**: A running PostgreSQL instance. You will need to create a database for this project.

---

## Step 1: Clone the Repository

First, clone the project from your repository to your local machine and navigate into the project directory.

```bash
git clone <your-repository-url>
cd microbloom-ventures
```

---

## Step 2: Configure Environment Variables

The project requires separate environment variable files for the server, frontend, and admin applications.

### A. Backend Server (`.env`)

Create a file named `.env` in the **root** of the project. This file configures the backend server.

```bash
# In the project root directory
touch .env
```

Add the following configuration, replacing the placeholder values with your local setup details.

```env
# File: ./.env

# Your local PostgreSQL database connection URL
DATABASE_URL="postgresql://username:password@localhost:5432/microbloom_db"

# Port for the backend API server
PORT=4000

# Comma-separated URLs for the frontend and admin apps to allow CORS
FRONTEND_URLS="http://localhost:3000,http://localhost:3001"

# Secret key for signing JSON Web Tokens (JWT)
JWT_SECRET="your-very-strong-and-secret-key-for-jwt"
JWT_EXPIRES_IN=7d
```

### B. Frontend Website (`apps/frontend/.env.local`)

Create a file named `.env.local` inside the `apps/frontend` directory.

```bash
touch apps/frontend/.env.local
```

Add the following line to point the frontend to your local backend API.

```env
# File: ./apps/frontend/.env.local
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

### C. Admin Dashboard (`apps/admin/.env.local`)

Create a file named `.env.local` inside the `apps/admin` directory.

```bash
touch apps/admin/.env.local
```

Add the following line to point the admin dashboard to your local backend API.

```env
# File: ./apps/admin/.env.local
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

---

## Step 3: Install All Dependencies

This project uses npm workspaces for the main apps and a separate `package.json` for the admin app. You can install all dependencies from the root directory.

```bash
# 1. Install dependencies for server and frontend (workspaces)
npm install

# 2. Install dependencies for the admin app
npm install --prefix apps/admin
```

---

## Step 4: Set Up the Database

Run the database migrations to create the necessary tables and then seed the database with initial data. These commands should be run from the project root.

```bash
# Apply database schema changes
npm run migrate

# Populate the database with seed data
npm run seed
```

---

## Step 5: Run the Applications

To run all parts of the platform concurrently, you will need two separate terminal windows.

1.  **In your first terminal (from the root directory):**
    Start the backend server and the main frontend website.
    ```bash
    npm run dev
    ```

2.  **In your second terminal (from the root directory):**
    Start the admin dashboard.
    ```bash
    npm run dev:admin
    ```

Your applications are now running and accessible at the following URLs:

-   **Frontend Website**: `http://localhost:3000`
-   **Admin Dashboard**: `http://localhost:3001`
-   **Backend Server**: `http://localhost:4000`
-   **API Documentation**: `http://localhost:4000/api/docs`

You are all set! The complete platform is now running locally.
