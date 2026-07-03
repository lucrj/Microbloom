"use client";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export function StatsCard({ title, value, change, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <span
          className={`text-sm font-semibold ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
