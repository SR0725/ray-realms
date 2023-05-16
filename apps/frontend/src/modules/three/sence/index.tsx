import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import FloorBlock from "@/modules/three/floorBlock";
import WallBlock from "@/modules/three/wallBlock";
import Player from "@/modules/three/player";
import { Stats, OrbitControls, CameraControls } from "@react-three/drei";
import { Vector3 } from "three";
import { match, P } from "ts-pattern";

const floor8x8 = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => 1)
);

const Sence = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);

  return (
    <Canvas camera={{ fov: 45, position: [-4, 6, -4] }}>
      {match(process.env.ENV)
        .with("DEV", () => <OrbitControls target={[4, 0, 4]} />)
        .otherwise(() => (
          <CameraControls ref={cameraControlRef} />
        ))}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {floor8x8.map((floor8, x) =>
        floor8.map((_, y) => <FloorBlock key={`${x}${y}`} x={x} y={y} />)
      )}
      <WallBlock />
      <Player CameraControlRef={cameraControlRef} />
    </Canvas>
  );
};

export default Sence;
