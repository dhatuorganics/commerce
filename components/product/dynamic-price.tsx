"use client";

import Price from "components/price";
import { Money, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";

/**
 * Shows the price of whichever variant is currently selected in the URL.
 * Falls back to the first variant (single-variant products) or the given basePrice.
 */
export function DynamicPrice({
  variants,
  basePrice,
}: {
  variants: ProductVariant[];
  basePrice: Money;
}) {
  const searchParams = useSearchParams();

  const selectedVariant = variants.find((v) =>
    v.selectedOptions.every(
      (opt) => searchParams.get(opt.name.toLowerCase()) === opt.value,
    ),
  );

  const defaultVariant = variants.length === 1 ? variants[0] : undefined;
  const price = selectedVariant?.price ?? defaultVariant?.price ?? basePrice;

  return <Price amount={price.amount} currencyCode={price.currencyCode} />;
}
