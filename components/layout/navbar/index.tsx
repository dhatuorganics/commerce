import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

const PAGE_LINKS = [
  { label: "About Us", href: "/pages/about-us" },
  { label: "Blog", href: "/pages/blog" },
  { label: "Our Restaurant & Stores", href: "/pages/our-restaurant-and-stores" },
  { label: "Events", href: "/pages/events" },
  { label: "Partner with Us", href: "/pages/partner-with-us" },
];

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(250,247,242,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(204,153,102,0.2)",
        boxShadow: "0 2px 16px rgba(44,44,44,0.06)",
      }}
    >
      {/* Main nav row: logo | search | cart */}
      <nav className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile: hamburger menu */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2"
          >
            <LogoSquare />
            <span
              className="hidden text-sm font-medium uppercase tracking-widest lg:block"
              style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
            >
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop: Shopify menu items (if any) */}
          {menu.length ? (
            <ul className="ml-8 hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-[#CC9966] hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>

        {/* Sign In + Cart */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            href={`https://${process.env.SHOPIFY_STORE_DOMAIN}/account/login`}
            className="hidden rounded-full border border-[#CC9966] px-4 py-1.5 text-xs font-medium text-[#CC9966] transition-colors hover:bg-[#CC9966] hover:text-white md:block"
            style={{ fontFamily: "var(--font-nobel)" }}
          >
            Sign In
          </Link>
          <CartModal />
        </div>
      </nav>

      {/* Secondary nav row: page links — desktop only */}
      <div
        className="hidden md:flex items-center justify-center gap-8 px-6 py-2"
        style={{ borderTop: "1px solid rgba(204,153,102,0.12)" }}
      >
        {PAGE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={true}
            className="text-xs font-medium tracking-wide transition-colors hover:text-[#CC9966]"
            style={{ fontFamily: "var(--font-nobel)", color: "#555" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
