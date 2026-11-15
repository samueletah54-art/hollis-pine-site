// Product catalog. Everything the storefront shows comes from this file.
// To move to Shopify/Stripe Products later, keep the `Product` shape and replace the export
// with a fetch (see lib/catalog.ts, the only place that imports this array).

export type Category = "live" | "artificial" | "commercial" | "addon";
export type Room = "living room" | "entryway" | "small space" | "lobby" | "kitchen" | "porch";
export type Origin = "Oregon" | "North Carolina";

export type Size = {
  id: string;
  label: string;
  /** USD. null means quote only. */
  price: number | null;
  /** feet, used for filtering */
  heightMin?: number;
  heightMax?: number;
  /** plain-language dimensions shown on the product page */
  dims?: string;
};

export type Facts = {
  needleRetention: string;
  fragrance: string;
  branchStrength: string;
  shape: string;
  bestFor: string;
};

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** species for live trees; build style for artificial; null for add-ons */
  species: string | null;
  tagline: string;
  description: string;
  sizes: Size[];
  option?: { name: string; values: { id: string; label: string }[] };
  facts?: Facts;
  images: { src: string; alt: string }[];
  badges: string[];
  shipsFrom: Origin;
  stock: "in" | "low" | "quote";
  flocked?: boolean;
  prelit?: boolean;
  /** 0 none, 1 mild, 2 good, 3 strong */
  fragrance: 0 | 1 | 2 | 3;
  petFriendlier?: boolean;
  rooms: Room[];
  inTheBox: string[];
  care?: string[];
  featured?: boolean;
  /** for add-ons: which extras pair with which kind of tree */
  addonKind?: "stand" | "skirt" | "wreath" | "garland" | "ornaments" | "bags" | "care" | "bulbs";
};

const LIVE_BOX = [
  "One freshly cut tree, trunk re-cut at our farm the week it ships",
  "Netted and wrapped in breathable paper, then boxed",
  "A printed care card with your water schedule",
  "A tag with the field and date it was cut",
];

const LIVE_CARE = [
  "Unwrap right away and saw off a half inch from the base. Do this even if we already did. It reopens the pores.",
  "Stand it in water within 4 hours. A fresh cut tree drinks a quart or more in the first day.",
  "Check the water twice a day for the first week. Never let it drop below the cut.",
  "Keep it three feet from heaters, fireplaces and vents.",
];

const ART_BOX = [
  "Tree in 3 or 4 sections, hinged branches, color-coded",
  "Steel stand, assembled",
  "Spare fuses and 3 spare bulbs on pre-lit models",
  "Fluffing guide and a storage-box recommendation",
];

export const products: Product[] = [
  // ───────────── LIVE-CUT ─────────────
  {
    slug: "fraser-fir",
    name: "Fraser Fir",
    category: "live",
    species: "Fraser fir",
    tagline: "The one most people picture. Stiff, tidy, holds a lot of ornaments.",
    description:
      "Grown on a north-facing slope in the Blue Ridge, where the cold slows the growth and tightens the branching. Needles are soft, dark green with silver undersides, and they stay on the branch for five weeks if you keep it watered. Branches turn slightly upward, so heavy glass ornaments hang without sliding off.",
    sizes: [
      { id: "5-6", label: "5–6 ft", price: 89, heightMin: 5, heightMax: 6, dims: "About 34 in wide at the base" },
      { id: "6-7", label: "6–7 ft", price: 119, heightMin: 6, heightMax: 7, dims: "About 40 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 159, heightMin: 7, heightMax: 8, dims: "About 46 in wide at the base" },
      { id: "8-9", label: "8–9 ft", price: 219, heightMin: 8, heightMax: 9, dims: "About 52 in wide at the base" },
    ],
    facts: { needleRetention: "Excellent, 5+ weeks", fragrance: "Medium, clean and sweet", branchStrength: "Very strong", shape: "Dense pyramid", bestFor: "Heavy ornaments, tall ceilings" },
    images: [
      { src: "/images/fraser-fir.jpg", alt: "A seven-foot Fraser fir standing in a corner against a plain plaster wall" },
      { src: "/images/hero.jpg", alt: "A lit Fraser fir in a lived-in living room at dusk, a dog asleep at its base" },
      { src: "/images/stand-watering.jpg", alt: "Water being poured into the stand of a freshly set up fir" },
    ],
    badges: ["Fresh cut"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 2,
    petFriendlier: true,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
    featured: true,
  },
  {
    slug: "balsam-fir",
    name: "Balsam Fir",
    category: "live",
    species: "Balsam fir",
    tagline: "Narrow and sweet-smelling, the tree your grandmother's house smelled like.",
    description:
      "Balsam is the strongest-smelling of the classic firs. The crown is slim and a little irregular, which looks natural in a room with a real fireplace and a few uneven shelves. Needles are short, flat, and glossy; it wants water daily and rewards you with scent through New Year.",
    sizes: [
      { id: "5-6", label: "5–6 ft", price: 79, heightMin: 5, heightMax: 6, dims: "About 30 in wide at the base" },
      { id: "6-7", label: "6–7 ft", price: 104, heightMin: 6, heightMax: 7, dims: "About 36 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 139, heightMin: 7, heightMax: 8, dims: "About 42 in wide at the base" },
    ],
    facts: { needleRetention: "Good, 4 weeks", fragrance: "Strong, resinous and sweet", branchStrength: "Medium", shape: "Narrow spire", bestFor: "Fragrance, smaller living rooms" },
    images: [
      { src: "/images/balsam-fir.jpg", alt: "A Balsam fir by a fireplace with a red tree skirt" },
      { src: "/images/stand-watering.jpg", alt: "Pouring water into the stand at the base of a Balsam fir" },
    ],
    badges: ["Fresh cut", "Best scent"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 3,
    petFriendlier: true,
    rooms: ["living room", "entryway"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
    featured: true,
  },
  {
    slug: "noble-fir",
    name: "Noble Fir",
    category: "live",
    species: "Noble fir",
    tagline: "Stiff shelves of branches, blue-green needles, and it will outlast your January resolutions.",
    description:
      "Noble fir grows tall and layered in the Cascade foothills, with space between branches so ornaments show. The needles curve upward and hold on well past Christmas. This is the tree florists use for wreaths because the cut boughs stay fresh for weeks.",
    sizes: [
      { id: "6-7", label: "6–7 ft", price: 129, heightMin: 6, heightMax: 7, dims: "About 40 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 169, heightMin: 7, heightMax: 8, dims: "About 46 in wide at the base" },
      { id: "8-9", label: "8–9 ft", price: 229, heightMin: 8, heightMax: 9, dims: "About 52 in wide at the base" },
    ],
    facts: { needleRetention: "Excellent, 6 weeks", fragrance: "Mild, woodsy", branchStrength: "Very strong", shape: "Open, layered", bestFor: "Showing off ornaments, long seasons" },
    images: [
      { src: "/images/noble-fir-detail.jpg", alt: "Close-up of Noble fir needles with silver undersides and a little frost" },
      { src: "/images/cutting.jpg", alt: "Gloved hands sawing the base of a Noble fir on a frosty morning" },
    ],
    badges: ["Fresh cut"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 1,
    petFriendlier: true,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
    featured: true,
  },
  {
    slug: "douglas-fir",
    name: "Douglas Fir",
    category: "live",
    species: "Douglas fir",
    tagline: "Soft, full, and the easiest on the wallet. A good first real tree.",
    description:
      "Douglas fir has the softest needles of anything we grow, which is why kids prefer it. The crown is fluffy and full, with a citrusy scent when you crush a needle. Branches are thinner than Fraser, so go with lighter ornaments or ribbon.",
    sizes: [
      { id: "5-6", label: "5–6 ft", price: 69, heightMin: 5, heightMax: 6, dims: "About 34 in wide at the base" },
      { id: "6-7", label: "6–7 ft", price: 89, heightMin: 6, heightMax: 7, dims: "About 40 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 119, heightMin: 7, heightMax: 8, dims: "About 46 in wide at the base" },
    ],
    facts: { needleRetention: "Fair, 3 weeks. Water daily", fragrance: "Medium, citrus", branchStrength: "Light to medium", shape: "Full, soft", bestFor: "First-time buyers, kids, budgets" },
    images: [{ src: "/images/douglas-fir.jpg", alt: "A full Douglas fir in a family living room with a string of paper stars" }],
    badges: ["Fresh cut", "Best value"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 2,
    petFriendlier: true,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "nordmann-fir",
    name: "Nordmann Fir",
    category: "live",
    species: "Nordmann fir",
    tagline: "The European favorite. Glossy, nearly no scent, almost never drops needles.",
    description:
      "Nordmann is the tree to buy if someone in the house has allergies or a sensitive nose. Needles are dark and shiny, and it holds onto them even after you've moved the tree twice. Branches are widely spaced, so strings of lights show clearly.",
    sizes: [
      { id: "6-7", label: "6–7 ft", price: 139, heightMin: 6, heightMax: 7, dims: "About 42 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 179, heightMin: 7, heightMax: 8, dims: "About 48 in wide at the base" },
    ],
    facts: { needleRetention: "Outstanding, 6+ weeks", fragrance: "Very mild", branchStrength: "Strong", shape: "Broad cone", bestFor: "Low-scent homes, minimal needle mess" },
    images: [{ src: "/images/nordmann-fir.jpg", alt: "A glossy Nordmann fir in a bright room with white string lights" }],
    badges: ["Fresh cut", "Low scent"],
    shipsFrom: "Oregon",
    stock: "low",
    fragrance: 1,
    petFriendlier: true,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "canaan-fir",
    name: "Canaan Fir",
    category: "live",
    species: "Canaan fir",
    tagline: "Fraser's good looks with some of Balsam's scent, from Canaan Valley seed.",
    description:
      "Canaan fir sits between Fraser and Balsam: dense, deep green, easy to shape, with a sweet smell that fills a room without taking it over. It tolerates warm houses better than most. If Fraser is sold out, this is the one we reach for.",
    sizes: [
      { id: "6-7", label: "6–7 ft", price: 109, heightMin: 6, heightMax: 7, dims: "About 38 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 149, heightMin: 7, heightMax: 8, dims: "About 44 in wide at the base" },
    ],
    facts: { needleRetention: "Very good, 5 weeks", fragrance: "Medium-strong", branchStrength: "Strong", shape: "Dense pyramid", bestFor: "Warm houses, Fraser lovers" },
    images: [{ src: "/images/canaan-fir.jpg", alt: "A Canaan fir with deep green needles in a hallway" }],
    badges: ["Fresh cut"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 2,
    petFriendlier: true,
    rooms: ["living room", "entryway"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "grand-fir",
    name: "Grand Fir",
    category: "live",
    species: "Grand fir",
    tagline: "The strongest scent of anything on the farm. You'll smell it from the front door.",
    description:
      "Grand fir needles smell like orange rind and pine resin. The branching is thin and the shape a little shaggy, so we price it kindly. Best for people who care more about the smell than the silhouette.",
    sizes: [
      { id: "6-7", label: "6–7 ft", price: 99, heightMin: 6, heightMax: 7, dims: "About 38 in wide at the base" },
      { id: "7-8", label: "7–8 ft", price: 129, heightMin: 7, heightMax: 8, dims: "About 44 in wide at the base" },
    ],
    facts: { needleRetention: "Fair, 3–4 weeks", fragrance: "Very strong, citrus-pine", branchStrength: "Light", shape: "Shaggy, informal", bestFor: "Scent above all else" },
    images: [{ src: "/images/grand-fir.jpg", alt: "A shaggy Grand fir with strings of popcorn in a farmhouse room" }],
    badges: ["Fresh cut", "Best scent"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 3,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "concolor-fir",
    name: "Concolor (White) Fir",
    category: "live",
    species: "Concolor fir",
    tagline: "Long, soft, pale-blue needles that smell faintly of tangerine.",
    description:
      "Concolor, also called white fir, has needles twice as long as a Fraser and curved like fingers. The color runs from silver-green to blue. It gets full without being heavy and is a favorite of people who find regular firs too dark.",
    sizes: [{ id: "6-7", label: "6–7 ft", price: 109, heightMin: 6, heightMax: 7, dims: "About 40 in wide at the base" }],
    facts: { needleRetention: "Good, 4 weeks", fragrance: "Mild, citrus", branchStrength: "Medium", shape: "Full, soft cone", bestFor: "Pale, airy look" },
    images: [{ src: "/images/concolor-fir.jpg", alt: "A Concolor fir with long pale needles by a window" }],
    badges: ["Fresh cut"],
    shipsFrom: "Oregon",
    stock: "low",
    fragrance: 1,
    petFriendlier: true,
    rooms: ["living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "scotch-pine",
    name: "Scotch Pine",
    category: "live",
    species: "Scotch pine",
    tagline: "Holds its needles when everything else has quit. Good for a house you can't keep cool.",
    description:
      "Scotch pine is the toughest tree on our list. Even if the water bowl runs dry for a day, it'll hold needles that a Douglas fir would drop in a heap. The branching is thick and stiff with long, bright needles; it looks a little old-fashioned in the best way.",
    sizes: [
      { id: "5-6", label: "5–6 ft", price: 59, heightMin: 5, heightMax: 6, dims: "About 34 in wide at the base" },
      { id: "6-7", label: "6–7 ft", price: 79, heightMin: 6, heightMax: 7, dims: "About 40 in wide at the base" },
    ],
    facts: { needleRetention: "Best of any tree we ship, 6+ weeks", fragrance: "Medium, classic pine", branchStrength: "Very strong", shape: "Dense, rounded", bestFor: "Forgetful waterers, long seasons" },
    images: [{ src: "/images/scotch-pine.jpg", alt: "A Scotch pine in a rustic cabin corner with a plaid blanket" }],
    badges: ["Fresh cut", "Best value"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 2,
    rooms: ["living room", "porch"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "colorado-blue-spruce",
    name: "Colorado Blue Spruce",
    category: "live",
    species: "Blue spruce",
    tagline: "Silver-blue and sharp. Looks like a Christmas card, so wear gloves.",
    description:
      "Blue spruce has the color everyone asks about: a silvery blue that looks cold and handsome under white lights. Needles are stiff and prickly, so it's a tree for adults and tough hands. Strong branches handle heavy ornaments without complaint.",
    sizes: [
      { id: "5-6", label: "5–6 ft", price: 94, heightMin: 5, heightMax: 6, dims: "About 36 in wide at the base" },
      { id: "6-7", label: "6–7 ft", price: 124, heightMin: 6, heightMax: 7, dims: "About 42 in wide at the base" },
    ],
    facts: { needleRetention: "Good, 4 weeks", fragrance: "Mild, sharp", branchStrength: "Very strong", shape: "Tight cone", bestFor: "Color, heavy ornaments, no pets" },
    images: [{ src: "/images/blue-spruce.jpg", alt: "A Colorado blue spruce hung with white string lights in a farmhouse entry" }],
    badges: ["Fresh cut"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 1,
    rooms: ["entryway", "living room"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
    featured: true,
  },
  {
    slug: "norway-spruce",
    name: "Norway Spruce",
    category: "live",
    species: "Norway spruce",
    tagline: "The traditional Scandinavian tree. Drops needles fast, so it's best bought late.",
    description:
      "Norway spruce is the classic European Christmas tree, graceful with drooping branches and a deep green shade. It does drop needles faster than a fir, so we recommend setting it up closer to Christmas. At this price it's also a good choice for porches and outdoor displays.",
    sizes: [{ id: "5-6", label: "5–6 ft", price: 64, heightMin: 5, heightMax: 6, dims: "About 34 in wide at the base" }],
    facts: { needleRetention: "Fair, 2–3 weeks", fragrance: "Mild, spruce", branchStrength: "Light", shape: "Graceful, drooping", bestFor: "Porches, short seasons, budgets" },
    images: [{ src: "/images/norway-spruce.jpg", alt: "A Norway spruce on a porch with a string of lanterns" }],
    badges: ["Fresh cut", "Best value"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 1,
    rooms: ["porch", "entryway"],
    inTheBox: LIVE_BOX,
    care: LIVE_CARE,
  },
  {
    slug: "tabletop-live-tree",
    name: "Tabletop Live Tree",
    category: "live",
    species: "Balsam fir (potted)",
    tagline: "Two feet of real tree in a clay pot. Plant it in the yard in April.",
    description:
      "A small potted Balsam fir, root ball intact, in a terracotta pot. Keep it indoors for no more than ten days, then set it outside in a sheltered spot and plant it after the ground thaws. Fits on a kitchen counter, a mantel, or a desk at the front of a shop.",
    sizes: [
      { id: "2ft", label: "2 ft", price: 39, heightMin: 2, heightMax: 2.5, dims: "In a 6 in pot" },
      { id: "3ft", label: "3 ft", price: 59, heightMin: 2.5, heightMax: 3, dims: "In an 8 in pot" },
    ],
    facts: { needleRetention: "Good if kept cool", fragrance: "Strong for its size", branchStrength: "Medium", shape: "Small spire", bestFor: "Counters, desks, apartments, planting later" },
    images: [{ src: "/images/tabletop.jpg", alt: "A small potted live tree on a kitchen counter next to a coffee mug" }],
    badges: ["Plantable"],
    shipsFrom: "Oregon",
    stock: "in",
    fragrance: 2,
    petFriendlier: true,
    rooms: ["kitchen", "small space"],
    inTheBox: ["Potted tree with root ball intact", "Terracotta pot and saucer", "Planting and outdoor-transition guide"],
    care: [
      "Keep it in a cool room away from heat. Ten days indoors is the limit.",
      "Water when the top inch of soil feels dry. Don't let it sit in standing water.",
      "Move it to a garage or porch for a few days before going outside.",
      "Plant in spring in a spot with sun and good drainage.",
    ],
  },

  // ───────────── ARTIFICIAL ─────────────
  {
    slug: "classic-full-prelit",
    name: "Classic Full Pre-lit Tree",
    category: "artificial",
    species: "Full, hinged",
    tagline: "A tree that looks like a tree, with lights that already work.",
    description:
      "A full-bodied hinged tree in three sections, with PE tips molded from real branches and PVC filler for body. Lights are LED, fused, and wired so a dead bulb doesn't take out the string. Branches are hand-shaped at the factory; plan twenty minutes to fluff it, but it's worth doing.",
    sizes: [
      { id: "6.5", label: "6.5 ft", price: 249, heightMin: 6.5, heightMax: 6.5, dims: "About 44 in wide, 3 sections" },
      { id: "7.5", label: "7.5 ft", price: 329, heightMin: 7.5, heightMax: 7.5, dims: "About 52 in wide, 3 sections" },
      { id: "9", label: "9 ft", price: 499, heightMin: 9, heightMax: 9, dims: "About 62 in wide, 4 sections" },
    ],
    option: {
      name: "Lights",
      values: [
        { id: "warm", label: "Warm white LED" },
        { id: "multi", label: "Multicolor LED" },
        { id: "dual", label: "Dual-color LED (switches)" },
      ],
    },
    facts: { needleRetention: "Permanent", fragrance: "None. Add a Balsam wreath", branchStrength: "Strong, hinged", shape: "Full cone", bestFor: "Rentals, allergies, big rooms, reuse" },
    images: [
      { src: "/images/artificial-prelit.jpg", alt: "A pre-lit artificial tree with warm white LEDs in a modern apartment, a storage box in the background" },
    ],
    badges: ["Pre-lit"],
    shipsFrom: "North Carolina",
    stock: "in",
    prelit: true,
    fragrance: 0,
    petFriendlier: true,
    rooms: ["living room", "lobby"],
    inTheBox: ART_BOX,
    care: [
      "Fluff each branch tip outward and upward, working bottom to top. The lower the section, the more time it needs.",
      "Store it dry, in the original box or a rolling tree bag.",
      "Never connect more than three sets end to end unless the tag says so.",
    ],
    featured: true,
  },
  {
    slug: "slim-pencil-prelit",
    name: "Slim Pencil Pre-lit Tree",
    category: "artificial",
    species: "Slim, hinged",
    tagline: "Narrow enough for a hallway, tall enough to feel like Christmas.",
    description:
      "A 24-inch-wide column of branches with warm LEDs already strung. Made for corners, entryways, and small apartments where a full tree would block the door. Branch tips are tight and bendable, so you can leave gaps for ornaments or fill it solid.",
    sizes: [
      { id: "6", label: "6 ft", price: 189, heightMin: 6, heightMax: 6, dims: "About 24 in wide" },
      { id: "7.5", label: "7.5 ft", price: 259, heightMin: 7.5, heightMax: 7.5, dims: "About 30 in wide" },
    ],
    facts: { needleRetention: "Permanent", fragrance: "None", branchStrength: "Medium", shape: "Slim column", bestFor: "Hallways, apartments, narrow corners" },
    images: [{ src: "/images/slim-tree.jpg", alt: "A slim pencil tree in a narrow hallway corner with a few ornaments" }],
    badges: ["Pre-lit"],
    shipsFrom: "North Carolina",
    stock: "in",
    prelit: true,
    fragrance: 0,
    petFriendlier: true,
    rooms: ["entryway", "small space"],
    inTheBox: ART_BOX,
    featured: true,
  },
  {
    slug: "flocked-frosted-tree",
    name: "Flocked Frosted Tree",
    category: "artificial",
    species: "Flocked, hinged",
    tagline: "Snow without the cleanup. Tips are dusted white, not sprayed on thick.",
    description:
      "A 7.5-foot hinged tree with a light flocking that leaves green showing through, so it looks like the morning after a snowfall rather than a cotton ball. Pre-lit with warm-white LEDs. Flocking can shed a little at first; set it up where you can vacuum once.",
    sizes: [{ id: "7.5", label: "7.5 ft", price: 389, heightMin: 7.5, heightMax: 7.5, dims: "About 50 in wide, 3 sections" }],
    facts: { needleRetention: "Permanent", fragrance: "None", branchStrength: "Strong", shape: "Full cone", bestFor: "Winter-white rooms" },
    images: [{ src: "/images/flocked.jpg", alt: "A frosted flocked tree beside a tall window with snow outside" }],
    badges: ["Pre-lit", "Flocked"],
    shipsFrom: "North Carolina",
    stock: "low",
    flocked: true,
    prelit: true,
    fragrance: 0,
    rooms: ["living room"],
    inTheBox: ART_BOX,
  },
  {
    slug: "half-tree-wall",
    name: "Half Tree for Walls",
    category: "artificial",
    species: "Half, flat-back",
    tagline: "A tree cut in half. It sits flat to the wall and gives you the floor back.",
    description:
      "A 6-foot flat-backed tree for small rooms, stair landings, and storefront windows. Lights are LED and wired on the visible side only, so the back stays clean against a wall. It stands on a stable steel base and ships assembled in two sections.",
    sizes: [{ id: "6", label: "6 ft", price: 149, heightMin: 6, heightMax: 6, dims: "About 40 in wide, 22 in deep" }],
    facts: { needleRetention: "Permanent", fragrance: "None", branchStrength: "Medium", shape: "Flat-back cone", bestFor: "Walls, windows, stair landings" },
    images: [{ src: "/images/half-tree.jpg", alt: "A half tree standing flat against a wall in a small living room" }],
    badges: ["Pre-lit"],
    shipsFrom: "North Carolina",
    stock: "in",
    prelit: true,
    fragrance: 0,
    petFriendlier: true,
    rooms: ["small space", "entryway"],
    inTheBox: ART_BOX,
  },
  {
    slug: "upside-down-tree",
    name: "Upside-Down Tree",
    category: "artificial",
    species: "Inverted",
    tagline: "A tree with its point on the floor and its wide end up high. Yes, really.",
    description:
      "Wide at the top and narrow at the bottom, so the floor under it is yours again. Pets and toddlers have a harder time reaching it, and the ornaments sit at eye level. Comes with a ceiling hook and a floor stand so you can choose how to hang it.",
    sizes: [{ id: "7", label: "7 ft", price: 279, heightMin: 7, heightMax: 7, dims: "About 48 in wide at the top" }],
    facts: { needleRetention: "Permanent", fragrance: "None", branchStrength: "Strong", shape: "Inverted cone", bestFor: "Small floors, pets, conversation" },
    images: [{ src: "/images/upside-down.jpg", alt: "An upside-down Christmas tree in a living room with a ceiling hook" }],
    badges: ["Pre-lit"],
    shipsFrom: "North Carolina",
    stock: "in",
    prelit: true,
    fragrance: 0,
    petFriendlier: true,
    rooms: ["small space", "living room"],
    inTheBox: [...ART_BOX.slice(0, 3), "Ceiling hook and floor stand"],
  },

  // ───────────── COMMERCIAL ─────────────
  {
    slug: "commercial-giant-fir",
    name: "Commercial Giant Fir, Live-Cut",
    category: "commercial",
    species: "Fraser / Noble fir",
    tagline: "9 to 30 feet. Cut to order, delivered on a flatbed, set by our crew.",
    description:
      "For lobbies, mall courts, restaurant patios and town squares. We cut to the height you need, treat the tree with a fire-retardant approved for display, and deliver with a crew that sets it in a water-fed base and anchors it. We can take it down on January 2nd and haul it away for chipping.",
    sizes: [
      { id: "9", label: "9 ft", price: null, heightMin: 9, heightMax: 9 },
      { id: "12", label: "12 ft", price: null, heightMin: 12, heightMax: 12 },
      { id: "15", label: "15 ft", price: null, heightMin: 15, heightMax: 15 },
      { id: "20", label: "20 ft", price: null, heightMin: 20, heightMax: 20 },
      { id: "25", label: "25 ft", price: null, heightMin: 25, heightMax: 25 },
      { id: "30", label: "30 ft", price: null, heightMin: 30, heightMax: 30 },
    ],
    facts: { needleRetention: "Excellent when kept in water-fed base", fragrance: "Medium to strong", branchStrength: "Very strong", shape: "Full pyramid", bestFor: "Lobbies, mall courts, patios, town squares" },
    images: [
      { src: "/images/commercial-lobby.jpg", alt: "A 20-foot decorated tree in a hotel lobby atrium with guests walking by" },
      { src: "/images/commercial-install.jpg", alt: "An install crew in hi-vis vests raising a 15-foot tree on a restaurant patio at night" },
    ],
    badges: ["Commercial", "Quote only"],
    shipsFrom: "Oregon",
    stock: "quote",
    fragrance: 3,
    rooms: ["lobby", "porch"],
    inTheBox: [
      "Cut-to-order tree, treated and tagged",
      "Delivery by freight or our own truck",
      "Install with anchored, water-fed stand (optional)",
      "Takedown and haul-away (optional)",
    ],
    care: ["We refill the water on a schedule if you add the maintenance plan.", "Keep clear of heat vents and open flame."],
  },
  {
    slug: "commercial-grade-artificial",
    name: "Commercial-Grade Artificial Tree",
    category: "commercial",
    species: "Steel-frame, flame-retardant",
    tagline: "Reusable for ten seasons. Steel frame, LED lighting, stored flat.",
    description:
      "A modular, steel-frame artificial tree in sections that pin together on site. All foliage is flame-retardant (certified to NFPA 701 and UL-listed lighting where specified), and the whole tree breaks down to ship and store. We install it, light it, and strike it at the end of the season.",
    sizes: [
      { id: "9", label: "9 ft", price: null, heightMin: 9, heightMax: 9 },
      { id: "12", label: "12 ft", price: null, heightMin: 12, heightMax: 12 },
      { id: "15", label: "15 ft", price: null, heightMin: 15, heightMax: 15 },
      { id: "20", label: "20 ft", price: null, heightMin: 20, heightMax: 20 },
      { id: "25", label: "25 ft", price: null, heightMin: 25, heightMax: 25 },
      { id: "30", label: "30 ft", price: null, heightMin: 30, heightMax: 30 },
    ],
    facts: { needleRetention: "Permanent", fragrance: "None", branchStrength: "Steel frame", shape: "Full cone", bestFor: "Malls, hotels, offices, repeat displays" },
    images: [{ src: "/images/commercial-mall.jpg", alt: "A 25-foot tree in a shopping mall concourse with families gathering" }],
    badges: ["Commercial", "Quote only", "Flame-retardant"],
    shipsFrom: "North Carolina",
    stock: "quote",
    prelit: true,
    fragrance: 0,
    rooms: ["lobby"],
    inTheBox: [
      "Modular steel-frame tree",
      "LED lighting, UL-listed",
      "Install and strike by our crew (optional)",
      "Storage cases for the offseason",
    ],
  },

  // ───────────── ADD-ONS ─────────────
  {
    slug: "water-reservoir-stand",
    name: "Water-Reservoir Tree Stand",
    category: "addon",
    addonKind: "stand",
    species: null,
    tagline: "A one-gallon bowl that keeps the cut under water for two days.",
    description:
      "Steel legs, a cast base, and a one-gallon reservoir with a fill window so you can see the level without lying on the floor. Four stainless eye bolts hold the trunk, and the legs fold under for storage.",
    sizes: [
      { id: "up-to-7", label: "Trees up to 7 ft", price: 44, dims: "Fits trunks up to 6 in" },
      { id: "up-to-9", label: "Trees up to 9 ft", price: 59, dims: "Fits trunks up to 8 in" },
    ],
    images: [{ src: "/images/stand-watering.jpg", alt: "A water-reservoir stand under a freshly set up fir" }],
    badges: ["Stand"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["Stand with reservoir", "Four eye bolts and a wrench"],
  },
  {
    slug: "classic-metal-stand",
    name: "Classic Metal Stand",
    category: "addon",
    addonKind: "stand",
    species: null,
    tagline: "A plain black steel stand with a deep bowl. Nothing to break.",
    description:
      "A powder-coated steel stand with a 1.5-quart bowl. Not fancy, but it stands for years. Pair it with a skirt to cover the legs.",
    sizes: [{ id: "up-to-7", label: "Trees up to 7 ft", price: 29, dims: "Fits trunks up to 5 in" }],
    images: [{ src: "/images/classic-metal-stand.jpg", alt: "A black steel tree stand on a wood floor" }],
    badges: ["Stand"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["Stand and bolts"],
  },
  {
    slug: "heavy-duty-stand",
    name: "Heavy-Duty Stand for 12 ft+",
    category: "addon",
    addonKind: "stand",
    species: null,
    tagline: "Built for the big trees. Cast iron and a three-gallon reservoir.",
    description:
      "A cast-iron base with a 3-gallon reservoir and a four-point trunk clamp, rated for trees up to 20 feet and 250 pounds. Used by our own install crews, and we'll quote you anchor cables if you're setting a tree in a public space.",
    sizes: [{ id: "12-20", label: "Trees 12–20 ft", price: 189, dims: "Fits trunks up to 10 in. 38 lb." }],
    images: [{ src: "/images/heavy-duty-stand.jpg", alt: "A heavy cast-iron tree stand with a large water reservoir" }],
    badges: ["Stand"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["Cast-iron stand", "Trunk clamp bolts", "Anchor ring points"],
  },
  {
    slug: "red-velvet-tree-skirt",
    name: "Red Velvet Tree Skirt",
    category: "addon",
    addonKind: "skirt",
    species: null,
    tagline: "Berry-red velvet with a plain cotton backing. Washes better than it looks.",
    description:
      "A 48-inch skirt of cotton velvet in the red of old holiday cards, trimmed with a simple brass-tone snap closure. Heavy enough to lie flat and cover a stand and a water spill.",
    sizes: [{ id: "48", label: '48"', price: 36, dims: "48 in diameter" }],
    images: [{ src: "/images/tree-skirt.jpg", alt: "A berry-red velvet tree skirt under a fir" }],
    badges: ["Skirt"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["One tree skirt"],
  },
  {
    slug: "burlap-tree-collar",
    name: "Burlap and Wood Tree Collar",
    category: "addon",
    addonKind: "skirt",
    species: null,
    tagline: "A woven basket that hides the stand. Better for homes with cats.",
    description:
      "A woven willow collar lined with burlap that surrounds the stand and keeps pets away from the water. Fits most 18-inch stands.",
    sizes: [{ id: "22", label: '22"', price: 54, dims: "22 in wide, 12 in tall" }],
    images: [{ src: "/images/tree-collar.jpg", alt: "A woven willow tree collar around a stand" }],
    badges: ["Skirt"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["One woven collar"],
  },
  {
    slug: "fraser-fir-wreath",
    name: "Fresh Fraser Fir Wreath",
    category: "addon",
    addonKind: "wreath",
    species: null,
    tagline: "Hand-wired on a steel ring the week it ships. Smells like the farm.",
    description:
      "Wired by hand in our shop from Fraser fir tips, with a cluster of cones and a plain ribbon. Hangs from a hook or a ribbon and lasts four to five weeks outdoors in the cold, two to three indoors.",
    sizes: [
      { id: "24", label: '24"', price: 39, dims: "24 in across" },
      { id: "36", label: '36"', price: 69, dims: "36 in across" },
      { id: "48", label: '48"', price: 119, dims: "48 in across" },
    ],
    images: [{ src: "/images/wreath.jpg", alt: "A fresh fir wreath hanging on a weathered red door" }],
    badges: ["Fresh cut"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 3,
    rooms: [],
    inTheBox: ["One wreath, shipped flat", "Hanging loop on the back"],
  },
  {
    slug: "fresh-garland",
    name: "Fresh Evergreen Garland",
    category: "addon",
    addonKind: "garland",
    species: null,
    tagline: "Mixed fir and cedar on a rope core. Drape it on stairs, mantels, door frames.",
    description:
      "A rope-cored garland of Fraser fir and Western red cedar, tied by hand in 9- or 18-foot lengths. It's heavy and full, so use hooks rated for the weight. Add lights, ribbon, or nothing at all.",
    sizes: [
      { id: "9ft", label: "9 ft", price: 54, dims: "9 ft long, about 10 in wide" },
      { id: "18ft", label: "18 ft", price: 98, dims: "18 ft long, about 10 in wide" },
    ],
    images: [{ src: "/images/garland.jpg", alt: "Fresh evergreen garland on a staircase banister with warm white lights" }],
    badges: ["Fresh cut"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 3,
    rooms: [],
    inTheBox: ["One garland, coiled and boxed"],
  },
  {
    slug: "glass-ornament-set",
    name: "Hooks and Glass Ornament Set",
    category: "addon",
    addonKind: "ornaments",
    species: null,
    tagline: "Thirty plain glass balls in cranberry, brass and ivory, with brass hooks.",
    description:
      "A set of 30 mouth-blown glass ornaments in three colors that go with our palette: cranberry, brass, and ivory. Packed in a divided box that doubles as storage. Includes a bag of 50 brass hooks.",
    sizes: [{ id: "30", label: "Set of 30", price: 34, dims: "2.4 in each" }],
    images: [{ src: "/images/ornaments.jpg", alt: "Cranberry, brass and ivory glass ornaments in a divided box" }],
    badges: ["Ornaments"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["30 glass ornaments", "50 brass hooks", "Divided storage box"],
  },
  {
    slug: "tree-removal-bags",
    name: "Tree Removal and Disposal Bags",
    category: "addon",
    addonKind: "bags",
    species: null,
    tagline: "Slide it on in January, drag it out, and don't vacuum the hallway for a week.",
    description:
      "A heavy-duty bag that goes around the tree before you take it down. Fits trees up to 9 feet. Pull it up from the base and you've caught nearly every needle. Two in a pack.",
    sizes: [{ id: "2pk", label: "2-pack", price: 12, dims: "Fits up to 9 ft" }],
    images: [{ src: "/images/removal-bags.jpg", alt: "A tree removal bag around a fir in a living room" }],
    badges: ["Cleanup"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["Two bags"],
  },
  {
    slug: "tree-preservative",
    name: "Tree Preservative",
    category: "addon",
    addonKind: "care",
    species: null,
    tagline: "Sugar, minerals and a pinch of acid. Plain water works. This works a bit better.",
    description:
      "A powder that mixes into the stand water to keep the cut sap from closing too fast. It won't keep a bad tree fresh, but it'll help a good one keep needles an extra week. One bag treats about five fills.",
    sizes: [{ id: "8oz", label: "8 oz bag", price: 9, dims: "Treats 5 gallons" }],
    images: [{ src: "/images/preservative.jpg", alt: "A paper bag of tree preservative next to a tree stand" }],
    badges: ["Care"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["One 8 oz bag"],
  },
  {
    slug: "replacement-bulbs",
    name: "Replacement LED Bulb Kit",
    category: "addon",
    addonKind: "bulbs",
    species: null,
    tagline: "Fifty spare bulbs and fuses for our pre-lit trees. Keep them in the box.",
    description:
      "Spare warm-white LED bulbs, multi-color bulbs, and 10 replacement fuses that fit every pre-lit tree we sell. Comes with a bulb puller and a one-page guide to finding the one dead bulb.",
    sizes: [
      { id: "warm", label: "Warm white, 50", price: 8, dims: "50 bulbs, 10 fuses" },
      { id: "multi", label: "Multicolor, 50", price: 8, dims: "50 bulbs, 10 fuses" },
    ],
    images: [{ src: "/images/bulbs.jpg", alt: "A small box of spare LED bulbs and fuses with a bulb puller" }],
    badges: ["Spare parts"],
    shipsFrom: "North Carolina",
    stock: "in",
    fragrance: 0,
    rooms: [],
    inTheBox: ["50 bulbs", "10 fuses", "Bulb puller"],
  },
];
