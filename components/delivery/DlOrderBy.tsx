"use client";

import { useEffect, useState } from "react";
import { ORDER_BY, pastOrderBy } from "@/lib/delivery";

/** "Order by Dec 12. 26 days left." Worked out in the browser so it is always today's count. */
export default function DlOrderBy() {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const now = new Date();
    if (pastOrderBy(now)) { setText("Order dates for this year have passed. Call us about a late tree."); return; }
    const end = new Date(now.getFullYear(), ORDER_BY.month - 1, ORDER_BY.day, 23, 59);
    const days = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000));
    const when = end.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    setText(`Order by ${when}. ${days} ${days === 1 ? "day" : "days"} left.`);
  }, []);
  return <span className="inline-block min-h-6" aria-live="polite">{text || "Order by December 12."}</span>;
}
