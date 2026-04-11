"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NutritionTile } from "./nutrition-tile";
import type { NutritionData } from "./nutrition-tile";

export type { NutritionData };

type AccordionItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(44,44,44,0.1)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors duration-150 hover:opacity-70"
      >
        <span className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: "rgba(204,153,102,0.12)", color: "#CC9966" }}
          >
            {item.icon}
          </span>
          <span
            className="text-sm font-medium uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
          >
            {item.title}
          </span>
        </span>
        <ChevronDownIcon
          className="h-4 w-4 flex-shrink-0 transition-transform duration-300"
          style={{
            color: "#CC9966",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Animated content panel */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}

/* "About This Product" now lives below the combo section (in page.tsx).
   "Shipping & Returns" has been removed per brief.
   This component renders: Why You'll Love It · Ingredients · How To Use   */
export function ProductAccordions({
  whyLoveItPoints,
  ingredients,
  howToUse,
  nutritionData,
}: {
  whyLoveItPoints?: string[];
  ingredients?: string;
  howToUse?: string;
  nutritionData?: NutritionData;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const defaultWhyPoints = [
    "100% certified organic — no pesticides, no chemicals",
    "Stone-milled or traditionally processed to preserve nutrients",
    "Sourced directly from small-scale Indian farmers",
    "Free from artificial preservatives and additives",
    "Tested for purity and quality at every stage",
  ];

  const whyPoints =
    whyLoveItPoints && whyLoveItPoints.length > 0
      ? whyLoveItPoints
      : defaultWhyPoints;

  const accordions: AccordionItem[] = [
    {
      id: "why",
      title: "Why You'll Love It",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M8 13.5C4.5 11 1.5 8.5 1.5 5.5a3 3 0 015.5-1.7A3 3 0 0114.5 5.5C14.5 8.5 11.5 11 8 13.5z" />
        </svg>
      ),
      content: (
        <>
          <ul className="flex flex-col gap-2">
            {whyPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0 text-[#CC9966]">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {nutritionData && <NutritionTile data={nutritionData} />}
        </>
      ),
    },
    {
      id: "ingredients",
      title: "Ingredients",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 2C5 2 2.5 5 2.5 8s2.5 5.5 5.5 5.5c3 0 5.5-2 5.5-5 0-2-1.5-4-3-4.5" strokeLinecap="round" />
          <path d="M8 5v3l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      content: ingredients ? (
        <p>{ingredients}</p>
      ) : (
        <p>
          100% organic whole food ingredients. No added sugar, salt, preservatives, or artificial
          flavours. Please see the product packaging for the complete ingredient list.
        </p>
      ),
    },
    {
      id: "how-to-use",
      title: "How To Use",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      content: howToUse ? (
        <p>{howToUse}</p>
      ) : (
        <p>
          Use as directed on the packaging. Store in a cool, dry place away from direct sunlight.
          Once opened, consume within the recommended period and keep the container tightly sealed
          to preserve freshness and nutrients.
        </p>
      ),
    },
  ];

  return (
    <div
      className="mt-8 rounded-2xl px-5 py-2"
      style={{ backgroundColor: "#FAF7F2", border: "1px solid rgba(204,153,102,0.15)" }}
    >
      {accordions.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
