/*
  Business details shown on the site (footer, contact, delivery, policies).
  The defaults below are PLACEHOLDERS. Set the NEXT_PUBLIC_* variables in the hosting dashboard (no code change needed),
  or edit the defaults. See CLIENT-TO-CONFIRM.md.
*/
const env = (key: string, fallback: string) => (process.env[key] || "").trim() || fallback;
const digits = (s: string) => s.replace(/\D/g, "");

const phone = env("NEXT_PUBLIC_PHONE", "(555) 010-0142");

export const BIZ = {
  name: env("NEXT_PUBLIC_BUSINESS_NAME", "Hollis & Pine Tree Co."),
  phone,
  phoneHref: `+1${digits(phone).slice(-10)}`,
  email: env("NEXT_PUBLIC_EMAIL", "hello@hollisandpine.example"),
  /** Separate address lines with "|" in NEXT_PUBLIC_ADDRESS, e.g. "12 Mill Rd|Boone, NC 28607" */
  address: env("NEXT_PUBLIC_ADDRESS", "1 Orchard Lane|Your Town, ST 00000").split("|").map((l) => l.trim()).filter(Boolean),
  hours: [
    ["Phone and email", env("NEXT_PUBLIC_HOURS", "Monday to Saturday, 8 am to 5 pm Eastern")],
    ["Farm gate", "Closed to visitors. We ship."],
  ] as [string, string][],
  orderBy: env("NEXT_PUBLIC_ORDER_BY", "December 12"),
  liveShipDays: "Monday, Tuesday and Wednesday",
};

/** True while any contact detail is still the placeholder. Used to warn in the server log at build time. */
export const BIZ_IS_PLACEHOLDER = BIZ.email.endsWith(".example") || BIZ.phone.includes("555");
