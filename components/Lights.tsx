/** A decorative string of twinkling holiday lights (pure CSS animation). */
export default function Lights({ bulbs = 28 }: { bulbs?: number }) {
  return (
    <div className="lights" aria-hidden="true">
      {Array.from({ length: bulbs }, (_, i) => <i key={i} />)}
    </div>
  );
}
