import React from "react";
import { Series } from "remotion";
import IntroScene from "./scenes/IntroScene";
import LandingScene from "./scenes/LandingScene";
import MenuScene from "./scenes/MenuScene";
import LoginScene from "./scenes/LoginScene";
import WaiterScene from "./scenes/WaiterScene";
import KitchenScene from "./scenes/KitchenScene";
import AdminScene from "./scenes/AdminScene";
import OutroScene from "./scenes/OutroScene";

const Video: React.FC = () => {
  return (
    <Series>
      {/* Intro: 4s */}
      <Series.Sequence durationInFrames={120}>
        <IntroScene />
      </Series.Sequence>

      {/* Landing: 5s */}
      <Series.Sequence durationInFrames={150}>
        <LandingScene />
      </Series.Sequence>

      {/* Menu: 5s + 5s + 3s = 13s */}
      <Series.Sequence durationInFrames={390}>
        <MenuScene />
      </Series.Sequence>

      {/* Login: 5s */}
      <Series.Sequence durationInFrames={150}>
        <LoginScene />
      </Series.Sequence>

      {/* Mesero: 7s + 7s = 14s */}
      <Series.Sequence durationInFrames={420}>
        <WaiterScene />
      </Series.Sequence>

      {/* Cocina: 8s */}
      <Series.Sequence durationInFrames={240}>
        <KitchenScene />
      </Series.Sequence>

      {/* Admin: 6s + 5s + 5s = 16s */}
      <Series.Sequence durationInFrames={480}>
        <AdminScene />
      </Series.Sequence>

      {/* Outro: 5s */}
      <Series.Sequence durationInFrames={150}>
        <OutroScene />
      </Series.Sequence>
    </Series>
  );
};

export default Video;
