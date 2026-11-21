/*
  Real customer reviews only. This file is intentionally EMPTY.

  While the list is empty, the <Reviews /> component renders nothing at all and no review or rating markup is
  added to the page. Add an entry only when it is a real review from a real customer who has agreed to have it shown.
  Do not add sample or invented text: it can break consumer-protection rules and Google's structured-data guidelines.
*/

export type Review = {
  /** Product slug the review is about, e.g. "fraser-fir". Leave out for a general review of the shop. */
  slug?: string;
  name: string;
  /** Shown after the name, e.g. "Asheville, NC". */
  where?: string;
  /** 1 to 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, e.g. "2026-12-04". */
  date: string;
  title?: string;
  body: string;
};

export const reviews: Review[] = [];
