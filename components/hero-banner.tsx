import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full" style={{ minHeight: "380px" }}>
      <Image
        src="/hero-banner.jpeg"
        alt="Dhatu Organics — Pure Organic Naturals"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
    </section>
  );
}
