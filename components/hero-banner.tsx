import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ minHeight: "500px", backgroundColor: "#2C2C2C" }}
    >
      {/* Subtle brand pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #CC9966 0%, transparent 50%), radial-gradient(circle at 80% 20%, #669999 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center">
        {/* Eyebrow label */}
        <span
          className="mb-4 inline-block text-xs uppercase tracking-[0.3em]"
          style={{ color: "#CC9966" }}
        >
          Organic &amp; Natural
        </span>

        {/* Headline */}
        <h1
          className="mb-6 max-w-3xl text-4xl leading-tight md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-bronela)",
            color: "#FAF7F2",
          }}
        >
          Nourished by Nature,
          <br />
          Rooted in Tradition
        </h1>

        {/* Subtext */}
        <p
          className="mb-10 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
        >
          Pure, organic products crafted with ancient wisdom and
          modern wellness — from our farm to your table.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/search"
            className="rounded-full px-8 py-3 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#CC9966" }}
          >
            Shop Now
          </Link>
          <Link
            href="/search"
            className="rounded-full border px-8 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-white/10"
            style={{ borderColor: "#FAF7F2", color: "#FAF7F2" }}
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
