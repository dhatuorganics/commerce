"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroBanner() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      // Parallax only while section is in view
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // Image moves at 30% of scroll speed
        setOffset(Math.round(-rect.top * 0.3));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(220px, 52vw, 600px)" }}
    >
      {/* Parallax image container */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px)`,
          willChange: "transform",
          // Extend slightly top/bottom so parallax never shows gaps
          top: "-10%",
          bottom: "-10%",
          height: "120%",
        }}
      >
        {/* Mobile: object-top */}
        <Image
          src="/hero-banner.jpeg"
          alt="Dhatu Organics — Pure Organic Naturals"
          fill
          className="object-cover object-top md:hidden"
          priority
          sizes="100vw"
        />
        {/* Desktop: object-center */}
        <Image
          src="/hero-banner.jpeg"
          alt="Dhatu Organics — Pure Organic Naturals"
          fill
          className="hidden object-cover object-center md:block"
          priority
          sizes="100vw"
        />
      </div>

      {/* Subtle gradient overlay at bottom for depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(250,247,242,0.5), transparent)" }}
      />
    </section>
  );
}
