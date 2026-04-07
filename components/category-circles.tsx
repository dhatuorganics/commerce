import Link from "next/link";

const categories = [
  { label: "Sprouted Flours", handle: "sprouted-flours", emoji: "🌾" },
  { label: "Nut Butters", handle: "nut-butters", emoji: "🥜" },
  { label: "Millets", handle: "millets", emoji: "🌿" },
  { label: "Spices", handle: "spices", emoji: "🌶️" },
  { label: "Herbal Supplements", handle: "herbal-supplements", emoji: "🌱" },
  { label: "Oils & Ghee", handle: "oils-ghee", emoji: "🫙" },
  { label: "Rice", handle: "rice", emoji: "🍚" },
];

export default function CategoryCircles() {
  return (
    <section className="w-full overflow-x-auto py-10" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Section label */}
      <p
        className="mb-6 text-center text-xs uppercase tracking-[0.3em]"
        style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
      >
        Shop by Category
      </p>

      <div className="flex gap-8 px-8 md:justify-center md:px-12 min-w-max md:min-w-0">
        {categories.map((cat) => (
          <Link
            key={cat.handle}
            href={`/search/${cat.handle}`}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Circle */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                borderColor: "#CC9966",
                backgroundColor: "#FAF7F2",
                boxShadow: "0 0 0 0 #CC996640",
              }}
            >
              {cat.emoji}
            </div>
            {/* Label */}
            <span
              className="max-w-[80px] text-center text-xs leading-tight font-medium tracking-wide transition-colors group-hover:text-[#CC9966]"
              style={{
                fontFamily: "var(--font-nobel)",
                color: "#2C2C2C",
              }}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
