/** A printed-catalogue divider: a double rule. Nothing drawn. */
export default function Divider({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return <div className={`border-t-[4px] border-double ${dark ? "border-straw/60" : "border-bark/60"} ${className}`} role="separator" aria-hidden="true" />;
}
