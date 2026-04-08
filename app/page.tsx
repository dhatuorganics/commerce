import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";
import CategoryCircles from "components/category-circles";
import PhilosophyStrip from "components/philosophy-strip";
import TrustBadges from "components/trust-badges";
import ProductRow from "components/product-row";
import MarqueeBand from "components/marquee-band";
import SproutedMarquee from "components/sprouted-marquee";

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

      {/* 6. Featured Products — grid, no scroll */}
      <ProductRow
        title="Featured Products"
        eyebrow="Handpicked for You"
        collection="featured-products"
        viewAllHref="/search/featured-products"
        layout="grid"
      />

      {/* 7. Daily Essentials — 2-row grid */}
      <ProductRow
        title="Daily Essentials"
        eyebrow="Stock Your Pantry"
        collection="everyday-essentials"
        viewAllHref="/search/everyday-essentials"
        layout="grid"
      />

      {/* 8. Sprouted flour marquee — links to product pages */}
      <SproutedMarquee />

      {/* 9. Living Food — The Sprouted Goodness */}
      <ThreeItemGrid />

      {/* 10. Philosophy strip */}
      <PhilosophyStrip />

      {/* 11. More From Our Range — static grid */}
      <Carousel />

      {/* 12. Footer */}
      <Footer />
    </>
  );
}
