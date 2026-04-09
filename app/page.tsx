import { AnimateIn } from "components/animate-in";
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
import ReviewsSection from "components/reviews-section";
import FreshProduceSection from "components/fresh-produce-section";
import { FreshProduceGate } from "components/fresh-produce-gate";
import VideoSection from "components/video-section";

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
      {/* 1. Hero Banner — parallax built-in */}
      <HeroBanner />

      {/* 2. Trust badges */}
      <AnimateIn direction="up" delay={0}>
        <TrustBadges />
      </AnimateIn>

      {/* 3. Category circles */}
      <AnimateIn direction="up" delay={60}>
        <CategoryCircles />
      </AnimateIn>

      {/* 4. Marquee band */}
      <MarqueeBand />

      {/* 5. Best Selling Products */}
      <AnimateIn direction="up" delay={0}>
        <ProductRow
          title="Best Selling Products"
          eyebrow="Customer Favourites"
          collection="best-selling-products"
          viewAllHref="/search/best-selling-products"
          layout="grid"
          maxItems={8}
        />
      </AnimateIn>

      {/* 6. Featured Products */}
      <AnimateIn direction="up" delay={0}>
        <ProductRow
          title="Featured Products"
          eyebrow="Handpicked for You"
          collection="featured-products"
          viewAllHref="/search/featured-products"
          layout="grid"
          maxItems={4}
        />
      </AnimateIn>

      {/* 7. Badge band */}
      <AnimateIn direction="none">
        <BadgeBand />
      </AnimateIn>

      {/* 8. Daily Essentials */}
      <AnimateIn direction="up" delay={0}>
        <ProductRow
          title="Daily Essentials"
          eyebrow="Stock Your Pantry"
          collection="everyday-essentials"
          viewAllHref="/search/everyday-essentials"
          layout="grid"
          maxItems={8}
        />
      </AnimateIn>

      {/* 9. Fresh Produce — location-gated */}
      <FreshProduceGate>
        <FreshProduceSection />
      </FreshProduceGate>

      {/* 10. Sprouted marquee */}
      <SproutedMarquee />

      {/* 11. Living Food */}
      <AnimateIn direction="up" delay={0}>
        <ThreeItemGrid />
      </AnimateIn>

      {/* 12. Philosophy strip */}
      <AnimateIn direction="up" delay={0}>
        <PhilosophyStrip />
      </AnimateIn>

      {/* 13. Blog section */}
      <AnimateIn direction="up" delay={0}>
        <BlogSection />
      </AnimateIn>

      {/* 14. Video section — "See It. Taste It. Feel It." */}
      <AnimateIn direction="none" duration={800}>
        <VideoSection />
      </AnimateIn>

      {/* 15. Customer reviews */}
      <AnimateIn direction="up" delay={0}>
        <ReviewsSection />
      </AnimateIn>

      {/* 16. More From Our Range */}
      <AnimateIn direction="up" delay={0}>
        <Carousel />
      </AnimateIn>

      {/* 17. Footer */}
      <Footer />
    </>
  );
}
