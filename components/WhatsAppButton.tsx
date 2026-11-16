/** Floating WhatsApp button. Appears only when NEXT_PUBLIC_WHATSAPP is set (digits with country code, e.g. 15555550142). */
export default function WhatsAppButton() {
  const n = (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, "");
  if (!n) return null;
  return (
    <a
      href={`https://wa.me/${n}?text=${encodeURIComponent("Hi, I have a question about a tree.")}`}
      className="fixed bottom-4 right-4 z-20 bg-spruce text-paper px-4 py-3 text-sm font-semibold border-2 border-paper hover:bg-fir"
      target="_blank" rel="noopener noreferrer"
    >
      Message us on WhatsApp
    </a>
  );
}
