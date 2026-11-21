import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: "US" }} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
