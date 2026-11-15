/** The little spruce used as logo mark, favicon and divider ornament. Hand-cut feel: slightly uneven tiers. */
export default function TreeMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} fill="currentColor">
      {title && <title>{title}</title>}
      <path d="M20 2 L28.5 15.5 L24 15.2 L33 28.5 L27.2 28 L37.5 42 L22.2 41.4 L22.4 50 L18.1 50 L18.3 41.4 L2.6 42 L12.6 28 L7 28.4 L16 15.3 L11.4 15.6 Z" />
    </svg>
  );
}
