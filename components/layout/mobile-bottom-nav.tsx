"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function MobileBottomNav({ signInUrl }: { signInUrl: string }) {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: "Home", href: "/", icon: HomeIcon, external: false },
    { label: "Search", href: "/search", icon: SearchIcon, external: false },
    { label: "Sign In", href: signInUrl, icon: UserIcon, external: true },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
      style={{
        backgroundColor: "rgba(250,247,242,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(204,153,102,0.2)",
        boxShadow: "0 -2px 16px rgba(44,44,44,0.08)",
      }}
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon, external }) => {
        const isActive = !external && pathname === href;

        return (
          <Link
            key={label}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors"
            style={{ color: isActive ? "#CC9966" : "#888888" }}
          >
            <Icon />
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ fontFamily: "var(--font-nobel)" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
