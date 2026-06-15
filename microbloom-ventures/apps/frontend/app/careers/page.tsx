import JobCard from "@/components/JobCard";
import Link from "next/link";
import { apiUrl } from "@/lib/api";

async function getJobs() {
  try {
    const res = await fetch(
      apiUrl("/api/careers/jobs"),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch jobs (status):", res.status);
      return [];
    }

    const json = await res.json();
    return json.jobs ?? [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

const perks = [
  {
    title: "Meaningful Work",
    desc: "Build products and systems that contribute to sustainable food, health, and innovation.",
    icon: "🌱",
  },
  {
    title: "Small Team, Big Impact",
    desc: "Work closely with builders, researchers, and creators where your ideas actually matter.",
    icon: "🚀",
  },
  {
    title: "Flexible Culture",
    desc: "We care about thoughtful work, ownership, and sustainable pace over unnecessary bureaucracy.",
    icon: "🤝",
  },
];

export default async function CareersPage() {
  const jobs = await getJobs();

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
                Careers at Microbloom
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Build the future of
                <span className="block text-green-700">
                  sustainable innovation
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Join a team working across biotechnology, AI, research, and
                modern digital products to create meaningful impact.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#open-roles"
                  className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  View Open Roles
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
                        Mission
                      </p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">
                        Science, sustainability, and technology — together.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                          Team Style
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          Collaborative & ownership-driven
                        </p>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                          Work Mode
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                          Flexible, focused, modern
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-green-200 bg-green-50 p-5">
                      <p className="text-sm font-medium text-green-700">
                        What we value
                      </p>
                      <p className="mt-2 text-base font-semibold text-slate-900">
                        Curiosity, craftsmanship, kindness, and meaningful work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating blur */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-green-200/40 blur-3xl" />
            </div>
          </div>
        </div>
      </section>


      {/* OPEN ROLES */}
      <section
        id="open-roles"
        className="border-y border-slate-200 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
                Open Roles
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Current opportunities at Microbloom
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-slate-600">
              Explore open roles across design, engineering, research, and
              operations.
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-16 text-center">
              <h3 className="text-2xl font-semibold text-slate-900">
                No open roles right now
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We’re not actively hiring at the moment, but we’re always happy
                to hear from thoughtful builders and collaborators.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CULTURE STRIP */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white md:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
                  Our Hiring Philosophy
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  We hire for curiosity, ownership, and care.
                </h2>
              </div>

              <div className="space-y-4 text-white/80 leading-8">
                <p>
                  We value people who think deeply, move thoughtfully, and care
                  about building things that last.
                </p>
                <p>
                  If you’re excited by science, sustainability, design, or
                  systems — and you want to work with good people — you’ll feel
                  at home here.
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
            Still Exploring?
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Don’t see the perfect role yet?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            We’re always interested in meeting thoughtful people who care about
            building meaningful things.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
