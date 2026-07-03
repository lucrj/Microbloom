"use client";

import { StatsCard } from "@/components/ui/StatsCard";
import { RecentActivity } from "@/components/common/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="1,234" change="+12%" trend="up" />
        <StatsCard title="Active Courses" value="24" change="+5%" trend="up" />
        <StatsCard title="Total Revenue" value="$45,231" change="+8%" trend="up" />
        <StatsCard title="Pending Orders" value="12" change="-3%" trend="down" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add New Course
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Create Blog Post
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
