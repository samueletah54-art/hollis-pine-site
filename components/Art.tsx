/**
 * Drawn stand-ins for photographs. Every product gets a portrait of its own tree, in the same corner of the same room,
 * so the shop reads as one set until the real photographs arrive. A real /public/images/<name>.webp always wins.
 * Everything is one inline SVG per image, built from a few small shapes, so it stays light.
 */
import type { ReactNode } from "react";

const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) - 0.5; };
const f = (n: number) => Math.round(n * 10) / 10;

const WALL = "#eadfc6", WALL_LIGHT = "#f3ead5", FLOOR = "#c9a574", PLANK = "#b48b58", BASE = "#d9c8a0", INK = "#2b2118";

/* ───────────── the room: cream wall, oak floor, window light from the left ───────────── */
function Room({ children, floorY = 410, w = 400, h = 500 }: { children: ReactNode; floorY?: number; w?: number; h?: number }) {
  return (
    <>
      <rect width={w} height={h} fill={WALL} />
      <path d={`M0 0 L${w * 0.42} 0 L${w * 0.2} ${floorY} L0 ${floorY} Z`} fill={WALL_LIGHT} />
      <rect y={floorY - 14} width={w} height="14" fill={BASE} />
      <path d={`M0 ${floorY - 14} H${w}`} stroke={INK} strokeOpacity=".25" strokeWidth="1.5" />
      <rect y={floorY} width={w} height={h - floorY} fill={FLOOR} />
      <path d={Array.from({ length: 5 }, (_, i) => `M0 ${floorY + 18 + i * 20} H${w}`).join(" ") + Array.from({ length: 9 }, (_, i) => `M${40 + i * 52 + (i % 2) * 20} ${floorY} v${h - floorY}`).join(" ")} stroke={PLANK} strokeWidth="1.5" opacity=".7" />
      {children}
    </>
  );
}

/* ───────────── a tree ───────────── */
type TreeOpts = {
  cx: number; base: number; h: number; hw: number; tiers: number;
  fill?: string; edge?: string; hi?: string; jag?: number; droop?: number; gap?: number;
  round?: boolean; lights?: boolean; flock?: boolean; seed?: number; trunkW?: number; needles?: number;
};

function Tree({ cx, base, h, hw, tiers, fill = "#1f3a2d", edge = "#12281d", hi = "#6f9a7c", jag = 5, droop = 0.4, gap = 0, round = false, lights = false, flock = false, seed = 1, trunkW = 9, needles = 7 }: TreeOpts) {
  const trunkH = Math.max(14, h * 0.07);
  const top = base - trunkH - h;
  const crown = h;
  const seg = crown / tiers;
  const tierShapes: { d: string; right: string; yb: number; hwi: number; yt: number }[] = [];
  const dabs: string[] = [];
  const bulbs: string[] = [];
  const flocks: string[] = [];

  for (let i = 0; i < tiers; i++) {
    const yt = top + seg * i - (i && !gap ? seg * 0.34 : 0);
    const yb = top + seg * (i + 1) - gap * seg * 0.35;
    const prof = round ? Math.sin((Math.PI * (i + 1.1)) / (tiers + 1.3)) ** 0.7 : (i + 1.25) / (tiers + 0.25);
    const hwi = hw * Math.min(1, prof * (round ? 1.15 : 1));
    const s = seed * 17 + i * 5;
    // left edge, zig-zagging down, then a scalloped hem, then back up the right edge
    const zig = 5;
    const L: string[] = [], R: string[] = [];
    for (let j = 1; j <= zig; j++) {
      const t = j / zig, y = yt + (yb - yt) * t, out = (j % 2 ? 0 : jag) + rnd(s + j) * jag * 0.8;
      L.push(`L${f(cx - hwi * t - out)} ${f(y + (j === zig ? droop * 10 : 0))}`);
      R.unshift(`L${f(cx + hwi * t + out + rnd(s + j + 40) * jag * 0.6)} ${f(y + (j === zig ? droop * 10 : 0))}`);
    }
    const scal = 7, hem: string[] = [];
    for (let k = 1; k <= scal; k++) {
      const x = cx - hwi - jag + ((hwi * 2 + jag * 2) * k) / scal;
      hem.push(`Q${f(x - (hwi * 2) / scal / 2)} ${f(yb + 7 + droop * 12 + rnd(s + k) * 3)} ${f(x)} ${f(yb + droop * 8)}`);
    }
    const lastL = L[L.length - 1].slice(1);
    const d = `M${cx} ${f(yt)} ${L.join(" ")} ${hem.join(" ")} ${R.join(" ")} Z`;
    const right = `M${cx} ${f(yt)} L${cx} ${f(yb + 8)} L${f(cx + hwi + jag)} ${f(yb + 6)} L${f(cx + hwi * 0.55)} ${f((yt + yb) / 2)} Z`;
    void lastL;
    tierShapes.push({ d, right, yb, hwi, yt });

    // needle dabs and lights, kept inside the tier
    const n = Math.round(needles * (hwi / 30 + 1.5));
    for (let k = 0; k < n; k++) {
      const u = (rnd(s + k * 3) + 0.5), v = (rnd(s + k * 3 + 1) + 0.5);
      const y = yt + (yb - yt) * (0.15 + v * 0.8), half = hwi * ((y - yt) / (yb - yt) + 0.05);
      const x = cx + (u - 0.5) * 2 * half * 0.92;
      dabs.push(`M${f(x)} ${f(y)} l${f(3 + rnd(s + k) * 5)} ${f(4 + rnd(s + k + 9) * 3)}`);
      if (lights && k % 3 === 0) bulbs.push(`M${f(x - 2.4)} ${f(y)} a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0`);
    }
    if (flock) for (let k = 0; k <= scal; k++) { const x = cx - hwi + (hwi * 2 * k) / scal; flocks.push(`M${f(x - 7)} ${f(yb + 3)} q7 -9 14 0`); }
  }

  return (
    <g>
      <ellipse cx={cx} cy={base + 4} rx={hw * 0.9 + 10} ry="7" fill={INK} opacity=".16" />
      <rect x={cx - trunkW / 2} y={base - trunkH - (gap ? crown * 0.9 : 0)} width={trunkW} height={trunkH + (gap ? crown * 0.9 : 0)} fill="#5a4130" />
      {[...tierShapes].reverse().map((t, i) => (
        <g key={i}>
          <path d={t.d} fill={fill} stroke={edge} strokeWidth="2" strokeLinejoin="round" />
          <path d={t.right} fill={INK} opacity=".16" />
        </g>
      ))}
      <path d={dabs.join(" ")} stroke={hi} strokeWidth="1.4" strokeLinecap="round" opacity=".6" fill="none" />
      {flock && <path d={flocks.join(" ")} stroke="#f7f2e6" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".92" />}
      {lights && <path d={bulbs.join(" ")} fill="#f3d58a" />}
    </g>
  );
}

/* species: how each one is drawn */
const species: Record<string, Partial<TreeOpts> & { h: number; hw: number; tiers: number }> = {
  "fraser-fir": { h: 330, hw: 82, tiers: 6, fill: "#1f3a2d", hi: "#9db8a3", jag: 4, seed: 1 },
  "balsam-fir": { h: 345, hw: 62, tiers: 7, fill: "#25452f", hi: "#8fb39a", jag: 6, seed: 2 },
  "noble-fir": { h: 330, hw: 80, tiers: 5, fill: "#2e5a4b", hi: "#b9d2c5", jag: 7, gap: 1, seed: 3, droop: 0.15 },
  "douglas-fir": { h: 310, hw: 96, tiers: 6, fill: "#3b6a46", hi: "#a8c9a0", jag: 8, seed: 4, droop: 0.7 },
  "nordmann-fir": { h: 335, hw: 92, tiers: 5, fill: "#17321f", hi: "#7fa88a", jag: 3, seed: 5 },
  "canaan-fir": { h: 325, hw: 80, tiers: 6, fill: "#1e4430", hi: "#9fc2a6", jag: 4, seed: 6 },
  "grand-fir": { h: 335, hw: 78, tiers: 6, fill: "#2f5a3a", hi: "#b4d0a8", jag: 11, seed: 7, droop: 0.9 },
  "concolor-fir": { h: 330, hw: 86, tiers: 6, fill: "#5b8478", hi: "#d3e3da", jag: 6, seed: 8 },
  "scotch-pine": { h: 300, hw: 98, tiers: 6, fill: "#4a7a45", hi: "#cfe0a8", jag: 7, round: true, seed: 9 },
  "colorado-blue-spruce": { h: 335, hw: 66, tiers: 7, fill: "#5f7f92", hi: "#d9e6ee", jag: 3, seed: 10, droop: 0.1 },
  "norway-spruce": { h: 320, hw: 84, tiers: 6, fill: "#1d3d2a", hi: "#86ab92", jag: 5, droop: 1.6, seed: 11 },
};

function Portrait({ slug }: { slug: string }) {
  const s = species[slug];
  if (s) return <Room><Tree cx={200} base={410} {...s} /></Room>;

  switch (slug) {
    case "tabletop-live-tree":
      return (
        <Room>
          <rect x="130" y="332" width="140" height="12" fill="#a9824f" />
          <path d="M142 344 v66 M258 344 v66" stroke="#8f6a3e" strokeWidth="10" />
          <Tree cx={200} base={322} h={150} hw={44} tiers={5} fill="#25452f" hi="#8fb39a" seed={12} trunkW={6} needles={5} />
          <path d="M172 306 H228 L222 336 H178 Z" fill="#b9673e" stroke={INK} strokeOpacity=".5" strokeWidth="2" />
        </Room>
      );
    case "classic-full-prelit":
      return <Room><Tree cx={200} base={410} h={335} hw={92} tiers={6} fill="#26462f" hi="#a6c3ab" lights seed={13} /></Room>;
    case "slim-pencil-prelit":
      return <Room><Tree cx={200} base={410} h={350} hw={46} tiers={8} fill="#26462f" hi="#a6c3ab" lights seed={14} jag={3} /></Room>;
    case "flocked-frosted-tree":
      return <Room><Tree cx={200} base={410} h={335} hw={86} tiers={6} fill="#355f44" hi="#e9efe4" lights flock seed={15} /></Room>;
    case "half-tree-wall":
      return (
        <Room>
          <rect x="108" y="60" width="184" height="350" fill={INK} opacity=".07" />
          <Tree cx={200} base={410} h={310} hw={62} tiers={6} fill="#26462f" hi="#a6c3ab" lights seed={16} />
          <path d="M200 90 V410" stroke={INK} strokeOpacity=".18" strokeDasharray="4 6" />
        </Room>
      );
    case "upside-down-tree":
      return (
        <Room>
          <path d="M200 0 V96" stroke={INK} strokeWidth="2.5" />
          <circle cx="200" cy="96" r="5" fill={INK} />
          <g transform="translate(0 506) scale(1 -1)"><Tree cx={200} base={410} h={290} hw={92} tiers={6} fill="#26462f" hi="#a6c3ab" lights seed={17} /></g>
        </Room>
      );
    case "commercial-giant-fir":
    case "commercial-grade-artificial":
      return (
        <>
          <rect width="400" height="500" fill="#e4d8bd" />
          <rect x="0" y="0" width="60" height="410" fill="#d8c9a6" /><rect x="340" y="0" width="60" height="410" fill="#d8c9a6" />
          <rect y="410" width="400" height="90" fill="#cfc2a6" />
          <path d="M0 440 H400 M0 470 H400 M100 410 V500 M200 410 V500 M300 410 V500" stroke={INK} strokeOpacity=".15" strokeWidth="1.5" />
          <Tree cx={200} base={412} h={380} hw={104} tiers={8} fill={slug === "commercial-giant-fir" ? "#1f3a2d" : "#2a4d3a"} hi="#b0cdb6" lights seed={18} trunkW={14} />
          <g fill={INK} opacity=".75"><circle cx="86" cy="392" r="5" /><rect x="81" y="398" width="10" height="26" rx="3" /><circle cx="318" cy="394" r="5" /><rect x="313" y="400" width="10" height="26" rx="3" /></g>
        </>
      );
    case "water-reservoir-stand":
    case "classic-metal-stand":
    case "heavy-duty-stand": {
      const big = slug === "heavy-duty-stand", w = big ? 150 : slug === "classic-metal-stand" ? 96 : 118;
      const col = slug === "classic-metal-stand" ? "#2b2b2b" : big ? "#3a342e" : "#5d6469";
      return (
        <Room>
          <ellipse cx="200" cy="414" rx={w * 0.7} ry="8" fill={INK} opacity=".16" />
          <path d={`M${200 - w / 2} 410 L${200 - w / 2 + 14} 372 M${200 + w / 2} 410 L${200 + w / 2 - 14} 372 M200 410 V372`} stroke={col} strokeWidth="9" strokeLinecap="round" />
          <path d={`M${200 - w / 2 + 6} 372 H${200 + w / 2 - 6} L${200 + w / 2 - 22} 318 H${200 - w / 2 + 22} Z`} fill={col} />
          {slug === "water-reservoir-stand" && <rect x={200 - w / 2 + 30} y="330" width={w - 60} height="30" fill="#d7e3e6" stroke={INK} strokeOpacity=".4" strokeWidth="2" />}
          <Tree cx={200} base={322} h={560} hw={130} tiers={8} fill="#25452f" hi="#8fb39a" seed={21} trunkW={big ? 26 : 20} />
        </Room>
      );
    }
    case "red-velvet-tree-skirt":
      return (
        <Room>
          <ellipse cx="200" cy="396" rx="150" ry="34" fill="#7d2630" /><ellipse cx="200" cy="392" rx="132" ry="26" fill="#93303b" />
          <path d="M80 392 q30 22 52 8 M268 400 q30 14 52 -8 M170 418 q30 12 60 0" stroke="#5e1b24" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Tree cx={200} base={392} h={560} hw={130} tiers={8} fill="#25452f" hi="#8fb39a" seed={22} trunkW={22} />
        </Room>
      );
    case "burlap-tree-collar":
      return (
        <Room>
          <path d="M118 420 H282 L270 326 H130 Z" fill="#b8905a" stroke={INK} strokeOpacity=".45" strokeWidth="2" />
          <path d={Array.from({ length: 7 }, (_, i) => `M${126 + i * 24} 326 L${118 + i * 26} 420`).join(" ") + " M126 360 H274 M122 392 H278"} stroke="#8a6638" strokeWidth="3" />
          <Tree cx={200} base={332} h={560} hw={130} tiers={8} fill="#25452f" hi="#8fb39a" seed={23} trunkW={22} />
        </Room>
      );
    case "fraser-fir-wreath":
      return (
        <Room>
          <path d="M200 56 V120" stroke={INK} strokeOpacity=".5" strokeWidth="2" />
          <circle cx="200" cy="230" r="104" fill="none" stroke="#1f3a2d" strokeWidth="46" />
          <circle cx="200" cy="230" r="104" fill="none" stroke="#6f9a7c" strokeWidth="46" strokeDasharray="3 9" opacity=".45" />
          <circle cx="200" cy="230" r="104" fill="none" stroke="#12281d" strokeWidth="46" strokeDasharray="30 24" opacity=".35" />
          <g fill="#8a6638"><ellipse cx="132" cy="296" rx="9" ry="13" /><ellipse cx="262" cy="170" rx="9" ry="13" /><ellipse cx="274" cy="292" rx="9" ry="13" /></g>
          <path d="M200 340 l-30 36 h22 l8 -18 l8 18 h22 z" fill="#8a2b35" />
        </Room>
      );
    case "fresh-garland":
      return (
        <Room>
          <path d="M0 130 H400" stroke="#6b4a2a" strokeWidth="12" />
          <path d="M0 144 Q100 250 200 190 T400 150" fill="none" stroke="#1f3a2d" strokeWidth="38" strokeLinecap="round" />
          <path d="M0 144 Q100 250 200 190 T400 150" fill="none" stroke="#6f9a7c" strokeWidth="38" strokeDasharray="3 10" opacity=".45" />
          <path d="M10 230 H390 M10 300 H390" stroke="#6b4a2a" strokeWidth="6" opacity=".6" />
        </Room>
      );
    case "glass-ornament-set": {
      const cols = ["#8a2b35", "#b08a3e", "#f1ead8", "#8a2b35", "#f1ead8", "#b08a3e"];
      return (
        <Room>
          <rect x="70" y="310" width="260" height="100" fill="#a9824f" stroke={INK} strokeOpacity=".5" strokeWidth="2.5" />
          <path d="M135 310 V410 M200 310 V410 M265 310 V410 M70 360 H330" stroke={INK} strokeOpacity=".4" strokeWidth="2.5" />
          {cols.map((c, i) => (<g key={i}><circle cx={102 + (i % 3) * 65} cy={335 + Math.floor(i / 3) * 50} r="19" fill={c} stroke={INK} strokeOpacity=".35" strokeWidth="1.5" /><path d={`M${96 + (i % 3) * 65} ${318 + Math.floor(i / 3) * 50} h12`} stroke={INK} strokeOpacity=".5" strokeWidth="3" /></g>))}
        </Room>
      );
    }
    case "tree-removal-bags":
      return (
        <Room>
          <rect x="90" y="330" width="130" height="80" rx="6" fill="#d7d4c8" stroke={INK} strokeOpacity=".45" strokeWidth="2.5" />
          <path d="M100 350 H210 M100 372 H210" stroke={INK} strokeOpacity=".2" strokeWidth="2" />
          <rect x="236" y="348" width="80" height="62" rx="31" fill="#cfccbd" stroke={INK} strokeOpacity=".45" strokeWidth="2.5" />
          <ellipse cx="236" cy="379" rx="12" ry="31" fill="#bab7a6" stroke={INK} strokeOpacity=".4" strokeWidth="2" />
        </Room>
      );
    case "tree-preservative":
      return (
        <Room>
          <path d="M130 410 V250 L150 232 H250 L270 250 V410 Z" fill="#d9c59a" stroke={INK} strokeOpacity=".5" strokeWidth="2.5" />
          <path d="M130 250 H270 M150 232 L200 250 L250 232" stroke={INK} strokeOpacity=".4" strokeWidth="2.5" fill="none" />
          <rect x="156" y="288" width="88" height="58" fill="#1f3a2d" opacity=".9" />
          <path d="M200 296 l14 22 h-28 z M200 310 l16 26 h-32 z" fill="#dcc48f" />
        </Room>
      );
    case "replacement-bulbs":
      return (
        <Room>
          <rect x="94" y="340" width="212" height="70" fill="#d9c59a" stroke={INK} strokeOpacity=".5" strokeWidth="2.5" />
          {Array.from({ length: 6 }, (_, i) => (<g key={i}><ellipse cx={126 + i * 29} cy="372" rx="8" ry="13" fill="#f3d58a" stroke={INK} strokeOpacity=".4" strokeWidth="1.5" /><rect x={122 + i * 29} y="383" width="8" height="8" fill="#8f6a3e" /></g>))}
          <path d="M230 322 h60 l8 8" stroke="#5d6469" strokeWidth="6" strokeLinecap="round" fill="none" />
        </Room>
      );
    default:
      return null;
  }
}

/* ───────────── needle close-ups (16:9) ───────────── */
function Needles({ slug }: { slug: string }) {
  const s = species[slug] ?? species["balsam-fir"];
  const col = s.fill ?? "#25452f", hi = s.hi ?? "#8fb39a";
  const long = slug.includes("grand") || slug.includes("concolor") || slug.includes("scotch");
  const d: string[] = [];
  const len = long ? 140 : 80;
  for (let i = 0; i < 46; i++) {
    const x = 160 + i * 28, y = 450 + Math.sin(i / 5) * 40;
    d.push(`M${f(x)} ${f(y)} q${f(len * 0.3)} ${f(-len * 0.7 + rnd(i) * 30)} ${f(len * 0.2 + rnd(i + 3) * 30)} ${f(-len)}`);
    d.push(`M${f(x)} ${f(y)} q${f(len * 0.3)} ${f(len * 0.7 + rnd(i + 5) * 30)} ${f(len * 0.2 + rnd(i + 7) * 30)} ${f(len)}`);
  }
  return (
    <>
      <rect width="1600" height="900" fill="#e8ddc5" />
      <path d="M0 400 Q600 520 1200 420 T1600 470" stroke="#5a4130" strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d={d.join(" ")} stroke={col} strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d={d.join(" ")} stroke={hi} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".55" transform="translate(-3 -3)" />
    </>
  );
}

/* ───────────── banner scenes (16:9) ───────────── */
const tri = (x: number, y: number, s: number) => `M${f(x)} ${f(y - s)} l${f(s * 0.38)} ${f(s)} h${f(-s * 0.76)} z`;

function Farm({ winter }: { winter?: boolean }) {
  const rows = (y: number, s: number, n: number, seed: number) => Array.from({ length: n }, (_, i) => tri(40 + i * (1520 / n) + rnd(seed + i) * 8, y + rnd(seed + i + 50) * 4, s)).join(" ");
  return (
    <>
      <rect width="1600" height="900" fill={winter ? "#dfe0d6" : "#f0d9c0"} />
      {!winter && <circle cx="1180" cy="330" r="70" fill="#f6ead0" />}
      <path d="M0 470 Q300 380 640 450 T1280 420 T1600 450 V900 H0 Z" fill="#b9c4b5" />
      <path d="M0 560 Q400 470 800 540 T1600 520 V900 H0 Z" fill="#a4b5a2" />
      <path d={rows(520, 34, 36, 1)} fill="#2a4d3a" opacity=".75" />
      <path d="M0 680 Q500 590 1000 660 T1600 640 V900 H0 Z" fill={winter ? "#f1f1ea" : "#c8d3c8"} />
      <path d={rows(690, 56, 24, 7)} fill="#1f3a2d" />
      <path d={rows(780, 84, 16, 21)} fill="#12281d" />
      <path d={Array.from({ length: 16 }, (_, i) => `M${f(40 + i * 95 - 16)} ${f(780 - 70)} q16 -10 32 0`).join(" ")} stroke="#f7f4ea" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8" />
      <g transform="translate(1260 470)"><rect width="120" height="70" fill="#8c6b4c" /><path d="M-12 0 L60 -48 L132 0 Z" fill="#5a4130" /><rect x="46" y="28" width="30" height="42" fill="#3a2a1e" /></g>
    </>
  );
}

function Van() {
  return (
    <>
      <rect width="1600" height="900" fill="#e3e1d8" />
      <path d="M0 480 H1600 V900 H0 Z" fill="#f3f1ea" />
      <path d="M560 480 H1040 L1500 900 H100 Z" fill="#d7d2c4" />
      <path d="M770 480 L640 900 M830 480 L960 900" stroke="#f3f1ea" strokeWidth="6" strokeDasharray="30 24" opacity=".8" />
      <path d={[0, 1, 2, 3, 4].map((i) => tri(80 + i * 120, 600 + i * 26, 120 + i * 40)).join(" ")} fill="#1f3a2d" />
      <path d={[0, 1, 2, 3, 4].map((i) => tri(1520 - i * 120, 600 + i * 26, 120 + i * 40)).join(" ")} fill="#25452f" />
      <g transform="translate(560 560)">
        <rect width="480" height="190" rx="22" fill="#f6f4ee" stroke={INK} strokeWidth="5" />
        <path d="M330 0 h84 l66 78 v112 h-150 z" fill="#f6f4ee" stroke={INK} strokeWidth="5" />
        <path d="M346 18 h58 l46 56 h-104 z" fill="#b9c8cc" stroke={INK} strokeWidth="4" />
        <circle cx="110" cy="190" r="36" fill={INK} /><circle cx="110" cy="190" r="16" fill="#cfcabd" />
        <circle cx="390" cy="190" r="36" fill={INK} /><circle cx="390" cy="190" r="16" fill="#cfcabd" />
      </g>
    </>
  );
}

function Worker() {
  const rows = Array.from({ length: 22 }, (_, i) => tri(50 + i * 72, 560 + rnd(i) * 8, 90)).join(" ");
  return (
    <>
      <rect width="1600" height="900" fill="#dfe3dc" />
      <path d="M0 520 Q500 440 1000 500 T1600 470 V900 H0 Z" fill="#c4cfc4" />
      <path d={rows} fill="#2a4d3a" opacity=".8" />
      <path d="M0 620 Q500 560 1000 610 T1600 590 V900 H0 Z" fill="#eef0ea" />
      <g transform="translate(760 300)">
        <g transform="rotate(-18 120 140) translate(-160 -110)"><path d="M300 210 L420 232 L300 254 Z" fill="#1f3a2d" /><path d="M300 190 L450 232 L300 274 Z" fill="#25452f" /></g>
        <circle cx="120" cy="40" r="30" fill="#5a4130" /><path d="M86 34 q34 -34 68 0 v10 h-68 z" fill="#3a2a1e" />
        <path d="M70 80 h100 l14 150 h-128 z" fill="#8c6b4c" stroke={INK} strokeWidth="4" />
        <path d="M80 230 h34 v200 h-34 z M126 230 h34 v200 h-34 z" fill="#4a3b2c" />
        <path d="M60 100 l-30 90 M180 100 l40 -50" stroke="#8c6b4c" strokeWidth="26" strokeLinecap="round" />
      </g>
    </>
  );
}

function Hall({ big = false }: { big?: boolean }) {
  return (
    <>
      <rect width="1600" height="900" fill="#e4d8bd" />
      <rect y="640" width="1600" height="260" fill="#cfc2a6" />
      <path d="M0 720 H1600 M0 800 H1600 M300 640 V900 M700 640 V900 M1100 640 V900 M1500 640 V900" stroke={INK} strokeOpacity=".12" strokeWidth="3" />
      {[120, 1480].map((x) => (<rect key={x} x={x - 50} y="0" width="100" height="640" fill="#d6c8a4" />))}
      <g transform="translate(800 0) scale(1.9)" ><Tree cx={0} base={338} h={big ? 250 : 220} hw={big ? 72 : 64} tiers={8} fill="#1f3a2d" hi="#b0cdb6" lights seed={31} trunkW={12} needles={9} /></g>
      <g fill={INK} opacity=".7">{[430, 520, 1120, 1210, 1290].map((x, i) => (<g key={x}><circle cx={x} cy={600 + (i % 2) * 8} r="14" /><rect x={x - 14} y={616 + (i % 2) * 8} width="28" height="70" rx="9" /></g>))}</g>
    </>
  );
}

function HeroRoom() {
  return (
    <>
      <rect width="1600" height="900" fill={WALL} />
      <path d="M0 0 H560 L340 720 H0 Z" fill={WALL_LIGHT} />
      <rect y="706" width="1600" height="20" fill={BASE} />
      <rect y="726" width="1600" height="174" fill={FLOOR} />
      <path d={Array.from({ length: 6 }, (_, i) => `M0 ${750 + i * 28} H1600`).join(" ")} stroke={PLANK} strokeWidth="2" opacity=".7" />
      <g transform="translate(800 0) scale(1.62)"><Tree cx={0} base={448} h={330} hw={92} tiers={6} fill="#1f3a2d" hi="#a6c3ab" lights seed={41} /></g>
      <g transform="translate(270 440)"><path d="M0 0 h70 l-10 70 h-50 z" fill="#d9c59a" stroke={INK} strokeOpacity=".4" strokeWidth="3" /><rect x="30" y="70" width="10" height="190" fill="#5a4130" /><ellipse cx="35" cy="266" rx="40" ry="8" fill="#5a4130" /></g>
    </>
  );
}

/* ───────────── lookup ───────────── */
const scene = (node: ReactNode, w: number, h: number) => ({ node, w, h });

export function artFor(name: string): { node: ReactNode; w: number; h: number } | null {
  if (name.startsWith("needles-")) return scene(<Needles slug={name.slice(8)} />, 1600, 900);
  switch (name) {
    case "hero-lit-tree": return scene(<HeroRoom />, 1600, 900);
    case "farm-dawn-frost": return scene(<Farm />, 1600, 900);
    case "about-farm-winter": return scene(<Farm winter />, 1600, 900);
    case "delivery-van-lane": return scene(<Van />, 1600, 900);
    case "worker-carrying-tree": return scene(<Worker />, 1600, 900);
    case "commercial-lobby": return scene(<Hall big />, 1600, 900);
    case "commercial-mall":
    case "commercial-install": return scene(<Hall />, 1600, 900);
    default: {
      const p = <Portrait slug={name} />;
      // Portrait returns null for unknown names; test cheaply by name
      const known = name in species || ["tabletop-live-tree", "classic-full-prelit", "slim-pencil-prelit", "flocked-frosted-tree", "half-tree-wall", "upside-down-tree", "commercial-giant-fir", "commercial-grade-artificial", "water-reservoir-stand", "classic-metal-stand", "heavy-duty-stand", "red-velvet-tree-skirt", "burlap-tree-collar", "fraser-fir-wreath", "fresh-garland", "glass-ornament-set", "tree-removal-bags", "tree-preservative", "replacement-bulbs"].includes(name);
      return known ? scene(p, 400, 500) : null;
    }
  }
}

export default function Art({ name, label }: { name: string; label: string }) {
  const a = artFor(name);
  if (!a) return null;
  return (
    <svg viewBox={`0 0 ${a.w} ${a.h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="absolute inset-0 h-full w-full">
      {a.node}
    </svg>
  );
}
