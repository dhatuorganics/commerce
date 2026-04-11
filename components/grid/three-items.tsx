import { ProductCard } from "components/product/product-card";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      {/* No h-full — aspect-square alone sets height from width; h-full conflicts when parent row height is auto */}
      <div className="relative aspect-square w-full">
        <ProductCard
          product={item}
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          showATC={false}
          labelPosition={size === "full" ? "center" : "bottom"}
        />
      </div>
    </div>
  );
}

/* ── Sprouting SVG art — decorative background ─────────────── */
function SproutingArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full"
    >
      {/* Subtle ground line */}
      <line x1="0" y1="185" x2="1200" y2="185" stroke="#CC996618" strokeWidth="1" />

      {/* ── Sprout cluster 1 (left) ── */}
      {/* Main stem */}
      <path d="M 160 185 Q 158 155 155 130 Q 153 110 158 90" stroke="#66996640" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Left leaf */}
      <path d="M 156 140 Q 130 120 118 100 Q 140 108 156 128" fill="#66996625" stroke="#66996635" strokeWidth="1"/>
      {/* Right leaf */}
      <path d="M 157 118 Q 185 100 195 78 Q 172 92 157 112" fill="#CC996618" stroke="#CC996628" strokeWidth="1"/>
      {/* Tip curl */}
      <path d="M 158 90 Q 155 75 163 65 Q 168 58 162 52" stroke="#66996635" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* ── Sprout cluster 2 (center-left) ── */}
      <path d="M 390 185 Q 388 158 386 135 Q 384 112 389 88" stroke="#CC996630" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 387 142 Q 362 124 350 104 Q 372 112 387 132" fill="#66996620" stroke="#66996630" strokeWidth="1"/>
      <path d="M 388 115 Q 415 97 424 76 Q 402 90 388 110" fill="#CC996615" stroke="#CC996625" strokeWidth="1"/>
      <path d="M 389 88 Q 386 72 394 62" stroke="#66996630" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Tiny secondary sprout */}
      <path d="M 415 185 Q 414 168 416 152" stroke="#66996625" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M 415 165 Q 404 158 400 150 Q 412 155 415 163" fill="#66996618" stroke="none"/>

      {/* ── Sprout cluster 3 (center) ── */}
      <path d="M 620 185 Q 618 150 615 118 Q 612 92 618 68" stroke="#66996638" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 616 130 Q 586 108 572 84 Q 598 96 616 120" fill="#66996622" stroke="#66996632" strokeWidth="1"/>
      <path d="M 617 102 Q 650 82 662 56 Q 636 74 617 96" fill="#CC996618" stroke="#CC996628" strokeWidth="1"/>
      <path d="M 618 68 Q 615 50 624 38 Q 630 28 622 20" stroke="#66996632" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Seed at base */}
      <ellipse cx="620" cy="187" rx="6" ry="3" fill="#CC996620"/>

      {/* ── Sprout cluster 4 (center-right) ── */}
      <path d="M 820 185 Q 818 162 816 140 Q 814 118 820 95" stroke="#CC996628" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 817 148 Q 793 130 782 110 Q 803 118 817 138" fill="#66996618" stroke="#66996628" strokeWidth="1"/>
      <path d="M 818 120 Q 845 102 854 82 Q 832 96 818 115" fill="#CC996615" stroke="#CC996622" strokeWidth="1"/>
      <path d="M 820 95 Q 818 80 826 70" stroke="#66996628" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* ── Sprout cluster 5 (right) ── */}
      <path d="M 1040 185 Q 1038 155 1035 128 Q 1032 105 1038 82" stroke="#66996635" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 1036 138 Q 1010 118 998 96 Q 1020 106 1036 128" fill="#66996822" stroke="#66996632" strokeWidth="1"/>
      <path d="M 1037 112 Q 1066 92 1076 68 Q 1052 84 1037 106" fill="#CC996818" stroke="#CC996828" strokeWidth="1"/>
      <path d="M 1038 82 Q 1035 65 1044 54 Q 1050 46 1044 40" stroke="#66996632" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="1040" cy="187" rx="5" ry="2.5" fill="#CC996818"/>

      {/* ── Scattered seeds & micro dots ── */}
      <circle cx="80" cy="188" r="2" fill="#CC996822"/>
      <circle cx="95" cy="185" r="1.5" fill="#66996820"/>
      <circle cx="280" cy="187" r="2.5" fill="#CC996818"/>
      <circle cx="295" cy="184" r="1.5" fill="#66996818"/>
      <circle cx="510" cy="188" r="2" fill="#CC996820"/>
      <circle cx="720" cy="187" r="2" fill="#66996820"/>
      <circle cx="900" cy="188" r="2.5" fill="#CC996818"/>
      <circle cx="1130" cy="187" r="2" fill="#66996820"/>
      <circle cx="1150" cy="185" r="1.5" fill="#CC996818"/>

      {/* ── Fine root wisps below ground ── */}
      <path d="M 160 185 Q 155 195 148 200" stroke="#CC996615" strokeWidth="1" fill="none"/>
      <path d="M 160 185 Q 162 197 168 203" stroke="#CC996615" strokeWidth="1" fill="none"/>
      <path d="M 620 185 Q 615 196 608 202" stroke="#CC996615" strokeWidth="1" fill="none"/>
      <path d="M 620 185 Q 624 197 630 204" stroke="#CC996615" strokeWidth="1" fill="none"/>
      <path d="M 1040 185 Q 1035 196 1028 202" stroke="#CC996615" strokeWidth="1" fill="none"/>
      <path d="M 1040 185 Q 1044 197 1050 203" stroke="#CC996615" strokeWidth="1" fill="none"/>
    </svg>
  );
}

export async function ThreeItemGrid() {
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <div style={{ backgroundColor: "#FAF7F2" }}>

      {/* ── Section header with sprouting art ─────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: "220px" }}>

        {/* Sprouting SVG background */}
        <SproutingArt />

        {/* Header content — centred above the art */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-6 text-center">

          {/* Eyebrow */}
          <span
            className="mb-3 inline-block rounded-full border px-5 py-1 text-[10px] uppercase tracking-[0.35em]"
            style={{
              borderColor: "#CC996640",
              color: "#CC9966",
              fontFamily: "var(--font-nobel)",
              backgroundColor: "#FAF7F2CC",
              backdropFilter: "blur(4px)",
            }}
          >
            Ancient Grain Wisdom
          </span>

          {/* Main heading */}
          <h2
            className="mb-4 text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            Living Food —{" "}
            <span style={{ color: "#CC9966" }}>The Sprouted Goodness</span>
          </h2>

          {/* Two-line benefit description */}
          <p
            className="max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "#666666", fontFamily: "var(--font-nobel)" }}
          >
            Sprouting unlocks dormant enzymes, amplifies bioavailable nutrients, and neutralises antinutrients —
            delivering grains your body absorbs with ease.
          </p>
          <p
            className="mt-1 max-w-xl text-xs md:text-sm leading-relaxed"
            style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
          >
            Higher protein · Richer minerals · Naturally sweeter · Gut-friendly — in every bag.
          </p>

          {/* Decorative gold rule */}
          <div
            className="mt-6 h-px w-16"
            style={{ background: "linear-gradient(to right, transparent, #CC9966, transparent)" }}
          />
        </div>
      </div>

      {/* ── Product grid ──────────────────────────────────── */}
      <section
        className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-8 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]"
      >
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </section>

    </div>
  );
}
