"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api";

type Course = {
  id: string;
  title: string;
  description: string;
  slug: string;
  duration?: string | null;
  fees?: number | null;
  eligibility?: string | null;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/courses");

      setCourses(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Courses Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage all courses in your system
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Courses List
          </h2>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Course
          </button>
        </div>

        {loading && (
          <p className="text-gray-500">
            Loading courses...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {!loading && courses.length === 0 && (
          <p className="text-gray-500">
            No courses found.
          </p>
        )}

        <div className="grid gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {course.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                {course.duration && (
                  <span>
                    Duration: {course.duration}
                  </span>
                )}

                {course.fees && (
                  <span>
                    Fees: ₹{course.fees}
                  </span>
                )}

                {course.eligibility && (
                  <span>
                    Eligibility: {course.eligibility}
                  </span>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>

                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}