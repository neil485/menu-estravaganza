import React from "react";
import { Series } from "remotion";
import ScreenFrame from "../components/ScreenFrame";
import TextOverlay from "../components/TextOverlay";

const AdminShot: React.FC<{
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

const AdminScene: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={180}>
        <AdminShot
          src="screenshots/admin-kpis.png"
          title="Panel de Administracion"
          subtitle="8 KPIs en tiempo real: ventas, ordenes, mesas y mas"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <AdminShot
          src="screenshots/admin-ordenes.png"
          title="Tabla de Ordenes"
          subtitle="Detalle expandible con items, cantidades y totales"
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <AdminShot
          src="screenshots/admin-mesas.png"
          title="Gestion de Mesas e Inventario"
          subtitle="Control completo de mesas por zona y stock de productos"
        />
      </Series.Sequence>
    </Series>
  );
};

export default AdminScene;
