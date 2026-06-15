import CourseCard from "@/components/CourseCard";
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

async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(
      apiUrl("/api/courses"),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch courses (status):", res.status);
      return [];
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 mb-5" />

          <p className="text-xs font-medium uppercase tracking-widest text-emerald-600">
            Courses
          </p>

          <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
            Explore Our Courses
          </h1>

          <p className="mt-4 text-[15px] md:text-base leading-7 text-slate-600">
            Carefully crafted programs designed to help you build practical,
            real-world skills and accelerate your learning journey.
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200/60">
            
            <div className="mb-4 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-lg">
              📚
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              No courses yet
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-sm">
              We're preparing high-quality courses for you. Check back soon!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
