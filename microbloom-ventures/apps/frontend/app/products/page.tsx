import ProductCard from "@/components/ProductCard";
import { apiUrl } from "@/lib/api";

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  imageUrl?: string;
  featured?: boolean;
  category?: string;
  benefits?: string[];
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(apiUrl("/api/products"), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data.data ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-green-700">
          Microbloom Products
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
          Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Discover our nutrient-rich microgreen products designed for wellness,
          freshness, and everyday health.
        </p>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
