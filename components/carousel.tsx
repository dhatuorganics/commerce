import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export async function Carousel() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  return (
    <section className="w-full py-12" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <span
            className="mb-2 block text-xs uppercase tracking-[0.3em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Discover More
          </span>
          <h2
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            More From Our Range
          </h2>
        </div>

        {/* Static grid — 2 rows, 4 columns */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {products.slice(0, 8).map((product) => (
            <Link
              key={product.handle}
              href={`/${product.handle}`}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
