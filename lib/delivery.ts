// Shipping-window math. Live trees ship Mon–Wed only so they never sit in a warehouse over a weekend.

export const ORDER_BY = { month: 12, day: 12 }; // Dec 12

const DAY = 86400000;
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Transit days (min, max) from a hub, estimated by the first digit of the ZIP. */
export const transitFor = (zip: string, from: "Oregon" | "North Carolina"): [number, number] | null => {
  if (!/^\d{5}$/.test(zip)) return null;
  const z = Number(zip[0]);
  // 0 1 NE | 2 3 SE/Mid-Atlantic | 4 5 Midwest | 6 7 Plains | 8 Mountain | 9 West
  const eastish = z <= 3;
  const westish = z >= 8;
  if (from === "North Carolina") return eastish ? [1, 2] : westish ? [3, 5] : [2, 3];
  return westish ? [1, 2] : eastish ? [3, 5] : [2, 3];
};

const nextShipDay = (from: Date, live: boolean): Date => {
  let d = startOfDay(addDays(from, 1)); // we ship the next working day at earliest
  for (let i = 0; i < 8; i++) {
    const wd = d.getDay(); // 0 sun
    const ok = live ? wd >= 1 && wd <= 3 : wd >= 1 && wd <= 5;
    if (ok) return d;
    d = addDays(d, 1);
  }
  return d;
};

const addBusiness = (d: Date, n: number) => {
  let x = d;
  while (n > 0) {
    x = addDays(x, 1);
    if (x.getDay() !== 0 && x.getDay() !== 6) n--; // skip weekends for carriers
  }
  return x;
};

export const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export type Estimate = { ships: Date; arriveFrom: Date; arriveTo: Date };

export const estimate = (zip: string, from: "Oregon" | "North Carolina", live: boolean, today = new Date()): Estimate | null => {
  const t = transitFor(zip, from);
  if (!t) return null;
  const ships = nextShipDay(today, live);
  return { ships, arriveFrom: addBusiness(ships, t[0]), arriveTo: addBusiness(ships, t[1]) };
};

/** Earliest arrival (for the "arrive by" filter). Nationwide worst case on transit. */
export const earliestArrival = (live: boolean, quoteOnly: boolean, today = new Date()): Date => {
  if (quoteOnly) return addDays(today, 21);
  const ships = nextShipDay(today, live);
  return addBusiness(ships, 1);
};

export const pastOrderBy = (today = new Date()): boolean => {
  const cutoff = new Date(today.getFullYear(), ORDER_BY.month - 1, ORDER_BY.day, 23, 59);
  return today > cutoff;
};
