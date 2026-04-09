"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-6">
        <dt
          className="mb-3 text-xs uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-nobel)", color: "#888888" }}
        >
          {option.name}
        </dt>
        <dd className="flex flex-wrap gap-2">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                className={clsx(
                  "min-w-[56px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  {
                    // Active state: filled gold
                    "bg-[#CC9966] text-white shadow-sm": isActive,
                    // Inactive available: outline
                    "border border-[#E0D5C8] bg-white text-[#2C2C2C] hover:border-[#CC9966] hover:text-[#CC9966]":
                      !isActive && isAvailableForSale,
                    // Out of stock: muted strikethrough
                    "relative cursor-not-allowed border border-[#E8E8E8] bg-[#F8F8F8] text-[#BBBBBB] before:absolute before:inset-x-2 before:top-1/2 before:h-px before:-rotate-12 before:bg-[#CCCCCC]":
                      !isAvailableForSale,
                  },
                )}
                style={{ fontFamily: "var(--font-nobel)" }}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
