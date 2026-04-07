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
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#2C2C2C", minHeight: "300px" }}
    >
      {/* Subtle gradient blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 5% 80%, #CC996615 0%, transparent 45%), radial-gradient(ellipse at 95% 10%, #66999915 0%, transparent 45%)",
        }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ backgroundColor: "#CC9966" }} />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-16 py-8 gap-8">

        {/* LEFT — Main content */}
        <div className="flex-1 max-w-xl">
          {/* Eyebrow */}
          <span
            className="mb-4 inline-block rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.3em]"
            style={{ borderColor: "#CC996650", color: "#CC9966", fontFamily: "var(--font-nobel)" }}
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

          {/* Keyword badges — the creative part */}
          <div className="mb-5 flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <div
                key={kw.word}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1"
                style={{ borderColor: `${kw.color}50`, backgroundColor: `${kw.color}12` }}
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
                  style={{ color: "#FAF7F260", fontFamily: "var(--font-nobel)" }}
                >
                  — {kw.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
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
              href="/search"
              className="rounded-full border px-7 py-2.5 text-xs font-medium uppercase tracking-widest transition-all hover:bg-white/10"
              style={{ borderColor: "#FAF7F230", color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* RIGHT — Stats */}
        <div
          className="flex flex-row gap-8 md:flex-col md:gap-5 md:border-l md:pl-12"
          style={{ borderColor: "#CC996630" }}
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
                style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px]" style={{ backgroundColor: "#CC996630" }} />
    </section>
  );
}
