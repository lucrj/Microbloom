import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

type Internship = {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  stipend?: number | null;
  duration?: number | null;
  createdAt?: string;
};

async function getInternship(id: string): Promise<Internship | null> {
  try {
    const res = await fetch(
      apiUrl(`/api/internships/${id}`),
      { next: { revalidate: 60 } }
    );

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("Error fetching internship:", err);
    return null;
  }
}

function formatDate(date?: string) {
  if (!date) return "Recently posted";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const internship = await getInternship(id);

  if (!internship) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/internships"
            className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900 transition"
          >
            ← Back to Internships
          </Link>
        </div>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(16,185,129,0.08)]">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400" />

          <div className="grid gap-10 px-6 py-8 md:grid-cols-[1.5fr_0.8fr] md:px-10 md:py-10">
            {/* Left */}
            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Internship Opportunity
                </span>

                {internship.location && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700">
                    📍 {internship.location}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {internship.title}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                Join us and contribute to meaningful work while building real
                experience in a collaborative environment.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {internship.stipend !== null && internship.stipend !== undefined && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                      Stipend
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      ₹{internship.stipend.toLocaleString("en-IN")}/month
                    </p>
                  </div>
                )}

                {internship.duration !== null && internship.duration !== undefined && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Duration
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {internship.duration} month
                      {internship.duration > 1 ? "s" : ""}
                    </p>
                  </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Posted
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {formatDate(internship.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <aside className="self-start rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Quick Overview
              </h2>

              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="font-medium text-slate-500">Role</span>
                  <span className="text-right font-semibold text-slate-900">
                    {internship.title}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="font-medium text-slate-500">Location</span>
                  <span className="text-right font-semibold text-slate-900">
                    {internship.location || "Not specified"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="font-medium text-slate-500">Stipend</span>
                  <span className="text-right font-semibold text-slate-900">
                    {internship.stipend
                      ? `₹${internship.stipend.toLocaleString("en-IN")}/month`
                      : "Not specified"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium text-slate-500">Duration</span>
                  <span className="text-right font-semibold text-slate-900">
                    {internship.duration
                      ? `${internship.duration} month${
                          internship.duration > 1 ? "s" : ""
                        }`
                      : "Not specified"}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-slate-500">
                Applications are reviewed on a rolling basis.
              </p>
            </aside>
          </div>
        </div>

        {/* Description */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Internship Description
          </h2>

          <div className="prose prose-slate mt-5 max-w-none">
            <p className="whitespace-pre-line text-[15px] leading-8 text-slate-700">
              {internship.description}
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">
            Explore More Opportunities
          </h3>
          <p className="mt-3 text-slate-600">
            Browse other internship openings available at Microbloom Ventures.
          </p>

          <Link
            href="/internships"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Internships
          </Link>
        </section>
      </section>
    </main>
  );
}
