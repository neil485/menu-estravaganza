import React from "react";
import { Series } from "remotion";
import ScreenFrame from "../components/ScreenFrame";
import TextOverlay from "../components/TextOverlay";

const MenuShot: React.FC<{
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

const MenuScene: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={150}>
        <MenuShot
          src="screenshots/menu-hero.png"
          title="Menu Digital"
          subtitle="Presentacion elegante de platillos y bebidas"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <MenuShot
          src="screenshots/menu-categorias.png"
          title="Categorias y Busqueda"
          subtitle="Navegacion intuitiva por categorias con busqueda en tiempo real"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <MenuShot
          src="screenshots/menu-dark.png"
          title="Modo Oscuro"
          subtitle="Experiencia visual adaptable"
        />
      </Series.Sequence>
    </Series>
  );
};

export default MenuScene;
