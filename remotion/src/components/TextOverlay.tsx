import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface TextOverlayProps {
  title: string;
  subtitle?: string;
  position?: "top" | "bottom" | "center";
  delay?: number;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  title,
  subtitle,
  position = "bottom",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const adjustedFrame = Math.max(0, frame - delay * fps);

  const titleOpacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(adjustedFrame, [0, fps * 0.4], [20, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(
    adjustedFrame,
    [fps * 0.2, fps * 0.6],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const positionStyles: React.CSSProperties =
    position === "top"
      ? { top: isPortrait ? 60 : 40, left: 0, right: 0 }
      : position === "center"
      ? { top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center" }
      : { bottom: isPortrait ? 120 : 40, left: 0, right: 0 };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
        ...positionStyles,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(26,26,46,0.92), rgba(10,10,10,0.88))",
          backdropFilter: "blur(10px)",
          padding: isPortrait ? "14px 24px" : "16px 40px",
          borderRadius: 10,
          border: "1px solid rgba(201,169,110,0.3)",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: isPortrait ? 26 : 32,
            fontWeight: 600,
            color: "#c9a96e",
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: isPortrait ? 16 : 20,
              fontWeight: 300,
              color: "#f5f0e8",
              marginTop: 8,
              opacity: subtitleOpacity,
              letterSpacing: 1,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextOverlay;
