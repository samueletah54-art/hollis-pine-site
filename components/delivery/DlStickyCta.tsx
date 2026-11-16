"use client";

import { useEffect, useState } from "react";

/** Mobile only: a bottom bar that appears once the hero is gone and hides again at the order form. */
export default function DlStickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const order = document.getElementById("order");
      const past = window.scrollY > window.innerHeight * 0.7;
      const atForm = !!order && order.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(past && !atForm);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <div aria-hidden={!show} className={`md:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--dl-cream)] border-t border-[#1d2820]/20 px-5 py-3 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}>
      <a href="#order" tabIndex={show ? 0 : -1} className="dl-btn dl-btn-green w-full">Order a Christmas tree</a>
    </div>
  );
}
