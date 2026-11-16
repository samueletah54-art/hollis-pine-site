import { CartProvider } from "./CartProvider";
import CartDrawer from "./CartDrawer";
import Header from "./Header";
import Footer from "./Footer";
import PromoBar from "./PromoBar";
import WhatsAppButton from "./WhatsAppButton";

/** Header, footer and cart for the US shop. The UK pages use their own chrome (components/uk). */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:border focus:border-ink">Skip to content</a>
      <PromoBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </CartProvider>
  );
}
