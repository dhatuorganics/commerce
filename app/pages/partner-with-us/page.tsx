import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "components/animate-in";
import { PartnerContactForm } from "components/partner-contact-form";

export const metadata: Metadata = {
  title: "Partner With Us — Dhatu Organics",
  description:
    "Explore export, white labelling, franchise, and retail partnership opportunities with Dhatu Organics.",
};

/* ─── Data ─────────────────────────────────────────────── */

const PARTNER_MODES = [
  { id: "exports",         label: "Exports",          icon: "✦" },
  { id: "white-labelling", label: "White Labelling",   icon: "◎" },
  { id: "franchise",       label: "Franchise",         icon: "◈" },
  { id: "retail-stores",   label: "Retail Stores",     icon: "○" },
];

const EXPORT_STRENGTHS = [
  { title: "Exceptional Quality", body: "Every product is sourced from certified organic farms, processed with stringent quality controls and internationally compliant standards." },
  { title: "Wide Product Range", body: "Grains, pulses, spices, herbs, superfoods, cold-pressed oils — over 200 SKUs ready for global distribution." },
  { title: "Customised Solutions", body: "Private labelling, custom formulations, and flexible packaging options tailored to your market's regulations and preferences." },
  { title: "Reliability", body: "14+ years of consistent supply chain operations. Timely delivery and transparent documentation across all export markets." },
];

const WL_STEPS = [
  { num: "01", title: "Product Selection", body: "Choose from our existing 200+ certified products or co-develop custom formulations built around your target audience." },
  { num: "02", title: "Branding & Packaging", body: "Our design team works with yours to create label artwork, packaging design, and brand guidelines that are regulation-compliant." },
  { num: "03", title: "Quality Assurance", body: "Every batch undergoes rigorous testing — certifications, lab reports, and full traceability documentation included." },
  { num: "04", title: "Supply & Distribution", body: "We handle manufacturing, packaging, and logistics. You focus entirely on growing your brand." },
];

const WL_BENEFITS = [
  { label: "Cost-Effective", desc: "No manufacturing CAPEX. Scale without capital." },
  { label: "Speed to Market", desc: "Launch in weeks, not months." },
  { label: "Brand Control", desc: "Your identity. Our backbone." },
  { label: "Scalability", desc: "Grow from pilot to national rollout seamlessly." },
];

const FRANCHISE_HIGHLIGHTS = [
  { icon: "🌾", title: "Specialty Organic Retail", body: "A curated store experience featuring certified organic foods, sprouted flours, wholesome meals, and natural lifestyle products." },
  { icon: "🍽️", title: "Farm-to-Fork Restaurants", body: "Bring the Dhatu philosophy of living food to your city — from kitchen to table, every ingredient tells a story." },
  { icon: "📦", title: "Proven Supply Chain", body: "14 years of manufacturing excellence. Your franchise is backed by the same infrastructure that serves 500,000+ families." },
  { icon: "🤝", title: "Full Partner Support", body: "Training, branding, marketing playbooks, and ongoing support from our team — you're never alone." },
];

const RETAIL_BENEFITS = [
  { title: "Ready-to-Sell Range", body: "Shelf-ready, beautifully packaged products across 10+ categories. Certified organic, lab-tested, FSSAI compliant." },
  { title: "Flexible MOQs", body: "We work with independent health stores, modern trade chains, and everything in between — with terms that suit your scale." },
  { title: "Merchandising Support", body: "POS materials, shelf talkers, sampling kits, and trained sales representatives to help you drive sell-through." },
  { title: "Marketing Co-op", body: "Joint campaigns, in-store activations, and digital collateral to help Dhatu sell in your store." },
];

/* ─── Page ─────────────────────────────────────────────── */

export default function PartnerPage() {
  return (
    <main>

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        {/* Background texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CC9966' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <AnimateIn direction="up" delay={0} duration={900}>
          <span
            className="mb-5 block text-[10px] uppercase tracking-[0.55em]"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Dhatu Organics
          </span>
          <h1
            className="mb-6 max-w-3xl text-5xl leading-[1.08] md:text-7xl"
            style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
          >
            Grow With
            <br />
            <span style={{ color: "#CC9966" }}>Dhatu.</span>
          </h1>
          <p
            className="mx-auto mb-12 max-w-lg text-sm leading-8"
            style={{ color: "#999", fontFamily: "var(--font-nobel)" }}
          >
            We are a 14-year-old, 100% certified organic food company with a global outlook
            and a deep-rooted Indian heritage. Whether you're looking to export, build a brand,
            open a store, or stock our products — there's a partnership model for you.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNER_MODES.map((m) => (
              <Link
                key={m.id}
                href={`#${m.id}`}
                className="rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#CC9966] hover:border-[#CC9966] hover:text-white"
                style={{
                  borderColor: "rgba(204,153,102,0.4)",
                  color: "#CC9966",
                  fontFamily: "var(--font-nobel)",
                }}
              >
                {m.icon}&nbsp;&nbsp;{m.label}
              </Link>
            ))}
          </div>
        </AnimateIn>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="h-10 w-px" style={{ backgroundColor: "#CC996650" }} />
        </div>
      </section>

      {/* ── 2. EXPORTS ────────────────────────────────────── */}
      <section id="exports" className="scroll-mt-28 w-full" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

          {/* Image */}
          <AnimateIn direction="up" delay={0}>
            <div className="relative h-[440px] md:h-full min-h-[440px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=900&h=700&fit=crop&auto=format&q=80"
                alt="Dhatu Organics export products — certified organic grains and spices"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <div
                className="absolute bottom-6 left-6 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em]"
                style={{ backgroundColor: "rgba(204,153,102,0.9)", color: "#fff", fontFamily: "var(--font-nobel)" }}
              >
                Exporting to 6+ Countries
              </div>
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="up" delay={80}>
            <div className="flex flex-col justify-center px-8 py-16 md:px-16">
              <span
                className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                01 — Exports
              </span>
              <h2
                className="mb-6 text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
              >
                Certified Organic.
                <br />Globally Ready.
              </h2>
              <p
                className="mb-10 text-sm leading-8"
                style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
              >
                Dhatu Organics and Naturals currently exports to six countries, bringing
                high-quality certified organic products to health-conscious consumers worldwide.
                Our products meet international food safety and organic certification standards —
                ready for your market.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {EXPORT_STRENGTHS.map((item) => (
                  <div key={item.title}>
                    <div
                      className="mb-1.5 h-px w-8"
                      style={{ backgroundColor: "#CC9966" }}
                    />
                    <h4
                      className="mb-2 text-sm font-medium"
                      style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs leading-7"
                      style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                Enquire about exports →
              </Link>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 3. WHITE LABELLING ────────────────────────────── */}
      <section id="white-labelling" className="scroll-mt-28 w-full" style={{ backgroundColor: "#2C2C2C" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

          {/* Content first on desktop */}
          <AnimateIn direction="up" delay={0}>
            <div className="flex flex-col justify-center px-8 py-16 md:px-16">
              <span
                className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                02 — White Labelling
              </span>
              <h2
                className="mb-6 text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
              >
                Your Brand.
                <br />Our Expertise.
              </h2>
              <p
                className="mb-10 text-sm leading-8"
                style={{ color: "#999", fontFamily: "var(--font-nobel)" }}
              >
                White labelling allows you to leverage our 14 years of organic food manufacturing
                to launch your own certified organic brand — without the investment in facilities,
                R&D, or supply chains. Fast, flexible, and fully compliant.
              </p>

              {/* 4-step process */}
              <div className="mb-10 space-y-6">
                {WL_STEPS.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <span
                      className="mt-0.5 text-[10px] uppercase tracking-[0.3em] w-6 flex-shrink-0"
                      style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h4
                        className="mb-1 text-sm"
                        style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
                      >
                        {step.title}
                      </h4>
                      <p
                        className="text-xs leading-7"
                        style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits pills */}
              <div className="flex flex-wrap gap-3">
                {WL_BENEFITS.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-full border px-4 py-2"
                    style={{ borderColor: "rgba(204,153,102,0.3)" }}
                    title={b.desc}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                    >
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                Enquire about white labelling →
              </Link>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn direction="up" delay={80}>
            <div className="relative h-[440px] md:h-full min-h-[440px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&h=700&fit=crop&auto=format&q=80"
                alt="White labelling — custom branded organic products"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-black/30" />
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 4. FRANCHISE ──────────────────────────────────── */}
      <section id="franchise" className="scroll-mt-28 w-full" style={{ backgroundColor: "#FAF7F2" }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-16 md:py-28">

          <AnimateIn direction="up" delay={0}>
            <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <span
                  className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                  style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                >
                  03 — Franchise
                </span>
                <h2
                  className="text-3xl leading-tight md:text-4xl"
                  style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
                >
                  Bring Dhatu
                  <br />to Your City.
                </h2>
              </div>
              <div className="flex flex-col justify-end">
                <p
                  className="text-sm leading-8"
                  style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
                >
                  Dhatu Organics & Naturals — a brand deeply rooted in traditional wisdom and
                  guided by scientific integrity — is opening its doors for franchise opportunities.
                  Join a movement that is redefining organic food retail and farm-to-fork dining
                  across India and beyond.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Full-width image */}
          <AnimateIn direction="up" delay={40}>
            <div className="relative mb-14 h-64 overflow-hidden rounded-2xl md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=500&fit=crop&auto=format&q=80"
                alt="Dhatu Organics franchise — organic retail store"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-8 right-8">
                <p
                  className="text-lg md:text-2xl"
                  style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
                >
                  "Certified organic foods. Sprouted flours. Wholesome meals. Natural living."
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* 4 highlights */}
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-4">
            {FRANCHISE_HIGHLIGHTS.map((item, i) => (
              <AnimateIn key={item.title} direction="up" delay={i * 60}>
                <div
                  className="border-t p-8"
                  style={{ borderColor: "#CC996620" }}
                >
                  <span className="mb-4 block text-2xl">{item.icon}</span>
                  <h4
                    className="mb-3 text-lg"
                    style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-xs leading-7"
                    style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn direction="up" delay={0}>
            <div className="mt-10">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
              >
                Enquire about franchise →
              </Link>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 5. RETAIL STORES (NEW) ────────────────────────── */}
      <section
        id="retail-stores"
        className="scroll-mt-28 w-full"
        style={{ backgroundColor: "#1E2820" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">

          {/* Image */}
          <AnimateIn direction="up" delay={0}>
            <div className="relative h-[440px] md:h-full min-h-[440px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=900&h=700&fit=crop&auto=format&q=80"
                alt="Dhatu Organics in retail — organic products on store shelves"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              <div
                className="absolute bottom-6 left-6 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.35em]"
                style={{ backgroundColor: "rgba(102,153,153,0.9)", color: "#fff", fontFamily: "var(--font-nobel)" }}
              >
                New Opportunity
              </div>
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="up" delay={80}>
            <div className="flex flex-col justify-center px-8 py-16 md:px-16">
              <span
                className="mb-3 block text-[10px] uppercase tracking-[0.5em]"
                style={{ color: "#669999", fontFamily: "var(--font-nobel)" }}
              >
                04 — Retail Stores
              </span>
              <h2
                className="mb-6 text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
              >
                Stock Dhatu
                <br />in Your Store.
              </h2>
              <p
                className="mb-10 text-sm leading-8"
                style={{ color: "#aaa", fontFamily: "var(--font-nobel)" }}
              >
                Are you a health food store, supermarket, organic retailer, or specialty grocer?
                Partner with Dhatu Organics to offer your customers India's most trusted
                certified organic food range — beautifully packaged, science-backed, and
                ready to sell.
              </p>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                {RETAIL_BENEFITS.map((item) => (
                  <div key={item.title}>
                    <div
                      className="mb-2 h-px w-8"
                      style={{ backgroundColor: "#669999" }}
                    />
                    <h4
                      className="mb-2 text-sm"
                      style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs leading-7"
                      style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-70"
                style={{ color: "#669999", fontFamily: "var(--font-nobel)" }}
              >
                Enquire about retail stocking →
              </Link>
            </div>
          </AnimateIn>

        </div>
      </section>

      {/* ── 6. STATS STRIP ────────────────────────────────── */}
      <section
        className="w-full border-y px-6 py-16"
        style={{ borderColor: "#CC996625", backgroundColor: "#FDFCF9" }}
      >
        <AnimateIn direction="none">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
            {[
              { val: "6+",    lbl: "Countries Exported To" },
              { val: "200+",  lbl: "Certified Organic Products" },
              { val: "14+",   lbl: "Years of Manufacturing" },
              { val: "500K+", lbl: "Families Served" },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <span
                  className="block text-4xl md:text-5xl mb-2"
                  style={{ fontFamily: "var(--font-bronela)", color: "#CC9966" }}
                >
                  {s.val}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                >
                  {s.lbl}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ── 7. CONTACT FORM ───────────────────────────────── */}
      <section
        id="contact"
        className="scroll-mt-28 w-full px-6 py-24 md:px-12 md:py-32"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

            {/* Left — intro */}
            <AnimateIn direction="up" delay={0}>
              <div>
                <span
                  className="mb-4 block text-[10px] uppercase tracking-[0.55em]"
                  style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                >
                  Let&apos;s Talk
                </span>
                <h2
                  className="mb-6 text-3xl leading-tight md:text-4xl"
                  style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
                >
                  Start a
                  <br />Conversation.
                </h2>
                <p
                  className="mb-10 text-sm leading-8"
                  style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
                >
                  Whether you&apos;re a global distributor, an emerging D2C brand, an entrepreneur
                  ready to launch a franchise, or a retailer looking for the best organic range —
                  we&apos;d love to hear from you.
                </p>

                {/* Contact details */}
                <div className="space-y-5">
                  <div>
                    <span
                      className="mb-1 block text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                    >
                      Email
                    </span>
                    <a
                      href="mailto:info@dhatuorganics.com"
                      className="text-sm transition-colors hover:text-[#CC9966]"
                      style={{ color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
                    >
                      info@dhatuorganics.com
                    </a>
                  </div>
                  <div>
                    <span
                      className="mb-1 block text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "#666", fontFamily: "var(--font-nobel)" }}
                    >
                      Partnerships
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Exports", "White Labelling", "Franchise", "Retail Stores", "Others"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.25em]"
                          style={{
                            borderColor: "rgba(204,153,102,0.3)",
                            color: "#CC9966",
                            fontFamily: "var(--font-nobel)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Right — form */}
            <AnimateIn direction="up" delay={100}>
              <PartnerContactForm />
            </AnimateIn>

          </div>
        </div>
      </section>

    </main>
  );
}
