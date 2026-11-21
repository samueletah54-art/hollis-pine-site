import { ImageResponse } from "next/og";

export const alt = "Hollis & Pine Tree Co. Real trees, cut the week they ship.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0f0d28", color: "#efe6d2", fontFamily: "Georgia, serif", padding: 36 }}>
        <div style={{ display: "flex", flex: 1, border: "5px solid #c9a55c", padding: 64, flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#d8b76a" }}>Christmas trees, shipped fresh</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, lineHeight: 1 }}>Hollis &amp; Pine</div>
            <div style={{ fontSize: 44, marginTop: 24, lineHeight: 1.2, color: "#efe6d2" }}>Real trees, cut the week they ship.</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
