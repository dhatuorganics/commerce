"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Compact badge colour map — a lightweight subset used on hover overlays.
   Tags listed here are excluded from display (per brief):
     "Organic Certified", "Vegetarian"
   ───────────────────────────────────────────────────────────────────────── */
const EXCLUDED = new Set(["Organic Certified", "Vegetarian"]);

const BADGE_COLORS: Record<string, { bg: string; color: string; dot: string }> = {
  "High Fiber":              { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  "High Fibre":              { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  "High Protein":            { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
  "Low Carb":                { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C" },
  "Low Calorie":             { bg: "#FEFCE8", color: "#854D0E", dot: "#EAB308" },
  "Low Fat":                 { bg: "#FAFAF5", color: "#3F6212", dot: "#84CC16" },
  "Rich in Iron":            { bg: "#FFF1F2", color: "#9F1239", dot: "#F43F5E" },
  "Rich in Calcium":         { bg: "#F0F9FF", color: "#0C4A6E", dot: "#38BDF8" },
  "Rich in Zinc":            { bg: "#F5F3FF", color: "#4C1D95", dot: "#8B5CF6" },
  "Rich in Magnesium":       { bg: "#F0FDF4", color: "#14532D", dot: "#22C55E" },
  "Rich in Potassium":       { bg: "#FDF4FF", color: "#701A75", dot: "#D946EF" },
  "Vitamin B Rich":          { bg: "#FFFBEB", color: "#78350F", dot: "#F59E0B" },
  "Omega Rich":              { bg: "#EFF6FF", color: "#1E3A8A", dot: "#60A5FA" },
  "Gluten Free":             { bg: "#FFFBEB", color: "#92400E", dot: "#D97706" },
  "Vegan":                   { bg: "#F0FDF4", color: "#166534", dot: "#4ADE80" },
  "Low GI":                  { bg: "#F5F3FF", color: "#5B21B6", dot: "#A78BFA" },
  "Diabetic Friendly":       { bg: "#ECFDF5", color: "#064E3B", dot: "#34D399" },
  "Keto Friendly":           { bg: "#FFF7ED", color: "#7C2D12", dot: "#F97316" },
  "Heart Healthy":           { bg: "#FFF1F2", color: "#881337", dot: "#FB7185" },
  "Sprouted":                { bg: "#F0FDF4", color: "#166534", dot: "#22C55E" },
  "Fermented":               { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C" },
  "Probiotic":               { bg: "#FDF4FF", color: "#6B21A8", dot: "#C084FC" },
  "Prebiotic":               { bg: "#F0FDF4", color: "#065F46", dot: "#6EE7B7" },
  "Cold Pressed":            { bg: "#EFF6FF", color: "#1E3A8A", dot: "#93C5FD" },
  "Stone Ground":            { bg: "#FAF5F0", color: "#78350F", dot: "#C4A882" },
  "Raw":                     { bg: "#F0FDF4", color: "#14532D", dot: "#BBF7D0" },
  "Antioxidant Rich":        { bg: "#FDF4FF", color: "#701A75", dot: "#E879F9" },
  "No Added Sugar":          { bg: "#FFFBEB", color: "#854D0E", dot: "#FDE047" },
  "No Preservatives":        { bg: "#F0FDF4", color: "#166534", dot: "#86EFAC" },
  "Traditionally Processed": { bg: "#FAF5F0", color: "#92400E", dot: "#C4A882" },
};

const MAX_BADGES = 4;

/* ─── Quick Add to Cart ──────────────────────────────────────────────── */
function QuickAddButton({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const [, formAction] = useActionState(addItem, null);
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  const hasVariants =
    product.variants.length > 1 &&
    !(product.variants.length === 1 && product.variants[0]?.title === "Default Title");

  const defaultVariant = product.variants[0];
  const inStock = product.availableForSale && !!defaultVariant;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock || !defaultVariant || state !== "idle") return;
    setState("adding");
    addCartItem(defaultVariant, product);
    formAction({ variantId: defaultVariant.id, quantity: 1 });
    setState("added");
    setTimeout(() => setState("idle"), 1800);
  };

  /* If multiple variants → link to product page */
  if (hasVariants) {
    return (
      <Link
        href={`/${product.handle}`}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-200 hover:opacity-90"
        style={{
          backgroundColor: "#CC9966",
          color: "#FAF7F2",
          fontFamily: "var(--font-nobel)",
        }}
      >
        Choose Options
        <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!inStock || state === "adding"}
      className="flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed"
      style={{
        backgroundColor:
          !inStock ? "#E0D5C8" :
          state === "added" ? "#4A6B3C" :
          "#CC9966",
        color: !inStock ? "#AAA" : "#FAF7F2",
        fontFamily: "var(--font-nobel)",
      }}
    >
      {!inStock ? (
        "Out of Stock"
      ) : state === "added" ? (
        <>
          <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M2 7l3.5 3.5L12 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Added!
        </>
      ) : state === "adding" ? (
        <>
          <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Adding…
        </>
      ) : (
        <>
          <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1h2l1.5 7h6.5l1-5H4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="10.5" cy="12" r="1" fill="currentColor" stroke="none" />
          </svg>
          Quick Add
        </>
      )}
    </button>
  );
}

/* ─── Main ProductCard component ─────────────────────────────────────── */
export function ProductCard({
  product,
  sizes,
  priority = false,
  showATC = false,
  labelPosition = "bottom",
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  showATC?: boolean;
  labelPosition?: "bottom" | "center";
}) {
  const [hovered, setHovered] = useState(false);

  /* Filter + cap badges */
  const badges = product.tags
    .filter((t) => !EXCLUDED.has(t) && BADGE_COLORS[t])
    .slice(0, MAX_BADGES)
    .map((t) => ({ tag: t, style: BADGE_COLORS[t]! }));

  const price = parseFloat(product.priceRange.maxVariantPrice.amount);
  const currency = product.priceRange.maxVariantPrice.currencyCode;
  const priceStr =
    currency === "INR"
      ? `₹${price.toFixed(0)}`
      : `${currency} ${price.toFixed(2)}`;

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        className="relative block h-full w-full"
        href={`/${product.handle}`}
        prefetch={true}
      >
        {/* Image container */}
        <div
          className="relative h-full w-full overflow-hidden rounded-lg transition-all duration-300"
          style={{
            border: hovered ? "1.5px solid #CC9966" : "1.5px solid #E0D5C8",
            backgroundColor: "#FAF7F2",
          }}
        >
          {product.featuredImage?.url && (
            <Image
              alt={product.title}
              src={product.featuredImage.url}
              fill
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-contain transition-transform duration-500"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            />
          )}

          {/* Title + price label (always visible) */}
          <div
            className={`absolute left-0 w-full px-4 pb-4 ${
              labelPosition === "center" ? "bottom-[35%] lg:px-20" : "bottom-0"
            }`}
          >
            <div className="flex items-center rounded-full border border-white/30 bg-white/75 p-1 text-xs font-semibold text-black backdrop-blur-md">
              <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
                {product.title}
              </h3>
              <span
                className="flex-none rounded-full p-2 text-white"
                style={{ backgroundColor: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                {priceStr}
              </span>
            </div>
          </div>

          {/* ── Badge overlay — slides up on hover ────────────── */}
          {badges.length > 0 && (
            <div
              className="absolute left-0 top-0 flex flex-wrap gap-1 p-2.5 transition-all duration-300"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(-6px)",
              }}
            >
              {badges.map(({ tag, style }) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium shadow-sm"
                  style={{
                    backgroundColor: style.bg,
                    color: style.color,
                    border: `1px solid ${style.dot}33`,
                    fontFamily: "var(--font-nobel)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: style.dot }}
                  />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* ── Quick Add to Cart — slides up on hover ─────────── */}
      {showATC && (
        <div
          className="absolute bottom-[52px] left-0 w-full px-3 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <QuickAddButton product={product} />
        </div>
      )}
    </div>
  );
}
