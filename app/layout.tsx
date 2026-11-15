import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderBar from "@/components/OrderBar";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Hollis & Pine Tree Co. | Fresh-cut Christmas trees shipped across the U.S.", template: "%s | Hollis & Pine Tree Co." },
  description: "Family-grown Fraser, Balsam and Noble firs, cut to order and shipped fresh. Pre-lit artificial trees and commercial trees for lobbies, malls and storefronts.",
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#f4eee3", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: "US" }} />
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:border focus:border-ink">Skip to content</a>
          <OrderBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
