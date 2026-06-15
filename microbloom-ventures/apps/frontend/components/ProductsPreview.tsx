"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          apiUrl("/api/products"),
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const json = await res.json();
        const data = json?.data ?? [];

        // Featured first, then fallback
        const sorted = [...data].sort((a, b) => {
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        });

        setProducts(sorted.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl animate-pulse space-y-4">
            <div className="h-8 w-40 rounded-full bg-slate-200" />
            <div className="h-12 w-80 rounded bg-slate-200" />
            <div className="h-5 w-full max-w-xl rounded bg-slate-200" />
            <div className="h-5 w-5/6 max-w-xl rounded bg-slate-200" />
          </div>

          <div className="h-12 w-40 rounded-full bg-slate-200 animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-[28px] bg-slate-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-10">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            No products yet
          </h3>
          <p className="mt-3 text-slate-600">
            Featured products and solutions will appear here soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
