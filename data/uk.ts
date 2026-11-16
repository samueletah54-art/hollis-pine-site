// London / UK pages. Placeholders are marked in CLIENT-TO-CONFIRM.md (section "London pages").
const pick = (v: string | undefined, d: string) => (v && v.trim() ? v.trim() : d);

export const UK = {
  name: "Hollis & Pine",
  city: "London",
  phone: pick(process.env.NEXT_PUBLIC_UK_PHONE, "020 0000 0000"),
  phoneHref: pick(process.env.NEXT_PUBLIC_UK_PHONE_HREF, "+442000000000"),
  email: pick(process.env.NEXT_PUBLIC_UK_EMAIL, "london@hollisandpine.example"),
  address: pick(process.env.NEXT_PUBLIC_UK_ADDRESS, "Depot address to be confirmed|London, UK").split("|"),
  // Prices are placeholders in pounds, VAT included.
  trees: [
    { id: "nordmann-5", name: "5ft Nordmann Fir", price: 75, photo: "/images/nordmann-fir.webp" },
    { id: "nordmann-6", name: "6ft Nordmann Fir", price: 95, photo: "/images/nordmann-fir.webp" },
    { id: "nordmann-7", name: "7ft Nordmann Fir", price: 125, photo: "/images/nordmann-fir.webp" },
    { id: "norway-6", name: "6ft Norway Spruce", price: 65, photo: "/images/norway-spruce.webp" },
  ],
  areas: [
    "Angel", "Balham", "Barking", "Battersea", "Brixton", "Camden", "Canary Wharf", "Chiswick", "Clapham", "Croydon",
    "Ealing", "East London", "Fulham", "Greenwich", "Hackney", "Hammersmith", "Islington", "Kensington", "Putney",
    "Richmond", "South London", "Streatham", "Twickenham", "Wandsworth", "Wimbledon", "West London",
  ],
} as const;
export type UkTree = (typeof UK.trees)[number];
export const gbp = (n: number) => `£${n.toFixed(2)}`;
