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
import BadgeBand from "components/badge-band";
import BlogSection from "components/blog-section";

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

      {/* 2. Badge band — brand credibility stats */}
      <BadgeBand />

      {/* 3. Trust badges */}
      <TrustBadges />

      {/* 4. Category circles */}
      <CategoryCircles />

      {/* 5. Marquee band — differentiation strip */}
      <MarqueeBand />

      {/* 6. Best Selling Products — 2-row grid (8 products) */}
      <ProductRow
        title="Best Selling Products"
        eyebrow="Customer Favourites"
        collection="best-selling-products"
        viewAllHref="/search/best-selling-products"
        layout="grid"
        maxItems={8}
      />

      {/* 7. Featured Products — 1-row grid (4 products) */}
      <ProductRow
        title="Featured Products"
        eyebrow="Handpicked for You"
        collection="featured-products"
        viewAllHref="/search/featured-products"
        layout="grid"
        maxItems={4}
      />

      {/* 8. Daily Essentials — 2-row grid */}
      <ProductRow
        title="Daily Essentials"
        eyebrow="Stock Your Pantry"
        collection="everyday-essentials"
        viewAllHref="/search/everyday-essentials"
        layout="grid"
        maxItems={8}
      />

      {/* 9. Sprouted flour marquee — links to product pages */}
      <SproutedMarquee />

      {/* 10. Living Food — The Sprouted Goodness */}
      <ThreeItemGrid />

      {/* 11. Philosophy strip */}
      <PhilosophyStrip />

      {/* 12. Blog section — 2 latest articles */}
      <BlogSection />

      {/* 13. More From Our Range — static grid */}
      <Carousel />

      {/* 14. Footer */}
      <Footer />
    </>
  );
}
