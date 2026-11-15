import { NextResponse } from "next/server";
import { sendMail, sendReceipt } from "@/lib/mail";
import { limited } from "@/lib/ratelimit";

const s = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (limited(req)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch {}
  if (s(b.website)) return NextResponse.json({ ok: true });
  const name = s(b.name, 120), email = s(b.email, 160), topic = s(b.topic, 60), message = s(b.message);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return NextResponse.json({ error: "Missing fields" }, { status: 422 });
  try {
    await sendMail({ subject: `Contact: ${topic || "General"} from ${name}`, text: `${name} <${email}>\nTopic: ${topic}\n\n${message}`, replyTo: email });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 502 }); }
  await sendReceipt(email, "We got your message", `Hello ${name},\n\nThanks for writing. We usually answer the same day.\n\nYou wrote:\n${message}`);
  return NextResponse.json({ ok: true });
}
