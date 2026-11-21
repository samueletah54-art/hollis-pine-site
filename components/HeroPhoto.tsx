import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

const HERO = "/hero.jpg";
/** Used only until a real /public/hero.jpg is supplied, so the page never shows a broken image. */
const FALLBACK = { src: "/images/delivered-netted-tree-lit.webp", alt: "A netted fir tree standing on a porch in front of a door with a wreath, warm light from inside" };

/**
 * The home page hero photo. Drop a lifestyle photo at /public/hero.jpg (a decorated tree in a warm living room)
 * and it is used automatically at the next build. Fixed 4:5 frame, object-fit cover, loaded with priority.
 * TODO: confirm the alt text below describes the photo you supply.
 */
export default function HeroPhoto() {
  const has = existsSync(path.join(process.cwd(), "public", HERO));
  const img = has ? { src: HERO, alt: "A decorated Christmas tree in a warm living room" } : FALLBACK;
  return (
    <div className="plate">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" quality={55} sizes="(min-width:768px) 40vw, calc(100vw - 2.5rem)" className="object-cover" />
      </div>
    </div>
  );
}
