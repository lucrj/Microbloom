// Global type definitions for the admin dashboard
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive";
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrolledCount: number;
  status: "draft" | "published" | "archived";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  activeCourses: number;
  totalRevenue: number;
  pendingOrders: number;
}
