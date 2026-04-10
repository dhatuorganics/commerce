"use client";

import { usePathname } from "next/navigation";

/* ─── Collection metadata ──────────────────────────────── */

type CollectionMeta = {
  title: string;
  eyebrow: string;
  line1: string;
  line2: string;
  accent: string;
  symbol: string;
};

const COLLECTION_DATA: Record<string, CollectionMeta> = {
  "living-foods-sprouted-grains-flours": {
    title: "Living Foods — Sprouted Goodness",
    eyebrow: "Ancient Grain Wisdom",
    line1: "Sprouting unlocks dormant enzymes, amplifies bioavailable nutrients, and neutralises antinutrients — delivering grains your body absorbs with ease.",
    line2: "Higher protein, richer minerals, naturally sweeter, and deeply gut-friendly. Ancient intelligence in every bag.",
    accent: "#7A9E7E",
    symbol: "✦",
  },
  "activated-flours": {
    title: "Activated Flours",
    eyebrow: "Pre-Soaked · Enzyme-Activated",
    line1: "Activation through soaking and germination dramatically improves the nutritional profile of every grain — reducing phytic acid and unlocking minerals your body can actually use.",
    line2: "The intelligent choice for health-conscious baking, daily cooking, and anyone seeking more from their flour.",
    accent: "#C4A882",
    symbol: "◈",
  },
  "activate-flours": {
    title: "Activated Flours",
    eyebrow: "Pre-Soaked · Enzyme-Activated",
    line1: "Activation through soaking and germination dramatically improves the nutritional profile of every grain — reducing phytic acid and unlocking minerals your body can actually use.",
    line2: "The intelligent choice for health-conscious baking, daily cooking, and anyone seeking more from their flour.",
    accent: "#C4A882",
    symbol: "◈",
  },
  "millet": {
    title: "Heritage Millets — Ancient Grains Revived",
    eyebrow: "Climate-Resilient · Deeply Nourishing",
    line1: "Grown across India for millennia, millets are among the world's most nutritious and climate-resilient crops — gluten-free, mineral-dense, and naturally low-glycaemic.",
    line2: "Our certified organic millet range brings back nature's original supergrains, milled fresh and packaged without additives.",
    accent: "#D4A853",
    symbol: "◉",
  },
  "nut-seed-butters": {
    title: "Nut & Seed Butters",
    eyebrow: "Cold-Milled · Sugar-Free · Pure",
    line1: "Cold-milled and stone-ground without heat, sugar, or additives — every natural oil, enzyme, and nutrient is preserved exactly as nature intended.",
    line2: "From peanut to almond to sesame tahini, each butter is certified organic, clean-labelled, and genuinely satisfying.",
    accent: "#C97A5E",
    symbol: "○",
  },
  "nuts-seeds": {
    title: "Nuts & Seeds",
    eyebrow: "Raw · Certified Organic",
    line1: "Sourced from certified organic farms and handled with minimal processing to preserve their full nutritional density — healthy fats, plant proteins, and trace minerals intact.",
    line2: "Snack clean, cook better, and nourish deeply with our range of premium organic nuts and seeds.",
    accent: "#8B7355",
    symbol: "◆",
  },
  "cold-pressed-oils-ghee": {
    title: "Cold-Pressed Oils & Ghee",
    eyebrow: "Wood-Pressed · Traditional Method",
    line1: "Wood-pressed at low temperatures using the traditional ghani method — preserving every natural fatty acid, antioxidant, and flavour compound that heat-refining destroys.",
    line2: "From groundnut to coconut to sesame, these are oils the way your grandparents made them. Honest, flavourful, nourishing.",
    accent: "#D4A853",
    symbol: "△",
  },
  "rice-is-life": {
    title: "Rice is Life — Heritage Varieties",
    eyebrow: "Heirloom · Organic · Traceable",
    line1: "India's extraordinary diversity of heritage rice varieties — each with its own nutritional profile, texture, aroma, and centuries of cultivation history.",
    line2: "Grown organically, handled minimally, and selected for varieties that deserve to be on every conscious kitchen's shelf.",
    accent: "#9B8FBB",
    symbol: "▷",
  },
  "spices-condiments": {
    title: "Spices & Condiments",
    eyebrow: "Single-Origin · Unadulterated",
    line1: "Sourced directly from certified organic farms across India — no blending from multiple origins, no additives, no artificial colouring or irradiation.",
    line2: "Each spice retains its true aroma, natural colour, and full potency. The difference is immediate, in taste and in health.",
    accent: "#C97A5E",
    symbol: "✺",
  },
  "health-supplements": {
    title: "Herbal Supplements",
    eyebrow: "Ayurvedic Formulations · Science-Backed",
    line1: "Built on centuries of plant wisdom and validated by modern nutritional science — each blend combines traditional Ayurvedic herbs with evidence-based efficacy.",
    line2: "Standardised, rigorously tested, and formulated for real bioavailability. Nourish, not just supplement.",
    accent: "#7A9E7E",
    symbol: "✿",
  },
  "natural-sweeteners": {
    title: "Natural Sweeteners",
    eyebrow: "Unrefined · Mineral-Rich",
    line1: "Sweetness that nourishes rather than depletes — from raw jaggery and coconut sugar to date syrup, each option is minimally processed and naturally rich in trace minerals.",
    line2: "A conscious alternative to refined sugar, designed for every sweet moment in your kitchen without compromise.",
    accent: "#D4A853",
    symbol: "♦",
  },
  "salt": {
    title: "Natural Salt",
    eyebrow: "Unprocessed · Mineral-Complete",
    line1: "Unrefined salt harvested from pristine natural sources — retaining its full mineral profile exactly as nature formed it, without the anti-caking agents of table salt.",
    line2: "From Himalayan pink to black salt to sea salt, each variety is selected for purity, mineral richness, and genuine flavour.",
    accent: "#6FA8C4",
    symbol: "◇",
  },
  "pickles": {
    title: "Organic Pickles",
    eyebrow: "Traditional · Fermented · Alive",
    line1: "Handcrafted with certified organic produce, cold-pressed oils, and time-honoured Indian recipes — no artificial colours, synthetic preservatives, or shortcuts.",
    line2: "Fermented and flavourful, these pickles carry the full tradition of Indian condiment culture — and the gut health benefits of live fermentation.",
    accent: "#7A9E7E",
    symbol: "⬡",
  },
  "baby-foods": {
    title: "Baby Foods",
    eyebrow: "Pure · Gentle · Certified Organic",
    line1: "Formulated for the most important years of nutrition — every ingredient certified organic, every process free from chemicals, and every recipe built around the delicate needs of growing bodies.",
    line2: "Give your little one the cleanest possible start. No compromises, no additives, no exceptions.",
    accent: "#A8C4A0",
    symbol: "❋",
  },
  "fresh-produce": {
    title: "Fresh Organic Produce",
    eyebrow: "Bangalore · Mysore · Farm-Direct",
    line1: "Certified organic vegetables, fruits, and greens harvested fresh and delivered to your door — traceable to the certified farm, free from synthetic inputs and cold-chain chemicals.",
    line2: "Available locally in Bangalore and Mysore because freshness is the one thing that cannot be packaged or shipped from far away.",
    accent: "#7A9E7E",
    symbol: "✿",
  },
  "dals-pulses-flours": {
    title: "Dals, Pulses & Flours",
    eyebrow: "Protein-Rich · Certified Organic",
    line1: "The backbone of Indian nutrition — our certified organic dals, pulses, and traditional flours are sourced from single-origin farms and processed with zero synthetic inputs.",
    line2: "Clean, honest, and deeply familiar. The daily nourishment your kitchen has always known, now with the integrity it deserves.",
    accent: "#C4A882",
    symbol: "⬡",
  },
  "ready-to-cook": {
    title: "Ready to Cook",
    eyebrow: "Quick · Wholesome · Organic",
    line1: "Certified organic, traditionally prepared meal kits and mixes for when time is short but your standards aren't — every ingredient clean, every blend built on real food.",
    line2: "Wholesome cooking without the compromise. Organic convenience, the Dhatu way.",
    accent: "#C97A5E",
    symbol: "△",
  },
  "wellness-drink-blends": {
    title: "Wellness Drink Blends",
    eyebrow: "Ayurvedic · Functional · Balanced",
    line1: "Functional blends designed around Ayurvedic principles — combining adaptogens, herbs, and certified organic ingredients to support immunity, energy, and daily vitality.",
    line2: "Each blend is a small ritual of self-care. Drink your way to balance, one cup at a time.",
    accent: "#9B8FBB",
    symbol: "◎",
  },
  "everyday-essentials": {
    title: "Daily Essentials",
    eyebrow: "Stock Your Pantry",
    line1: "The organic staples every conscious kitchen needs — curated for daily use and built on the same quality standards as every Dhatu product.",
    line2: "Pure, certified, and dependable. The essentials your household deserves.",
    accent: "#CC9966",
    symbol: "◉",
  },
  "best-selling-products": {
    title: "Best Selling Products",
    eyebrow: "Customer Favourites",
    line1: "Our most loved products — chosen by over 500,000 families who have made Dhatu a part of their daily ritual.",
    line2: "Certified organic, traditionally processed, and proven by the most honest judges of all: our customers.",
    accent: "#CC9966",
    symbol: "✦",
  },
  "featured-products": {
    title: "Featured Products",
    eyebrow: "Handpicked for You",
    line1: "A curated selection of Dhatu's finest — each product chosen for its exceptional quality, unique nutritional value, and the story behind it.",
    line2: "Discover something new, or revisit a trusted favourite. Either way, certified organic, always.",
    accent: "#CC9966",
    symbol: "◈",
  },
};

/* ─── Artwork SVG ──────────────────────────────────────── */

function GeometricArt({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-auto opacity-[0.07]"
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric circles — right-anchored */}
      <circle cx="420" cy="150" r="220" stroke={accent} strokeWidth="0.8" />
      <circle cx="420" cy="150" r="170" stroke={accent} strokeWidth="0.6" />
      <circle cx="420" cy="150" r="120" stroke={accent} strokeWidth="0.8" />
      <circle cx="420" cy="150" r="75" stroke={accent} strokeWidth="0.6" />
      <circle cx="420" cy="150" r="35" stroke={accent} strokeWidth="1" />
      {/* Cross lines through center */}
      <line x1="420" y1="0" x2="420" y2="300" stroke={accent} strokeWidth="0.5" />
      <line x1="200" y1="150" x2="500" y2="150" stroke={accent} strokeWidth="0.5" />
      {/* Diagonal */}
      <line x1="265" y1="0" x2="500" y2="235" stroke={accent} strokeWidth="0.4" />
      <line x1="265" y1="300" x2="500" y2="65" stroke={accent} strokeWidth="0.4" />
      {/* Small dot grid top-left area */}
      {[0,1,2,3,4,5].map(col =>
        [0,1,2,3,4].map(row => (
          <circle
            key={`${col}-${row}`}
            cx={30 + col * 30}
            cy={30 + row * 30}
            r="1.2"
            fill={accent}
          />
        ))
      )}
    </svg>
  );
}

/* ─── Banner ───────────────────────────────────────────── */

export function CollectionBanner() {
  const pathname = usePathname();

  // Extract collection handle from path like /search/living-foods-...
  const parts = pathname.split("/search/");
  const handle = parts.length > 1 ? parts[1]?.split("?")[0] : null;

  if (!handle) return null;

  const meta = COLLECTION_DATA[handle];
  if (!meta) return null;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#1A1A1A",
        minHeight: "200px",
      }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Geometric SVG artwork */}
      <GeometricArt accent={meta.accent} />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ backgroundColor: meta.accent, opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-8 py-12 md:px-16 md:py-14">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span style={{ color: meta.accent, fontSize: "18px" }}>{meta.symbol}</span>
          <span
            className="text-[9px] uppercase tracking-[0.55em]"
            style={{ color: meta.accent, fontFamily: "var(--font-nobel)" }}
          >
            {meta.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-5 text-3xl leading-tight md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
        >
          {meta.title}
        </h1>

        {/* Two sentences */}
        <div
          className="max-w-2xl space-y-2"
          style={{ fontFamily: "var(--font-nobel)" }}
        >
          <p className="text-sm leading-7" style={{ color: "rgba(250,247,242,0.65)" }}>
            {meta.line1}
          </p>
          <p className="text-sm leading-7" style={{ color: "rgba(250,247,242,0.45)" }}>
            {meta.line2}
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-8"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(26,26,26,0.4))" }}
      />
    </section>
  );
}
