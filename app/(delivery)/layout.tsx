import DlHeader from "@/components/delivery/DlHeader";
import DlFooter from "@/components/delivery/DlFooter";

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dl min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:border focus:border-black">Skip to content</a>
      <DlHeader />
      <main id="main" className="flex-1">{children}</main>
      <DlFooter />
    </div>
  );
}
