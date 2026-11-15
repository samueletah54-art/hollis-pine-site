import { BIZ } from "@/data/business";

/** Urgency strip. Cranberry is used here and nowhere decorative. */
export default function OrderBar() {
  return (
    <div className="bg-cranberry text-paper">
      <p className="mx-auto max-w-[88rem] px-5 md:px-10 py-2 text-sm leading-snug">
        <b className="font-semibold">Order by {BIZ.orderBy} for delivery before Christmas.</b>{" "}
        Live trees ship {BIZ.liveShipDays}, so they never wait in a warehouse over a weekend.
      </p>
    </div>
  );
}
