import { ImageResponse } from "next/og";

export const alt = "Hollis & Pine Tree Co. Real trees, cut the week they ship.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4ecda", color: "#2b2118", fontFamily: "Georgia, serif", padding: 36 }}>
        <div style={{ display: "flex", flex: 1, border: "5px solid #5a4130", padding: 56, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 720 }}>
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#5a4130" }}>Christmas trees, shipped fresh</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 104, lineHeight: 1, color: "#1f3a2d" }}>Hollis &amp; Pine</div>
              <div style={{ fontSize: 42, marginTop: 22, lineHeight: 1.2 }}>Real trees, cut the week they ship.</div>
            </div>
          </div>
          <svg width="220" height="286" viewBox="0 0 40 52"><path fill="#1f3a2d" d="M20 2 L28.5 15.5 L24 15.2 L33 28.5 L27.2 28 L37.5 42 L22.2 41.4 L22.4 50 L18.1 50 L18.3 41.4 L2.6 42 L12.6 28 L7 28.4 L16 15.3 L11.4 15.6 Z" /></svg>
        </div>
      </div>
    ),
    size,
  );
}
