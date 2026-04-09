/**
 * NutritionBadges
 * ───────────────────────────────────────────────────────────────
 * Displays nutrition / wellness badges on a product page.
 *
 * HOW TO ADD / REMOVE BADGES ON A PRODUCT:
 *   1. Open Shopify Admin → Products → [product] → Tags
 *   2. Add or remove any of the tag names listed in BADGE_MAP below.
 *   3. Save. The badge appears/disappears automatically — no code change needed.
 *
 * HOW TO ADD A NEW BADGE TYPE (one-time, tell us and we'll do it):
 *   Add a new entry to BADGE_MAP with the tag text and desired colours.
 * ───────────────────────────────────────────────────────────────
 */

type BadgeStyle = { bg: string; color: string; dot: string };

const BADGE_MAP: Record<string, BadgeStyle> = {
  // ── Macronutrients ──────────────────────────────────────────
  "High Fiber":         { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  "High Fibre":         { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  "High Protein":       { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
  "Low Carb":           { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C" },
  "Low Calorie":        { bg: "#FEFCE8", color: "#854D0E", dot: "#EAB308" },
  "Low Fat":            { bg: "#FAFAF5", color: "#3F6212", dot: "#84CC16" },

  // ── Micronutrients ──────────────────────────────────────────
  "Rich in Iron":       { bg: "#FFF1F2", color: "#9F1239", dot: "#F43F5E" },
  "Rich in Calcium":    { bg: "#F0F9FF", color: "#0C4A6E", dot: "#38BDF8" },
  "Rich in Zinc":       { bg: "#F5F3FF", color: "#4C1D95", dot: "#8B5CF6" },
  "Rich in Magnesium":  { bg: "#F0FDF4", color: "#14532D", dot: "#22C55E" },
  "Rich in Potassium":  { bg: "#FDF4FF", color: "#701A75", dot: "#D946EF" },
  "Vitamin B Rich":     { bg: "#FFFBEB", color: "#78350F", dot: "#F59E0B" },
  "Omega Rich":         { bg: "#EFF6FF", color: "#1E3A8A", dot: "#60A5FA" },

  // ── Dietary / Lifestyle ─────────────────────────────────────
  "Gluten Free":        { bg: "#FFFBEB", color: "#92400E", dot: "#D97706" },
  "Vegan":              { bg: "#F0FDF4", color: "#166534", dot: "#4ADE80" },
  "Vegetarian":         { bg: "#F0FDF4", color: "#14532D", dot: "#86EFAC" },
  "Low GI":             { bg: "#F5F3FF", color: "#5B21B6", dot: "#A78BFA" },
  "Diabetic Friendly":  { bg: "#ECFDF5", color: "#064E3B", dot: "#34D399" },
  "Keto Friendly":      { bg: "#FFF7ED", color: "#7C2D12", dot: "#F97316" },
  "Heart Healthy":      { bg: "#FFF1F2", color: "#881337", dot: "#FB7185" },

  // ── Processing / Certification ──────────────────────────────
  "Sprouted":           { bg: "#F0FDF4", color: "#166534", dot: "#22C55E" },
  "Fermented":          { bg: "#FFF7ED", color: "#9A3412", dot: "#FB923C" },
  "Probiotic":          { bg: "#FDF4FF", color: "#6B21A8", dot: "#C084FC" },
  "Prebiotic":          { bg: "#F0FDF4", color: "#065F46", dot: "#6EE7B7" },
  "Cold Pressed":       { bg: "#EFF6FF", color: "#1E3A8A", dot: "#93C5FD" },
  "Stone Ground":       { bg: "#FAF5F0", color: "#78350F", dot: "#C4A882" },
  "Raw":                { bg: "#F0FDF4", color: "#14532D", dot: "#BBF7D0" },
  "Organic Certified":  { bg: "#ECFDF5", color: "#065F46", dot: "#10B981" },
  "Antioxidant Rich":   { bg: "#FDF4FF", color: "#701A75", dot: "#E879F9" },
  "No Added Sugar":     { bg: "#FFFBEB", color: "#854D0E", dot: "#FDE047" },
  "No Preservatives":   { bg: "#F0FDF4", color: "#166534", dot: "#86EFAC" },
  "Traditionally Processed": { bg: "#FAF5F0", color: "#92400E", dot: "#C4A882" },
};

export function NutritionBadges({ tags }: { tags: string[] }) {
  const badges = tags
    .map((tag) => ({ tag, style: BADGE_MAP[tag] }))
    .filter((b) => b.style != null) as { tag: string; style: BadgeStyle }[];

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map(({ tag, style }) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{
            backgroundColor: style.bg,
            color: style.color,
            fontFamily: "var(--font-nobel)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: style.dot }}
          />
          {tag}
        </span>
      ))}
    </div>
  );
}
