import React from "react";
import { Series } from "remotion";
import ScreenFrame from "../components/ScreenFrame";
import TextOverlay from "../components/TextOverlay";

const WaiterShot: React.FC<{
  src: string;
  title: string;
  subtitle?: string;
}> = ({ src, title, subtitle }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)",
      position: "relative",
    }}
  >
    <ScreenFrame src={src} scale={0.82} />
    <TextOverlay title={title} subtitle={subtitle} position="bottom" delay={0.3} />
  </div>
);

const WaiterScene: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={210}>
        <WaiterShot
          src="screenshots/mesero-mapa.png"
          title="Panel de Mesero"
          subtitle="Mapa interactivo de mesas organizadas por zona"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <WaiterShot
          src="screenshots/mesero-ordenes.png"
          title="Gestion de Ordenes"
          subtitle="Creacion de ordenes y seguimiento en tiempo real"
        />
      </Series.Sequence>
    </Series>
  );
};

export default WaiterScene;
