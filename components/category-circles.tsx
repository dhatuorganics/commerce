import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Sprouted Flours",
    handle: "sprouted-flours",
    image: "https://images.unsplash.com/photo-1601343027887-ea83648bc320?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Artisan flour and dough",
  },
  {
    label: "Nut Butters",
    handle: "nut-butters",
    image: "https://images.unsplash.com/photo-1508088375255-38311cbd66c3?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Creamy nut butter",
  },
  {
    label: "Millets",
    handle: "millets",
    image: "https://images.unsplash.com/photo-1518795714924-e76a4cadd99a?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Ancient millet grains",
  },
  {
    label: "Spices",
    handle: "spices",
    image: "https://images.unsplash.com/photo-1574586595680-e7388293c9bb?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Colourful spice bowls",
  },
  {
    label: "Herbal Supplements",
    handle: "herbal-supplements",
    image: "https://images.unsplash.com/photo-1594134858547-8b126843389e?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Dried herbs and botanicals",
  },
  {
    label: "Oils & Ghee",
    handle: "oils-ghee",
    image: "https://images.unsplash.com/photo-1491833167315-f2f6c7c5deab?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Golden oils and ghee",
  },
  {
    label: "Rice",
    handle: "rice",
    image: "https://images.unsplash.com/photo-1630572182999-f1e5bc8557eb?w=400&h=400&fit=crop&auto=format&q=80",
    alt: "Pure white rice grains",
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

      <div className="flex gap-6 px-8 md:justify-center md:px-12 min-w-max md:min-w-0">
        {categories.map((cat) => (
          <Link
            key={cat.handle}
            href={`/search/${cat.handle}`}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Circle image */}
            <div
              className="relative h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105"
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
                sizes="112px"
              />
              {/* Subtle gold overlay on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #CC996615, #66999915)" }}
              />
            </div>

            {/* Label */}
            <span
              className="max-w-[90px] text-center text-[11px] leading-tight font-medium tracking-wide transition-colors group-hover:text-[#CC9966]"
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
