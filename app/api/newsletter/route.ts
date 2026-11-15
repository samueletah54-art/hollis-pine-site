import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  let email = "";
  try { const b = await req.json(); email = typeof b.email === "string" ? b.email.trim().slice(0, 160) : ""; } catch {}
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  try {
    // Swap this for your email provider's list API (Mailchimp, Klaviyo, Resend Audiences...).
    await sendMail({ subject: "Newsletter signup", text: `New signup: ${email}` });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
