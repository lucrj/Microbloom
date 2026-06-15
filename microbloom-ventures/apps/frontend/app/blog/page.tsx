import Link from "next/link";
import { apiUrl } from "@/lib/api";

async function getBlogs() {
  try {
    const res = await fetch(
      apiUrl("/api/blogs"),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch blogs (status):", res.status);
      return [];
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

const featuredBlog =
  blogs.find((blog: any) => blog.featured) || blogs[0];

const otherBlogs = blogs.filter(
  (blog: any) => blog.id !== featuredBlog?.id
);

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            Microbloom Blog
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Insights on Microgreens, Farming & Nutrition
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore practical guides, wellness tips, and fresh ideas around
            sustainable living, hydroponics, and nutrient-rich foods.
          </p>
        </header>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-800">
              No blogs published yet
            </h2>
            <p className="mt-2 text-slate-600">
              Check back soon for fresh articles from Microbloom.
            </p>
          </div>
        )}

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-14 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <div className="grid md:grid-cols-2">
              <div className="relative h-72 md:h-full">
                <img
                  src={featuredBlog.coverImage || "/placeholder.jpg"}
                  alt={featuredBlog.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 shadow">
                    Featured
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="mb-3 inline-block w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {featuredBlog.category}
                </span>

                <h2 className="text-3xl font-bold leading-tight text-slate-900">
                  {featuredBlog.title}
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {featuredBlog.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>{featuredBlog.author}</span>
                  <span>•</span>
                  <span>{featuredBlog.readTime || 3} min read</span>
                  {featuredBlog.publishedAt && (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(featuredBlog.publishedAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>

                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="mt-8 inline-flex w-fit items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Read featured article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {otherBlogs.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Articles
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherBlogs.map((blog: any) => (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={blog.coverImage || "/placeholder.jpg"}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 shadow">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.readTime || 3} min read</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-green-700">
                      {blog.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-green-700 hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
