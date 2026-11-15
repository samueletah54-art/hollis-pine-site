/** A hand-drawn map of the farm. Illustrative only: redraw it to match the real farm (see CLIENT-TO-CONFIRM.md). */
const rnd = (n: number) => {
  const x = Math.sin(n * 91.7 + 17.3) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

/** rows of tiny spruce marks inside a field */
const Rows = ({ x, y, w, h, cols, rows, seed, order = 0 }: { x: number; y: number; w: number; h: number; cols: number; rows: number; seed: number; order?: number }) => (
  <g fill="#1f3a2d" data-field="" style={{ transitionDelay: `${order * 280}ms` }}>
    {Array.from({ length: rows * cols }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const px = x + (w * (c + 0.5)) / cols + rnd(seed + i) * 5;
      const py = y + (h * (r + 0.5)) / rows + rnd(seed + i + 99) * 4;
      return <path key={i} d={`M${px} ${py - 8} L${px + 5} ${py + 3} L${px - 5} ${py + 3} Z`} />;
    })}
  </g>
);

const Label = ({ x, y, children, size = 26, anchor = "middle" }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} className="hand" fontSize={size} fill="#2b2118">{children}</text>
);

export default function FarmMap({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg viewBox="0 0 960 600" role="img" aria-labelledby="fm-t fm-d" className="w-full h-auto">
        <title id="fm-t">Hand-drawn map of the farm</title>
        <desc id="fm-d">
          Five tree fields on a hillside: a Fraser block, Noble hill, Balsam hollow, a Scotch pine strip and a blue spruce field. A creek runs between them. At the bottom a packing barn and loading dock sit beside the lane that leads to the road.
        </desc>

        <rect x="6" y="6" width="948" height="588" fill="#eadfc6" stroke="#5a4130" strokeWidth="3" />
        <rect x="16" y="16" width="928" height="568" fill="none" stroke="#5a4130" strokeWidth="1.2" />

        {/* hill contours */}
        <g fill="none" stroke="#7e5f36" strokeWidth="1.4" opacity=".45" strokeLinecap="round">
          <path d="M40 150 Q220 60 430 110 T760 70 T930 120" />
          <path d="M40 190 Q230 110 430 156 T770 118 T930 160" />
          <path d="M40 230 Q240 160 440 200 T780 166 T930 200" />
        </g>

        {/* creek */}
        <path d="M24 330 C150 300 210 380 340 350 S560 300 640 360 S820 420 936 380" fill="none" stroke="#1f3a2d" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" opacity=".65" />
        <Label x={60} y={316} size={22} anchor="start">creek</Label>

        {/* fields */}
        <g stroke="#5a4130" strokeWidth="2" fill="#dccfae">
          <path d="M60 80 L330 74 L342 262 L72 276 Z" />
          <path d="M370 86 L620 80 L630 250 L378 262 Z" />
          <path d="M660 92 L915 86 L922 238 L668 250 Z" />
          <path d="M70 416 L330 408 L340 520 L84 528 Z" />
          <path d="M380 420 L620 418 L630 524 L392 530 Z" />
        </g>
        <Rows x={74} y={92} w={256} h={164} cols={9} rows={5} seed={1} order={0} />
        <Rows x={386} y={98} w={226} h={144} cols={8} rows={5} seed={50} order={1} />
        <Rows x={674} y={104} w={238} h={126} cols={8} rows={4} seed={90} order={2} />
        <Rows x={92} y={424} w={236} h={92} cols={8} rows={3} seed={130} order={3} />
        <Rows x={398} y={432} w={220} h={84} cols={8} rows={3} seed={170} order={4} />

        <Label x={200} y={66} size={30}>Fraser block</Label>
        <Label x={494} y={66} size={30}>Noble hill</Label>
        <Label x={790} y={74} size={30}>Balsam hollow</Label>
        <Label x={206} y={400} size={26}>Scotch pine strip</Label>
        <Label x={504} y={408} size={26}>Blue spruce field</Label>

        {/* barn and dock */}
        <g stroke="#2b2118" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M700 480 L700 440 L760 412 L820 440 L820 480 Z" fill="#8c6b4c" />
          <path d="M692 444 L760 408 L828 444" fill="none" />
          <path d="M744 480 L744 452 L776 452 L776 480" fill="#5a4130" />
          <path d="M828 470 L884 470 L884 482 L828 482 Z" fill="#dccfae" />
        </g>
        <Label x={760} y={400} size={26}>packing barn</Label>
        <Label x={866} y={506} size={22}>loading dock</Label>

        {/* lane */}
        <path d="M640 520 C700 500 790 510 900 560" fill="none" stroke="#5a4130" strokeWidth="9" strokeLinecap="round" opacity=".25" />
        <path d="M640 520 C700 500 790 510 900 560" fill="none" stroke="#5a4130" strokeWidth="2" strokeDasharray="10 9" strokeLinecap="round" />
        <Label x={700} y={566} size={26}>lane to the road, and your door</Label>

        {/* compass and scale */}
        <g transform="translate(900 300)" stroke="#2b2118" strokeWidth="2.5" fill="#2b2118" strokeLinejoin="round">
          <path d="M0 -34 L9 8 L0 0 L-9 8 Z" />
          <text x="0" y="-42" textAnchor="middle" className="hand" fontSize="26" stroke="none">N</text>
        </g>
        <g stroke="#2b2118" strokeWidth="2.5" strokeLinecap="round">
          <path d="M40 568 L200 568" /><path d="M40 560 L40 576" /><path d="M120 563 L120 573" /><path d="M200 560 L200 576" />
        </g>
        <Label x={120} y={552} size={22}>about a 10 minute walk</Label>
        <Label x={480} y={300} size={22}>(not to scale, drawn by hand)</Label>
      </svg>
      <figcaption className="sr-only">A hand-drawn map of the farm showing five tree fields, a creek, the packing barn and the lane to the road.</figcaption>
    </figure>
  );
}
