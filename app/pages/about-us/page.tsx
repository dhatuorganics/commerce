import type { Metadata } from "next";
import { AnimateIn } from "components/animate-in";

export const metadata: Metadata = {
  title: "About Us — Dhatu Organics",
  description:
    "14 years of pure, certified organic food rooted in Ayurvedic wisdom and modern nutrition science.",
};

/* ─── Data ─────────────────────────────────────────────── */

const STATS = [
  { value: "14+", label: "Years of Craft" },
  { value: "200+", label: "Organic Products" },
  { value: "100%", label: "Certified Organic" },
  { value: "500K+", label: "Families Nourished" },
];

const ELEMENTS = [
  {
    sanskrit: "Prithvi",
    element: "Earth",
    value: "Purity",
    symbol: "◈",
    accent: "#C4A882",
    description:
      "Uncompromising organic sourcing — free from chemicals and additives, grown in harmony with the soil.",
  },
  {
    sanskrit: "Jala",
    element: "Water",
    value: "Nourishment",
    symbol: "◉",
    accent: "#6FA8C4",
    description:
      "Ancient knowledge of food as medicine — deeply nourishing every cell with living nutrition.",
  },
  {
    sanskrit: "Agni",
    element: "Fire",
    value: "Transformation",
    symbol: "△",
    accent: "#C97A5E",
    description:
      "Traditional sprouting and fermentation — transforming raw ingredients into bioavailable superfoods.",
  },
  {
    sanskrit: "Vayu",
    element: "Air",
    value: "Balance",
    symbol: "◎",
    accent: "#7A9E7E",
    description:
      "Ayurvedic wisdom harmonised with modern wellness — tradition re-imagined for conscious living.",
  },
  {
    sanskrit: "Akasha",
    element: "Ether",
    value: "Consciousness",
    symbol: "○",
    accent: "#9B8FBB",
    description:
      "A deeper awareness of what we consume — and its impact on people, planet, and future generations.",
  },
];

const VALUES = [
  {
    title: "Transparency",
    body: "Every ingredient is traceable. Every process is documented. We have nothing to hide — and everything to share.",
  },
  {
    title: "Tradition",
    body: "Our methods are drawn from millennia of Indian food wisdom: sprouting, fermentation, cold-pressing, and slow preparation.",
  },
  {
    title: "Science",
    body: "We honour tradition and validate it with modern nutrition science — so you get the best of both worlds.",
  },
  {
    title: "Sustainability",
    body: "Organic farming, minimal packaging, and ethical sourcing — because the earth that feeds us deserves our care.",
  },
];

/* ─── Page ─────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2" }}>

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        {/* decorative top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundColor: "#CC996630" }}
        />

        <AnimateIn direction="up" delay={0} duration={900}>
          <span
            className="mb-6 block text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Our Story
          </span>
          <h1
            className="mb-6 max-w-3xl text-5xl leading-[1.1] md:text-7xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            Rooted in Tradition.
            <br />
            <span style={{ color: "#CC9966" }}>Nourished</span> by Science.
          </h1>
          <p
            className="mx-auto max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
          >
            Since 2010, Dhatu Organics has carried a singular belief —
            that pure food, prepared with intention, is the most powerful
            medicine of all.
          </p>
        </AnimateIn>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Scroll
          </span>
          <div
            className="h-10 w-px"
            style={{ backgroundColor: "#CC996660" }}
          />
        </div>
      </section>

      {/* ── 2. PULL QUOTE ─────────────────────────────────── */}
      <section
        className="w-full px-6 py-24 md:py-32"
        style={{ backgroundColor: "#2C2C2C" }}
      >
        <AnimateIn direction="up" delay={0} duration={800}>
          <div className="mx-auto max-w-3xl text-center">
            {/* decorative gold line */}
            <div
              className="mx-auto mb-10 h-px w-16"
              style={{ backgroundColor: "#CC9966" }}
            />
            <blockquote
              className="text-2xl leading-relaxed md:text-4xl"
              style={{
                fontFamily: "var(--font-bronela)",
                color: "#FAF7F2",
                fontStyle: "italic",
              }}
            >
              &ldquo;We believe food is medicine —
              <br className="hidden md:block" /> and medicine should be pure.&rdquo;
            </blockquote>
            <div
              className="mx-auto mt-10 h-px w-16"
              style={{ backgroundColor: "#CC996660" }}
            />
            <p
              className="mt-6 text-xs uppercase tracking-[0.4em]"
              style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              Dhatu Organics, est. 2010
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ── 3. OUR STORY ──────────────────────────────────── */}
      <section className="w-full px-6 py-24 md:px-12 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

          {/* Left — text */}
          <AnimateIn direction="up" delay={0}>
            <div>
              <span
                className="mb-4 block text-[10px] uppercase tracking-[0.45em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                How It Began
              </span>
              <h2
                className="mb-8 text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
              >
                A Kitchen.
                <br />A Conviction.
                <br />A Movement.
              </h2>

              <div
                className="space-y-5 text-sm leading-8"
                style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
              >
                <p>
                  Dhatu Organics was born from a deeply personal realisation —
                  that the foods we call "healthy" are often anything but. Laden
                  with pesticides, stripped of nutrients, and processed beyond
                  recognition, modern food had lost its soul.
                </p>
                <p>
                  We returned to the source. To ancient Indian farming wisdom,
                  to Ayurvedic principles, to the quiet intelligence of
                  sprouted grains and cold-pressed oils. Every product we make
                  is an act of restoration — bringing food back to what it was
                  always meant to be.
                </p>
                <p>
                  Over 14 years and 200+ products later, half a million
                  families have made Dhatu a part of their daily ritual. Not
                  because we marketed it — but because pure food speaks
                  for itself.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right — timeline */}
          <AnimateIn direction="up" delay={120}>
            <div className="flex flex-col justify-center">
              {[
                { year: "2010", event: "Founded in Bangalore with a single product — sprouted ragi flour." },
                { year: "2013", event: "Achieved India Organic Certification across all product lines." },
                { year: "2016", event: "Expanded into cold-pressed oils and ancient grain millets." },
                { year: "2019", event: "Crossed 100,000 families served. Built our own processing facility." },
                { year: "2024", event: "200+ certified organic products. 500K+ families. Still small-batch." },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-8">
                  {/* line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: "#CC9966" }}
                    />
                    {i < arr.length - 1 && (
                      <div
                        className="mt-1 w-px flex-1"
                        style={{ backgroundColor: "#CC996640", minHeight: "3rem" }}
                      />
                    )}
                  </div>
                  {/* content */}
                  <div className="pb-10">
                    <span
                      className="block text-[10px] uppercase tracking-[0.4em] mb-1"
                      style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                    >
                      {item.year}
                    </span>
                    <p
                      className="text-sm leading-7"
                      style={{ color: "#444", fontFamily: "var(--font-nobel)" }}
                    >
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 4. STATS ──────────────────────────────────────── */}
      <section
        className="w-full border-y px-6 py-20"
        style={{ borderColor: "#CC996625", backgroundColor: "#FDFCF9" }}
      >
        <AnimateIn direction="up" delay={0}>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <span
                  className="block text-4xl md:text-5xl mb-2"
                  style={{ fontFamily: "var(--font-bronela)", color: "#CC9966" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ── 5. PHILOSOPHY — Five Panchabhutas ─────────────── */}
      <section
        className="w-full px-6 py-24 md:px-12 md:py-32"
        style={{ backgroundColor: "#2C2C2C" }}
      >
        <AnimateIn direction="up" delay={0}>
          <div className="mx-auto max-w-6xl">
            {/* header */}
            <div className="mb-16 text-center">
              <span
                className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                Our Philosophy
              </span>
              <h2
                className="text-3xl md:text-5xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
              >
                The Five Panchabhutas
              </h2>
              <p
                className="mx-auto mt-4 max-w-md text-sm leading-7"
                style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
              >
                The five elements of nature — the lens through which Dhatu
                approaches every ingredient, every process, every product.
              </p>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 gap-px sm:grid-cols-5" style={{ backgroundColor: "#FFFFFF08" }}>
              {ELEMENTS.map((el) => (
                <div
                  key={el.sanskrit}
                  className="group flex flex-col px-7 py-10 transition-colors duration-300"
                  style={{ backgroundColor: "#2C2C2C" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "#333";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "#2C2C2C";
                  }}
                >
                  {/* symbol */}
                  <span
                    className="mb-6 text-3xl"
                    style={{ color: el.accent }}
                  >
                    {el.symbol}
                  </span>

                  {/* element name */}
                  <span
                    className="mb-1 text-[9px] uppercase tracking-[0.45em]"
                    style={{ color: el.accent, fontFamily: "var(--font-nobel)" }}
                  >
                    {el.element}
                  </span>

                  {/* sanskrit */}
                  <h3
                    className="mb-1 text-xl"
                    style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
                  >
                    {el.sanskrit}
                  </h3>

                  {/* value */}
                  <span
                    className="mb-5 text-[10px] uppercase tracking-widest"
                    style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                  >
                    {el.value}
                  </span>

                  {/* rule */}
                  <div
                    className="mb-5 h-px w-8 transition-all duration-500 group-hover:w-16"
                    style={{ backgroundColor: el.accent }}
                  />

                  {/* description */}
                  <p
                    className="text-xs leading-7"
                    style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                  >
                    {el.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── 6. VALUES ─────────────────────────────────────── */}
      <section
        className="w-full px-6 py-24 md:px-12 md:py-32"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <div className="mx-auto max-w-6xl">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-16">
              <span
                className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                What We Stand For
              </span>
              <h2
                className="text-3xl md:text-5xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
              >
                Our Values
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <AnimateIn key={v.title} direction="up" delay={i * 60}>
                <div
                  className="border-t py-10 pr-12"
                  style={{ borderColor: "#CC996625" }}
                >
                  <div className="flex items-start gap-6">
                    <span
                      className="mt-1 text-[10px] uppercase tracking-[0.4em] w-4 flex-shrink-0"
                      style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="mb-3 text-xl"
                        style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
                      >
                        {v.title}
                      </h3>
                      <p
                        className="text-sm leading-8"
                        style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                      >
                        {v.body}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS STRIP ──────────────────────────────── */}
      <section
        className="w-full border-y px-6 py-16"
        style={{ borderColor: "#CC996625", backgroundColor: "#FDFCF9" }}
      >
        <AnimateIn direction="none" duration={700}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              "Zero Preservatives",
              "Small-Batch Processing",
              "Clean Ingredients Only",
              "No Refined Inputs",
              "Traditional Techniques",
              "Farm to Table",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-12">
                <span
                  className="text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                >
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: "#CC996660" }}>✦</span>
                )}
              </span>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ── 8. CLOSING CTA ────────────────────────────────── */}
      <section
        className="w-full px-6 py-32 text-center"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <AnimateIn direction="up" delay={0} duration={900}>
          <span
            className="mb-5 block text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Begin Your Journey
          </span>
          <h2
            className="mb-8 text-3xl md:text-5xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            Pure food.
            <br />
            <span style={{ color: "#CC9966" }}>Every single day.</span>
          </h2>
          <p
            className="mx-auto mb-12 max-w-md text-sm leading-8"
            style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
          >
            Explore 200+ certified organic products crafted with ancient wisdom
            and modern care — and make nourishment a daily ritual.
          </p>
          <a
            href="/search"
            className="inline-block rounded-full px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: "#2C2C2C",
              color: "#FAF7F2",
              fontFamily: "var(--font-nobel)",
            }}
          >
            Shop All Products
          </a>
        </AnimateIn>
      </section>

    </main>
  );
}
