# CLIENT-TO-CONFIRM

Everything below is **draft text or a placeholder**. It must be true, or replaced with the real answer, **before the site goes public**. Tick each line when the client has confirmed it.

Where to change each item is in brackets.

## 1. Business identity (placeholders, replace all)

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
- [ ] Handwritten notes on products: "Our family's pick this year" (Fraser), "Buy it for the smell" (Balsam), "Forget to water? Buy this one" (Scotch pine) [`data/copy.ts`]
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

- [ ] Photographs must be of the real products and farm. Do not publish generated images of "our farm" as if they were real.
- [ ] The hand-drawn farm map (`components/FarmMap.tsx`) is **invented**. Redraw it to match the real farm, or remove it.
- [ ] The height chart (`components/HeightChart.tsx`) is drawn to scale (door 6 ft 8, person 5 ft 8) and is safe to keep.

## 10. Payments

- [ ] Stripe is in **demo mode**. Checkout says so on the page until `STRIPE_SECRET_KEY` is set. With a `sk_test_` key it runs in test mode and says so.
- [ ] Switch to a live key only after the client confirms prices, tax and shipping.
