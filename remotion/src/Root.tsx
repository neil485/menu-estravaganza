import React from "react";
import { Composition, registerRoot } from "remotion";
import Video from "./Video";
import "./styles/global.css";

export const RemotionRoot: React.FC = () => {
  // 4 + 5 + 13 + 5 + 14 + 8 + 16 + 5 = 70s * 30fps = 2100 frames
  const totalFrames = 2100;

  return (
    <>
      <Composition
        id="ExtravaganzaShowcase"
        component={Video}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ExtravaganzaShowcaseMobile"
        component={Video}
        durationInFrames={totalFrames}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
