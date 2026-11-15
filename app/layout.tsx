import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderBar from "@/components/OrderBar";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-opsz-normal.woff2", style: "normal" },
    { path: "./fonts/fraunces-latin-opsz-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const instrument = localFont({ src: "./fonts/instrument-sans-latin-wght-normal.woff2", weight: "400 700", variable: "--font-instrument", display: "swap", adjustFontFallback: "Arial" });
const caveat = localFont({ src: "./fonts/caveat-latin-wght-normal.woff2", weight: "400 700", variable: "--font-caveat", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Hollis & Pine Tree Co. | Fresh-cut Christmas trees shipped across the U.S.", template: "%s | Hollis & Pine" },
  description: "Fraser, Balsam and Noble firs cut to order and shipped fresh to your door. Pre-lit artificial trees, and big trees for hotels, shops and town squares.",
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#f4ecda", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${caveat.variable}`}>
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
