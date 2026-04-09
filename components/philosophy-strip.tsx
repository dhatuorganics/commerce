// Five Panchabhutas — the philosophical foundation of Dhatu Organics
const elements = [
  {
    symbol: "◈",
    sanskrit: "Prithvi",
    element: "Earth",
    title: "Purity",
    accent: "#C4A882",   // warm sand
    bg: "#FAF8F5",
    border: "#EDE8E1",
    description:
      "Uncompromising organic sourcing — free from chemicals and additives, grown in harmony with the soil.",
  },
  {
    symbol: "◉",
    sanskrit: "Jala",
    element: "Water",
    title: "Nourishment",
    accent: "#6FA8C4",   // soft blue
    bg: "#F4F9FC",
    border: "#DDF0F5",
    description:
      "Ancient knowledge of food as medicine — deeply nourishing every cell with living nutrition.",
  },
  {
    symbol: "△",
    sanskrit: "Agni",
    element: "Fire",
    title: "Transformation",
    accent: "#C97A5E",   // terracotta
    bg: "#FDF8F5",
    border: "#F3E5DF",
    description:
      "Traditional sprouting and fermentation — transforming raw ingredients into bioavailable superfoods.",
  },
  {
    symbol: "◎",
    sanskrit: "Vayu",
    element: "Air",
    title: "Balance",
    accent: "#7A9E7E",   // sage green
    bg: "#F5FAF6",
    border: "#DFF0E2",
    description:
      "Ayurvedic wisdom harmonised with modern wellness — tradition re-imagined for conscious living.",
  },
  {
    symbol: "○",
    sanskrit: "Akasha",
    element: "Ether",
    title: "Consciousness",
    accent: "#9B8FBB",   // soft violet
    bg: "#F8F7FC",
    border: "#E8E5F2",
    description:
      "A deeper awareness of what we consume — and its impact on people, planet, and future generations.",
  },
];

export default function PhilosophyStrip() {
  return (
    <section className="w-full py-12 px-6 md:px-12" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Heading */}
      <div className="mb-8 text-center">
        <span
          className="mb-2 inline-block text-[10px] uppercase tracking-[0.35em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Our Philosophy
        </span>
        <h2
          className="text-2xl md:text-3xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
        >
          The Five Panchabhutas
        </h2>
      </div>

      {/* Elements grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {elements.map((el) => (
          <div
            key={el.element}
            className="flex flex-col rounded-xl p-4 last:col-span-2 last:md:col-span-1"
            style={{
              backgroundColor: el.bg,
              border: `1px solid ${el.border}`,
            }}
          >
            {/* Symbol + Sanskrit inline */}
            <div className="mb-3 flex items-center gap-2">
              <span
                className="text-base leading-none"
                style={{ color: el.accent, fontFamily: "Georgia, serif" }}
              >
                {el.symbol}
              </span>
              <div>
                <span
                  className="block text-[9px] uppercase tracking-widest"
                  style={{ color: el.accent, fontFamily: "var(--font-nobel)" }}
                >
                  {el.sanskrit}
                </span>
                <span
                  className="block text-[9px] uppercase tracking-wider"
                  style={{ color: "#AAAAAA", fontFamily: "var(--font-nobel)" }}
                >
                  {el.element}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="mb-2 text-sm md:text-base"
              style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
            >
              {el.title}
            </h3>

            {/* Thin accent rule */}
            <div
              className="mb-2 h-px w-6"
              style={{ backgroundColor: el.accent }}
            />

            {/* Description */}
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: "#777777", fontFamily: "var(--font-nobel)" }}
            >
              {el.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
