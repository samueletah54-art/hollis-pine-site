import TreeMark from "./TreeMark";

/** A printed-catalogue divider: two ruled lines with a small spruce between. Not a thin grey line. */
export default function Divider({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const c = dark ? "text-straw" : "text-bark";
  return (
    <div className={`flex items-center gap-4 ${c} ${className}`} role="separator" aria-hidden="true">
      <span className="flex-1 border-t-[3px] border-double border-current opacity-60" />
      <TreeMark className="w-4 h-5 shrink-0" />
      <span className="flex-1 border-t-[3px] border-double border-current opacity-60" />
    </div>
  );
}
