import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { MobileBottomNav } from "components/layout/mobile-bottom-nav";
import { WelcomeToast } from "components/welcome-toast";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const { SITE_NAME, SHOPIFY_STORE_DOMAIN } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  const signInUrl = `https://${SHOPIFY_STORE_DOMAIN}/account/login`;

  return (
    <html lang="en">
      <body
        className="bg-[#FAF7F2] text-[#2C2C2C] selection:bg-[#CC9966] selection:text-white"
        style={{ fontFamily: "var(--font-nobel)" }}
      >
        <CartProvider cartPromise={cart}>
          <Navbar />
          {/* pb-16 on mobile reserves space above the sticky bottom nav */}
          <main className="pb-16 md:pb-0">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
          {/* Mobile-only sticky bottom nav — Home, Search, Sign In */}
          <MobileBottomNav signInUrl={signInUrl} />
        </CartProvider>
      </body>
    </html>
  );
}
