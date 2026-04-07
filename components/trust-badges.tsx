const badges = [
  { icon: "🏅", label: "Certified & Authentic" },
  { icon: "🔬", label: "Science Backed Nutrition" },
  { icon: "🏺", label: "Traditional Techniques" },
  { icon: "🌱", label: "Farm to Table" },
  { icon: "♻️", label: "Sustainably Sourced" },
];

export default function TrustBadges() {
  return (
    <section
      className="w-full border-y py-5"
      style={{
        backgroundColor: "#FAF7F2",
        borderColor: "#CC996630",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-6 px-6 md:gap-10">
        {badges.map((badge, i) => (
          <div key={badge.label} className="flex items-center gap-2">
            <span className="text-lg">{badge.icon}</span>
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "#2C2C2C", fontFamily: "var(--font-nobel)" }}
            >
              {badge.label}
            </span>
            {/* Divider — not after last item */}
            {i < badges.length - 1 && (
              <span
                className="ml-6 hidden h-3 w-px md:block"
                style={{ backgroundColor: "#CC996650" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
