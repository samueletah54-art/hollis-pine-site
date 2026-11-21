"use client";

import dynamic from "next/dynamic";

/** Snow is decoration below the fold, so its code is loaded after the page is interactive and kept out of the first bundle. */
const Snow = dynamic(() => import("./Snow"), { ssr: false });
export default Snow;
