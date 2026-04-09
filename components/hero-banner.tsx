import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      className="relative w-full"
      style={{ height: "clamp(220px, 52vw, 600px)" }}
    >
      {/* Mobile image — portrait crop, focused top-center */}
      <Image
        src="/hero-banner.jpeg"
        alt="Dhatu Organics — Pure Organic Naturals"
        fill
        className="object-cover object-top md:hidden"
        priority
        sizes="100vw"
      />
      {/* Desktop image — wide crop, centered */}
      <Image
        src="/hero-banner.jpeg"
        alt="Dhatu Organics — Pure Organic Naturals"
        fill
        className="hidden object-cover object-center md:block"
        priority
        sizes="100vw"
      />
    </section>
  );
}
