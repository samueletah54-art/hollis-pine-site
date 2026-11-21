"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** A "Shop trees" bar pinned to the bottom of the screen on phones only. Left off the pages where it would be redundant. */
export default function StickyShopBar() {
  const path = usePathname();
  if (["/shop", "/cart", "/checkout"].some((p) => path === p || path.startsWith(p + "/"))) return null;
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-paper border-t-4 border-double border-bark/60 px-5 py-2.5 pb-[max(.625rem,env(safe-area-inset-bottom))]">
      <Link href="/shop" className="btn btn-primary w-full min-h-12">Shop trees</Link>
    </div>
  );
}
