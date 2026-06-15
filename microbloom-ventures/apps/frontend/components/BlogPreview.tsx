"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

type Blog = {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  coverImage?: string;
};

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch latest blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          apiUrl("/api/blogs"),
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const json = await res.json();
        const data = json?.data ?? [];

        setBlogs(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!blogs.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % blogs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [blogs]);

  if (loading) {
    return (
      <section className="py-10">
        <div className="animate-pulse space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-36 rounded bg-slate-200" />
            <div className="h-10 w-72 rounded bg-slate-200" />
            <div className="h-5 w-full max-w-xl rounded bg-slate-200" />
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid md:grid-cols-[1.2fr_1fr]">
            <div className="h-[300px] bg-slate-200" />
            <div className="space-y-4 p-8">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-8 w-3/4 rounded bg-slate-200" />
              <div className="h-5 w-full rounded bg-slate-200" />
              <div className="h-5 w-5/6 rounded bg-slate-200" />
              <div className="h-5 w-32 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section className="py-10">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            No blog posts yet
          </h3>
          <p className="mt-3 text-slate-600">
            Fresh articles and insights will appear here soon.
          </p>
        </div>
      </section>
    );
  }

  const blog = blogs[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % blogs.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <section className="py-10">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-medium text-green-700">
            Insights & Articles
          </p>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Latest from our blog
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Explore practical guides, growing tips, and business insights for
            building your microgreens journey.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-green-600 hover:text-green-700"
        >
          View all articles →
        </Link>
      </div>

      {/* Slider */}
      <div className="relative">
        <Link href={`/blog/${blog.slug}`} className="group block">
          <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-500 hover:shadow-xl md:grid-cols-[1.2fr_1fr]">
            {/* Image */}
            <div className="relative h-[300px] overflow-hidden md:h-full">
              <img
                src={blog.coverImage || "/placeholder.jpg"}
                alt={blog.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 backdrop-blur">
                {blog.category || "Blog"}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p className="mb-4 text-sm font-medium text-slate-500">
                  Article {String(index + 1).padStart(2, "0")}
                  {blog.publishedAt && (
                    <>
                      {" "}
                      • {new Date(blog.publishedAt).toLocaleDateString()}
                    </>
                  )}
                </p>

                <h3 className="text-2xl font-bold tracking-tight text-slate-900 transition group-hover:text-green-700 md:text-3xl">
                  {blog.title}
                </h3>

                <p className="mt-5 text-base leading-7 text-slate-600">
                  {blog.excerpt || "Read this article to learn more."}
                </p>
              </div>

              <div className="mt-8 inline-flex items-center text-sm font-semibold text-green-700">
                Read article
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            ← Previous
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {blogs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to article ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-green-600" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
