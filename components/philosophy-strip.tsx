// Five Panchabhutas — the philosophical foundation of Dhatu Organics
const elements = [
  {
    symbol: "🌍",
    sanskrit: "Prithvi",
    element: "Earth",
    title: "Purity",
    color: "#CC9966",
    description:
      "Uncompromising commitment to organic, natural ingredients — free from chemicals, additives, and preservatives. Grown in harmony with the soil.",
  },
  {
    symbol: "💧",
    sanskrit: "Jala",
    element: "Water",
    title: "Nourishment",
    color: "#99CCFF",
    description:
      "Life-giving nutrition in every product. We honour the ancient knowledge of food as medicine — deeply nourishing at a cellular level.",
  },
  {
    symbol: "🔥",
    sanskrit: "Agni",
    element: "Fire",
    title: "Transformation",
    color: "#CC9966",
    description:
      "Science-backed nutrition meets traditional sprouting and fermentation techniques — transforming raw ingredients into bioavailable superfoods.",
  },
  {
    symbol: "🌬️",
    sanskrit: "Vayu",
    element: "Air",
    title: "Balance",
    color: "#669999",
    description:
      "Harmonising Ayurvedic wisdom with modern wellness needs. Tradition re-imagined for the conscious lifestyle of today.",
  },
  {
    symbol: "✨",
    sanskrit: "Akasha",
    element: "Ether",
    title: "Consciousness",
    color: "#999999",
    description:
      "Beyond the physical — a deeper awareness of what we consume, how it is grown, and its impact on people, planet, and future generations.",
  },
];

export default function PhilosophyStrip() {
  return (
    <section
      className="w-full py-16 px-6 md:px-12"
      style={{ backgroundColor: "#2C2C2C" }}
    >
      {/* Heading */}
      <div className="mb-12 text-center">
        <span
          className="mb-3 inline-block text-xs uppercase tracking-[0.3em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Our Philosophy
        </span>
        <h2
          className="text-3xl md:text-4xl"
          style={{
            fontFamily: "var(--font-bronela)",
            color: "#FAF7F2",
          }}
        >
          The Five Panchabhutas
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed"
          style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
        >
          At Dhatu Organics, we blend traditional Ayurvedic wisdom with modern science
          to create pure, organic, and sustainable products — guided by the five
          elements that sustain all life.
        </p>
      </div>

      {/* Elements grid — 5 columns on desktop, 2 on mobile */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
        {elements.map((el) => (
          <div
            key={el.element}
            className="flex flex-col items-center rounded-2xl p-5 text-center transition-transform duration-200 hover:-translate-y-1 last:col-span-2 last:md:col-span-1"
            style={{ backgroundColor: "#383838" }}
          >
            {/* Symbol circle */}
            <div
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
              style={{ backgroundColor: `${el.color}20` }}
            >
              {el.symbol}
            </div>

            {/* Sanskrit name */}
            <span
              className="mb-0.5 text-[10px] uppercase tracking-widest"
              style={{ color: el.color, fontFamily: "var(--font-nobel)" }}
            >
              {el.sanskrit}
            </span>

            {/* Element name */}
            <span
              className="mb-2 text-[11px] uppercase tracking-wider"
              style={{ color: "#FAF7F280", fontFamily: "var(--font-nobel)" }}
            >
              {el.element}
            </span>

            {/* Title */}
            <h3
              className="mb-3 text-base md:text-lg"
              style={{
                fontFamily: "var(--font-bronela)",
                color: "#FAF7F2",
              }}
            >
              {el.title}
            </h3>

            {/* Divider */}
            <div
              className="mb-3 h-[1px] w-8"
              style={{ backgroundColor: el.color }}
            />

            {/* Description */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
            >
              {el.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
