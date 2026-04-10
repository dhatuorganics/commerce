"use client";

import type { SortFilterItem } from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ListItem, PathFilterItem } from ".";

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;
  newParams.delete("q");

  return (
    <li className="mt-1" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-all duration-150 hover:bg-[#FAF7F2]"
        style={{
          fontFamily: "var(--font-nobel)",
          color: active ? "#CC9966" : "#555",
          fontWeight: active ? "500" : "400",
          cursor: active ? "default" : "pointer",
        }}
      >
        {active && (
          <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#CC9966" }} />
        )}
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-1 flex" key={item.title}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-all duration-150 hover:bg-[#FAF7F2]"
        style={{
          fontFamily: "var(--font-nobel)",
          color: active ? "#CC9966" : "#555",
          fontWeight: active ? "500" : "400",
          cursor: active ? "default" : "pointer",
        }}
      >
        {active && (
          <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#CC9966" }} />
        )}
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
