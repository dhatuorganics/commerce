"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
        style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
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

export function ProductAccordions({
  description,
  ingredients,
}: {
  description?: string;
  ingredients?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const accordions: AccordionItem[] = [
    {
      id: "description",
      title: "About This Product",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 7v4M8 5.5v.5" strokeLinecap="round" />
        </svg>
      ),
      content: description ? (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ color: "#555" }}
        />
      ) : (
        <p>Crafted with care from the finest organically-grown ingredients, bringing nature&apos;s goodness directly to your table.</p>
      ),
    },
    {
      id: "why",
      title: "Why You'll Love It",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M8 13.5C4.5 11 1.5 8.5 1.5 5.5a3 3 0 015.5-1.7A3 3 0 0114.5 5.5C14.5 8.5 11.5 11 8 13.5z" />
        </svg>
      ),
      content: (
        <ul className="flex flex-col gap-2">
          {[
            "100% certified organic — no pesticides, no chemicals",
            "Stone-milled or traditionally processed to preserve nutrients",
            "Sourced directly from small-scale Indian farmers",
            "Free from artificial preservatives and additives",
            "Tested for purity and quality at every stage",
          ].map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#CC9966]">✦</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
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
      content: (
        <p>
          Use as directed on the packaging. Store in a cool, dry place away from direct sunlight.
          Once opened, consume within the recommended period and keep the container tightly sealed
          to preserve freshness and nutrients.
        </p>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      icon: (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="1" y="5" width="10" height="8" rx="1" />
          <path d="M11 7h2l2 3v3h-4V7z" />
          <circle cx="4" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <span className="mt-0.5 text-[#CC9966] flex-shrink-0">✦</span>
            <span><strong style={{ color: "#2C2C2C" }}>Free shipping</strong> on orders above ₹499 across India.</span>
          </div>
          <div className="flex gap-3">
            <span className="mt-0.5 text-[#CC9966] flex-shrink-0">✦</span>
            <span><strong style={{ color: "#2C2C2C" }}>3–5 business days</strong> standard delivery. Express options available at checkout.</span>
          </div>
          <div className="flex gap-3">
            <span className="mt-0.5 text-[#CC9966] flex-shrink-0">✦</span>
            <span>We accept returns for damaged or incorrect items within <strong style={{ color: "#2C2C2C" }}>7 days</strong> of delivery. Contact us at hello@dhatuorganics.com.</span>
          </div>
        </div>
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
