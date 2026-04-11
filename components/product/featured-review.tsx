"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   FeaturedReview — top social-proof card shown on the product page.

   Data flow:
   • Pass `review` prop from a review app (Judge.me / Yotpo / Okendo) when
     you integrate one.
   • Without a prop, the component renders a curated static review so the
     page always looks trustworthy.
   ───────────────────────────────────────────────────────────────────────── */

export type ReviewData = {
  author: string;
  location?: string;
  rating: number; // 1–5
  title: string;
  body: string;
  date?: string;
  verified?: boolean;
  helpfulCount?: number;
};

const DEFAULT_REVIEW: ReviewData = {
  author: "Priya S.",
  location: "Bangalore",
  rating: 5,
  title: "Finally — food I can trust completely",
  body: "I switched my family to Dhatu three months ago and the difference is remarkable. The quality is unlike anything I've found elsewhere — you can actually taste the freshness. My kids love it and I feel confident about what I'm feeding them.",
  date: "March 2025",
  verified: true,
  helpfulCount: 47,
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill={filled ? "#CC9966" : "none"}
      stroke="#CC9966"
      strokeWidth="1.2"
    >
      <path d="M8 1l1.85 3.75L14 5.6l-3 2.92.7 4.1L8 10.4l-3.7 2.22.7-4.1L2 5.6l4.15-.85z" />
    </svg>
  );
}

export function FeaturedReview({ review = DEFAULT_REVIEW }: { review?: ReviewData }) {
  const [helpful, setHelpful] = useState(false);
  const count = review.helpfulCount ?? 0;

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-2xl p-5"
      style={{
        background: "linear-gradient(135deg, rgba(204,153,102,0.07) 0%, rgba(250,247,242,0.9) 100%)",
        border: "1px solid rgba(204,153,102,0.2)",
      }}
    >
      {/* Top row: label + stars */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Quote mark */}
          <span
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-base font-bold leading-none"
            style={{ backgroundColor: "rgba(204,153,102,0.15)", color: "#CC9966" }}
          >
            ❝
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: "#CC9966", fontFamily: "var(--font-nobel)" }}
          >
            Top Review
          </span>
        </div>
        {/* Stars */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < review.rating} />
          ))}
        </div>
      </div>

      {/* Review title */}
      <p
        className="mb-2 text-sm font-semibold leading-snug"
        style={{ fontFamily: "var(--font-bronela)", color: "#1A1A1A", fontSize: "15px" }}
      >
        &ldquo;{review.title}&rdquo;
      </p>

      {/* Review body */}
      <p
        className="mb-4 text-xs leading-relaxed"
        style={{ color: "#555", fontFamily: "var(--font-nobel)" }}
      >
        {review.body}
      </p>

      {/* Author row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Avatar initial */}
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#CC9966", color: "#FAF7F2", fontFamily: "var(--font-nobel)" }}
          >
            {review.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: "#2C2C2C", fontFamily: "var(--font-nobel)" }}
              >
                {review.author}
              </span>
              {review.location && (
                <span
                  className="text-[10px]"
                  style={{ color: "#AAA", fontFamily: "var(--font-nobel)" }}
                >
                  · {review.location}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {review.verified && (
                <span
                  className="flex items-center gap-1 text-[9px] uppercase tracking-[0.15em]"
                  style={{ color: "#4A6B3C", fontFamily: "var(--font-nobel)" }}
                >
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 5l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified Buyer
                </span>
              )}
              {review.date && (
                <span
                  className="text-[9px]"
                  style={{ color: "#CCC", fontFamily: "var(--font-nobel)" }}
                >
                  · {review.date}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Helpful button */}
        <button
          type="button"
          onClick={() => setHelpful(true)}
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] transition-all duration-200"
          style={{
            border: `1px solid ${helpful ? "rgba(74,107,60,0.3)" : "rgba(204,153,102,0.2)"}`,
            backgroundColor: helpful ? "rgba(74,107,60,0.08)" : "transparent",
            color: helpful ? "#4A6B3C" : "#AAA",
            fontFamily: "var(--font-nobel)",
          }}
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill={helpful ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M2 5.5L4 2c.3 0 .8.2.8.8v1.7h3.5c.5 0 .9.4.8.9L8.4 8.2c-.1.3-.4.5-.7.5H2V5.5z" />
            <path d="M1 5.5h1V9H1z" strokeLinecap="round" />
          </svg>
          {helpful ? "Helpful!" : `Helpful (${count})`}
        </button>
      </div>

      {/* Social proof footer */}
      <div
        className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2"
        style={{ backgroundColor: "rgba(74,107,60,0.06)", border: "1px solid rgba(74,107,60,0.1)" }}
      >
        <span style={{ color: "#4A6B3C", fontSize: "11px" }}>✦</span>
        <p
          className="text-[10px] leading-relaxed"
          style={{ color: "#4A6B3C", fontFamily: "var(--font-nobel)" }}
        >
          <strong>2,400+ customers</strong> have made Dhatu a part of their daily wellness routine.
        </p>
      </div>
    </div>
  );
}
