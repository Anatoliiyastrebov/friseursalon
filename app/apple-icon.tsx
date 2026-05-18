import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f5f0eb 0%, #f4e4e4 100%)",
          borderRadius: 36,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#e8c4c4",
          }}
        />
        <span
          style={{
            fontSize: 108,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
