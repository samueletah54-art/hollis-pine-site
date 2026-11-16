# CLIENT-TO-CONFIRM

Everything below is **draft text or a placeholder**. It must be true, or replaced with the real answer, **before the site goes public**. Tick each line when the client has confirmed it.

Where to change each item is in brackets.

## 1. Business identity (placeholders, replace all)

Set these in the Vercel dashboard as `NEXT_PUBLIC_BUSINESS_NAME`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_ADDRESS`, `NEXT_PUBLIC_HOURS`. No code change needed. Also set `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` and `RESEND_API_KEY` so forms reach a person.

- [ ] Trading name "Hollis & Pine Tree Co." [`data/business.ts`, logo in `components/Header.tsx`, `app/layout.tsx`]
- [ ] Street address (currently "1 Orchard Lane, Your Town, ST 00000") [`data/business.ts`]
- [ ] Phone number (currently a fake 555 number) [`data/business.ts`]
- [ ] Email address (currently `hello@hollisandpine.example`) [`data/business.ts`, `lib/mail.ts`, `.env`]
- [ ] Opening hours: "Monday to Saturday, 8 am to 5 pm Eastern"; farm gate "closed to visitors" [`data/business.ts`]
- [ ] Real domain, set as `NEXT_PUBLIC_SITE_URL` [Vercel project settings]

## 2. History and "who we are" claims

None of these have been verified. The site says them in a plain voice, but they are placeholders.

- [ ] "A small family business" / "family-run" [About page, `app/about/page.tsx`, Fraser tile note]
- [ ] "Two farms, one in Oregon and one in North Carolina" [About page, product "ships from" fields, home page]
- [ ] Which species grow on which farm; "high in the Blue Ridge mountains"; "cool, wet winters" [About page]
- [ ] "We grow the trees, cut them to order, and pack them ourselves" [About page, home]
- [ ] "Cold nights make a tighter tree" [home banner note]
- [ ] Anything the old version said that has been **removed** and must not come back unless true: "Est. 1987", "35 years of growing trees", founders' names, acreage, staff numbers, "we plant two for every one we cut"
- [ ] There are **no awards** on the site. Add only real ones.

## 3. Reviews and testimonials

- [ ] The sample reviews and testimonials in `data/reviews.ts` are **invented**. They are hidden by default. They only show if `NEXT_PUBLIC_SAMPLE_REVIEWS=1` (use that only for a private preview). Replace them with real customer reviews, then remove the flag. Publishing invented reviews can break consumer-protection rules.

## 4. Operations: what we promise customers

- [ ] "Cut to order. Never cut before you order." "Cut the same week it ships."
- [ ] Live trees ship Monday, Tuesday, Wednesday only
- [ ] Delivery in "one to four days"; ZIP estimates in `lib/delivery.ts` are rough guesses by region
- [ ] Order-by date: December 12 [`data/business.ts`, `lib/delivery.ts`]
- [ ] Ships to the 48 contiguous states only; no P.O. boxes; state restrictions on live evergreens
- [ ] Shipping prices: live under 7 ft $24, 7 ft and over $34; artificial $19 or free over $250; extras $9 [`lib/pricing.ts`, Delivery page]
- [ ] What the carrier does if nobody is home; that a live tree is fine outside for a day in cold weather; that we can hold a shipment if asked [Delivery page, FAQ]
- [ ] Sales tax: how it is collected (Stripe Tax needs setting up; `STRIPE_AUTOMATIC_TAX=1`)

## 4b. Black Friday offer (invented defaults, confirm)

- [ ] **15% off live and artificial trees, Nov 27 to Nov 30, Eastern time**: the amount, the dates, and that extras and commercial quotes are excluded [`lib/promo.ts`, or the `NEXT_PUBLIC_PROMO_*` variables]
- [ ] Offer wording in the Terms page (no stacking, may end early if stock runs out)

## 5. Returns and refunds

- [ ] Live trees: replace or refund if damaged; photos within 48 hours; no return for change of mind
- [ ] Artificial trees and extras: 30-day returns, unused, prepaid label, refund in 5–7 working days; who pays return shipping
- [ ] Wreaths and garland cannot be returned
- [ ] Defective items can be returned within the first season

## 6. Business customers

- [ ] 9–30 ft trees, live or artificial; install, takedown, haul-away
- [ ] Fire safety: "flame-retardant foliage", "UL-listed lights", "treated with an approved retardant", certificates on request. **These must be backed by real certificates (for example NFPA 701, local fire-code approval).**
- [ ] "Net-30 for approved business accounts", "25% deposit to reserve the cut date", PO for government and schools
- [ ] Lead times and crew sizes in the sizes table, order-by "early November" for 20 ft and up
- [ ] "Live trees go to a chipper and the mulch goes to a public park"
- [ ] The three project photos on the business page must show real projects

## 7. Products

- [ ] Every price, size, width and height range in `data/products.ts`
- [ ] "Few left" / "Only a few left" flags (`stock: "low"` on Nordmann, Concolor, Flocked)
- [ ] Needle retention, indoor life, scent and branch-strength statements for each species [`data/copy.ts`]
- [ ] Artificial tree specs: hinged sections, fused LED lights, widths, steel frame
- [ ] Tabletop tree: balsam fir, "plantable", 10 days indoors
- [ ] Each tree's "ships from" state

## 8. Legal pages (drafts, need review)

- [ ] Privacy policy [`app/privacy/page.tsx`]: what is collected, who it is shared with, cookies, retention
- [ ] Terms of sale [`app/terms/page.tsx`]: governing law, liability wording, fire-risk wording
- [ ] Newsletter: "a short email once a month". Connect a real list provider; today it only emails the team.

## 9. Images and illustrations

- [ ] **Photo rights.** Nine photos were supplied for the site: `fraser-fir`, `nordmann-fir`, `classic-full-prelit`, `farm-dawn-frost`, `delivered-netted-tree`, `colorado-blue-spruce`, `balsam-fir`, `norway-spruce`, `delivered-netted-tree-lit` (the home hero). The tree in `norway-spruce` stands in a room with a European wall socket, which does not suit a U.S. shop. A tenth photo was a duplicate and was not used. Species in the photos are unverified: check that each one shows the right tree. Confirm each one is the client's own, or properly licensed for commercial use, before the site stays public. The tree on `classic-full-prelit` has no lights on, while the page describes a pre-lit tree. `nordmann-fir` and `fraser-fir` should show those species. `farm-dawn-frost` is a small file stretched wide, so it will look soft on big screens.

- [ ] Photographs must be of the real products and farm. Do not publish generated images of "our farm" as if they were real.

## 10. Payments

- [ ] Stripe is in **demo mode**. Checkout says so on the page until `STRIPE_SECRET_KEY` is set. With a `sk_test_` key it runs in test mode and says so.
- [ ] Switch to a live key only after the client confirms prices, tax and shipping.

## 11. Home-delivery page (`/tree-delivery`)

Built from the reference screenshots in `design-reference/`, with the real U.S. catalogue, prices in dollars and the existing shipping rules. Nothing on it is London or UK specific.

- [ ] **Benefits and shipping claims** reuse what `/delivery` already says (Monday to Wednesday live shipping, from $24, free on artificial trees over $250, 48 contiguous states, order by date from `NEXT_PUBLIC_ORDER_BY`). Confirm they are right.
- [ ] **"How your tree arrives" and "Trees cut fresh, shipped with care"** copy: "cut the week they ship", the care guide with every order. Confirm each statement is true.
- [ ] There is no trees-planted counter, no review stars and no press logos, because those would have to be real.
- [ ] **Order form** emails the shop through `/api/contact` (needs `RESEND_API_KEY`) and takes no payment. Prices in the dropdown are before any sale.
- [ ] **Photos** are the existing supplied photos. Do not copy photos from the reference screenshots.
