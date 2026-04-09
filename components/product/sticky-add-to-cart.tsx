"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

export function StickyAddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, formAction] = useActionState(addItem, null);
  const [qty, setQty] = useState(1);

  // Determine selected variant from URL params (kept in sync with variant-selector)
  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, {
    variantId: selectedVariantId,
    quantity: qty,
  });
  const finalVariant = variants.find((v) => v.id === selectedVariantId)!;

  const isDisabled = !availableForSale || !selectedVariantId;
  const price = finalVariant?.price ?? product.priceRange.minVariantPrice;

  // All unique non-default variant options (e.g. "Size": ["250g", "500g", "1kg"])
  const hasVariants =
    variants.length > 1 &&
    !(variants.length === 1 && variants[0]?.title === "Default Title");

  // Change variant — update URL param so variant-selector stays in sync
  const selectVariant = (v: ProductVariant) => {
    const params = new URLSearchParams(searchParams.toString());
    v.selectedOptions.forEach((opt) => {
      params.set(opt.name.toLowerCase(), opt.value);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        backgroundColor: "rgba(250,247,242,0.98)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(204,153,102,0.25)",
        boxShadow: "0 -4px 24px rgba(44,44,44,0.10)",
      }}
    >
      <div className="mx-auto max-w-screen-xl">
        {/* Top row: weight/size pills + qty stepper + ATC button */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Variant pills (500g / 1kg etc.) — hidden on very small screens if too many */}
          {hasVariants && (
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => {
                const isActive = v.id === selectedVariantId;
                const label =
                  v.title !== "Default Title" ? v.title : v.selectedOptions[0]?.value ?? v.title;
                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={!v.availableForSale}
                    onClick={() => selectVariant(v)}
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 disabled:opacity-40"
                    style={{
                      fontFamily: "var(--font-nobel)",
                      backgroundColor: isActive ? "#CC9966" : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : "#2C2C2C",
                      border: isActive ? "1.5px solid #CC9966" : "1.5px solid #E0D5C8",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          <span
            className="hidden text-sm font-semibold sm:block"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            <Price amount={price.amount} currencyCode={price.currencyCode} />
          </span>

          {/* Qty stepper */}
          <div
            className="flex items-center rounded-full"
            style={{ border: "1.5px solid #E0D5C8", backgroundColor: "#FAF7F2" }}
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
              style={{ color: "#CC9966" }}
            >
              <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span
              className="w-7 text-center text-sm font-medium"
              style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
            >
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
              style={{ color: "#CC9966" }}
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Add to Cart */}
          <form
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
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: isDisabled ? "#aaa" : "#CC9966",
                fontFamily: "var(--font-nobel)",
              }}
            >
              <PlusIcon className="h-4 w-4" />
              {!availableForSale ? "Out of Stock" : "Add to Cart"}
            </button>
          </form>
        </div>

        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </div>
    </div>
  );
}
