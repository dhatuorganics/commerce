import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";

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
      <HeroBanner />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
