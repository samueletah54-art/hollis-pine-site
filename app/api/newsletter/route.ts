import { NextResponse } from "next/server";
import { addToAudience, sendMail } from "@/lib/mail";
import { limited } from "@/lib/ratelimit";

export async function POST(req: Request) {
  if (limited(req)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  let email = "";
  try { const b = await req.json(); email = typeof b.email === "string" ? b.email.trim().slice(0, 160) : ""; } catch {}
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  try {
    // Preferred: add to the Resend audience. Fallback: tell the team so they can add the address by hand.
    const added = await addToAudience(email);
    if (!added) await sendMail({ subject: "Newsletter signup", text: `New signup: ${email}` });
  } catch (e) {
    console.error("newsletter failed", e);
    return NextResponse.json({ error: "Failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
