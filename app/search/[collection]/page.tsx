import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import FilterItemDropdown from "components/layout/search/filter/dropdown";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const collection = await getCollection(params.collection);
  if (!collection) return notFound();

  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  return (
    <section>
      {/* Collection header */}
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-700">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#CC9966]">
            Our Collection
          </p>
          <h1 className="text-2xl font-bold text-[#1C1812] dark:text-white">
            {collection.title}
          </h1>
          {products.length > 0 && (
            <p className="mt-1 text-sm text-neutral-500">
              {products.length} {products.length === 1 ? "product" : "products"}
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
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </ul>
      )}
    </section>
  );
}
