import React, { FC } from "react";
import { Model, ActionName } from "./Model";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  playAnimation: string;
};

const GameObject: FC<Props> = ({ position, rotation, playAnimation }) => {
  return (
    <Model
      position={position as Vector3}
      rotation={rotation as Euler}
      scale={0.5}
      playAnimation={playAnimation as ActionName}
    />
  );
};

export default GameObject;
