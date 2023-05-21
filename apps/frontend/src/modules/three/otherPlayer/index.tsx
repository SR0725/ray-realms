import React, { FC, MutableRefObject, useMemo, useState } from "react";
import { Model, ActionName } from "./Model";
import VideoScreen from "./VideoScreen";
import NameDisplay from "./NameDisplay";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import { joinState } from "@/modules/videoDaily";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  playAnimation: string;
  dailySessionId: string | null;
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({
  position: realPosition,
  rotation: realRotation,
  playAnimation,
  dailySessionId,
  CameraControlRef,
}) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  useFrame(() => {
    setPosition((position) => {
      const [x, y, z] = position;
      const [realX, realY, realZ] = realPosition;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
    setRotation((rotation) => {
      const [x, y, z] = rotation;
      const [realX, realY, realZ] = realRotation;
      const dx = realX - x;
      const dy = realY - y;
      const dz = realZ - z;
      return [x + dx / 10, y + dy / 10, z + dz / 10];
    });
  });
  const isJoined = useRecoilValue(joinState);

  return (
    <>
      {isJoined && dailySessionId && (
        <>
          <VideoScreen position={position} dailySessionId={dailySessionId} />
          <NameDisplay
            position={position}
            dailySessionId={dailySessionId}
            CameraControlRef={CameraControlRef}
          />
        </>
      )}
      <Model
        position={position as Vector3}
        rotation={rotation as Euler}
        scale={0.5}
        playAnimation={playAnimation as ActionName}
      />
    </>
  );
};

export default GameObject;
