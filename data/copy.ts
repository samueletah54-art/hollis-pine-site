import type { Facts, Product } from "./products";

/*
  Product copy and photography slots.
  - One photograph per product at /public/images/<slug>.webp (4:5, 1600 px wide).
  - Every tree is shot in the same corner of the same cream-walled room, on the same wooden floor.
  - Live species also get a 16:9 needle close-up at /public/images/needles-<slug>.webp.
  Anything here that states a fact about the business is listed in CLIENT-TO-CONFIRM.md.
*/

type Copy = {
  tagline: string;
  description: string;
  facts?: Facts;
  note?: string;
  needles?: string; // alt text for the close-up
};

const live = (
  needleRetention: string,
  indoors: string,
  fragrance: string,
  branchStrength: string,
  shape: string,
  bestFor: string,
): Facts => ({ needleRetention, indoors, fragrance, branchStrength, shape, bestFor });

const copy: Record<string, Copy> = {
  "fraser-fir": {
    tagline: "Stiff branches and dark green needles. Holds heavy ornaments.",
    description:
      "Fraser is the tree most people picture. The branches are stiff and turn up a little, so glass ornaments stay where you hang them. The needles are soft, dark green on top and silver underneath. Keep the stand full and it holds them for five weeks.",
    facts: live("Holds needles about 5 weeks", "5 to 6 weeks, watered daily", "Medium. Clean and sweet.", "Very strong", "Dense pyramid", "Heavy ornaments, tall rooms"),
    note: "Our family's pick this year. Easy to hang things on.",
    needles: "Close-up of Fraser fir needles, dark green with silver undersides, on a frosty branch",
  },
  "balsam-fir": {
    tagline: "Slim and strong-smelling. The tree that makes the whole house smell like Christmas.",
    description:
      "Balsam has the strongest scent of the classic firs. The crown is narrow and a little uneven, which looks right in an older house. The needles are short and glossy. It drinks a lot, so check the stand every morning.",
    facts: live("Holds needles about 4 weeks", "4 to 5 weeks, watered daily", "Strong. Resin and sweet.", "Medium", "Narrow spire", "Scent, smaller living rooms"),
    note: "Buy it for the smell. Water it every morning.",
    needles: "Close-up of short glossy Balsam fir needles on a branch",
  },
  "noble-fir": {
    tagline: "Stiff shelves of branches with room between them. Ornaments show.",
    description:
      "Noble fir grows in layers with gaps between the branches, so every ornament has space. The needles are blue-green and curve upward. They hold on well past New Year. This is the tree for a big set of glass balls or a long season.",
    facts: live("Holds needles 6 weeks or more", "6 weeks, watered daily", "Mild. Woodsy.", "Very strong", "Open, layered", "Showing off ornaments, long seasons"),
    needles: "Close-up of Noble fir needles, blue-green and curved upward, with silver undersides",
  },
  "douglas-fir": {
    tagline: "Soft needles, full shape, kind price. A good first real tree.",
    description:
      "Douglas fir has the softest needles we grow, so children like it. The shape is full and fluffy. Crush a needle and it smells of orange peel. The branches are thinner than a Fraser's, so use light ornaments and ribbon. It needs water every day.",
    facts: live("Holds needles about 3 weeks", "3 to 4 weeks, watered daily", "Medium. Orange peel.", "Light to medium", "Full and soft", "First-time buyers, children, budgets"),
    needles: "Close-up of soft Douglas fir needles on a branch",
  },
  "nordmann-fir": {
    tagline: "Glossy needles, very little scent, almost no needle drop.",
    description:
      "Nordmann is the tree to buy if anyone in the house sneezes at pine. The needles are dark and shiny and stay on the branch even when the tree is moved. The branches are spaced wide, so strings of lights show clearly. The scent is faint.",
    facts: live("Holds needles 6 weeks or more", "6 weeks, watered daily", "Very mild", "Strong", "Broad cone", "Allergies, low mess"),
    needles: "Close-up of glossy dark Nordmann fir needles on a branch",
  },
  "canaan-fir": {
    tagline: "Looks like a Fraser. Smells a little like a Balsam.",
    description:
      "Canaan is dense and deep green, with a sweet scent that fills a room without taking it over. It copes with a warm house better than most firs. If the Fraser is sold out, this is the one we would pick.",
    facts: live("Holds needles about 5 weeks", "5 weeks, watered daily", "Medium to strong. Sweet.", "Strong", "Dense pyramid", "Warm houses, Fraser fans"),
    needles: "Close-up of dense deep-green Canaan fir needles",
  },
  "grand-fir": {
    tagline: "The strongest scent on the farm. You smell it from the front door.",
    description:
      "Grand fir smells of orange rind and pine resin. The branches are thin and the shape is a bit shaggy, so the price is kind. Buy it for the smell, not for the silhouette. Hang light ornaments and keep the stand full.",
    facts: live("Holds needles 3 to 4 weeks", "3 to 4 weeks, watered daily", "Very strong. Citrus and pine.", "Light", "Shaggy, informal", "Scent above everything else"),
    needles: "Close-up of long flat Grand fir needles on a branch",
  },
  "concolor-fir": {
    tagline: "Long, pale blue-green needles. Soft shape, light scent of tangerine.",
    description:
      "Concolor, also called white fir, has needles twice as long as a Fraser's. They curve like fingers and run from silver-green to blue. The tree is full but not heavy. It suits people who find ordinary firs too dark.",
    facts: live("Holds needles about 4 weeks", "4 weeks, watered daily", "Mild. Tangerine.", "Medium", "Full, soft cone", "A pale, airy look"),
    needles: "Close-up of long pale blue-green Concolor fir needles",
  },
  "scotch-pine": {
    tagline: "Keeps its needles when other trees give up.",
    description:
      "Scotch pine is the toughest tree we sell. If the stand runs dry for a day, it still holds its needles. The branches are stiff and thick, with long bright needles. It looks a little old-fashioned, in a good way.",
    facts: live("Best of any tree we sell, 6 weeks or more", "6 weeks, even with a missed day", "Medium. Classic pine.", "Very strong", "Dense, rounded", "People who forget to water, long seasons"),
    note: "Forget to water? Buy this one.",
    needles: "Close-up of long bright Scotch pine needles in pairs",
  },
  "colorado-blue-spruce": {
    tagline: "Silver-blue and sharp. Wear gloves when you decorate it.",
    description:
      "Blue spruce has the colour everyone asks about, a silver blue that looks cold and handsome under white lights. The needles are stiff and prickly, so this is a tree for adults. The branches are strong and carry heavy ornaments. Not a good fit for a house with a curious dog.",
    facts: live("Holds needles about 4 weeks", "4 weeks, watered daily", "Mild and sharp", "Very strong", "Tight cone", "Colour, heavy ornaments, no pets"),
    needles: "Close-up of stiff silver-blue Colorado blue spruce needles",
  },
  "norway-spruce": {
    tagline: "The old Scandinavian tree. Drops needles fast, so buy it late.",
    description:
      "Norway spruce has drooping branches and a deep green colour. It drops needles faster than a fir, so put it up close to Christmas. It also suits a porch or an outdoor display, where the cold keeps it fresh.",
    facts: live("Holds needles 2 to 3 weeks", "2 to 3 weeks, watered daily", "Mild. Spruce.", "Light", "Graceful, drooping", "Porches, short seasons, budgets"),
    needles: "Close-up of short dark Norway spruce needles on a drooping branch",
  },
  "tabletop-live-tree": {
    tagline: "Two feet of real tree in a clay pot. Plant it in the garden in spring.",
    description:
      "A small potted Balsam fir with its roots in the pot. Keep it indoors for no more than ten days. Then put it outside in a sheltered spot and plant it when the ground thaws. It fits on a kitchen counter, a mantel, or a shop counter.",
    facts: live("Holds needles if kept cool", "10 days indoors at most", "Strong for its size", "Medium", "Small spire", "Counters, desks, planting later"),
    needles: "Close-up of short glossy Balsam fir needles on a young tree",
  },

  "classic-full-prelit": {
    tagline: "A full tree with lights already on. Fluff it once and it looks real.",
    description:
      "A full, hinged tree in three sections, made from moulded tips with filler for body. The LED lights are fused, so one dead bulb does not put out the string. Plan twenty minutes to shape the branches. After that it goes up in ten, year after year.",
    facts: { needleRetention: "Never drops needles", indoors: "Years. Store it dry.", fragrance: "None. Add a fir wreath.", branchStrength: "Strong, hinged", shape: "Full cone", bestFor: "Rentals, allergies, big rooms" },
  },
  "slim-pencil-prelit": {
    tagline: "Narrow enough for a hallway, tall enough to feel like Christmas.",
    description:
      "A tall, slim tree, 24 inches wide at the 6 ft size, with warm LEDs already on. It fits corners, entryways and small flats where a full tree would block the door. The tips bend, so you can leave gaps for ornaments or fill them in.",
    facts: { needleRetention: "Never drops needles", indoors: "Years. Store it dry.", fragrance: "None", branchStrength: "Medium", shape: "Slim column", bestFor: "Hallways, flats, narrow corners" },
  },
  "flocked-frosted-tree": {
    tagline: "A light dusting of white. Green still shows through.",
    description:
      "A 7.5 ft hinged tree, lightly flocked, so it looks like the morning after snow and not like a cotton ball. Warm-white LEDs are fitted. Some flocking sheds at first, so set it up where you can vacuum once.",
    facts: { needleRetention: "Never drops needles", indoors: "Years. Store it dry.", fragrance: "None", branchStrength: "Strong", shape: "Full cone", bestFor: "Winter-white rooms" },
  },
  "half-tree-wall": {
    tagline: "A tree cut in half. Flat to the wall. The floor is yours again.",
    description:
      "A flat-backed 6 ft tree for small rooms, stair landings and shop windows. The lights run on the front only, so the back stays clean against the wall. It stands on a steel base and arrives in two sections.",
    facts: { needleRetention: "Never drops needles", indoors: "Years. Store it dry.", fragrance: "None", branchStrength: "Medium", shape: "Flat-back cone", bestFor: "Walls, windows, stair landings" },
  },
  "upside-down-tree": {
    tagline: "Wide end up, point down. Yes, on purpose.",
    description:
      "A 7 ft tree hung the other way round. The wide end is up high and the point is near the floor, so the floor under it is clear. Pets and small children find it harder to reach. It comes with a ceiling hook and a floor stand, so you choose how to hang it.",
    facts: { needleRetention: "Never drops needles", indoors: "Years. Store it dry.", fragrance: "None", branchStrength: "Strong", shape: "Inverted cone", bestFor: "Small floors, pets, a talking point" },
  },

  "commercial-giant-fir": {
    tagline: "9 to 30 ft. Cut to order, delivered, set up and taken down by our crew.",
    description:
      "For hotel lobbies, shopping centres, restaurant patios and town squares. We cut to your height, treat the tree with a fire retardant, and deliver it. Our crew sets it in a water-fed base and anchors it. After the holidays we take it down and haul it away.",
    facts: { needleRetention: "Holds needles all season in a water-fed base", indoors: "5 to 6 weeks with daily water", fragrance: "Medium to strong", branchStrength: "Very strong", shape: "Full pyramid", bestFor: "Lobbies, malls, patios, town squares" },
  },
  "commercial-grade-artificial": {
    tagline: "Steel frame, flame-retardant foliage. Reusable for years.",
    description:
      "A modular tree that pins together on site, with a steel frame and flame-retardant foliage. It breaks down for storage in cases. We install it, light it, and take it down at the end of the season. Ask us for the fire certificate your building manager needs.",
    facts: { needleRetention: "Never drops needles", indoors: "Years, stored in cases", fragrance: "None", branchStrength: "Steel frame", shape: "Full cone", bestFor: "Malls, hotels, offices, repeat displays" },
  },

  "water-reservoir-stand": {
    tagline: "A one-gallon bowl. The cut stays under water for two days.",
    description:
      "Steel legs, a cast base and a one-gallon reservoir with a fill window, so you can see the level without lying on the floor. Four stainless bolts hold the trunk. The legs fold flat for storage. Use the small size for trees up to 7 ft and the large one up to 9 ft.",
  },
  "classic-metal-stand": {
    tagline: "A plain black steel stand with a deep bowl. Nothing to break.",
    description:
      "A powder-coated steel stand with a 1.5 quart bowl. It is plain and it lasts for years. Pair it with a skirt to hide the legs. For a tree over 6 ft, a bigger bowl is better. See the stand size chart in the care guide.",
  },
  "heavy-duty-stand": {
    tagline: "Cast iron and a three-gallon bowl. For trees 12 ft and taller.",
    description:
      "A cast-iron base with a three-gallon bowl and a four-point trunk clamp. It is rated for trees up to 20 ft and 250 lb. If you are setting a tree in a public space, ask us about anchor cables.",
  },
  "red-velvet-tree-skirt": {
    tagline: "Cranberry velvet over a plain cotton back. It washes better than it looks.",
    description:
      "A 48 inch skirt of cotton velvet in a deep red. It lies flat and covers the stand, the legs and any spilt water. A simple snap closes it around the trunk.",
  },
  "burlap-tree-collar": {
    tagline: "A woven collar that hides the stand and keeps pets out of the water.",
    description:
      "A woven willow collar lined with burlap. It goes around the stand and keeps cats and dogs away from the water. It fits most stands up to 18 inches wide.",
  },
  "fraser-fir-wreath": {
    tagline: "Wired by hand from Fraser fir tips, with a few cones and a plain ribbon.",
    description:
      "Hang it on a door or over a mantel. It lasts four to five weeks outdoors in the cold and two to three indoors. It arrives flat and is ready to hang, with a loop on the back.",
  },
  "fresh-garland": {
    tagline: "Fir and cedar on a rope core. Drape it on stairs, mantels and door frames.",
    description:
      "Mixed fir and cedar tied on a rope core, in 9 or 18 foot lengths. It is heavy and full, so use hooks rated for the weight. Add lights or ribbon, or leave it plain.",
  },
  "glass-ornament-set": {
    tagline: "Thirty plain glass balls in cranberry, brass and ivory, with hooks.",
    description:
      "Thirty glass ornaments in three colours that sit well on any green tree: cranberry, brass and ivory. They come in a divided box that doubles as storage. A bag of 50 brass hooks is included.",
  },
  "tree-removal-bags": {
    tagline: "Slide it around the tree in January and keep the hallway clean.",
    description:
      "A heavy-duty bag that goes around the tree before you take it down. It fits trees up to 9 ft. Pull it up from the base and it catches nearly every needle. Two bags in a pack.",
  },
  "tree-preservative": {
    tagline: "Sugar, minerals and a little acid. Plain water works. This works a bit better.",
    description:
      "A powder you mix into the stand water. It will not rescue a dry tree, but it can give a good one an extra week. One 8 oz bag treats about five fills of a one-gallon stand.",
  },
  "replacement-bulbs": {
    tagline: "Fifty spare bulbs and ten fuses for our pre-lit trees.",
    description:
      "Spare LED bulbs and replacement fuses that fit the pre-lit trees we sell. It comes with a bulb puller and a one-page guide to finding the one bulb that has gone out. Keep it in the tree box.",
  },
};

const room = "in the corner of a cream-walled room, on a wooden floor";

export function applyCopy(p: Product): Product {
  const c = copy[p.slug];
  if (!c) return p;

  const isTree = p.category === "live" || p.category === "artificial";
  const alt = isTree
    ? `${p.name}, standing ${room}`
    : p.category === "commercial"
      ? `${p.name}, installed in a public building`
      : `${p.name} on a wooden floor, in the same cream-walled room`;

  return {
    ...p,
    tagline: c.tagline,
    description: c.description,
    facts: c.facts ?? p.facts,
    note: c.note,
    images: [{ src: `/images/${p.slug}.webp`, alt }],
    needlesImage: c.needles ? { src: `/images/needles-${p.slug}.webp`, alt: c.needles } : undefined,
  };
}
