# Admin Dashboard

A comprehensive admin dashboard for managing Microbloom platform.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

```
app/
├── (auth)/          # Authentication pages
├── (dashboard)/     # Main dashboard routes
│   ├── dashboard/   # Dashboard home
│   ├── users/       # Users management
│   ├── courses/     # Courses management
│   ├── blog/        # Blog management
│   └── settings/    # Settings page
components/
├── common/          # Shared layout components
├── ui/              # Reusable UI components
lib/
├── api.ts           # API client configuration
└── types.ts         # TypeScript types
```

## Features

- 📊 Dashboard with stats and recent activity
- 👥 User management
- 📚 Course management
- 📝 Blog post management
- ⚙️ Settings management
- 🎨 Tailwind CSS styling
- 📱 Responsive design
- 🔐 API integration ready

## Technologies

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Language**: TypeScript

## Build & Deploy

```bash
npm run build
npm start
```

## License

MIT
