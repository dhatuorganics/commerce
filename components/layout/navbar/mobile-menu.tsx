"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Search, { SearchSkeleton } from "./search";

const SHOP_CATEGORIES = [
  { label: "Sprouted Flours", handle: "living-foods-sprouted-grains-flours" },
  { label: "Nut & Seed Butters", handle: "nut-seed-butters" },
  { label: "Millets", handle: "millet" },
  { label: "Spices & Condiments", handle: "spices-condiments" },
  { label: "Herbal Supplements", handle: "health-supplements" },
  { label: "Oils & Ghee", handle: "cold-pressed-oils-ghee" },
  { label: "Rice", handle: "rice-is-life" },
  { label: "Fresh Produce", handle: "fresh-produce", badge: "BLR · MYS" },
];

const PAGE_LINKS = [
  { label: "About Us", href: "/pages/about-us" },
  { label: "Blog", href: "/pages/blog" },
  { label: "Our Restaurant & Stores", href: "/pages/our-restaurant-and-stores" },
  { label: "Events", href: "/pages/events" },
  { label: "Partner with Us", href: "/pages/partner-with-us" },
];

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(true);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    if (window.innerWidth > 768) setIsOpen(false);
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={openMobileMenu}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
        style={{ border: "1.5px solid rgba(204,153,102,0.4)", color: "#2C2C2C" }}
      >
        <Bars3Icon className="h-4 w-4" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel
              className="fixed bottom-0 left-0 top-0 flex w-[300px] flex-col overflow-y-auto"
              style={{ backgroundColor: "#FAF7F2" }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(204,153,102,0.15)" }}
              >
                <span
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
                >
                  Menu
                </span>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
                  style={{ color: "#2C2C2C" }}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(204,153,102,0.10)" }}>
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>

              {/* Shop accordion */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(204,153,102,0.10)" }}>
                <button
                  onClick={() => setShopExpanded((v) => !v)}
                  className="flex w-full items-center justify-between"
                >
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                  >
                    Shop
                  </span>
                  <ChevronDownIcon
                    className="h-4 w-4 transition-transform duration-200"
                    style={{
                      color: "#CC9966",
                      transform: shopExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {shopExpanded && (
                  <ul className="mt-3 flex flex-col gap-0.5">
                    {SHOP_CATEGORIES.map((cat) => (
                      <li key={cat.handle}>
                        <Link
                          href={`/search/${cat.handle}`}
                          onClick={closeMobileMenu}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-[#F0E8DC]"
                        >
                          <span
                            className="text-sm"
                            style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                          >
                            {cat.label}
                          </span>
                          {cat.badge && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                              style={{ backgroundColor: "#E8F5E9", color: "#2D6A4F" }}
                            >
                              {cat.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/search"
                        onClick={closeMobileMenu}
                        className="mt-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium"
                        style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
                      >
                        View all →
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Page links */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(204,153,102,0.10)" }}>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA]"
                  style={{ fontFamily: "var(--font-nobel)" }}
                >
                  Company
                </p>
                <ul className="flex flex-col gap-0.5">
                  {PAGE_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#F0E8DC]"
                        style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shopify nav items */}
              {menu.length > 0 && (
                <div className="px-5 py-4">
                  <ul className="flex flex-col gap-0.5">
                    {menu.map((item: Menu) => (
                      <li key={item.title}>
                        <Link
                          href={item.path}
                          onClick={closeMobileMenu}
                          className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#F0E8DC]"
                          style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom: promise strip */}
              <div className="mt-auto px-5 py-5" style={{ borderTop: "1px solid rgba(204,153,102,0.15)" }}>
                <div className="flex flex-wrap gap-2">
                  {["100% Organic", "No Preservatives", "Traditionally Processed"].map((b) => (
                    <span
                      key={b}
                      className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider"
                      style={{
                        backgroundColor: "#F0E8DC",
                        color: "#CC9966",
                        fontFamily: "var(--font-nobel)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
