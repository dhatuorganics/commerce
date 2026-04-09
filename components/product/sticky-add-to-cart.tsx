"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export function StickyAddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  // Determine selected variant (same logic as AddToCart)
  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((v) => v.id === selectedVariantId)!;

  const isDisabled = !availableForSale || !selectedVariantId;
  const price = product.priceRange.maxVariantPrice;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        backgroundColor: "rgba(250,247,242,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(204,153,102,0.25)",
        boxShadow: "0 -4px 20px rgba(44,44,44,0.10)",
      }}
    >
      <div className="mx-auto flex max-w-screen-xl items-center gap-4">
        {/* Product info */}
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-sm font-medium"
            style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
          >
            {product.title}
          </p>
          <p
            className="text-sm font-semibold"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            <Price amount={price.amount} currencyCode={price.currencyCode} />
          </p>
        </div>

        {/* Add to Cart button */}
        <form
          className="flex-none"
          action={async () => {
            if (finalVariant) {
              addCartItem(finalVariant, product);
              addItemAction();
            }
          }}
        >
          <button
            disabled={isDisabled}
            aria-label={isDisabled ? "Add to cart unavailable" : "Add to cart"}
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: isDisabled ? "#aaa" : "#CC9966",
              fontFamily: "var(--font-nobel)",
            }}
          >
            <PlusIcon className="h-4 w-4" />
            {!availableForSale ? "Out of Stock" : "Add to Cart"}
          </button>
        </form>

        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </div>
    </div>
  );
}
