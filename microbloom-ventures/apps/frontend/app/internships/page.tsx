import InternshipCard from "@/components/InternshipCard";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

async function getInternships() {
  try {
    const res = await fetch(
      apiUrl("/api/internships"),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch internships (status):", res.status);
      return [];
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.error("Error fetching internships:", err);
    return [];
  }
}

const highlights = [
  {
    title: "Hands-On Projects",
    desc: "Work on real products, research, and systems — not just side tasks.",
    icon: "🛠️",
  },
  {
    title: "Mentored Learning",
    desc: "Learn directly from builders, developers, and researchers in a collaborative environment.",
    icon: "🌿",
  },
  {
    title: "Career Growth",
    desc: "Build experience, confidence, and a portfolio of meaningful work.",
    icon: "📈",
  },
];

export default async function InternshipsPage() {
  const internships = await getInternships();

  return (
    <main className="bg-[#f8faf8] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.10),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.08),_transparent_30%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                Internships at Microbloom
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Learn by building
                <span className="block text-green-700">
                  meaningful things
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Gain real-world experience across biotechnology, AI, product,
                research, and digital innovation while working on projects that matter.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#open-internships"
                  className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  Explore Internships
                </a>
              </div>
            </div>

            {/* Right visual panel */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-50 via-white to-lime-50 p-8">
                  <div className="grid h-full gap-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">
                        What You’ll Gain
                      </p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">
                        Experience, mentorship, and real ownership.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                          Learning Style
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          Practical & project-based
                        </p>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                          Environment
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          Supportive & collaborative
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-green-200 bg-green-50 p-5">
                      <p className="text-sm font-medium text-green-700">
                        Ideal For
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        Curious students and early builders who want meaningful exposure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-green-200/40 blur-3xl" />
            </div>
          </div>
        </div>
      </section>


      {/* OPEN INTERNSHIPS */}
      <section
        id="open-internships"
        className="border-y border-slate-200 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
                Open Internships
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Current internship opportunities
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-slate-600">
              Explore internships across engineering, design, research, product,
              and innovation.
            </p>
          </div>

          {internships.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
              <h3 className="text-2xl font-semibold text-slate-900">
                No internships available right now
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We’re not actively offering internships at the moment, but we’re
                always open to hearing from curious learners and future builders.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {internships.map((internship: any) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white md:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
                  Internship Experience
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  We care about how you grow, not just what you deliver.
                </h2>
              </div>

              <div className="space-y-4 text-white/80 leading-8">
                <p>
                  You’ll get exposure to real systems, real workflows, and real
                  collaboration — while still having space to learn and improve.
                </p>
                <p>
                  If you’re curious, proactive, and excited to build, you’ll gain
                  far more than a certificate here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
            Still Curious?
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Don’t see the right internship yet?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            We’re always excited to hear from students, early builders, and
            curious learners who want to create meaningful work.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Reach Out
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
