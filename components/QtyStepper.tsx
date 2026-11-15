"use client";

export default function QtyStepper({ value, onChange, label, max = 20 }: { value: number; onChange: (n: number) => void; label: string; max?: number }) {
  return (
    <div className="inline-flex items-center border border-ink num" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className="w-9 h-9 text-lg leading-none hover:bg-ink hover:text-paper" aria-label="One fewer" onClick={() => onChange(value - 1)}>−</button>
      <span className="w-9 text-center" aria-live="polite">{value}</span>
      <button type="button" className="w-9 h-9 text-lg leading-none hover:bg-ink hover:text-paper" aria-label="One more" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
