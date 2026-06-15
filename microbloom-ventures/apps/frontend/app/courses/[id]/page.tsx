import Link from "next/link";
import { notFound } from "next/navigation";
import { apiUrl } from "@/lib/api";

type Course = {
  id: string;
  title: string;
  description: string;
  curriculum?: string[];
  duration?: string | number | null;
  fees?: string | number | null;
  eligibility?: string | null;
  createdAt?: string;
};

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(
      apiUrl(`/api/courses/${id}`),
      { next: { revalidate: 60 } }
    );

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("Error fetching course:", err);
    return null;
  }
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) return notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        
        {/* Back */}
        <Link
          href="/courses"
          className="text-sm text-slate-500 hover:text-slate-900 transition"
        >
          ← Back to Courses
        </Link>

        {/* Header */}
        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 mb-6" />

          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            {course.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            {course.duration && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                {course.duration}
              </span>
            )}

            {course.fees && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                ₹{course.fees}
              </span>
            )}

            {course.createdAt && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">
                {formatDate(course.createdAt)}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            About this course
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-slate-600 whitespace-pre-line">
            {course.description}
          </p>
        </section>

        {/* Curriculum */}
        {course.curriculum?.length ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              What you'll learn
            </h2>

            <div className="mt-4 grid gap-3">
              {course.curriculum.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/60"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Eligibility */}
        {course.eligibility ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Eligibility
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-slate-600 whitespace-pre-line">
              {course.eligibility}
            </p>
          </section>
        ) : null}

        {/* Footer CTA */}
        <section className="mt-14 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-10 text-white shadow-sm">
            <h3 className="text-2xl font-semibold">
              Continue exploring
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              Discover more courses and start learning today.
            </p>

            <Link
              href="/courses"
              className="mt-6 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition"
            >
              View All Courses
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
