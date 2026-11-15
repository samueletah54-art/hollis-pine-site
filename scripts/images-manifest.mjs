// Lists which photos exist in /public/images so the site only requests files that are there.
// Runs automatically before `dev` and `build`. Drop photos in public/images and restart.
import { readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const dir = new URL("../public/images/", import.meta.url);
mkdirSync(dir, { recursive: true });
const files = existsSync(dir) ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort() : [];
writeFileSync(new URL("../lib/image-manifest.json", import.meta.url), JSON.stringify(files.map((f) => `/images/${f}`), null, 2) + "\n");
console.log(`images manifest: ${files.length} photo(s) found`);
