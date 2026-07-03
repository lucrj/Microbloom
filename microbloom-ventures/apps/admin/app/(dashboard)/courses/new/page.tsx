"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";

export default function NewCoursePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    fees: "",
    eligibility: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await apiClient.post("/courses", {
        title: form.title,
        description: form.description,
        duration: form.duration,
        fees: Number(form.fees),
        eligibility: form.eligibility,
      });

      router.push("/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <input
          placeholder="Title"
          className="w-full border rounded p-3"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded p-3"
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Duration"
          className="w-full border rounded p-3"
          value={form.duration}
          onChange={(e) =>
            setForm({
              ...form,
              duration: e.target.value,
            })
          }
        />

        <input
          placeholder="Fees"
          className="w-full border rounded p-3"
          value={form.fees}
          onChange={(e) =>
            setForm({
              ...form,
              fees: e.target.value,
            })
          }
        />

        <input
          placeholder="Eligibility"
          className="w-full border rounded p-3"
          value={form.eligibility}
          onChange={(e) =>
            setForm({
              ...form,
              eligibility: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}