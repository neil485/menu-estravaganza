import React from "react";
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [fps * 0.5, fps * 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 1.5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <Img
        src={staticFile("logo/logoEstravaganza.webp")}
        style={{
          width: isPortrait ? 130 : 160,
          height: isPortrait ? 130 : 160,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      />
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: isPortrait ? 34 : 42,
          fontWeight: 700,
          color: "#c9a96e",
          textAlign: "center",
          letterSpacing: 3,
          opacity: textOpacity,
        }}
      >
        Extravaganza
      </div>
      <div
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 24,
          fontWeight: 300,
          color: "#f5f0e8",
          textAlign: "center",
          letterSpacing: 2,
          marginTop: 16,
          opacity: textOpacity,
        }}
      >
        Sistema de Gestion Completo
      </div>
      <div
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 18,
          fontWeight: 400,
          color: "rgba(201,169,110,0.7)",
          textAlign: "center",
          letterSpacing: 1,
          marginTop: 30,
          opacity: textOpacity,
        }}
      >
        Corinto, El Salvador
      </div>
    </div>
  );
};

export default OutroScene;
