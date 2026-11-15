import { BIZ } from "@/data/business";

/*
  Email through Resend (https://resend.com).
    RESEND_API_KEY        required to actually send. Without it, messages are written to the server log.
    QUOTE_TO_EMAIL        where the team receives forms (defaults to the business email)
    QUOTE_FROM_EMAIL      a sender on a domain verified in Resend, e.g. "Hollis & Pine <orders@yourdomain.com>"
    RESEND_AUDIENCE_ID    optional: newsletter signups are added to this Resend audience
*/
const from = () => process.env.QUOTE_FROM_EMAIL || `${BIZ.name} <onboarding@resend.dev>`;
const team = () => process.env.QUOTE_TO_EMAIL || BIZ.email;

export async function sendMail({ subject, text, replyTo, to }: { subject: string; text: string; replyTo?: string; to?: string }) {
  const key = process.env.RESEND_API_KEY;
  const dest = to ?? team();
  if (!key) {
    console.log(`\n[mail NOT sent: no RESEND_API_KEY]\nTo: ${dest}\nSubject: ${subject}\n${text}\n`);
    return { sent: false };
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: from(), to: [dest], subject, text, reply_to: replyTo }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return { sent: true };
}

/** Best-effort receipt to the customer. Never throws: the team email is what matters. */
export async function sendReceipt(to: string, subject: string, body: string) {
  try {
    await sendMail({ to, subject, text: `${body}\n\n${BIZ.name}\n${BIZ.phone}\n${BIZ.email}`, replyTo: team() });
  } catch (e) {
    console.error("receipt failed", e);
  }
}

/** Adds an address to a Resend audience if RESEND_AUDIENCE_ID is set. Returns false when no audience is configured. */
export async function addToAudience(email: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY, audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return false;
  const r = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!r.ok) throw new Error(`Resend audience ${r.status}`);
  return true;
}
