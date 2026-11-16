import UkHeader from "@/components/uk/UkHeader";
import UkFooter from "@/components/uk/UkFooter";

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="uk min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:border focus:border-black">Skip to content</a>
      <UkHeader />
      <main id="main" className="flex-1">{children}</main>
      <UkFooter />
    </div>
  );
}
