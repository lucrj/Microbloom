import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image?: string | null;
  featured?: boolean;
  order?: number;
  createdAt?: string;
};

async function getService(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(
      apiUrl(`/api/services/slug/${slug}`),
      { next: { revalidate: 60 } }
    );

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("Error fetching service:", err);
    return null;
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) return notFound();

  return (
    <section className="min-h-screen bg-white px-6 pb-20 pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            ← Back to Services
          </Link>
        </div>

        {/* Top */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-[280px] w-full overflow-hidden bg-slate-100 md:h-[380px]">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                No image available
              </div>
            )}
          </div>

          <div className="p-8 md:p-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
              Service
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {service.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Main Description */}
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Overview
            </h2>

            <div className="mt-6 whitespace-pre-line text-base leading-8 text-slate-700">
              {service.description}
            </div>
          </article>

          {/* Side Card */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Need this service?
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Reach out to discuss how we can support your project, research, or
              technical goals.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Contact Us
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
