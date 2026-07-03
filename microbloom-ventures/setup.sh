#!/bin/bash
#
# Microbloom Ventures - Automated Setup Script
#
# This script automates the initial setup process for the project.
# It creates environment files, installs all dependencies, runs database
# migrations, and seeds the database.
#
# Usage:
#   1. Make sure you have created a PostgreSQL database and have the URL.
#   2. Run this script from the project root: ./setup.sh
#   3. When prompted, enter your PostgreSQL database URL.
#

set -e

echo "🚀 Starting Microbloom Ventures setup..."

# --- Prompt for Database URL ---
read -p "Enter your PostgreSQL Database URL and press [ENTER]: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: Database URL cannot be empty."
  exit 1
fi

echo "✅ Database URL received."

# --- Create Backend .env file ---
echo "🔧 Creating backend .env file..."
cat > .env <<EOL
# Backend Environment Variables
DATABASE_URL="$DATABASE_URL"
PORT=4000
FRONTEND_URLS="http://localhost:3000,http://localhost:3001"
JWT_SECRET="a-very-strong-and-long-secret-key-for-development"
JWT_EXPIRES_IN=7d
EOL

# --- Create Frontend .env.local file ---
echo "🔧 Creating frontend .env.local file..."
echo 'NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"' > apps/frontend/.env.local

# --- Create Admin .env.local file ---
echo "🔧 Creating admin .env.local file..."
echo 'NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"' > apps/admin/.env.local

echo "✅ Environment files created successfully."

# --- Install Dependencies ---
echo "📦 Installing dependencies..."
npm install && npm install --prefix apps/admin

# --- Setup Database ---
echo "⚙️ Setting up the database (migrating and seeding)..."
npm run migrate && npm run seed

echo "🎉 Setup complete! You can now run the applications using 'npm run dev' and 'npm run dev:admin'."