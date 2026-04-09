"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useCart } from "./cart-context";

function QtyButton({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F0E8DC]"
      style={{ color: "#CC9966" }}
    >
      {icon}
    </button>
  );
}

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-[#CC9966] p-4 tracking-wide text-white transition-colors hover:bg-[#b8864d]";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, "hover:opacity-90")}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);
  const [qty, setQty] = useState(1);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, {
    variantId: selectedVariantId,
    quantity: qty,
  });
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity stepper */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs uppercase tracking-wide"
          style={{ fontFamily: "var(--font-nobel)", color: "#888" }}
        >
          Qty
        </span>
        <div
          className="flex items-center rounded-full"
          style={{
            border: "1px solid #E8DDD0",
            backgroundColor: "#FAF7F2",
          }}
        >
          <QtyButton
            label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            icon={<MinusIcon className="h-3.5 w-3.5" />}
          />
          <span
            className="w-8 text-center text-sm font-medium"
            style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
          >
            {qty}
          </span>
          <QtyButton
            label="Increase quantity"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            icon={<PlusIcon className="h-3.5 w-3.5" />}
          />
        </div>
      </div>

      {/* Add to Cart form */}
      <form
        action={async () => {
          addCartItem(finalVariant, product);
          addItemAction();
        }}
      >
        <SubmitButton
          availableForSale={availableForSale}
          selectedVariantId={selectedVariantId}
        />
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>
    </div>
  );
}
