import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "components/animate-in";

export const metadata: Metadata = {
  title: "About Us — Dhatu Organics",
  description:
    "A harmonious blend of traditional wisdom and cutting-edge science. Dhatu Organics was born in 2012 in Bangalore with a vision to bring pure, certified organic food to every home.",
};

/* ─── Data ──────────────────────────────────────────────── */

const STATS = [
  { value: "2012", label: "Year Founded" },
  { value: "200+", label: "Organic Products" },
  { value: "100%", label: "Certified Organic" },
  { value: "500K+", label: "Families Nourished" },
];

const OFFERINGS = [
  {
    category: "Sprouted Flours",
    desc: "Stone-ground from traditionally sprouted grains — ragi, wheat, jowar, bajra. Higher nutrition, lower antinutrients.",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    category: "Cold-Pressed Oils",
    desc: "Wood-pressed at low temperatures to preserve every nutrient. Groundnut, sesame, coconut, and more.",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    category: "Heritage Millets",
    desc: "Ancient grains revived — foxtail, barnyard, kodo, little millet. Climate-resilient. Deeply nourishing.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    category: "Nut & Seed Butters",
    desc: "Cold-milled, sugar-free, preservative-free. Peanut, almond, sesame — as nature intended.",
    img: "https://images.unsplash.com/photo-1564988208558-9270de7c5848?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    category: "Spices & Condiments",
    desc: "Single-origin, unadulterated spices sourced directly from certified organic farms across India.",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    category: "Herbal Supplements",
    desc: "Ayurvedic formulations built on centuries of plant wisdom — standardised, tested, and bioavailable.",
    img: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=400&fit=crop&auto=format&q=80",
  },
];

const ELEMENTS = [
  {
    sanskrit: "Prithvi", element: "Earth", value: "Purity", symbol: "◈", accent: "#C4A882",
    description: "Uncompromising organic sourcing — free from chemicals and additives, grown in harmony with the soil.",
  },
  {
    sanskrit: "Jala", element: "Water", value: "Nourishment", symbol: "◉", accent: "#6FA8C4",
    description: "Ancient knowledge of food as medicine — deeply nourishing every cell with living nutrition.",
  },
  {
    sanskrit: "Agni", element: "Fire", value: "Transformation", symbol: "△", accent: "#C97A5E",
    description: "Traditional sprouting and fermentation — transforming raw ingredients into bioavailable superfoods.",
  },
  {
    sanskrit: "Vayu", element: "Air", value: "Balance", symbol: "◎", accent: "#7A9E7E",
    description: "Ayurvedic wisdom harmonised with modern wellness — tradition re-imagined for conscious living.",
  },
  {
    sanskrit: "Akasha", element: "Ether", value: "Consciousness", symbol: "○", accent: "#9B8FBB",
    description: "A deeper awareness of what we consume — and its impact on people, planet, and future generations.",
  },
];

/* ─── Page ──────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FAF7F2" }}>

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(480px, 60vw, 720px)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=900&fit=crop&auto=format&q=85"
          alt="Dhatu Organics — rooted in tradition"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(44,44,44,0.3) 0%, rgba(44,44,44,0.65) 100%)" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <AnimateIn direction="up" delay={0} duration={900}>
            <span
              className="mb-5 block text-[10px] uppercase tracking-[0.55em]"
              style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              Dhatu Organics &amp; Naturals
            </span>
            <h1
              className="mb-6 max-w-4xl text-4xl leading-[1.1] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
            >
              A Harmonious Blend of
              <br />
              <span style={{ color: "#CC9966" }}>Traditional Wisdom</span>
              <br />
              &amp; Cutting-Edge Science
            </h1>
            <p
              className="mx-auto max-w-xl text-sm leading-8 md:text-base"
              style={{ color: "rgba(250,247,242,0.8)", fontFamily: "var(--font-nobel)" }}
            >
              Born in Bangalore in 2012. Built on a belief that pure food,
              prepared with intention, is the most powerful medicine of all.
            </p>
          </AnimateIn>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(204,153,102,0.8)", fontFamily: "var(--font-nobel)" }}>
            Scroll
          </span>
          <div className="h-10 w-px" style={{ backgroundColor: "rgba(204,153,102,0.5)" }} />
        </div>
      </section>

      {/* ── 2. THE BEGINNING ──────────────────────────────── */}
      <section className="w-full px-6 py-24 md:px-12 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

          {/* Left — story */}
          <AnimateIn direction="up" delay={0}>
            <div>
              <span
                className="mb-4 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                How It Began
              </span>
              <h2
                className="mb-8 text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
              >
                A Question That
                <br />Started a Movement.
              </h2>
              <div className="space-y-5 text-sm leading-8" style={{ color: "#555", fontFamily: "var(--font-nobel)" }}>
                <p>
                  In 2012, Dhatu Organics &amp; Naturals was founded in Bangalore with a singular,
                  urgent question — why is the food we call &ldquo;healthy&rdquo; filled with chemicals,
                  pesticides, and processes that strip it of everything nutritious?
                </p>
                <p>
                  The answer became our mission. We returned to traditional Indian food wisdom —
                  to the art of sprouting grains, wood-pressing oils, fermenting legumes,
                  and sourcing directly from certified organic farmers. Every method rooted
                  in Ayurvedic science. Every product free from preservatives, additives, and shortcuts.
                </p>
                <p>
                  What began as a humble organic store has grown into a holistic food brand
                  encompassing a state-of-the-art production facility, a farm-to-fork restaurant,
                  and over 200 certified organic products — all still made small-batch, by hand,
                  with the same conviction as day one.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right — timeline */}
          <AnimateIn direction="up" delay={120}>
            <div className="flex flex-col justify-center">
              {[
                { year: "2012", event: "Founded in Bangalore as a humble organic store with a clear vision — pure food, honest processes." },
                { year: "2015", event: "Achieved India Organic Certification. Launched sprouted flour range — our most loved category." },
                { year: "2017", event: "Opened our own production facility. Expanded into cold-pressed oils, millets, and herbal range." },
                { year: "2019", event: "Crossed 100,000 families served. Launched farm-to-fork restaurant concept in Bangalore." },
                { year: "2022", event: "Expanded to Mysore. Began exporting to international markets across 6+ countries." },
                { year: "2024", event: "200+ certified organic products. 500K+ families. Still small-batch. Still honest." },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: "#CC9966" }} />
                    {i < arr.length - 1 && (
                      <div className="mt-1 w-px flex-1" style={{ backgroundColor: "#CC996635", minHeight: "2.5rem" }} />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
                      {item.year}
                    </span>
                    <p className="text-sm leading-7" style={{ color: "#444", fontFamily: "var(--font-nobel)" }}>
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 3. STATS ──────────────────────────────────────── */}
      <section className="w-full border-y px-6 py-16" style={{ borderColor: "#CC996625", backgroundColor: "#FDFCF9" }}>
        <AnimateIn direction="none">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-4xl md:text-5xl mb-2" style={{ fontFamily: "var(--font-bronela)", color: "#CC9966" }}>
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ── 4. PRODUCTION FACILITY ────────────────────────── */}
      <section className="w-full" style={{ backgroundColor: "#2C2C2C" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

          {/* Image */}
          <AnimateIn direction="up" delay={0}>
            <div className="relative h-[420px] md:h-full min-h-[420px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565087836987-fd89ce6e5d34?w=900&h=700&fit=crop&auto=format&q=80"
                alt="Dhatu Organics production facility — small-batch organic processing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30" />
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="up" delay={80}>
            <div className="flex flex-col justify-center px-8 py-16 md:px-16">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.5em]" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
                Our Facility
              </span>
              <h2 className="mb-6 text-3xl leading-tight md:text-4xl" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                Where Tradition
                <br />Meets Technology.
              </h2>
              <p className="mb-8 text-sm leading-8" style={{ color: "#999", fontFamily: "var(--font-nobel)" }}>
                Our Bangalore production facility is built around one principle — never compromise
                the integrity of an ingredient. Every process is designed to preserve, not destroy:
                low-temperature milling, traditional wood-pressing, slow fermentation, and
                hand-inspected quality control at every stage.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Small-Batch Processing", body: "Every batch is limited in size to ensure quality and traceability." },
                  { title: "Zero Preservatives", body: "No artificial additives, colours, or shelf-life extenders. Ever." },
                  { title: "Traditional Methods", body: "Wood-pressed oils, stone-ground flours, and live-culture fermentation." },
                  { title: "Lab-Tested Quality", body: "Every batch is tested for purity, nutrition, and safety before dispatch." },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="mb-2 h-px w-6" style={{ backgroundColor: "#CC9966" }} />
                    <h4 className="mb-1.5 text-sm" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                      {item.title}
                    </h4>
                    <p className="text-xs leading-6" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 5. UNIQUE OFFERINGS ───────────────────────────── */}
      <section className="w-full px-6 py-24 md:px-12 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="mx-auto max-w-6xl">
          <AnimateIn direction="up" delay={0}>
            <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <span className="mb-3 block text-[10px] uppercase tracking-[0.5em]" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
                  What We Make
                </span>
                <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}>
                  Our Unique
                  <br />Offerings.
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-sm leading-8" style={{ color: "#555", fontFamily: "var(--font-nobel)" }}>
                  Every product in our range is crafted to close the gap between what food is
                  and what food should be — certified organic, traditionally processed, and
                  scientifically validated.
                </p>
              </div>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {OFFERINGS.map((item, i) => (
              <AnimateIn key={item.category} direction="up" delay={i * 50}>
                <div className="group overflow-hidden rounded-2xl border" style={{ borderColor: "#CC996618" }}>
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.category}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="px-6 py-5" style={{ backgroundColor: "#FDFCF9" }}>
                    <h3 className="mb-2 text-base" style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}>
                      {item.category}
                    </h3>
                    <p className="text-xs leading-7" style={{ color: "#666", fontFamily: "var(--font-nobel)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn direction="up" delay={0}>
            <div className="mt-12 text-center">
              <Link
                href="/search"
                className="inline-block rounded-full border px-8 py-3.5 text-[10px] uppercase tracking-[0.35em] transition-all duration-300 hover:bg-[#2C2C2C] hover:text-[#FAF7F2] hover:border-[#2C2C2C]"
                style={{ borderColor: "#2C2C2C", color: "#2C2C2C", fontFamily: "var(--font-nobel)" }}
              >
                Explore All 200+ Products
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 6. STORE & RESTAURANT ─────────────────────────── */}
      <section className="w-full" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

          {/* Content */}
          <AnimateIn direction="up" delay={0}>
            <div className="flex flex-col justify-center px-8 py-16 md:px-16">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.5em]" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
                Visit Us
              </span>
              <h2 className="mb-6 text-3xl leading-tight md:text-4xl" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                Our Store &amp;
                <br />Restaurant.
              </h2>
              <p className="mb-10 text-sm leading-8" style={{ color: "#999", fontFamily: "var(--font-nobel)" }}>
                Dhatu is not just a product brand — it&apos;s a complete philosophy of living well.
                Our physical spaces in Bangalore and Mysore bring that philosophy to life: a curated
                organic retail store stocking all 200+ of our products, and a farm-to-fork restaurant
                where every dish is built on certified organic, traditionally processed ingredients.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="mb-2 h-px w-8" style={{ backgroundColor: "#CC9966" }} />
                  <h4 className="mb-2 text-lg" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                    Organic Retail Store
                  </h4>
                  <p className="text-xs leading-7" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                    Walk in and explore our complete range — from sprouted flours and cold-pressed oils
                    to herbal teas and fresh organic produce. Our stores are spaces to discover,
                    taste, and trust. Available in Bangalore and Mysore.
                  </p>
                </div>
                <div>
                  <div className="mb-2 h-px w-8" style={{ backgroundColor: "#CC9966" }} />
                  <h4 className="mb-2 text-lg" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                    Farm-to-Fork Restaurant
                  </h4>
                  <p className="text-xs leading-7" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                    Our restaurant concept brings the Dhatu kitchen to your table — every ingredient
                    certified organic, every recipe rooted in ancient nutrition wisdom, and every meal
                    an experience in conscious eating. Bangalore-based, with seasonal menus.
                  </p>
                </div>
                <div>
                  <div className="mb-2 h-px w-8" style={{ backgroundColor: "#669999" }} />
                  <h4 className="mb-2 text-lg" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                    Fresh Produce Delivery
                  </h4>
                  <p className="text-xs leading-7" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                    Certified organic fresh vegetables, fruits, and greens — delivered to your door in
                    Bangalore and Mysore. Harvested fresh, traceable to the farm, and free from
                    cold-chain chemicals.
                  </p>
                </div>
              </div>

              <Link
                href="/pages/our-restaurant-and-stores"
                className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                See our locations →
              </Link>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn direction="up" delay={80}>
            <div className="relative h-[480px] md:h-full min-h-[480px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=900&fit=crop&auto=format&q=80"
                alt="Dhatu Organics farm-to-fork restaurant — Bangalore"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
              <div
                className="absolute bottom-6 right-6 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em]"
                style={{ backgroundColor: "rgba(204,153,102,0.9)", color: "#fff", fontFamily: "var(--font-nobel)" }}
              >
                Bangalore · Mysore
              </div>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 7. PHILOSOPHY ─────────────────────────────────── */}
      <section className="w-full px-6 py-24 md:px-12 md:py-32" style={{ backgroundColor: "#2C2C2C" }}>
        <AnimateIn direction="up" delay={0}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.5em]" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                The Five Panchabhutas
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                The five elements of nature — the lens through which Dhatu approaches
                every ingredient, every process, every product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px sm:grid-cols-5" style={{ backgroundColor: "#FFFFFF08" }}>
              {ELEMENTS.map((el) => (
                <div
                  key={el.sanskrit}
                  className="group flex flex-col px-7 py-10 transition-colors duration-300 hover:bg-[#333333]"
                  style={{ backgroundColor: "#2C2C2C" }}
                >
                  <span className="mb-6 text-3xl" style={{ color: el.accent }}>{el.symbol}</span>
                  <span className="mb-1 text-[9px] uppercase tracking-[0.45em]" style={{ color: el.accent, fontFamily: "var(--font-nobel)" }}>
                    {el.element}
                  </span>
                  <h3 className="mb-1 text-xl" style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}>
                    {el.sanskrit}
                  </h3>
                  <span className="mb-5 text-[10px] uppercase tracking-widest" style={{ color: "#666", fontFamily: "var(--font-nobel)" }}>
                    {el.value}
                  </span>
                  <div className="mb-5 h-px w-8 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: el.accent }} />
                  <p className="text-xs leading-7" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                    {el.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── 8. PROCESS STRIP ──────────────────────────────── */}
      <section className="w-full border-y px-6 py-14" style={{ borderColor: "#CC996625", backgroundColor: "#FDFCF9" }}>
        <AnimateIn direction="none" duration={700}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {["Zero Preservatives", "Small-Batch Processing", "Clean Ingredients Only", "No Refined Inputs", "Traditional Techniques", "Farm to Table"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-10">
                <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#888", fontFamily: "var(--font-nobel)" }}>
                  {item}
                </span>
                {i < arr.length - 1 && <span style={{ color: "#CC996660" }}>✦</span>}
              </span>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────── */}
      <section className="w-full px-6 py-32 text-center" style={{ backgroundColor: "#FAF7F2" }}>
        <AnimateIn direction="up" delay={0} duration={900}>
          <span className="mb-5 block text-[10px] uppercase tracking-[0.5em]" style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}>
            Begin Your Journey
          </span>
          <h2 className="mb-8 text-3xl md:text-5xl" style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}>
            Pure food.
            <br />
            <span style={{ color: "#CC9966" }}>Every single day.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-md text-sm leading-8" style={{ color: "#666", fontFamily: "var(--font-nobel)" }}>
            Explore 200+ certified organic products crafted with ancient wisdom and modern care —
            and make nourishment a daily ritual.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="inline-block rounded-full px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: "#2C2C2C", color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
            >
              Shop All Products
            </Link>
            <Link
              href="/pages/our-restaurant-and-stores"
              className="inline-block rounded-full border px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#CC9966] hover:border-[#CC9966] hover:text-white"
              style={{ borderColor: "#CC9966", color: "#CC9966", fontFamily: "var(--font-nobel)" }}
            >
              Visit Our Store
            </Link>
          </div>
        </AnimateIn>
      </section>

    </main>
  );
}
