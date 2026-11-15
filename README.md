# Hollis & Pine Tree Co.

Next.js 16 (App Router) · TypeScript · Tailwind 4.

```bash
npm install
cp .env.example .env.local   # optional: Stripe, Resend, site URL
npm run dev                  # http://localhost:3000
npm run build && npm start
npx vercel --prod            # deploy
```

## Read these first
- `CLIENT-TO-CONFIRM.md`: every claim, address and policy that must be confirmed before the site goes public.
- `IMAGE-PROMPTS.md`: the 52 images the site needs, with file names, ratios and prompts, and the order to make them in.

## Where things live
- `data/products.ts`: the catalogue (30 products). `data/copy.ts`: product wording and the image slot for each product (`/images/<slug>.webp`).
- `data/business.ts`: address, phone, email, hours, order-by date.
- `data/reviews.ts`: **sample** reviews, hidden unless `NEXT_PUBLIC_SAMPLE_REVIEWS=1`.
- `lib/pricing.ts`: shipping rules and price maths. Checkout re-prices every cart on the server.
- `lib/delivery.ts`: Monday–Wednesday live shipping windows and ZIP estimates.
- `app/api/checkout`: Stripe Checkout. With no `STRIPE_SECRET_KEY` it runs as a demo and takes no payment; the checkout page says so. `sk_test_` keys run in test mode.
- `app/api/quote`, `/contact`, `/newsletter`: email through Resend if `RESEND_API_KEY` is set, otherwise logged to the server console.
- Images: drop `<name>.webp` into `public/images/` and rebuild. Missing files show a quiet paper slot and are never requested.

## Design system
- Palette: spruce `#1f3a2d` / `#12281d`, bark `#5a4130`, cream paper `#f4ecda`. Cranberry `#a32638` is for sale and urgency only (order-by strip, "few left", errors).
- Type scale: seven sizes in `app/globals.css` (small, body, lead, h4, h3, h2, h1) plus one display size. Labels are real small caps. Prices use tabular numbers.
- Hand-drawn pieces: `FarmMap`, `HeightChart`, `Note` (handwriting), `Divider`, `TreeMark`.
