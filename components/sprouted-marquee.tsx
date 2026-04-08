import Link from "next/link";

const flours = [
  { name: "Sprouted Ragi Flour",  handle: "sprouted-ragi-flour" },
  { name: "Sprouted Wheat Flour", handle: "sprouted-wheat-flour" },
  { name: "Sprouted Mung Flour",  handle: "sprouted-mung-flour" },
  { name: "Sprouted Bajra Flour", handle: "sprouted-bajra-flour" },
  { name: "Sprouted Jowar Flour", handle: "sprouted-jowar-flour" },
];

// Duplicate for seamless loop
const items = [...flours, ...flours, ...flours];

export default function SproutedMarquee() {
  return (
    <div
      className="w-full overflow-hidden py-4"
      style={{ backgroundColor: "#2C2C2C", borderTop: "1px solid #CC996630", borderBottom: "1px solid #CC996630" }}
    >
      <div
        className="flex animate-carousel gap-0"
        style={{ width: "max-content" }}
      >
        {items.map((flour, i) => (
          <Link
            key={`${flour.handle}-${i}`}
            href={`/${flour.handle}`}
            className="group flex flex-none items-center gap-3 px-6 transition-opacity hover:opacity-70"
          >
            {/* Sprouting leaf dot */}
            <span
              className="flex-shrink-0 text-xs transition-transform duration-300 group-hover:scale-125"
              style={{ color: "#669999" }}
            >
              ✦
            </span>

            <span
              className="whitespace-nowrap text-sm font-medium tracking-widest uppercase"
              style={{ fontFamily: "var(--font-nobel)", color: "#FAF7F2" }}
            >
              {flour.name}
            </span>

            {/* Separator dot */}
            <span
              className="flex-shrink-0 text-[8px]"
              style={{ color: "#CC9966" }}
            >
              ◆
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
