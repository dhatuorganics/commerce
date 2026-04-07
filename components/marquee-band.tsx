const items = [
  "Zero Preservatives Used",
  "Small Batch Processing",
  "Clean Ingredients Only",
  "No Refined Inputs",
  "Zero Preservatives Used",
  "Small Batch Processing",
  "Clean Ingredients Only",
  "No Refined Inputs",
  "Zero Preservatives Used",
  "Small Batch Processing",
  "Clean Ingredients Only",
  "No Refined Inputs",
];

const separator = (
  <span
    className="mx-6 inline-block h-1 w-1 rounded-full flex-shrink-0"
    style={{ backgroundColor: "#CC9966" }}
  />
);

export default function MarqueeBand() {
  return (
    <section
      className="w-full overflow-hidden py-3"
      style={{ backgroundColor: "#2C2C2C" }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-xs uppercase tracking-[0.25em] whitespace-nowrap"
              style={{
                fontFamily: "var(--font-nobel)",
                color: "#FAF7F2",
              }}
            >
              {item}
            </span>
            {separator}
          </span>
        ))}
      </div>
    </section>
  );
}
