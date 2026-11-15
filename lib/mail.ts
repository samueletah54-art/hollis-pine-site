// Sends mail through Resend if RESEND_API_KEY is set; otherwise logs to the server console.
export async function sendMail({ subject, text, replyTo, to }: { subject: string; text: string; replyTo?: string; to?: string }) {
  const key = process.env.RESEND_API_KEY;
  const dest = to ?? process.env.QUOTE_TO_EMAIL ?? "orders@hollisandpine.example";
  const from = process.env.QUOTE_FROM_EMAIL ?? "Hollis & Pine <web@hollisandpine.example>";
  if (!key) {
    console.log(`\n[mail: not sent, no RESEND_API_KEY]\nTo: ${dest}\nSubject: ${subject}\n${text}\n`);
    return { sent: false };
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [dest], subject, text, reply_to: replyTo }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}`);
  return { sent: true };
}
