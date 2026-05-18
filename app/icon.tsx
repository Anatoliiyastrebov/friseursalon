import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#e8c4c4",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            marginTop: 2,
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  );
}
