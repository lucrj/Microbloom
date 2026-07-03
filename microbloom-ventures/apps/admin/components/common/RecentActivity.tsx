"use client";

export function RecentActivity() {
  const activities = [
    { id: 1, user: "John Doe", action: "enrolled in Web Development", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "completed a course", time: "4 hours ago" },
    { id: 3, user: "Mike Johnson", action: "posted a comment", time: "1 day ago" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                {activity.user} <span className="font-normal text-gray-600">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
