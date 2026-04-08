const badges = [
  {
    value: "14",
    unit: "Years",
    label: "of Experience",
    icon: "◎",
  },
  {
    value: "200+",
    unit: "Organic",
    label: "Products",
    icon: "◎",
  },
  {
    value: "100%",
    unit: "Certified",
    label: "Organic",
    icon: "◎",
  },
  {
    value: "500K+",
    unit: "Customers",
    label: "Who Trust Us",
    icon: "◎",
  },
];

export default function BadgeBand() {
  return (
    <section
      className="w-full py-10"
      style={{
        background: "linear-gradient(135deg, #FFFDF9 0%, #FAF7F2 50%, #FFFDF9 100%)",
        borderTop: "1px solid #CC996618",
        borderBottom: "1px solid #CC996618",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x"
          style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}
        >
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
              style={{
                borderColor: "#CC996618",
              }}
            >
              {/* Top accent line */}
              <div
                className="mb-4 h-px w-8"
                style={{
                  background: "linear-gradient(to right, transparent, #CC9966, transparent)",
                }}
              />

              {/* Value */}
              <span
                className="text-3xl md:text-4xl font-light tracking-tight"
                style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
              >
                {badge.value}
              </span>

              {/* Unit + label */}
              <div className="mt-1.5 flex flex-col items-center">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                >
                  {badge.unit}
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
                >
                  {badge.label}
                </span>
              </div>

              {/* Bottom accent dot */}
              <div
                className="mt-4 h-1 w-1 rounded-full"
                style={{ backgroundColor: "#CC996640" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
