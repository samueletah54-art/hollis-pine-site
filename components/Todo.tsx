/**
 * Marks copy the owner must confirm before launch. Shows a visible "TODO" tag so it cannot be missed.
 * Set NEXT_PUBLIC_HIDE_TODO=1 in the hosting dashboard once everything is confirmed to hide every tag at once.
 * Every use is listed in CLIENT-TO-CONFIRM.md.
 */
export default function Todo({ children }: { children?: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_HIDE_TODO === "1") return null;
  return (
    <span className="inline-block align-baseline border border-dashed border-straw text-straw px-2 py-0.5 text-sm font-semibold">
      TODO{children ? <>: {children}</> : null}
    </span>
  );
}
