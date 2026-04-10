"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Curated category list ─────────────────────────────── */

const CATEGORIES = [
  {
    title: "All",
    path: "/search",
    icon: "○",
    emoji: false,
  },
  {
    title: "Living Foods",
    subtitle: "Sprouted Grains & Flours",
    path: "/search/living-foods-sprouted-grains-flours",
    icon: "🌱",
    emoji: true,
  },
  {
    title: "Activated Flours",
    path: "/search/activated-flours",
    icon: "🌾",
    emoji: true,
  },
  {
    title: "Millet",
    subtitle: "Ancient Grains",
    path: "/search/millet",
    icon: "🌿",
    emoji: true,
  },
  {
    title: "Nut & Seed Butters",
    path: "/search/nut-seed-butters",
    icon: "🥜",
    emoji: true,
  },
  {
    title: "Nuts & Seeds",
    path: "/search/nuts-seeds",
    icon: "🌰",
    emoji: true,
  },
  {
    title: "Dals, Pulses & Flours",
    path: "/search/dals-pulses-flours",
    icon: "🫘",
    emoji: true,
  },
  {
    title: "Fresh Produce",
    subtitle: "Bangalore · Mysore",
    path: "/search/fresh-produce",
    icon: "🥬",
    emoji: true,
  },
  {
    title: "Rice is Life",
    subtitle: "Heritage Varieties",
    path: "/search/rice-is-life",
    icon: "🍚",
    emoji: true,
  },
  {
    title: "Spices & Condiments",
    path: "/search/spices-condiments",
    icon: "✦",
    emoji: false,
  },
  {
    title: "Natural Sweeteners",
    path: "/search/natural-sweeteners",
    icon: "🍯",
    emoji: true,
  },
  {
    title: "Salt",
    subtitle: "Mineral-Rich",
    path: "/search/salt",
    icon: "◇",
    emoji: false,
  },
  {
    title: "Pickles",
    subtitle: "Traditional",
    path: "/search/pickles",
    icon: "🫙",
    emoji: true,
  },
  {
    title: "Baby Foods",
    subtitle: "Pure & Gentle",
    path: "/search/baby-foods",
    icon: "🌼",
    emoji: true,
  },
  {
    title: "Ready to Cook",
    path: "/search/ready-to-cook",
    icon: "🍲",
    emoji: true,
  },
] as const;

/* ─── Sidebar ───────────────────────────────────────────── */

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[80px] w-full">
      {/* Header */}
      <div
        className="mb-4 flex items-center gap-2 pb-3"
        style={{ borderBottom: "1px solid rgba(204,153,102,0.2)" }}
      >
        <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: "#CC9966" }} />
        <span
          className="text-[9px] uppercase tracking-[0.5em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          Categories
        </span>
      </div>

      {/* Category list */}
      <ul className="flex flex-col gap-0.5">
        {CATEGORIES.map((cat) => {
          const isAll = cat.path === "/search";
          const isActive = isAll
            ? pathname === "/search"
            : pathname === cat.path || pathname.startsWith(cat.path + "?");

          return (
            <li key={cat.path}>
              <Link
                href={cat.path}
                className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
                style={{
                  backgroundColor: isActive ? "rgba(204,153,102,0.1)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(204,153,102,0.25)"
                    : "1px solid transparent",
                }}
              >
                {/* Active bar */}
                {isActive && (
                  <div
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ backgroundColor: "#CC9966" }}
                  />
                )}

                {/* Icon */}
                <span
                  className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    fontSize: cat.emoji ? "16px" : "14px",
                    color: !cat.emoji
                      ? isActive
                        ? "#CC9966"
                        : "#888"
                      : undefined,
                    fontFamily: !cat.emoji ? "var(--font-nobel)" : undefined,
                    lineHeight: 1,
                    width: "20px",
                    textAlign: "center",
                  }}
                >
                  {cat.icon}
                </span>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-xs font-medium leading-tight transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-nobel)",
                      color: isActive ? "#CC9966" : "#2C2C2C",
                    }}
                  >
                    {cat.title}
                  </p>
                  {"subtitle" in cat && cat.subtitle && (
                    <p
                      className="mt-0.5 truncate text-[9px] leading-tight"
                      style={{ fontFamily: "var(--font-nobel)", color: "#AAA" }}
                    >
                      {cat.subtitle}
                    </p>
                  )}
                </div>

                {/* Active chevron */}
                {isActive && (
                  <svg
                    viewBox="0 0 8 8"
                    className="h-2 w-2 flex-shrink-0"
                    fill="none"
                    stroke="#CC9966"
                    strokeWidth="2"
                  >
                    <path d="M1 4h6M4 1l3 3-3 3" />
                  </svg>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bottom decorative element */}
      <div
        className="mt-6 flex items-center gap-2 pt-4"
        style={{ borderTop: "1px solid rgba(204,153,102,0.12)" }}
      >
        <span
          className="text-[8px] uppercase tracking-[0.4em] leading-5"
          style={{ color: "#CCC", fontFamily: "var(--font-nobel)" }}
        >
          100% Certified Organic
        </span>
      </div>
    </nav>
  );
}
