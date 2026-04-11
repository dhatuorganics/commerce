"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useActionState, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   ComboOffer — "Frequently Bought Together" section.
   Shows the current product + a recommended companion product with a small
   bundle discount, and lets the customer add both to cart in one click.
   ───────────────────────────────────────────────────────────────────────── */

function formatPrice(amount: string, currency: string) {
  const num = parseFloat(amount);
  if (currency === "INR") return `₹${num.toFixed(0)}`;
  return `${currency} ${num.toFixed(2)}`;
}

const BUNDLE_DISCOUNT_PCT = 5; // 5 % off when buying both

export function ComboOffer({
  mainProduct,
  comboProduct,
}: {
  mainProduct: Product;
  comboProduct: Product;
}) {
  const { addCartItem } = useCart();
  const [, formAction] = useActionState(addItem, null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const mainVariant = mainProduct.variants[0];
  const comboVariant = comboProduct.variants[0];

  if (!mainVariant || !comboVariant) return null;

  const mainPrice = parseFloat(mainProduct.priceRange.minVariantPrice.amount);
  const comboPrice = parseFloat(comboProduct.priceRange.minVariantPrice.amount);
  const combined = mainPrice + comboPrice;
  const discounted = combined * (1 - BUNDLE_DISCOUNT_PCT / 100);
  const saving = combined - discounted;
  const currency = mainProduct.priceRange.minVariantPrice.currencyCode;

  const handleAddBoth = async () => {
    if (adding) return;
    setAdding(true);
    try {
      // Add main product
      addCartItem(mainVariant, mainProduct);
      formAction({ variantId: mainVariant.id, quantity: 1 });
      // Small delay so cart optimistic update registers before second item
      await new Promise((r) => setTimeout(r, 120));
      // Add combo product
      addCartItem(comboVariant, comboProduct);
      formAction({ variantId: comboVariant.id, quantity: 1 });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setAdding(false);
      }, 2500);
    } catch {
      setAdding(false);
    }
  };

  return (
    <section
      className="mt-12 overflow-hidden rounded-3xl"
      style={{
        border: "1px solid rgba(204,153,102,0.2)",
        background: "linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0"
          style={{ backgroundColor: "rgba(204,153,102,0.2)", color: "#CC9966" }}
        >
          {/* Flame / hot icon */}
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M8 1C6.3 3.2 5.5 5 6.3 6.6c.3.6-.1 1.4-.8 1.4-.6 0-1-.5-.8-1.1C4 8.3 3.5 9.5 3.5 11c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C12.5 7 10.2 3.8 8 1z" />
          </svg>
        </span>
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Frequently Bought Together
          </p>
          <p
            className="text-[10px]"
            style={{ color: "rgba(250,247,242,0.45)", fontFamily: "var(--font-nobel)" }}
          >
            Customers who bought this also love
          </p>
        </div>
        {/* Savings badge */}
        <div
          className="ml-auto flex-shrink-0 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em]"
          style={{ backgroundColor: "rgba(74,107,60,0.25)", color: "#7EC87A" }}
        >
          Save {BUNDLE_DISCOUNT_PCT}%
        </div>
      </div>

      {/* Product pair */}
      <div className="flex items-center gap-3 px-6 py-5">
        {/* Main product */}
        <ProductTile product={mainProduct} label="This Item" />

        {/* Plus connector */}
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg font-light"
          style={{ backgroundColor: "rgba(204,153,102,0.15)", color: "#CC9966" }}
        >
          +
        </div>

        {/* Combo product */}
        <ProductTile product={comboProduct} label="Add This" />
      </div>

      {/* Pricing + CTA */}
      <div
        className="px-6 pb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Price breakdown */}
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-bronela)", color: "#FAF7F2" }}
            >
              {formatPrice(discounted.toFixed(2), currency)}
            </span>
            <span
              className="text-sm line-through"
              style={{ color: "rgba(250,247,242,0.35)", fontFamily: "var(--font-nobel)" }}
            >
              {formatPrice(combined.toFixed(2), currency)}
            </span>
          </div>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: "rgba(124,200,122,0.9)", fontFamily: "var(--font-nobel)" }}
          >
            You save {formatPrice(saving.toFixed(2), currency)} on this bundle
          </p>
        </div>

        {/* Add Both button */}
        <button
          type="button"
          onClick={handleAddBoth}
          disabled={adding}
          className="flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 disabled:cursor-wait"
          style={{
            backgroundColor: added ? "#4A6B3C" : "#CC9966",
            color: "#FAF7F2",
            fontFamily: "var(--font-nobel)",
            fontSize: "11px",
            minWidth: "180px",
          }}
        >
          {added ? (
            <>
              <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Both Added!
            </>
          ) : adding ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Adding…
            </>
          ) : (
            <>
              Add Bundle to Cart
              <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

/* Small product tile used inside the combo section */
function ProductTile({ product, label }: { product: Product; label: string }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="flex flex-1 items-center gap-3 min-w-0">
      {/* Thumbnail */}
      <div
        className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl"
        style={{ backgroundColor: "rgba(250,247,242,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {product.featuredImage?.url && (
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            sizes="64px"
            className="object-contain p-1.5"
          />
        )}
      </div>
      {/* Info */}
      <div className="min-w-0">
        <p
          className="mb-0.5 text-[9px] uppercase tracking-[0.2em]"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          {label}
        </p>
        <p
          className="line-clamp-2 text-xs font-medium leading-snug"
          style={{ color: "rgba(250,247,242,0.85)", fontFamily: "var(--font-nobel)" }}
        >
          {product.title}
        </p>
        <p
          className="mt-0.5 text-xs font-semibold"
          style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
        >
          {currency === "INR" ? "₹" : ""}{price.toFixed(0)}
        </p>
      </div>
    </div>
  );
}
