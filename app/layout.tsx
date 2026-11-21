import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import { PromoProvider } from "@/components/PromoProvider";
import { promoState } from "@/lib/promo";

/** Rebuild the static pages hourly so the date-driven offer state (promo bar, sale prices) is never more than an hour stale. */
export const revalidate = 3600;

const fraunces = localFont({
  src: [
    // Weight is pinned to 400 (the only weight the serif is used at); the optical-size axis is kept. 35 KB instead of 67 KB.
    // Declared as "100 900" so the browser never fakes a bold on top of it.
    { path: "./fonts/fraunces-latin-opsz-400-normal.woff2", style: "normal", weight: "100 900" },
    // The italic is only used for the logo ampersand and product taglines at regular weight, so it is a 23 KB static cut instead of the 80 KB variable font.
    { path: "./fonts/fraunces-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const instrument = localFont({ src: "./fonts/instrument-sans-latin-wght-normal.woff2", weight: "400 700", variable: "--font-instrument", display: "swap", adjustFontFallback: "Arial" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Hollis & Pine Tree Co. | Fresh-cut Christmas trees shipped across the U.S.", template: "%s | Hollis & Pine" },
  description: "Fraser, Balsam and Noble firs cut to order and shipped fresh to your door. Pre-lit artificial trees, and big trees for hotels, shops and town squares.",
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#0f0d28", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <PromoProvider initial={promoState()}>{children}</PromoProvider>
      </body>
    </html>
  );
}
