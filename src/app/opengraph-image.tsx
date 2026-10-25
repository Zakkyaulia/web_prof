import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} | Personal Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0d0b14",
          color: "#f3f0ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 40, fontWeight: 800, letterSpacing: 1 }}>
          ZAA<span style={{ color: "#c6f24e" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: -2 }}>
            Zakky Aulia
          </div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: -2, color: "#c6f24e" }}>
            Aldrin
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            {[
              ["Information Systems Student", "#8b6cff"],
              ["Web Developer", "#ff6a3d"],
            ].map(([label, colour]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 24px",
                  borderRadius: 999,
                  background: colour,
                  color: "#0d0b14",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(243,240,234,0.64)" }}>Universitas Andalas · Padang, Indonesia</div>
      </div>
    ),
    size,
  );
}
