/**
 * Hand-drawn height chart: 5 ft, 7 ft and 9 ft trees standing next to a door (6 ft 8 in) and a person (5 ft 8 in).
 * Scale: 34 px per foot. The strokes are deliberately a little uneven.
 */
const FT = 34;
const FLOOR = 372;
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x) - 0.5;
};

const tree = (cx: number, ft: number, seed: number) => {
  const h = ft * FT;
  const top = FLOOR - h;
  const trunk = 16;
  const tiers = ft < 6 ? 3 : ft < 8 ? 4 : 5;
  const crownBottom = FLOOR - trunk;
  const crownH = crownBottom - top;
  const maxW = Math.max(46, h * 0.52);
  const paths: string[] = [];
  for (let i = 0; i < tiers; i++) {
    const t0 = top + (crownH * i) / tiers - (i ? crownH / tiers / 3 : 0);
    const t1 = top + (crownH * (i + 1)) / tiers;
    const w = (maxW * (i + 1.3)) / (tiers + 0.3);
    const j = (k: number) => rnd(seed + i * 7 + k) * 4;
    paths.push(
      `M${cx + j(1)} ${t0 + j(2)} L${cx + w / 2 + j(3)} ${t1 + j(4)} Q${cx + j(5)} ${t1 + 5 + j(6)} ${cx - w / 2 + j(7)} ${t1 + j(8)} Z`,
    );
  }
  return { paths, trunk: `M${cx - 6} ${crownBottom} L${cx - 6} ${FLOOR} L${cx + 6} ${FLOOR} L${cx + 6} ${crownBottom} Z`, top };
};

export default function HeightChart({ className = "" }: { className?: string }) {
  const trees = [
    { ft: 5, cx: 380 },
    { ft: 7, cx: 560 },
    { ft: 9, cx: 770 },
  ].map((t, i) => ({ ...t, ...tree(t.cx, t.ft, i * 31 + 3) }));

  const doorH = 6.67 * FT;
  const personH = 5.67 * FT;

  return (
    <figure className={className}>
      <svg viewBox="0 0 900 430" role="img" aria-labelledby="hc-title hc-desc" className="w-full h-auto text-ink">
        <title id="hc-title">Height chart: 5 ft, 7 ft and 9 ft trees beside a door and a person</title>
        <desc id="hc-desc">
          Three trees drawn to scale. The 5 ft tree is shorter than the person. The 7 ft tree is a little taller than the door. The 9 ft tree towers over both and needs a ceiling of at least 10 ft.
        </desc>

        {/* ruler */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7">
          <path d={`M44 ${FLOOR} L44 ${FLOOR - 10 * FT}`} />
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <path d={`M44 ${FLOOR - i * FT} L${i % 5 === 0 ? 62 : 54} ${FLOOR - i * FT}`} />
              {i % 2 === 0 && i > 0 && (
                <text x="22" y={FLOOR - i * FT + 5} fontSize="14" fill="currentColor" stroke="none" textAnchor="middle" className="num">{i}</text>
              )}
            </g>
          ))}
        </g>
        <text x="22" y="10" fontSize="13" fill="currentColor" textAnchor="middle" opacity=".7">ft</text>

        {/* ceiling line at 8 ft */}
        <path d={`M70 ${FLOOR - 8 * FT} L880 ${FLOOR - 8 * FT}`} stroke="currentColor" strokeWidth="2" strokeDasharray="9 8" strokeLinecap="round" opacity=".55" />
        <text x="300" y={FLOOR - 8 * FT - 10} textAnchor="start" className="hand" fontSize="24" fill="currentColor" opacity=".85">a standard 8 ft ceiling</text>

        {/* floor */}
        <path d={`M60 ${FLOOR + 1} Q300 ${FLOOR - 3} 520 ${FLOOR + 2} T880 ${FLOOR}`} stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* door */}
        <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none">
          <path d={`M92 ${FLOOR} L92 ${FLOOR - doorH} L176 ${FLOOR - doorH + 1} L177 ${FLOOR}`} />
          <path d={`M102 ${FLOOR - 14} L102 ${FLOOR - doorH / 2 - 6} L166 ${FLOOR - doorH / 2 - 5} L166 ${FLOOR - 14} Z`} strokeWidth="1.8" />
          <path d={`M102 ${FLOOR - doorH / 2 - 22} L102 ${FLOOR - doorH + 14} L166 ${FLOOR - doorH + 15} L166 ${FLOOR - doorH / 2 - 22} Z`} strokeWidth="1.8" />
          <circle cx="158" cy={FLOOR - doorH / 2 + 6} r="4.5" fill="currentColor" />
        </g>
        <text x="128" y={FLOOR + 28} textAnchor="middle" className="hand" fontSize="22" fill="currentColor">door 6'8"</text>

        {/* person: a plain silhouette, no face */}
        <g fill="currentColor" opacity=".88">
          <circle cx="232" cy={FLOOR - personH + 13} r="13" />
          <path d={`M217 ${FLOOR - personH + 30} Q232 ${FLOOR - personH + 24} 247 ${FLOOR - personH + 30} L251 ${FLOOR - 70} L243 ${FLOOR - 70} L242 ${FLOOR} L233 ${FLOOR} L232 ${FLOOR - 66} L231 ${FLOOR} L222 ${FLOOR} L221 ${FLOOR - 70} L213 ${FLOOR - 70} Z`} />
        </g>
        <text x="236" y={FLOOR + 28} textAnchor="middle" className="hand" fontSize="22" fill="currentColor">you 5'8"</text>

        {/* trees */}
        {trees.map((t) => (
          <g key={t.ft}>
            <path d={t.trunk} fill="#5a4130" />
            {t.paths.map((d, i) => (
              <path key={i} d={d} fill="#1f3a2d" stroke="#12281d" strokeWidth="2" strokeLinejoin="round" />
            ))}
            <path d={`M${t.cx} ${t.top - 12} l4 10 l10 1 l-8 7 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -7 l10 -1 z`} fill="#dcc48f" stroke="#7e5f36" strokeWidth="1.2" />
            <text x={t.cx} y={FLOOR + 30} textAnchor="middle" className="hand" fontSize="30" fill="currentColor" fontWeight="600">{t.ft} ft</text>
          </g>
        ))}

        {/* arrows/notes */}
        <text x="380" y={FLOOR - 5 * FT - 36} textAnchor="middle" className="hand" fontSize="22" fill="currentColor">table or corner</text>
        <text x="560" y={FLOOR - 7 * FT - 40} textAnchor="middle" className="hand" fontSize="22" fill="currentColor">most living rooms</text>
        <text x="770" y={FLOOR - 9 * FT - 40} textAnchor="middle" className="hand" fontSize="22" fill="currentColor">needs a 10 ft ceiling</text>
      </svg>
      <figcaption className="sr-only">
        A 5 ft tree for a table or corner, a 7 ft tree for most living rooms, and a 9 ft tree for rooms with a ceiling of 10 ft or more.
      </figcaption>
    </figure>
  );
}
