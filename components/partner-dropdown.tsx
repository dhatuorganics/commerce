"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const PARTNER_LINKS = [
  {
    label: "Exports",
    href: "/pages/partner-with-us#exports",
    description: "Global distribution partnerships",
  },
  {
    label: "White Labelling",
    href: "/pages/partner-with-us#white-labelling",
    description: "Your brand, our expertise",
  },
  {
    label: "Franchise",
    href: "/pages/partner-with-us#franchise",
    description: "Open a Dhatu store",
  },
  {
    label: "Retail Stores",
    href: "/pages/partner-with-us#retail-stores",
    description: "Stock Dhatu in your store",
  },
];

export function PartnerDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className="flex items-center gap-1 text-xs font-medium tracking-wide transition-colors hover:text-[#CC9966]"
        style={{ fontFamily: "var(--font-nobel)", color: open ? "#CC9966" : "#555" }}
        aria-expanded={open}
      >
        Partner with Us
        <ChevronDownIcon
          className="h-3 w-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl shadow-xl"
          style={{
            backgroundColor: "#FAF7F2",
            border: "1px solid rgba(204,153,102,0.2)",
            boxShadow: "0 16px 40px rgba(44,44,44,0.12)",
          }}
        >
          {/* Gold top accent */}
          <div className="h-0.5 w-full" style={{ backgroundColor: "#CC9966" }} />

          <ul className="py-2">
            {PARTNER_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-[#F5EFE6]"
                >
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "var(--font-nobel)", color: "#999" }}
                  >
                    {link.description}
                  </span>
                </Link>
                {i < PARTNER_LINKS.length - 1 && (
                  <div
                    className="mx-4 h-px"
                    style={{ backgroundColor: "rgba(204,153,102,0.12)" }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* CTA footer */}
          <div
            className="px-4 py-3"
            style={{ borderTop: "1px solid rgba(204,153,102,0.15)" }}
          >
            <Link
              href="/pages/partner-with-us#contact"
              onClick={() => setOpen(false)}
              className="block text-center text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-[#CC9966]"
              style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
            >
              Contact Us →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
