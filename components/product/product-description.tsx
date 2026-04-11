import { Product } from "lib/shopify/types";
import { Suspense } from "react";
import { DynamicPrice } from "./dynamic-price";
import { FeaturedReview } from "./featured-review";
import { NutritionBadges } from "./nutrition-badges";
import { ProductAccordions } from "./product-accordions";
import { ProductAddToCart } from "./product-add-to-cart";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const basePrice = product.priceRange.minVariantPrice;

  /* Helper to extract metafield value by key */
  const getMeta = (key: string) =>
    product.metafields?.find((m) => m?.key === key)?.value ?? undefined;

  /* Derive a display category from tags or a fallback label */
  const categoryLabel = product.tags[0] || "Organic Whole Food";

  /* Tagline: use metafield if present, else fallback to description */
  const rawTagline = getMeta("tagline") || product.description || "";
  const tagline = rawTagline.slice(0, 220);
  const taglineTruncated = rawTagline.length > 220;

  /* Feature bullets: use metafields if any are present */
  const metaBullets = [
    getMeta("bullet_1"),
    getMeta("bullet_2"),
    getMeta("bullet_3"),
    getMeta("bullet_4"),
  ].filter(Boolean) as string[];

  const defaultBullets = [
    "100% Certified Organic",
    "Traditionally processed, nutrient-rich",
    "Direct from small Indian farms",
    "No preservatives · No additives",
  ];

  const featureBullets = metaBullets.length > 0 ? metaBullets : defaultBullets;

  /* Why You'll Love It points */
  const whyPoints = [1, 2, 3, 4, 5]
    .map((i) => getMeta(`why_love_it_${i}`))
    .filter(Boolean) as string[];

  /* Nutrition data object */
  const nutritionData = {
    servingSize: getMeta("nutrition_serving_size"),
    calories: getMeta("nutrition_calories"),
    proteinG: getMeta("nutrition_protein_g"),
    carbsG: getMeta("nutrition_carbs_g"),
    fiberG: getMeta("nutrition_fiber_g"),
    fatG: getMeta("nutrition_fat_g"),
    sodiumMg: getMeta("nutrition_sodium_mg"),
    sugarG: getMeta("nutrition_sugar_g"),
  };

  return (
    <div className="flex flex-col">

      {/* ── Category / type badge ─────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]"
          style={{
            backgroundColor: "rgba(204,153,102,0.12)",
            color: "#CC9966",
            fontFamily: "var(--font-nobel)",
            border: "1px solid rgba(204,153,102,0.25)",
          }}
        >
          <span style={{ fontSize: "7px" }}>✦</span>
          {categoryLabel}
        </span>
      </div>

      {/* ── Product title ─────────────────────────────────────── */}
      <h1
        className="mb-3 leading-[1.15]"
        style={{
          fontFamily: "var(--font-bronela)",
          color: "#1A1A1A",
          fontSize: "clamp(26px, 3vw, 38px)",
        }}
      >
        {product.title}
      </h1>

      {/* ── Short description / tagline ───────────────────────── */}
      {tagline && (
        <p
          className="mb-4 text-sm leading-relaxed"
          style={{
            color: "#666",
            fontFamily: "var(--font-nobel)",
            maxWidth: "460px",
          }}
        >
          {tagline}
          {taglineTruncated && (
            <>
              {"…"}{" "}
              <a
                href="#about-product"
                className="transition-colors hover:underline"
                style={{ color: "#CC9966" }}
              >
                Read more ↓
              </a>
            </>
          )}
        </p>
      )}

      {/* ── Feature bullets ───────────────────────────────────── */}
      <ul className="mb-5 flex flex-col gap-1.5">
        {featureBullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-center gap-2 text-xs"
            style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
          >
            <span
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(74,107,60,0.12)", color: "#4A6B3C" }}
            >
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="mb-5 h-px" style={{ backgroundColor: "#EDE8E1" }} />

      {/* ── Price ─────────────────────────────────────────────── */}
      <div className="mb-5 flex items-baseline gap-3">
        <span
          className="text-3xl font-semibold"
          style={{ fontFamily: "var(--font-bronela)", color: "#1A1A1A" }}
        >
          <Suspense fallback={<span style={{ color: "#1A1A1A" }}>—</span>}>
            <DynamicPrice variants={product.variants} basePrice={basePrice} />
          </Suspense>
        </span>
        <span
          className="text-xs"
          style={{ color: "#AAAAAA", fontFamily: "var(--font-nobel)" }}
        >
          incl. all taxes
        </span>
      </div>

      {/* ── Nutrition / attribute badges ──────────────────────── */}
      {product.tags.length > 0 && (
        <div className="mb-5">
          <NutritionBadges tags={product.tags} />
        </div>
      )}

      {/* ── Variant selector (size / weight) ──────────────────── */}
      <div className="mb-2">
        <VariantSelector options={product.options} variants={product.variants} />
      </div>

      {/* ── Quantity + Add to Cart ────────────────────────────── */}
      <div className="mb-6">
        <ProductAddToCart product={product} />
      </div>

      {/* ── Trust badges strip ────────────────────────────────── */}
      <div
        className="mb-6 grid grid-cols-3 gap-2 rounded-2xl px-4 py-4"
        style={{ backgroundColor: "#FAF7F2", border: "1px solid rgba(204,153,102,0.15)" }}
      >
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            label: "100% Organic",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            label: "Free Delivery ₹499+",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            label: "Easy Returns",
          },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 text-center">
            <span style={{ color: "#CC9966" }}>{icon}</span>
            <span
              className="text-[9px] uppercase tracking-[0.12em] leading-tight"
              style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Top review — social proof before accordions ───────── */}
      <FeaturedReview />

      {/* ── Accordions (Why You'll Love It · Ingredients · How To Use) ── */}
      {/* "About This Product" is shown below the combo offer — see page.tsx  */}
      <ProductAccordions
        whyLoveItPoints={whyPoints.length ? whyPoints : undefined}
        ingredients={getMeta("ingredients")}
        howToUse={getMeta("how_to_use")}
        nutritionData={nutritionData}
      />

    </div>
  );
}
