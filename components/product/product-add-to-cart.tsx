"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { Product, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";

export function ProductAddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (opt) => searchParams.get(opt.name.toLowerCase()) === opt.value,
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId)!;
  const isDisabled = !availableForSale || !selectedVariantId;

  const handleAddToCart = async () => {
    if (!finalVariant || isDisabled) return;
    addCartItem(finalVariant, product);
    formAction.bind(null, { variantId: selectedVariantId, quantity: qty })();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity row */}
      <div className="flex items-center gap-4">
        <span
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: "#888", fontFamily: "var(--font-nobel)" }}
        >
          Quantity
        </span>
        <div
          className="flex items-center rounded-full"
          style={{ border: "1.5px solid #E0D5C8", backgroundColor: "#FAF7F2" }}
        >
          <button
            type="button"
            aria-label="Decrease"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
            style={{ color: "#CC9966" }}
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>
          <span
            className="w-8 text-center text-sm font-medium"
            style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
          >
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
            style={{ color: "#CC9966" }}
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className="flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          backgroundColor: isDisabled ? "#CCC" : added ? "#4A6B3C" : "#CC9966",
          color: "#FAF7F2",
          fontFamily: "var(--font-nobel)",
          fontSize: "13px",
          letterSpacing: "0.25em",
        }}
      >
        {!availableForSale ? (
          "Out of Stock"
        ) : added ? (
          <>
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            Add to Cart
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only" role="status">{message}</p>
    </div>
  );
}
