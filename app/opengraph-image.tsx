import { ImageResponse } from "next/og";

export const alt = "Hollis & Pine Tree Co. Real trees, cut for the week you need them.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4eee3", color: "#1d1b30", padding: 72, fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#8c2f2b" }}>Tree Co. · Est. 1987</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, lineHeight: 1, letterSpacing: -3 }}>Hollis &amp; Pine</div>
          <div style={{ fontSize: 44, marginTop: 24, maxWidth: 900, lineHeight: 1.15 }}>Real trees, cut for the week you need them.</div>
        </div>
        <div style={{ display: "flex", height: 10, background: "#2b2a6b" }} />
      </div>
    ),
    size,
  );
}
