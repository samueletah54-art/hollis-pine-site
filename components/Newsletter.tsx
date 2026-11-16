"use client";

import { useState } from "react";

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  return (
    <form
      className={`flex flex-col sm:flex-row sm:items-end gap-4 ${dark ? "on-dark" : ""}`}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const email = new FormData(e.currentTarget).get("email");
        try {
          const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
          setState(r.ok ? "done" : "error");
        } catch { setState("error"); }
      }}
    >
      <div className="flex-1">
        <label htmlFor="nl-email" className="label block mb-1">A short email once a month. Order dates and care tips, nothing else.</label>
        <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field" disabled={state === "done"} />
      </div>
      <button className={`btn ${dark ? "btn-straw" : "btn-ghost"}`} disabled={state === "sending" || state === "done"}>
        {state === "done" ? "Got it. Thanks." : state === "sending" ? "Sending…" : "Sign up"}
      </button>
      {state === "error" && <p role="alert" className={`text-sm ${dark ? "text-straw" : "text-sale"}`}>That didn't go through. Try again in a minute.</p>}
    </form>
  );
}
