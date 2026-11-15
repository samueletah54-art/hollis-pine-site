import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

const s = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }

  if (s(b.website)) return NextResponse.json({ ok: true }); // honeypot

  const d = {
    company: s(b.company, 120), name: s(b.name, 120), email: s(b.email, 160), phone: s(b.phone, 40),
    state: s(b.state, 40), height: s(b.height, 20), quantity: s(b.quantity, 6), kind: s(b.kind, 30),
    installDate: s(b.installDate, 20), budget: s(b.budget, 40), service: s(b.service, 40), notes: s(b.notes, 2000),
  };
  const missing = (["company", "name", "email", "state", "height", "quantity", "installDate"] as const).filter((k) => !d[k]);
  if (missing.length || !/^\S+@\S+\.\S+$/.test(d.email)) {
    return NextResponse.json({ error: "Please fill in the required fields.", missing }, { status: 422 });
  }

  const text = [
    `New commercial quote request`, ``,
    `Company: ${d.company}`, `Contact: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || "-"}`, ``,
    `State: ${d.state}`, `Tree height: ${d.height} ft`, `Quantity: ${d.quantity}`, `Type: ${d.kind || "not sure"}`,
    `Install date: ${d.installDate}`, `Service: ${d.service || "-"}`, `Budget: ${d.budget || "-"}`, ``, `Notes:`, d.notes || "-",
  ].join("\n");

  try {
    await sendMail({ subject: `Quote request: ${d.company}, ${d.quantity} × ${d.height} ft (${d.state})`, text, replyTo: d.email });
  } catch (e) {
    console.error("quote mail failed", e);
    return NextResponse.json({ error: "We couldn't send that. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
