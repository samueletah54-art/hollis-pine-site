"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  if (state === "done") return <div role="status"><p className="serif text-4xl">Thanks.</p><p className="mt-2 text-muted">We read every message and usually answer the same day.</p></div>;
  return (
    <form className="grid gap-7" onSubmit={async (e) => {
      e.preventDefault(); setState("sending");
      const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
      try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) }); setState(r.ok ? "done" : "error"); } catch { setState("error"); }
    }}>
      <div><label htmlFor="c-name" className="label block mb-1">Your name *</label><input id="c-name" name="name" required autoComplete="name" className="field" /></div>
      <div><label htmlFor="c-email" className="label block mb-1">Email *</label><input id="c-email" name="email" type="email" required autoComplete="email" className="field" /></div>
      <div>
        <label htmlFor="c-topic" className="label block mb-1">About</label>
        <select id="c-topic" name="topic" className="field" defaultValue="An order">
          <option>An order</option><option>A tree that arrived damaged</option><option>Something about care</option><option>Something else</option>
        </select>
      </div>
      <div><label htmlFor="c-msg" className="label block mb-1">Message *</label><textarea id="c-msg" name="message" rows={5} required className="field resize-y" /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex items-center gap-6"><button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send"}</button>{state === "error" && <p role="alert" className="text-cranberry">That didn't send. Please email us instead.</p>}</div>
    </form>
  );
}
