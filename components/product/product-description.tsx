import { AddToCart } from "components/cart/add-to-cart";
import { Product } from "lib/shopify/types";
import { Suspense } from "react";
import { DynamicPrice } from "./dynamic-price";
import { NutritionBadges } from "./nutrition-badges";
import { VariantSelector } from "./variant-selector";
import ProductProse from "./product-prose";

export function ProductDescription({ product }: { product: Product }) {
  const basePrice = product.priceRange.minVariantPrice;

  return (
    <div className="flex flex-col gap-0">
      {/* ── Title ──────────────────────────────────────────────── */}
      <h1
        className="mb-3 text-3xl leading-tight md:text-4xl"
        style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
      >
        {product.title}
      </h1>

      {/* ── Price — deep orange, updates with variant ───────────── */}
      <div className="mb-4 flex items-baseline gap-2">
        <div
          className="inline-flex items-center rounded-full px-4 py-1.5 text-base font-semibold"
          style={{
            backgroundColor: "#FFF3EC",
            color: "#C75B21",
            fontFamily: "var(--font-nobel)",
            border: "1.5px solid #F5C5A3",
          }}
        >
          <Suspense
            fallback={
              <span style={{ color: "#C75B21", fontFamily: "var(--font-nobel)" }}>
                —
              </span>
            }
          >
            <DynamicPrice variants={product.variants} basePrice={basePrice} />
          </Suspense>
        </div>
        <span
          className="text-xs"
          style={{ color: "#AAAAAA", fontFamily: "var(--font-nobel)" }}
        >
          incl. all taxes
        </span>
      </div>

      {/* ── Nutrition badges (from Shopify product tags) ─────────── */}
      {product.tags.length > 0 && (
        <div className="mb-4">
          <NutritionBadges tags={product.tags} />
        </div>
      )}

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="mb-4 h-px" style={{ backgroundColor: "#EDE8E1" }} />

      {/* ── Variant selector (size, weight, etc.) ───────────────── */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* ── Add to Cart ─────────────────────────────────────────── */}
      <AddToCart product={product} />

      {/* ── Product description ─────────────────────────────────── */}
      {product.descriptionHtml ? (
        <div className="mt-8 border-t pt-6" style={{ borderColor: "#EDE8E1" }}>
          <ProductProse html={product.descriptionHtml} />
        </div>
      ) : null}
    </div>
  );
}
