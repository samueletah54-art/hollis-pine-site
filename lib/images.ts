import manifest from "@/lib/image-manifest.json";

/** True when /public/images/<name>.webp has been added. Lets pages leave out photo sections that have no photo yet. */
export const hasImage = (src: string) => (manifest as string[]).includes(src);
