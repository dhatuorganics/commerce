import Footer from "components/layout/footer";
import { CollectionBanner } from "components/collection-banner";
import { CategorySidebar } from "components/layout/search/category-sidebar";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Full-width collection banner — client component reads pathname */}
      <Suspense fallback={null}>
        <CollectionBanner />
      </Suspense>

      {/* Main content: sidebar + products + sort */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 pb-8 pt-6 md:flex-row md:gap-8">

        {/* Left sidebar — curated categories */}
        <aside className="w-full flex-shrink-0 md:w-52">
          <CategorySidebar />
        </aside>

        {/* Product grid */}
        <main className="min-h-screen w-full flex-1">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </main>

        {/* Right — sort by */}
        <div className="flex-shrink-0 md:w-[130px]">
          <FilterList list={sorting} title="Sort by" />
        </div>

      </div>

      <Footer />
    </>
  );
}
