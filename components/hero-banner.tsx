"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Hero Banner
 *
 * Desktop image: /public/hero-banner.jpeg   (always used)
 * Mobile image:  /public/hero-banner-mobile.jpeg
 *   → Upload this file to /public/ to show a separate portrait-optimised
 *     image on phones. If the file does not exist, the desktop image is
 *     used as fallback automatically.
 *
 * Max height: 500px (desktop)
 */
export default function HeroBanner() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [mobileSrc, setMobileSrc] = useState("/hero-banner-mobile.jpeg");

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setOffset(Math.round(-rect.top * 0.3));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(200px, 38vw, 500px)" }}
    >
      {/* Parallax container */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px)`,
          willChange: "transform",
          top: "-10%",
          bottom: "-10%",
          height: "120%",
        }}
      >
        {/* ── Mobile image (/hero-banner-mobile.jpeg) ── */}
        {/* Falls back to desktop image on error (file not uploaded yet) */}
        <Image
          src={mobileSrc}
          alt="Dhatu Organics — Pure Organic Naturals"
          fill
          className="object-cover object-center md:hidden"
          priority
          sizes="100vw"
          onError={() => setMobileSrc("/hero-banner.jpeg")}
        />

        {/* ── Desktop image (/hero-banner.jpeg) ── */}
        <Image
          src="/hero-banner.jpeg"
          alt="Dhatu Organics — Pure Organic Naturals"
          fill
          className="hidden object-cover object-center md:block"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(250,247,242,0.6), transparent)" }}
      />
    </section>
  );
}
