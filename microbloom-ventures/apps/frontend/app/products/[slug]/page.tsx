import ProductImageSlider from "@/components/ProductImageSlider";
import { notFound } from "next/navigation";
import { apiUrl, getApiBaseUrl } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  imageUrl?: string;
  gallery?: string[];
  benefits?: string[];
  nutrition?: Record<string, string>;
};

const getImageUrl = (path?: string) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(apiUrl(`/api/products/slug/${slug}`), {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data ?? null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) return notFound();

  // ✅ main image always first
  const mainImage = getImageUrl(product.imageUrl);

  // ✅ valid gallery images only
  const extraImages = (product.gallery || [])
    .filter(Boolean)
    .map((img) => getImageUrl(img));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6f1] via-white to-[#fdfcf8]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* HERO */}
        <section className="mb-16 grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT: IMAGE SLIDER */}
          <ProductImageSlider
            mainImage={mainImage}
            images={extraImages}
            alt={product.name}
          />

          {/* RIGHT: PRODUCT INFO */}
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#7a6f5d]">
              Premium Wellness Product
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="mb-6 text-xl italic text-[#6d5f4b]">
                {product.tagline}
              </p>
            )}

            <p className="mb-8 text-lg leading-8 text-gray-700">
              {product.description}
            </p>
          </div>
        </section>

        {/* BENEFITS + NUTRITION */}
        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          {product.benefits && product.benefits.length > 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Why You’ll Love It
              </h2>

              <div className="space-y-4">
                {product.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl bg-[#f8f6f1] p-4 transition hover:bg-[#f3efe7]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3d5a40] text-sm font-semibold text-white">
                      ✓
                    </div>
                    <p className="leading-7 text-gray-700">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.nutrition && Object.keys(product.nutrition).length > 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Nutritional Information
              </h2>

              <div className="overflow-hidden rounded-2xl border border-gray-100 divide-y divide-gray-100">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-[#fcfbf8] px-5 py-4 transition hover:bg-[#f8f6f1]"
                  >
                    <span className="font-medium capitalize text-gray-700">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="font-semibold text-[#3d5a40]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* BRAND FEEL */}
        <section className="rounded-3xl border border-[#efe7d8] bg-[#f7f2e8] p-10 text-center shadow-inner">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#7a6f5d]">
            Crafted with Care
          </p>
          <h3 className="mb-4 text-3xl font-bold text-gray-900">
            Thoughtfully made for everyday wellness
          </h3>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-700">
            Experience the perfect blend of quality, nourishment, and natural
            goodness in every serving.
          </p>
        </section>
      </div>
    </main>
  );
}
