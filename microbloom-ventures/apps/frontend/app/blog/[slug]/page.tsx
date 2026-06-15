import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  category?: string;
  coverImage?: string;
  readTime?: number;
  publishedAt?: string;
};

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      apiUrl(`/api/blogs/${slug}`),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  if (!blog) return notFound();

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-green-50/30 pb-24">
      {/* HERO */}
      <section className="relative h-[430px] w-full overflow-hidden md:h-[560px]">
        <img
          src={blog.coverImage || "/placeholder.jpg"}
          alt={blog.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            ← Back to blogs
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow">
              {blog.category || "Blog"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/90">
              {blog.author && (
                <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  By {blog.author}
                </span>
              )}

              {blog.readTime && (
                <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  {blog.readTime} min read
                </span>
              )}

              {blog.publishedAt && (
                <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE FLOW */}
      <section className="relative -mt-10 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* LEFT META */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="space-y-8 rounded-2xl border border-white/40 bg-white/40 p-6 backdrop-blur-md shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Category
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {blog.category || "General"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Author
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {blog.author || "Microbloom Team"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Read Time
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {blog.readTime || 3} min
                  </p>
                </div>

                {blog.publishedAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Published
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="min-w-0">
              {blog.excerpt && (
                <div className="mb-10 rounded-2xl border border-green-100/70 bg-green-50/70 p-6 backdrop-blur-sm">
                  <p className="text-xl italic leading-8 text-slate-700">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              <div className="mb-10 h-px w-full bg-gradient-to-r from-green-500/40 via-slate-300 to-transparent" />

              <div className="mx-auto max-w-3xl">
                <div className="prose prose-slate prose-lg max-w-none leading-8 prose-headings:mt-12 prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-green-700 hover:prose-a:text-green-900 whitespace-pre-line">
                  {blog.content}
                </div>

                {/* Soft CTA */}
                <div className="mt-20 rounded-3xl border border-slate-200/70 bg-white/70 px-8 py-10 shadow-sm backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                    Keep Exploring
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    More insights from Microbloom
                  </h3>
                  <p className="mt-3 max-w-2xl text-slate-600">
                    Discover more articles on microgreens, sustainable farming,
                    nutrition, and growing practices for a healthier future.
                  </p>

                  <Link
                    href="/blog"
                    className="mt-6 inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Browse all blogs →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
