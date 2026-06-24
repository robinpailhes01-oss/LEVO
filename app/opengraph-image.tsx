import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Levo — Agence IA sur-mesure | Montpellier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "#f4f3ef",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: wordmark + location */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111111",
              letterSpacing: "-0.02em",
            }}
          >
            Levo
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(17,17,17,0.40)",
              letterSpacing: "0.12em",
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Montpellier · Sud de la France
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontSize: "72px",
              fontWeight: "700",
              color: "#111111",
              lineHeight: "1.0",
              letterSpacing: "-0.035em",
              margin: 0,
            }}
          >
            Des solutions IA
            <br />
            qui vous{" "}
            <em style={{ color: "#005fff", fontStyle: "italic" }}>ressemblent.</em>
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "rgba(17,17,17,0.55)",
              fontFamily: "system-ui, sans-serif",
              margin: 0,
              fontWeight: "400",
            }}
          >
            Agents IA · Automatisation · Accompagnement humain
          </p>
        </div>

        {/* Bottom: metrics strip */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(17,17,17,0.12)",
            width: "100%",
          }}
        >
          {[
            ["40h+", "économisées/mois"],
            ["100%", "sur-mesure"],
            ["3 sem.", "pour déployer"],
          ].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#111111",
                  letterSpacing: "-0.03em",
                }}
              >
                {val}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(17,17,17,0.40)",
                  fontFamily: "system-ui, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
