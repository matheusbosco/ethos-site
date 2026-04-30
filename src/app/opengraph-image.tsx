import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F0E9D6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#2A3D52" }} />

        {/* Label */}
        <div
          style={{
            fontSize: 13,
            color: "#2A3D52",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Agência de IA · Ethos
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 2, background: "#2A3D52", marginBottom: 40 }} />

        {/* Headline */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "#1E1D1B",
            lineHeight: 1.05,
            marginBottom: 36,
            maxWidth: 900,
            letterSpacing: "-0.02em",
          }}
        >
          Inteligência sob medida.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 22,
            color: "#87867F",
            lineHeight: 1.65,
            maxWidth: 700,
          }}
        >
          Automação e agentes de IA para empresas que querem operar com mais inteligência. Sem templates, sem atalhos.
        </div>

        {/* Bottom logo */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 90,
            fontSize: 30,
            color: "#1E1D1B",
            fontStyle: "italic",
            fontWeight: 700,
          }}
        >
          Ethos
        </div>

        {/* Bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#DFD6C2" }} />
      </div>
    ),
    { ...size }
  );
}
