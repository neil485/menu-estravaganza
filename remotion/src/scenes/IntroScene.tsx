import React from "react";
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [fps * 0.8, fps * 1.4], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [fps * 0.8, fps * 1.4], [30, 0], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [fps * 1.5, fps * 2.2], [0, 1], {
    extrapolateRight: "clamp",
  });

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
      }}
    >
      <Img
        src={staticFile("logo/logoEstravaganza.webp")}
        style={{
          width: isPortrait ? 160 : 200,
          height: isPortrait ? 160 : 200,
          objectFit: "contain",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      />
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: isPortrait ? 42 : 56,
          fontWeight: 700,
          color: "#c9a96e",
          textAlign: "center",
          letterSpacing: 4,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Extravaganza
      </div>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: isPortrait ? 22 : 28,
          fontWeight: 400,
          color: "#c9a96e",
          textAlign: "center",
          letterSpacing: 6,
          marginTop: 8,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Restaurant &amp; Bar
      </div>
      <div
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: isPortrait ? 18 : 22,
          fontWeight: 300,
          color: "#f5f0e8",
          textAlign: "center",
          letterSpacing: 3,
          marginTop: 30,
          opacity: subtitleOpacity,
        }}
      >
        Sistema de Gestion Digital
      </div>
    </div>
  );
};

export default IntroScene;
