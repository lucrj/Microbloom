import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

type Job = {
  id: string;
  title: string;
  department?: string;
  location?: string;
  employment?: string;
  description: string;
  createdAt?: string;
};

async function getJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(
      apiUrl(`/api/careers/jobs/${id}`),
      { next: { revalidate: 60 } }
    );

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const json = await res.json();
    return json?.job ?? null;
  } catch (err) {
    console.error("Error fetching job:", err);
    return null;
  }
}

function formatDate(date?: string) {
  if (!date) return "Recently posted";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);
  if (!job) return notFound();

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-6 py-14 md:px-10">

      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/careers"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          ← Back to Careers
        </Link>

        {/* HERO */}
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur shadow-md p-10 md:p-12">
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              {job.department || "General"}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700">
              {job.employment || "Full-time"}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700">
              {job.location || "Remote"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl">
            {job.title}
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
            Join a thoughtful team building meaningful, real-world impact.
          </p>

          {/* meta row */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600 border-t pt-6">
            <div>
              <p className="text-slate-400">Department</p>
              <p className="font-medium text-slate-900">{job.department || "General"}</p>
            </div>
            <div>
              <p className="text-slate-400">Work type</p>
              <p className="font-medium text-slate-900">{job.employment || "Full-time"}</p>
            </div>
            <div>
              <p className="text-slate-400">Location</p>
              <p className="font-medium text-slate-900">{job.location || "Remote"}</p>
            </div>
            <div>
              <p className="text-slate-400">Posted</p>
              <p className="font-medium text-slate-900">{formatDate(job.createdAt)}</p>
            </div>
          </div>

        </section>

        {/* CONTENT */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_0.9fr]">

          {/* LEFT */}
          <div className="space-y-12">

            {/* Description */}
            <section className="rounded-[2rem] bg-white p-10 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">
                About this role
              </h2>

              <div className="prose prose-slate max-w-none whitespace-pre-line leading-8 text-slate-700">
                {job.description}
              </div>
            </section>

            {/* Expect */}
            <section className="rounded-[2rem] bg-gradient-to-br from-slate-50 to-white p-10 border border-slate-200">
              <h2 className="text-2xl font-semibold mb-8 text-slate-900">
                What to expect
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  "Collaborative environment",
                  "Meaningful work",
                  "Growth opportunities",
                  "Healthy work culture",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border bg-white p-5 hover:shadow-md transition"
                  >
                    <p className="font-semibold text-slate-900">{item}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      We focus on building thoughtfully and working sustainably.
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT */}
          <aside className="space-y-8 lg:sticky lg:top-24 h-fit">

            <section className="rounded-[2rem] bg-white p-6 shadow-md border border-slate-200">
              <h2 className="text-lg font-semibold mb-5 text-slate-900">
                Role Snapshot
              </h2>

              <div className="space-y-4 text-sm">
                {[
                  ["Position", job.title],
                  ["Team", job.department || "General"],
                  ["Location", job.location || "Remote"],
                  ["Employment", job.employment || "Full-time"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-slate-400">{label}</p>
                    <p className="font-medium text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-emerald-50 p-6 border border-emerald-200 shadow-sm">
              <h2 className="font-semibold text-lg text-slate-900">
                Why join us
              </h2>

              <p className="mt-3 text-sm text-slate-700 leading-7">
                We build with long-term intent and a strong focus on meaningful work.
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "Mission-driven work",
                  "Growth-focused environment",
                  "Collaborative culture",
                ].map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

          </aside>
        </div>

        {/* FOOTER */}
        <section className="mt-16 rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-10 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">
                Explore more opportunities
              </h3>
              <p className="mt-2 text-slate-300">
                Find where your skills can make the biggest impact.
              </p>
            </div>

            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-slate-100 transition"
            >
              View all roles
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
