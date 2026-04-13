import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Sprouted Flours",
    handle: "living-foods-sprouted-grains-flours",
    image: "/categories/sprouted-flours.png",
    alt: "Dhatu Organics sprouted flours",
  },
  {
    label: "Nut Butters",
    handle: "nut-seed-butters",
    image: "/categories/nut-butters.png",
    alt: "Dhatu Organics nut and seed butters",
  },
  {
    label: "Millets",
    handle: "millet",
    image: "/categories/millets.png",
    alt: "Dhatu Organics organic millets",
  },
  {
    label: "Spices",
    handle: "spices-condiments",
    image: "/categories/spices.png",
    alt: "Dhatu Organics spices and condiments",
  },
  {
    label: "Herbal Supplements",
    handle: "health-supplements",
    image: "/categories/herbal-supplements.png",
    alt: "Dhatu Organics herbal supplements",
  },
  {
    label: "Oils & Ghee",
    handle: "cold-pressed-oils-ghee",
    image: "/categories/oil-ghee.png",
    alt: "Dhatu Organics cold-pressed oils and ghee",
  },
  {
    label: "Rice",
    handle: "rice-is-life",
    image: "/categories/rice.png",
    alt: "Dhatu Organics heirloom rice varieties",
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
