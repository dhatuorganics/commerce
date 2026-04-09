"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

/**
 * AnimateIn — wraps any content and fades/slides it in when scrolled into view.
 * Uses IntersectionObserver (zero scroll listener overhead).
 */
export function AnimateIn({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  distance = 28,
  threshold = 0.12,
  className = "",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;       // ms
  duration?: number;    // ms
  distance?: number;    // px
  threshold?: number;   // 0–1
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const translate: Record<Direction, string> = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate[direction],
        transition: `opacity ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
