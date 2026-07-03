"use client";

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <p className="mt-2 text-gray-600">Manage all blog posts</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Blog Posts</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            New Post
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900">Getting Started with Next.js</h3>
            <p className="text-sm text-gray-600 mt-1">A comprehensive guide for beginners</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Published: 2 days ago</span>
              <div className="space-x-2">
                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
