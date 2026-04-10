"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD YOUR VIDEOS — Three options:
 *
 * 1. SHOPIFY FILES (recommended — fastest, no ads/branding):
 *    a. Shopify Admin → Content → Files → Upload Video (MP4)
 *    b. Copy the CDN URL (e.g. https://cdn.shopify.com/s/.../video.mp4)
 *    c. Paste into the `src` field of any VIDEO_ITEMS entry below.
 *
 * 2. INSTAGRAM REEL (always fresh, shows real content):
 *    a. Open your reel on Instagram → click ··· → "Copy link"
 *    b. Set `type: "instagram"` and paste the URL as `src`
 *    c. Note: loads Instagram's embed JS — slightly slower
 *
 * 3. YOUTUBE / VIMEO (reliable, no hosting cost):
 *    a. Get the embed URL (youtube.com/embed/VIDEO_ID?autoplay=1&mute=1)
 *    b. Set `type: "youtube"` and paste as `src`
 *
 * BEST PLACEMENT: Between Blog and Reviews — acts as a "brand in action"
 * social proof before the customer review section.
 * ─────────────────────────────────────────────────────────────────────────────
 */

type VideoItem = {
  id: string;
  type: "shopify" | "instagram" | "youtube";
  src: string;           // CDN url / Instagram post url / YouTube embed url
  poster?: string;       // Thumbnail image URL (for shopify type)
  label: string;         // Caption shown below card
  tag?: string;          // Optional pill label e.g. "Reel" "New"
};

// ── EDIT THESE ───────────────────────────────────────────────────────────────
const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "v1",
    type: "shopify",
    src: "https://cdn.shopify.com/videos/c/o/v/3ff14de0c4c24701a4e9a62a5fa853b1.mp4",
    label: "The Sprouting Process",
    tag: "Behind the Scenes",
  },
  {
    id: "v2",
    type: "shopify",
    src: "https://cdn.shopify.com/videos/c/o/v/cf5799a7cb9744d1abb3f2c5022beac3.mp4",
    label: "Cold-Pressed in Our Kitchen",
    tag: "Process",
  },
  {
    id: "v3",
    type: "shopify",
    src: "https://cdn.shopify.com/videos/c/o/v/e7c8e29936fb412c8e8c4c54cddfb74b.mp4",
    label: "Farm to Table",
    tag: "Our Story",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-lg" fill="white">
      <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.4)" />
      <polygon points="19,15 36,24 19,33" fill="white" />
    </svg>
  );
}

function ShopifyCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Auto-play muted on hover
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.play().catch(() => {});
    } else if (!playing) {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, playing]);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      v.muted = true;
      setPlaying(false);
    } else {
      v.muted = false;
      v.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{ aspectRatio: "9/14" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Tag pill */}
      {item.tag && (
        <div className="absolute left-3 top-3">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest"
            style={{ backgroundColor: "#CC9966", color: "#fff", fontFamily: "var(--font-nobel)" }}
          >
            {item.tag}
          </span>
        </div>
      )}

      {/* Play / pause button */}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
        <div
          className="transition-all duration-300"
          style={{ opacity: playing ? 0.4 : hovered ? 1 : 0.85, transform: hovered && !playing ? "scale(1.1)" : "scale(1)" }}
        >
          {playing ? (
            <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-lg" fill="white">
              <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.4)" />
              <rect x="16" y="15" width="5" height="18" rx="1" fill="white" />
              <rect x="27" y="15" width="5" height="18" rx="1" fill="white" />
            </svg>
          ) : (
            <PlayIcon />
          )}
        </div>
      </div>

      {/* Label at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p
          className="text-sm font-medium leading-snug text-white"
          style={{ fontFamily: "var(--font-bronela)" }}
        >
          {item.label}
        </p>
        {playing && (
          <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/60" style={{ fontFamily: "var(--font-nobel)" }}>
            Click to pause
          </p>
        )}
      </div>
    </div>
  );
}

function InstagramCard({ item }: { item: VideoItem }) {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "9/14" }}>
      <blockquote
        className="instagram-media h-full w-full"
        data-instgrm-permalink={item.src}
        data-instgrm-version="14"
        style={{ minWidth: "unset", width: "100%" }}
      />
    </div>
  );
}

function YoutubeCard({ item }: { item: VideoItem }) {
  return (
    <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "9/14" }}>
      <iframe
        src={item.src}
        title={item.label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}

export default function VideoSection() {
  // Load Instagram embed script if needed
  useEffect(() => {
    const hasInstagram = VIDEO_ITEMS.some((v) => v.type === "instagram");
    if (!hasInstagram) return;
    const existing = document.getElementById("ig-embed-script");
    if (existing) {
      // @ts-ignore
      window.instgrm?.Embeds?.process?.();
      return;
    }
    const script = document.createElement("script");
    script.id = "ig-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="w-full py-14 px-6 md:px-12" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Header */}
      <div className="mb-10 text-center">
        <span
          className="mb-2 block text-[10px] uppercase tracking-[0.35em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Dhatu in Action
        </span>
        <h2
          className="mb-3 text-2xl md:text-3xl"
          style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
        >
          See It. Taste It. Feel It.
        </h2>
        <p
          className="mx-auto max-w-md text-sm leading-relaxed"
          style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
        >
          Real processes. Real food. Real people.
          Follow us{" "}
          <a
            href="https://www.instagram.com/dhatuorganics"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-[#CC9966]"
            style={{ color: "#CC9966" }}
          >
            @dhatuorganics
          </a>{" "}
          for daily updates.
        </p>
      </div>

      {/* Video grid — 3 portrait cards */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {VIDEO_ITEMS.map((item) => (
          <div key={item.id}>
            {item.type === "shopify" && <ShopifyCard item={item} />}
            {item.type === "instagram" && <InstagramCard item={item} />}
            {item.type === "youtube" && <YoutubeCard item={item} />}
          </div>
        ))}
      </div>

      {/* Instagram CTA */}
      <div className="mt-8 text-center">
        <a
          href="https://www.instagram.com/dhatuorganics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-all hover:bg-[#CC9966] hover:border-[#CC9966] hover:text-white"
          style={{
            borderColor: "#CC996660",
            color: "#CC9966",
            fontFamily: "var(--font-nobel)",
          }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow @dhatuorganics
        </a>
      </div>
    </section>
  );
}
