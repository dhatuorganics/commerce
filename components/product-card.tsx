"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState, useActionState } from "react";
import type { Product, ProductVariant } from "lib/shopify/types";
import Price from "./price";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);

  const selectedVariant: ProductVariant | undefined =
    product.variants[selectedVariantIndex];

  const hasMultipleVariants = product.variants.length > 1;
  const isAvailable = selectedVariant?.availableForSale ?? false;

  const addItemAction = formAction.bind(null, selectedVariant?.id);

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md"
      style={{ borderColor: "#CC996625", backgroundColor: "#FFFFFF" }}
    >
      {/* Image */}
      <Link href={`/${product.handle}`} className="relative block overflow-hidden" style={{ height: "200px" }}>
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-4xl"
            style={{ backgroundColor: "#F5F0E8" }}
          >
            🌿
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <Link href={`/${product.handle}`}>
          <h3
            className="mb-3 line-clamp-2 text-sm leading-snug hover:text-[#CC9966] transition-colors"
            style={{ fontFamily: "var(--font-bronela)", color: "#2C2C2C" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Variant selector */}
        {hasMultipleVariants && (
          <select
            value={selectedVariantIndex}
            onChange={(e) => setSelectedVariantIndex(parseInt(e.target.value))}
            className="mb-3 w-full rounded-lg border px-3 py-1.5 text-xs outline-none focus:ring-1"
            style={{
              borderColor: "#CC996640",
              fontFamily: "var(--font-nobel)",
              color: "#2C2C2C",
              backgroundColor: "#FAF7F2",
            }}
          >
            {product.variants.map((variant, i) => (
              <option key={variant.id} value={i}>
                {variant.title}
              </option>
            ))}
          </select>
        )}

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="text-xs uppercase tracking-wide"
            style={{ color: "#999999", fontFamily: "var(--font-nobel)" }}
          >
            Price:
          </span>
          <Price
            className="text-sm font-semibold"
            style={{ color: "#CC9966" }}
            amount={
              selectedVariant?.price.amount ??
              product.priceRange.minVariantPrice.amount
            }
            currencyCode={
              selectedVariant?.price.currencyCode ??
              product.priceRange.minVariantPrice.currencyCode
            }
          />
        </div>

        {/* Add to cart */}
        <form
          action={async () => {
            if (selectedVariant) {
              addCartItem(selectedVariant, product);
              addItemAction();
            }
          }}
          className="mt-auto"
        >
          <button
            type="submit"
            disabled={!isAvailable}
            className="w-full rounded-full py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: isAvailable ? "#2D5A27" : "#999999",
              fontFamily: "var(--font-nobel)",
            }}
          >
            {isAvailable ? "Add to Cart" : "Out of Stock"}
          </button>
        </form>

        {/* Error message */}
        {message && (
          <p className="mt-2 text-center text-xs" style={{ color: "#CC4444" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
