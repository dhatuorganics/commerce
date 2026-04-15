import FilterItemDropdown from "components/layout/search/filter/dropdown";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";
import { Suspense } from "react";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {/* Header bar */}
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-700">
        <div>
          {searchValue ? (
            <p className="text-lg text-[#1C1812] dark:text-white">
              {products.length === 0
                ? "No products match "
                : `${products.length} ${resultsText} for `}
              <span className="font-bold">&quot;{searchValue}&quot;</span>
            </p>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-widest text-[#CC9966]">
              All Products
            </p>
          )}
        </div>
        <div className="flex-none">
          <Suspense fallback={null}>
            <FilterItemDropdown list={sorting} />
          </Suspense>
        </div>
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </ul>
      ) : null}
    </>
  );
}
