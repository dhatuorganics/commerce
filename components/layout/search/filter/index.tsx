import { SortFilterItem } from "lib/constants";
import { Suspense } from "react";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <nav>
        {title ? (
          <h3
            className="hidden md:flex items-center gap-2 pb-3 mb-2"
            style={{
              borderBottom: "1px solid rgba(204,153,102,0.2)",
              fontFamily: "var(--font-nobel)",
              fontSize: "9px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#CC9966",
            }}
          >
            <div style={{ width: "2px", height: "12px", backgroundColor: "#CC9966", borderRadius: "9999px" }} />
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <Suspense fallback={null}>
            <FilterItemList list={list} />
          </Suspense>
        </ul>
        <ul className="md:hidden">
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
