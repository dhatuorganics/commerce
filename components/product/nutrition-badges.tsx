"use client";

import { useEffect, useRef, useState } from "react";

type BadgeStyle = { bg: string; color: string; dot: string; tip: string };

/**
 * BADGE MAP — add the tag name exactly in Shopify Admin → Products → Tags.
 * To add a new badge: add an entry here + tag the product in Shopify. Done.
 */
const BADGE_MAP: Record<string, BadgeStyle> = {
  // ── Macronutrients ──────────────────────────────────────────
  "High Fiber":              { bg: "#ECFDF5", color: "#065F46", dot: "#10B981", tip: "Rich in dietary fibre that supports digestion and keeps you full longer." },
  "High Fibre":              { bg: "#ECFDF5", color: "#065F46", dot: "#10B981", tip: "Rich in dietary fibre that supports digestion and keeps you full longer." },
  "High Protein":            { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6", tip: "Excellent source of plant protein for muscle repair and sustained energy." },
  "Low Carb":                { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C", tip: "Lower net carbohydrates — suitable for low-carb and keto lifestyles." },
  "Low Calorie":             { bg: "#FEFCE8", color: "#854D0E", dot: "#EAB308", tip: "Lighter caloric density — supports weight management goals." },
  "Low Fat":                 { bg: "#FAFAF5", color: "#3F6212", dot: "#84CC16", tip: "Naturally lower in fat for heart-conscious eating." },
  // ── Micronutrients ──────────────────────────────────────────
  "Rich in Iron":            { bg: "#FFF1F2", color: "#9F1239", dot: "#F43F5E", tip: "High in iron — vital for blood health and combating fatigue." },
  "Rich in Calcium":         { bg: "#F0F9FF", color: "#0C4A6E", dot: "#38BDF8", tip: "Good source of calcium for strong bones and teeth." },
  "Rich in Zinc":            { bg: "#F5F3FF", color: "#4C1D95", dot: "#8B5CF6", tip: "Contains zinc to support immunity and skin health." },
  "Rich in Magnesium":       { bg: "#F0FDF4", color: "#14532D", dot: "#22C55E", tip: "Magnesium-rich — supports nerve function, sleep, and muscle relaxation." },
  "Rich in Potassium":       { bg: "#FDF4FF", color: "#701A75", dot: "#D946EF", tip: "High potassium content — supports heart health and blood pressure." },
  "Vitamin B Rich":          { bg: "#FFFBEB", color: "#78350F", dot: "#F59E0B", tip: "Rich in B vitamins — essential for energy metabolism and brain function." },
  "Omega Rich":              { bg: "#EFF6FF", color: "#1E3A8A", dot: "#60A5FA", tip: "High in Omega-3 & Omega-6 fatty acids for heart and brain health." },
  // ── Dietary / Lifestyle ─────────────────────────────────────
  "Gluten Free":             { bg: "#FFFBEB", color: "#92400E", dot: "#D97706", tip: "Naturally free from gluten — safe for celiac and gluten-sensitive diets." },
  "Vegan":                   { bg: "#F0FDF4", color: "#166534", dot: "#4ADE80", tip: "100% plant-based — no animal products of any kind." },
  "Vegetarian":              { bg: "#F0FDF4", color: "#14532D", dot: "#86EFAC", tip: "Free from meat and fish — suitable for vegetarian diets." },
  "Low GI":                  { bg: "#F5F3FF", color: "#5B21B6", dot: "#A78BFA", tip: "Low glycaemic index — releases energy slowly, avoiding blood sugar spikes." },
  "Diabetic Friendly":       { bg: "#ECFDF5", color: "#064E3B", dot: "#34D399", tip: "Formulated to support stable blood sugar levels." },
  "Keto Friendly":           { bg: "#FFF7ED", color: "#7C2D12", dot: "#F97316", tip: "High fat, low net carb — fits ketogenic nutritional guidelines." },
  "Heart Healthy":           { bg: "#FFF1F2", color: "#881337", dot: "#FB7185", tip: "Supports cardiovascular health through its natural nutrient profile." },
  // ── Processing / Certification ──────────────────────────────
  "Sprouted":                { bg: "#F0FDF4", color: "#166534", dot: "#22C55E", tip: "Grains/legumes are sprouted before processing — increases nutrient bioavailability and reduces anti-nutrients." },
  "Fermented":               { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C", tip: "Naturally fermented to enhance flavour, digestibility, and probiotic content." },
  "Probiotic":               { bg: "#FDF4FF", color: "#6B21A8", dot: "#C084FC", tip: "Contains live cultures that nourish gut microbiome health." },
  "Prebiotic":               { bg: "#F0FDF4", color: "#065F46", dot: "#6EE7B7", tip: "Feeds beneficial gut bacteria — the foundation of digestive wellness." },
  "Cold Pressed":            { bg: "#EFF6FF", color: "#1E3A8A", dot: "#93C5FD", tip: "Extracted without heat — retains all natural nutrients and flavour." },
  "Stone Ground":            { bg: "#FAF5F0", color: "#78350F", dot: "#C4A882", tip: "Milled on traditional stone — preserves bran, germ, and nutrients." },
  "Raw":                     { bg: "#F0FDF4", color: "#14532D", dot: "#BBF7D0", tip: "Unheated and unprocessed — all enzymes and nutrients intact." },
  "Organic Certified":       { bg: "#ECFDF5", color: "#065F46", dot: "#10B981", tip: "Certified organic — grown without synthetic pesticides or fertilisers." },
  "Antioxidant Rich":        { bg: "#FDF4FF", color: "#701A75", dot: "#E879F9", tip: "High antioxidant content — fights free radicals and supports cellular health." },
  "No Added Sugar":          { bg: "#FFFBEB", color: "#854D0E", dot: "#FDE047", tip: "Zero added sugars — only naturally occurring sweetness from the ingredients." },
  "No Preservatives":        { bg: "#F0FDF4", color: "#166534", dot: "#86EFAC", tip: "Made without any artificial preservatives — clean and pure." },
  "Traditionally Processed": { bg: "#FAF5F0", color: "#92400E", dot: "#C4A882", tip: "Crafted using age-old methods passed down through generations." },
};

function Badge({ tag, style }: { tag: string; style: BadgeStyle }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close tooltip on outside click
  useEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [show]);

  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="badge-pill inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm active:scale-100"
        style={{
          backgroundColor: style.bg,
          color: style.color,
          fontFamily: "var(--font-nobel)",
          border: `1px solid ${style.dot}33`,
        }}
        aria-label={`${tag}: ${style.tip}`}
      >
        {/* Coloured dot */}
        <span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ backgroundColor: style.dot }}
        />
        {tag}
        {/* Info icon */}
        <svg
          viewBox="0 0 12 12"
          className="h-3 w-3 opacity-50"
          fill="currentColor"
        >
          <circle cx="6" cy="6" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="6" y="9" textAnchor="middle" fontSize="7" fontWeight="bold">i</text>
        </svg>
      </button>

      {/* Tooltip */}
      {show && (
        <span
          className="badge-tooltip pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 w-52 -translate-x-1/2 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed shadow-lg"
          style={{
            backgroundColor: "#2C2C2C",
            color: "#F5F0E8",
            fontFamily: "var(--font-nobel)",
          }}
          role="tooltip"
        >
          {/* Arrow */}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #2C2C2C",
              width: 0, height: 0,
            }}
          />
          <span className="font-semibold" style={{ color: style.dot }}>{tag}</span>
          <br />
          {style.tip}
        </span>
      )}
    </span>
  );
}

export function NutritionBadges({ tags }: { tags: string[] }) {
  const badges = tags
    .map((tag) => ({ tag, style: BADGE_MAP[tag] }))
    .filter((b) => b.style != null) as { tag: string; style: BadgeStyle }[];

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map(({ tag, style }, i) => (
        <span
          key={tag}
          className="badge-entry"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Badge tag={tag} style={style} />
        </span>
      ))}
    </div>
  );
}
