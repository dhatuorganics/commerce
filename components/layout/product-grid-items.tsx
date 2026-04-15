import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <li key={product.handle} className="animate-fadeIn">
          <Link
            className="group block"
            href={`/${product.handle}`}
            prefetch={true}
          >
            {/* Image container — portrait aspect, cream background */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#EDE6D8] bg-[#F5F0E8] transition-colors duration-300 group-hover:border-[#CC9966] dark:border-neutral-800 dark:bg-neutral-900">
              {product.featuredImage?.url ? (
                <Image
                  alt={product.title}
                  src={product.featuredImage.url}
                  fill
                  className="object-contain p-4 transition duration-300 ease-in-out group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl opacity-30">
                  🌿
                </div>
              )}
            </div>

            {/* Product info below image */}
            <div className="mt-3 px-0.5">
              <h3 className="line-clamp-2 text-sm font-medium leading-snug text-[#1C1812] transition-colors group-hover:text-[#CC9966] dark:text-white">
                {product.title}
              </h3>
              <Price
                className="mt-1 text-sm font-semibold text-[#CC9966]"
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                currencyCodeClassName="hidden"
              />
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
