# Hollis & Pine Tree Co.

Next.js 16 (App Router) + TypeScript + Tailwind 4.

```bash
npm install
cp .env.example .env.local   # optional: Stripe, Resend, site URL
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Where things live
- `data/products.ts`: the whole catalog (30 products). `lib/catalog.ts` is the only importer, so swapping in Shopify/Stripe Products means changing that layer.
- `data/reviews.ts`: **placeholder reviews, replace with real ones before launch.**
- `lib/pricing.ts`: shipping rules and price math. Checkout re-prices every cart on the server.
- `lib/delivery.ts`: Mon–Wed live shipping windows, ZIP estimates, Dec 12 order-by.
- `app/api/checkout`: Stripe Checkout. With no `STRIPE_SECRET_KEY` it runs in demo mode and takes no payment.
- `app/api/quote`, `/contact`, `/newsletter`: email via Resend if `RESEND_API_KEY` is set, otherwise logged to the server console.
- Photos: see `IMAGES.md`.
