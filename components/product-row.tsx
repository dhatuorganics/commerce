import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import ProductCard from "./product-card";

export default async function ProductRow({
  title,
  eyebrow,
  collection,
  viewAllHref,
  layout = "scroll",
  maxItems = 8,
}: {
  title: string;
  eyebrow: string;
  collection: string;
  viewAllHref: string;
  layout?: "scroll" | "grid";
  maxItems?: number;
}) {
  const products = await getCollectionProducts({ collection });

  if (!products?.length) return null;

  return (
    <section className="w-full py-12" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span
              className="mb-2 block text-xs uppercase tracking-[0.3em]"
              style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              {eyebrow}
            </span>
            <h2
              className="text-2xl md:text-3xl"
              style={{
                fontFamily: "var(--font-bronela)",
                color: "#2C2C2C",
              }}
            >
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden text-xs uppercase tracking-widest underline-offset-4 hover:underline md:block"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            View All →
          </Link>
        </div>

        {/* Grid layout — 2 rows, 4 columns */}
        {layout === "grid" ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {products.slice(0, maxItems).map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        ) : (
          /* Scroll layout — horizontal single row */
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: "max-content" }}>
              {products.map((product) => (
                <div key={product.handle} className="w-[200px] flex-none md:w-[220px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href={viewAllHref}
            className="text-xs uppercase tracking-widest underline-offset-4 hover:underline"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
