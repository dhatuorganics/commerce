import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";
import CategoryCircles from "components/category-circles";
import PhilosophyStrip from "components/philosophy-strip";
import TrustBadges from "components/trust-badges";
import ProductRow from "components/product-row";
import MarqueeBand from "components/marquee-band";

export const metadata = {
  description:
    "Pure organic products crafted with ancient wisdom and modern wellness — Dhatu Organics.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Trust badges */}
      <TrustBadges />

      {/* 3. Category circles */}
      <CategoryCircles />

      {/* 4. Marquee band — differentiation strip */}
      <MarqueeBand />

      {/* 5. Best Selling Products — 2-row grid */}
      <ProductRow
        title="Best Selling Products"
        eyebrow="Customer Favourites"
        collection="best-selling-products"
        viewAllHref="/search/best-selling-products"
        layout="grid"
      />

      {/* 5. Featured Products */}
      <ProductRow
        title="Featured Products"
        eyebrow="Handpicked for You"
        collection="featured-products"
        viewAllHref="/search/featured-products"
      />

      {/* 6. Featured grid (hidden homepage collection) */}
      <ThreeItemGrid />

      {/* 7. Daily Essentials */}
      <ProductRow
        title="Daily Essentials"
        eyebrow="Stock Your Pantry"
        collection="everyday-essentials"
        viewAllHref="/search/everyday-essentials"
        layout="grid"
      />

      {/* 8. Philosophy strip */}
      <PhilosophyStrip />

      {/* 9. Product carousel */}
      <Carousel />

      {/* 9. Footer */}
      <Footer />
    </>
  );
}
