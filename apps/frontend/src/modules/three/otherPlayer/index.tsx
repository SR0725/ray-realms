import React, { FC } from "react";
import { Model, ActionName } from "./Model";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  playAnimation: string;
};

const GameObject: FC<Props> = ({
  position: realPosition,
  rotation: realRotation,
  playAnimation,
}) => {
  const [position, setPosition] = React.useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [rotation, setRotation] = React.useState<[number, number, number]>([
    0, 0, 0,
  ]);

  useFrame(() => {
    // 將 position 逐漸趨近於 realPosition
    setPosition((position) => {
      const [x, y, z] = position;
      const [realX, realY, realZ] = realPosition;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
    // 將 rotation 逐漸趨近於 realRotation
    setRotation((rotation) => {
      const [x, y, z] = rotation;
      const [realX, realY, realZ] = realRotation;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
  });

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
