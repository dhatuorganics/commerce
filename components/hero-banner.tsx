import Image from "next/image";
import Link from "next/link";

const keywords = [
  { word: "Sprouted", desc: "for better digestion", color: "#CC9966" },
  { word: "Activated", desc: "for max bioavailability", color: "#669999" },
  { word: "Cold Milled", desc: "to preserve nutrients", color: "#CC9966" },
  { word: "Superior Nutrition", desc: "in every product", color: "#669999" },
];

const stats = [
  { value: "14", label: "Years of Organic\nExpertise" },
  { value: "200+", label: "Organic\nProducts" },
  { value: "0", label: "Preservatives\nAdded" },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "380px" }}>

      {/* Background image */}
      <Image
        src="/hero-banner.jpeg"
        alt="Dhatu Organics hero banner"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(44,44,44,0.82) 0%, rgba(44,44,44,0.65) 55%, rgba(44,44,44,0.35) 100%)",
        }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ backgroundColor: "#CC9966" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-16 py-10 gap-8">

        {/* LEFT — Main content */}
        <div className="flex-1 max-w-xl">
          {/* Eyebrow */}
          <span
            className="mb-4 inline-block rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.3em]"
            style={{ borderColor: "#CC996660", color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Organic &amp; Naturals · Since 2010
          </span>

          {/* Headline */}
          <h1
            className="mb-4 text-3xl leading-tight md:text-4xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
          >
            Purely Nourishing &amp;{" "}
            <span style={{ color: "#CC9966" }}>Wholesome</span>
          </h1>

          {/* Keyword badges */}
          <div className="mb-5 flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <div
                key={kw.word}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1"
                style={{
                  borderColor: `${kw.color}50`,
                  backgroundColor: `${kw.color}18`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: kw.color }}
                />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: kw.color, fontFamily: "var(--font-nobel)" }}
                >
                  {kw.word}
                </span>
                <span
                  className="hidden text-[10px] md:inline"
                  style={{ color: "#FAF7F270", fontFamily: "var(--font-nobel)" }}
                >
                  — {kw.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: "#FAF7F2AA", fontFamily: "var(--font-nobel)" }}
          >
            Blending traditional Ayurvedic wisdom with modern science — pure,
            organic, and science-backed nutrition from our farm to your table.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="rounded-full px-7 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              Shop Now
            </Link>
            <Link
              href="/pages/about"
              className="rounded-full border px-7 py-2.5 text-xs font-medium uppercase tracking-widest transition-all hover:bg-white/10"
              style={{ borderColor: "#FAF7F240", color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* RIGHT — Stats */}
        <div
          className="flex flex-row gap-8 md:flex-col md:gap-5 md:border-l md:pl-12"
          style={{ borderColor: "#CC996640" }}
        >
          {stats.map((stat) => (
            <div key={stat.value} className="text-center md:text-left">
              <div
                className="text-3xl font-bold md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#CC9966" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-[10px] uppercase tracking-wider whitespace-pre-line leading-relaxed"
                style={{ color: "#FAF7F280", fontFamily: "var(--font-nobel)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px]" style={{ backgroundColor: "#CC996640" }} />
    </section>
  );
}
