import ServiceCard from "@/components/ServiceCard";
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
};

async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(
      apiUrl("/api/services"),
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch services (status):", res.status);
      return [];
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Our Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We provide consulting, research support, and technical services
            designed to accelerate innovation in biotechnology, AI, and
            scientific computing.
          </p>
        </header>

        {/* Services Grid */}
        {services.length === 0 ? (
          <p className="text-center text-slate-500">
            No services available right now.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
