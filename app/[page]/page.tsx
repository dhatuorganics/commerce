import Footer from "components/layout/footer";
import { ComboOffer } from "components/product/combo-offer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { StickyAddToCart } from "components/product/sticky-add-to-cart";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.page);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.page);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <div
        className="mx-auto max-w-[1400px] px-4 pt-4 pb-2"
        style={{ borderBottom: "1px solid rgba(204,153,102,0.1)" }}
      >
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-nobel)", color: "#AAA" }}>
          <Link href="/" className="transition-colors hover:text-[#CC9966]">Home</Link>
          <span style={{ color: "#DDD" }}>›</span>
          {product.tags[0] && (
            <>
              <span style={{ color: "#CCC" }}>{product.tags[0]}</span>
              <span style={{ color: "#DDD" }}>›</span>
            </>
          )}
          <span style={{ color: "#888" }}>{product.title}</span>
        </nav>
      </div>

      {/* ── Main 2-column product layout ──────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_480px] lg:gap-12 xl:grid-cols-[1fr_520px]">

          {/* Left: Gallery */}
          <div>
            <Suspense
              fallback={
                <div
                  className="aspect-square w-full rounded-2xl"
                  style={{ backgroundColor: "#FAF7F2" }}
                />
              }
            >
              <Gallery
                images={product.images.slice(0, 8).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Right: Description, variants, ATC, accordions */}
          <div>
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>

        </div>

        {/* ── Combo Offer + Related Products ────────────────── */}
        <ProductExtras id={product.id} mainProduct={product} />
      </div>

      <Footer />

      {/* Sticky Add-to-Cart bar on scroll */}
      <Suspense fallback={null}>
        <StickyAddToCart product={product} />
      </Suspense>
    </>
  );
}

/* Fetches recommendations once — first item goes to ComboOffer,
   remaining items go to the "You May Also Like" grid. */
async function ProductExtras({
  id,
  mainProduct,
}: {
  id: string;
  mainProduct: Parameters<typeof ComboOffer>[0]["mainProduct"];
}) {
  const recs = await getProductRecommendations(id);
  if (!recs.length) return null;

  const [comboProduct, ...rest] = recs;
  const relatedProducts = rest.slice(0, 5);

  return (
    <>
      {/* ── Combo Offer ─────────────────────────────────────── */}
      {comboProduct && (
        <ComboOffer mainProduct={mainProduct} comboProduct={comboProduct} />
      )}

      {/* ── You May Also Like ────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(204,153,102,0.15)" }}>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(204,153,102,0.2)" }} />
            <div className="flex items-center gap-2">
              <span style={{ color: "#CC9966", fontSize: "10px" }}>✦</span>
              <h2
                className="text-[10px] uppercase tracking-[0.45em]"
                style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
              >
                You May Also Like
              </h2>
              <span style={{ color: "#CC9966", fontSize: "10px" }}>✦</span>
            </div>
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(204,153,102,0.2)" }} />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.handle}
                href={`/${rel.handle}`}
                prefetch={true}
                className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{ border: "1px solid rgba(204,153,102,0.15)", backgroundColor: "#FAF7F2" }}
              >
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
                  {rel.featuredImage?.url && (
                    <NextImage
                      alt={rel.title}
                      src={rel.featuredImage.url}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <p
                    className="line-clamp-2 text-xs font-medium leading-snug"
                    style={{ fontFamily: "var(--font-nobel)", color: "#2C2C2C" }}
                  >
                    {rel.title}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ fontFamily: "var(--font-nobel)", color: "#CC9966" }}
                  >
                    {rel.priceRange.minVariantPrice.currencyCode === "INR" ? "₹" : ""}
                    {parseFloat(rel.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
