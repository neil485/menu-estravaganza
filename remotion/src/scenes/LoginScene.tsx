import React from "react";
import ScreenFrame from "../components/ScreenFrame";
import TextOverlay from "../components/TextOverlay";

const LoginScene: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)",
        position: "relative",
      }}
    >
      <ScreenFrame src="screenshots/login.png" scale={0.82} />
      <TextOverlay
        title="Acceso por Roles"
        subtitle="Mesero, Cocina y Administrador con acceso diferenciado"
        position="bottom"
        delay={0.3}
      />
    </div>
  );
};

export default LoginScene;
