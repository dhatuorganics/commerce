"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const activeImage = images[imageIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-[90px]">
      {/* ── Main image ─────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "1 / 1",
          backgroundColor: "#FAF7F2",
          border: "1px solid rgba(204,153,102,0.15)",
        }}
      >
        {activeImage && (
          <Image
            className="h-full w-full object-contain transition-opacity duration-300"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={activeImage.altText || "Product image"}
            src={activeImage.src}
            priority={true}
          />
        )}

        {/* Subtle badge: image count */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(250,247,242,0.85)",
              color: "#888",
              fontFamily: "var(--font-nobel)",
              border: "1px solid rgba(204,153,102,0.2)",
            }}
          >
            {imageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => updateImage(index)}
                aria-label={`View image ${index + 1}`}
                className="relative flex-none overflow-hidden rounded-xl transition-all duration-200"
                style={{
                  width: "72px",
                  height: "72px",
                  border: isActive
                    ? "2px solid #CC9966"
                    : "2px solid rgba(204,153,102,0.2)",
                  backgroundColor: "#FAF7F2",
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                }}
              >
                <Image
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  src={image.src}
                  fill
                  sizes="72px"
                  className="object-contain p-1"
                />
                {/* Active glow overlay */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{ boxShadow: "inset 0 0 0 2px rgba(204,153,102,0.3)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Certification strip ─────────────────────────────────── */}
      <div
        className="mt-1 flex items-center justify-center gap-4 rounded-xl py-3"
        style={{
          backgroundColor: "rgba(204,153,102,0.06)",
          border: "1px solid rgba(204,153,102,0.12)",
        }}
      >
        {[
          { icon: "✦", label: "Certified Organic" },
          { icon: "◇", label: "Chemical Free" },
          { icon: "○", label: "Farm to Table" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span style={{ color: "#CC9966", fontSize: "10px" }}>{icon}</span>
            <span
              className="text-[9px] uppercase tracking-[0.15em]"
              style={{ color: "#AAA", fontFamily: "var(--font-nobel)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
