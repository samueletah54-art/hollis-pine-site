/** Server component: tells the buyer plainly whether checkout is a demo. Decided by STRIPE_SECRET_KEY at build time. */
export default function DemoBanner() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  if (key && !key.startsWith("sk_test")) return null; // live keys: say nothing
  const test = key.startsWith("sk_test");
  return (
    <div role="note" className="mt-8 border-2 border-bark bg-paper-deep px-5 py-4">
      <p className="label text-bark">{test ? "Test mode" : "Demo checkout"}</p>
      <p className="mt-1 max-w-[70ch]">
        {test
          ? "Payments run in Stripe test mode. Use the test card 4242 4242 4242 4242 with any future date and any CVC. No real money moves."
          : "Checkout is a demo until the STRIPE_SECRET_KEY is set. No payment is taken and no order is placed."}
      </p>
    </div>
  );
}
