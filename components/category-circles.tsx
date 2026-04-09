import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Sprouted Flours",
    handle: "living-foods-sprouted-grains-flours",
    image: "https://images.unsplash.com/photo-1714842981153-ffeaf74e7a1a?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "A bowl of flour",
  },
  {
    label: "Nut Butters",
    handle: "nut-seed-butters",
    image: "https://images.unsplash.com/photo-1564988208558-9270de7c5848?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Peanut butter with a black spoon",
  },
  {
    label: "Millets",
    handle: "millet",
    image: "https://images.unsplash.com/photo-1768729341679-8a2da8e5b5fa?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Close-up of dried millet seeds",
  },
  {
    label: "Spices",
    handle: "spices-condiments",
    image: "https://images.unsplash.com/photo-1699210260087-347545f89de6?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Colourful spice powders in bowls",
  },
  {
    label: "Herbal Supplements",
    handle: "health-supplements",
    image: "https://images.unsplash.com/photo-1768700439764-9ec0ba31ae75?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Mortar and pestle with herbal ingredients",
  },
  {
    label: "Oils & Ghee",
    handle: "cold-pressed-oils-ghee",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Glass oil bottle",
  },
  {
    label: "Rice",
    handle: "rice-is-life",
    image: "https://images.unsplash.com/photo-1705147271933-5c7052f15a90?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "A bowl of white rice",
  },
];

export default function CategoryCircles() {
  return (
    <section className="w-full overflow-x-auto py-12" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Section header */}
      <div className="mb-8 text-center">
        <p
          className="mb-1 text-xs uppercase tracking-[0.3em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Explore
        </p>
        <h2
          className="text-xl md:text-2xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
        >
          Shop by Category
        </h2>
      </div>

      <div className="flex gap-8 px-8 md:justify-center md:px-12 min-w-max md:min-w-0">
        {categories.map((cat) => (
          <Link
            key={cat.handle}
            href={`/search/${cat.handle}`}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Circle image */}
            <div
              className="relative h-32 w-32 md:h-36 md:w-36 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: "0 4px 20px rgba(204,153,102,0.15)",
                border: "2.5px solid transparent",
                background: "linear-gradient(#FAF7F2, #FAF7F2) padding-box, linear-gradient(135deg, #CC9966, #66999980) border-box",
              }}
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="144px"
              />
              {/* Subtle overlay on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #CC996615, #66999915)" }}
              />
            </div>

            {/* Label */}
            <span
              className="max-w-[120px] text-center text-sm leading-tight font-medium tracking-wide transition-colors group-hover:text-[#CC9966]"
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
