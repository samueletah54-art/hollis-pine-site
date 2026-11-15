/** A handwritten aside, set slightly crooked, like a note pencilled in the margin of a catalogue page. */
export default function Note({ children, className = "", tilt = -2 }: { children: React.ReactNode; className?: string; tilt?: number }) {
  return (
    <p className={`hand text-xl md:text-2xl text-bark border-l-2 border-tan/70 pl-3 ${className}`} style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "left center" }}>
      {children}
    </p>
  );
}
