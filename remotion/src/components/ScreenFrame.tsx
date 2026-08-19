import React from "react";
import {
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

interface ScreenFrameProps {
  src: string;
  scale?: number;
  offsetY?: number;
}

const ScreenFrame: React.FC<ScreenFrameProps> = ({
  src,
  scale = 0.85,
  offsetY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, fps * 0.5], [30, 0], {
    extrapolateRight: "clamp",
  });

  const effectiveScale = isPortrait ? Math.min(scale + 0.1, 0.95) : scale;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: isPortrait ? "center" : "center",
        width: "100%",
        height: "100%",
        opacity,
        transform: `translateY(${translateY + offsetY}px)`,
        paddingTop: isPortrait ? 0 : undefined,
      }}
    >
      <div
        style={{
          width: `${effectiveScale * 100}%`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,169,110,0.15)",
          border: "1px solid rgba(201,169,110,0.2)",
        }}
      >
        <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
      </div>
    </div>
  );
};

export default ScreenFrame;
