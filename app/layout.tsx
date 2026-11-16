import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
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

const garamond = localFont({
  src: [
    { path: "./fonts/eb-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/eb-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/eb-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-garamond",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", variable: "--font-inter", display: "swap", adjustFontFallback: "Arial" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Hollis & Pine Tree Co. | Fresh-cut Christmas trees shipped across the U.S.", template: "%s | Hollis & Pine" },
  description: "Fraser, Balsam and Noble firs cut to order and shipped fresh to your door. Pre-lit artificial trees, and big trees for hotels, shops and town squares.",
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#0e1712", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${garamond.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
