"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: "Sprouted Flours",
    sub: "Grains & Ancient Wheats",
    handle: "living-foods-sprouted-grains-flours",
    img: "https://images.unsplash.com/photo-1714842981153-ffeaf74e7a1a?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Nut & Seed Butters",
    sub: "Cold-Milled, Sugar-Free",
    handle: "nut-seed-butters",
    img: "https://images.unsplash.com/photo-1564988208558-9270de7c5848?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Millets",
    sub: "Ancient Grains Revived",
    handle: "millet",
    img: "https://images.unsplash.com/photo-1768729341679-8a2da8e5b5fa?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Spices & Condiments",
    sub: "Single-Origin, Unadulterated",
    handle: "spices-condiments",
    img: "https://images.unsplash.com/photo-1699210260087-347545f89de6?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Herbal Supplements",
    sub: "Ayurvedic Formulations",
    handle: "health-supplements",
    img: "https://images.unsplash.com/photo-1768700439764-9ec0ba31ae75?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Cold-Pressed Oils & Ghee",
    sub: "Traditional Wood-Pressed",
    handle: "cold-pressed-oils-ghee",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Rice",
    sub: "Heirloom & Heritage Varieties",
    handle: "rice-is-life",
    img: "https://images.unsplash.com/photo-1705147271933-5c7052f15a90?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    label: "Fresh Produce",
    sub: "Bangalore & Mysore Only",
    handle: "fresh-produce",
    img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop&auto=format&q=80",
    badge: "Local",
  },
];

const CURATED = [
  { label: "Best Sellers", handle: "best-selling-products", hot: true },
  { label: "New Arrivals", handle: "featured-products" },
  { label: "Daily Essentials", handle: "everyday-essentials" },
  { label: "Living Foods", handle: "living-foods-sprouted-grains-flours" },
  { label: "Gift Sets", handle: "gift-sets" },
  { label: "Certified Organic", handle: "organic-certified" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryTile({ cat, onClose }: { cat: typeof CATEGORIES[0]; onClose: () => void }) {
  return (
    <Link
      href={`/search/${cat.handle}`}
      onClick={onClose}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 hover:bg-[#FAF7F2]"
    >
      {/* Square thumbnail */}
      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={cat.img}
          alt={cat.label}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="44px"
        />
      </div>
      <div className="min-w-0">
        <p
          className="truncate text-[13px] font-medium leading-tight text-[#2C2C2C] transition-colors group-hover:text-[#CC9966]"
          style={{ fontFamily: "var(--font-nobel)" }}
        >
          {cat.label}
          {cat.badge && (
            <span
              className="ml-2 rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wider"
              style={{ backgroundColor: "#E8F5E9", color: "#2D6A4F" }}
            >
              {cat.badge}
            </span>
          )}
        </p>
        <p
          className="truncate text-[11px] text-[#AAAAAA]"
          style={{ fontFamily: "var(--font-nobel)" }}
        >
          {cat.sub}
        </p>
      </div>
    </Link>
  );
}

// ─── Main MegaMenu ────────────────────────────────────────────────────────────

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const delayClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative hidden md:block"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={delayClose}
    >
      {/* Trigger */}
      <button
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
        style={{
          fontFamily: "var(--font-nobel)",
          backgroundColor: open ? "#CC9966" : "transparent",
          color: open ? "#FFFFFF" : "#2C2C2C",
          border: "1.5px solid",
          borderColor: open ? "#CC9966" : "#E0D5C8",
          letterSpacing: "0.06em",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        Shop
        {/* Chevron */}
        <svg
          viewBox="0 0 12 12"
          className="h-2.5 w-2.5 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* ── Dropdown Panel ──────────────────────────────────────────────── */}
      {open && (
        <div
          className="absolute left-1/2 top-[calc(100%+12px)] z-[100] w-[880px] -translate-x-1/3 overflow-hidden rounded-2xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 24px 64px rgba(44,44,44,0.14), 0 4px 16px rgba(44,44,44,0.06)",
            border: "1px solid rgba(204,153,102,0.15)",
          }}
        >
          {/* Thin gold top-border accent */}
          <div className="h-[2px] w-full" style={{ background: "linear-gradient(to right, transparent, #CC9966, transparent)" }} />

          <div className="flex">
            {/* ── Column 1: Category grid (2 cols) ───────────── */}
            <div className="flex-1 p-5">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA]"
                style={{ fontFamily: "var(--font-nobel)" }}
              >
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-0.5">
                {CATEGORIES.map((cat) => (
                  <CategoryTile key={cat.handle} cat={cat} onClose={() => setOpen(false)} />
                ))}
              </div>

              {/* View all */}
              <div className="mt-4 border-t border-[#F0EBE3] pt-4">
                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#CC9966] transition-colors hover:text-[#b8864d]"
                  style={{ fontFamily: "var(--font-nobel)" }}
                >
                  View all products
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── Divider ─────────────────────────────────────── */}
            <div className="w-px bg-[#F0EBE3]" />

            {/* ── Column 2: Curated picks ─────────────────────── */}
            <div className="w-[190px] flex-shrink-0 p-5">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA]"
                style={{ fontFamily: "var(--font-nobel)" }}
              >
                Curated For You
              </p>
              <ul className="flex flex-col gap-0.5">
                {CURATED.map((item) => (
                  <li key={item.handle}>
                    <Link
                      href={`/search/${item.handle}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-[#FAF7F2]"
                    >
                      <span
                        className="text-[13px] text-[#2C2C2C] transition-colors group-hover:text-[#CC9966]"
                        style={{ fontFamily: "var(--font-nobel)" }}
                      >
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.hot && (
                          <span
                            className="rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wider"
                            style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}
                          >
                            Hot
                          </span>
                        )}
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                          fill="none"
                          stroke="#CC9966"
                          strokeWidth="2"
                        >
                          <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Promise badges */}
              <div className="mt-6 border-t border-[#F0EBE3] pt-4">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA]"
                  style={{ fontFamily: "var(--font-nobel)" }}
                >
                  Our Promise
                </p>
                {["100% Organic", "No Preservatives", "Traditionally Processed"].map((badge) => (
                  <div key={badge} className="mb-1.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#CC9966" }} />
                    <span
                      className="text-[11px] text-[#777777]"
                      style={{ fontFamily: "var(--font-nobel)" }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Divider ─────────────────────────────────────── */}
            <div className="w-px bg-[#F0EBE3]" />

            {/* ── Column 3: Editorial feature image ───────────── */}
            <div className="relative w-[220px] flex-shrink-0 overflow-hidden">
              {/* Full-height image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=440&h=700&fit=crop&auto=format&q=85"
                  alt="Organic living foods"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.2) 50%, transparent 100%)" }}
                />
              </div>

              {/* Text overlay */}
              <div className="relative flex h-full flex-col justify-end p-5">
                <span
                  className="mb-1 text-[9px] uppercase tracking-[0.25em] text-[#CC9966]"
                  style={{ fontFamily: "var(--font-nobel)" }}
                >
                  Featured
                </span>
                <h3
                  className="mb-1 text-lg leading-tight text-white"
                  style={{ fontFamily: "var(--font-bronela)" }}
                >
                  Living Foods
                </h3>
                <p
                  className="mb-4 text-[11px] leading-relaxed text-white/70"
                  style={{ fontFamily: "var(--font-nobel)" }}
                >
                  Ancient wisdom. Modern nutrition. Sprouted &amp; alive.
                </p>
                <Link
                  href="/search/living-foods-sprouted-grains-flours"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium text-white transition-all hover:bg-white/20"
                  style={{
                    fontFamily: "var(--font-nobel)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Explore Range
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
