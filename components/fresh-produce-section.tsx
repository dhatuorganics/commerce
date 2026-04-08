import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Fresh Fruits",
    handle: "fresh-fruits",
    emoji: "🍎",
    color: "#E8534A",
    bg: "#FEF2F2",
  },
  {
    label: "Greens & Herbs",
    handle: "fresh-greens",
    emoji: "🥬",
    color: "#2D6A4F",
    bg: "#F0FDF4",
  },
  {
    label: "Vegetables",
    handle: "fresh-vegetables",
    emoji: "🥕",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    label: "Country Eggs",
    handle: "country-eggs",
    emoji: "🥚",
    color: "#92400E",
    bg: "#FEF3C7",
  },
];

function ProduceCard({
  product,
}: {
  product: { handle: string; title: string; featuredImage?: { url: string; altText: string } | null; priceRange: { minVariantPrice: { amount: string; currencyCode: string } } };
}) {
  return (
    <Link
      href={`/${product.handle}`}
      className="group flex flex-col items-center gap-2 rounded-2xl p-3 transition-all hover:shadow-md"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8F5E9" }}
    >
      <div className="relative h-24 w-full overflow-hidden rounded-xl">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="150px"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-3xl"
            style={{ backgroundColor: "#F0FDF4" }}
          >
            🌿
          </div>
        )}
      </div>
      <span
        className="text-center text-xs leading-tight font-medium"
        style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
      >
        {product.title}
      </span>
      <span
        className="text-xs font-semibold"
        style={{ color: "#2D6A4F", fontFamily: "var(--font-nobel)" }}
      >
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: product.priceRange.minVariantPrice.currencyCode,
          currencyDisplay: "narrowSymbol",
        }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
      </span>
    </Link>
  );
}

export default async function FreshProduceSection() {
  const products = await getCollectionProducts({ collection: "fresh-produce" });

  return (
    <section className="w-full py-14" style={{ backgroundColor: "#F5FBF5" }}>
      <div className="px-6 md:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span
            className="mb-3 inline-block rounded-full border px-5 py-1 text-[10px] uppercase tracking-[0.35em]"
            style={{
              borderColor: "#2D6A4F30",
              color: "#2D6A4F",
              fontFamily: "var(--font-nobel)",
              backgroundColor: "#FFFFFF",
            }}
          >
            Farm Fresh · Organic Certified
          </span>
          <h2
            className="mb-3 text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#1A3A2A" }}
          >
            Fresh Produce
          </h2>
          <p
            className="max-w-xl text-sm leading-relaxed"
            style={{ color: "#4A7A5A", fontFamily: "var(--font-nobel)" }}
          >
            Straight from certified organic farms — seasonal fruits, garden-fresh vegetables,
            heritage greens, and free-range country eggs. No chemicals, no cold storage.
          </p>

          {/* Thin green rule */}
          <div
            className="mt-5 h-px w-12"
            style={{ background: "linear-gradient(to right, transparent, #2D6A4F, transparent)" }}
          />
        </div>

        {/* Category pills */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.handle}
              href={`/search/${cat.handle}`}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all hover:shadow-sm hover:scale-105"
              style={{
                borderColor: `${cat.color}30`,
                backgroundColor: cat.bg,
                color: cat.color,
                fontFamily: "var(--font-nobel)",
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>

        {/* Products grid or empty state */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {products.slice(0, 12).map((product) => (
                <ProduceCard key={product.handle} product={product} />
              ))}
            </div>

            {/* View all */}
            <div className="mt-8 text-center">
              <Link
                href="/search/fresh-produce"
                className="inline-block rounded-full border px-8 py-3 text-xs font-medium uppercase tracking-widest transition-all hover:shadow-md hover:scale-105"
                style={{
                  borderColor: "#2D6A4F",
                  color: "#2D6A4F",
                  fontFamily: "var(--font-nobel)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                View All Fresh Produce →
              </Link>
            </div>
          </>
        ) : (
          /* Placeholder while Shopify collection is being set up */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { emoji: "🍌", name: "Organic Banana" },
              { emoji: "🥬", name: "Organic Spinach" },
              { emoji: "🍅", name: "Organic Tomato" },
              { emoji: "🥕", name: "Organic Carrot" },
              { emoji: "🥚", name: "Country Eggs" },
              { emoji: "🌿", name: "Organic Coriander" },
              { emoji: "🧅", name: "Organic Onion" },
              { emoji: "🫚", name: "Organic Garlic" },
              { emoji: "🥭", name: "Organic Mango" },
              { emoji: "🥦", name: "Organic Cabbage" },
              { emoji: "🍈", name: "Organic Guava" },
              { emoji: "🌶️", name: "Organic Capsicum" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-2 rounded-2xl p-3"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8F5E9" }}
              >
                <div
                  className="flex h-24 w-full items-center justify-center rounded-xl text-4xl"
                  style={{ backgroundColor: "#F0FDF4" }}
                >
                  {item.emoji}
                </div>
                <span
                  className="text-center text-xs leading-tight font-medium"
                  style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                >
                  {item.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "#2D6A4F", fontFamily: "var(--font-nobel)" }}
                >
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
