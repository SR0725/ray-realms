import React, { useRef, useState, FC, MutableRefObject } from "react";
import { Model, ActionName } from "./Model";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import usePersonControls from "@/utils/usePersonControls";
import useAnimationFrame from "@/hooks/useAnimationFrame";

export const useAnimation = (x: number, y: number) => {
  const delay = 0.7;
  const fallingTime = 2;
  const fallingRate = (Math.PI * 0.5) / fallingTime;
  const [position, setPosition] = useState<Vector3>([x, 4, y]);
  const [scale, setScale] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useAnimationFrame((deltaTime, time) => {
    const elapsed = time - delay;
    if (elapsed > 0 && elapsed < fallingTime) {
      setScale(Math.sin(elapsed * fallingRate) * 0.5);
      setPosition([x, 4 - Math.sin(elapsed * fallingRate) * 4, y]);
    }
    if (elapsed >= fallingTime) {
      setIsPlaying(false);
    }
  }, isPlaying);
  return { scale, position, playAnimation: "waving" as ActionName, isPlaying };
};

const useControl = () => {
  const maxX = 7.3;
  const minX = -0.3;
  const maxZ = 7.3;
  const minZ = -0.3;
  const speed = 0.03;
  const floorHeight = 0;
  const [motion, setMotion] = useState([0, 0, 0]);
  const [position, setPosition] = useState([3.5, floorHeight, 3.5]);
  const [rotation, setRotation] = useState([0, Math.PI * -0.75, 0]);
  const [scale, setScale] = useState(0.5);
  const [playAnimation, setPlayAnimation] = useState<ActionName>("idle");
  const { forward, backward, left, right, jump } = usePersonControls();

  useFrame((state, delta) => {
    const [mx, my, mz] = motion;

    setMotion((motion) => {
      if (jump) {
        return [mx * 0.95, 0, mz * 0.95];
      }
      const forwardVector = [forward ? speed : 0, 0, forward ? speed : 0];
      const backwardVector = [backward ? -speed : 0, 0, backward ? -speed : 0];
      const leftVector = [left ? speed : 0, 0, left ? -speed : 0];
      const rightVector = [right ? -speed : 0, 0, right ? speed : 0];
      const vector = [
        forwardVector[0] + backwardVector[0] + leftVector[0] + rightVector[0],
        0,
        forwardVector[2] + backwardVector[2] + leftVector[2] + rightVector[2],
      ];
      const newMx = mx + (vector[0] - mx) * 0.15;
      const newMz = mz + (vector[2] - mz) * 0.15;

      return [
        Math.abs(newMx) < 0.001 ? 0 : newMx,
        0,
        Math.abs(newMz) < 0.001 ? 0 : newMz,
      ];
    });
    setPosition((position) => [
      (position[0] + mx > maxX && mx > 0) || (position[0] + mx < minX && mx < 0)
        ? position[0]
        : position[0] + mx,
      position[1],
      (position[2] + mz > maxZ && mz > 0) || (position[2] + mz < minZ && mz < 0)
        ? position[2]
        : position[2] + mz,
    ]);

    const targetRotation =
      mx || mz ? [0, Math.atan2(motion[0], motion[2]), 0] : rotation;

    setRotation((rotation) => [
      rotation[0] + (targetRotation[0] - rotation[0]) * 0.1,
      rotation[1] + (targetRotation[1] - rotation[1]) * 0.1,
      rotation[2] + (targetRotation[2] - rotation[2]) * 0.1,
    ]);

    if (jump) {
      setPlayAnimation("jump");
    } else if (mx !== 0 || mz !== 0) {
      setPlayAnimation("walk");
    } else {
      setPlayAnimation("idle");
    }
  });

  return { rotation, position, scale, playAnimation };
};

const useCamaeraControl = (
  CameraControlRef: MutableRefObject<CameraControls | null>,
  isPlaying: boolean,
  position: any
) => {
  useFrame(({ clock }) => {
    if (!CameraControlRef.current) {
      return;
    }
    const elapsed = clock.getElapsedTime();

    if (isPlaying) {
      CameraControlRef.current.setPosition(
        -4 + (position[0] - 3 + 4) * (elapsed / 2.7),
        6 + (position[1] + 3 - 6) * (elapsed / 2.7),
        -4 + (position[2] - 3 + 4) * (elapsed / 2.7)
      );
    } else {
      // 逐漸往position[0] - 3, position[1] + 3, position[2] - 3移動
      const cameraPosition = CameraControlRef.current.camera.position;
      CameraControlRef.current.setPosition(
        cameraPosition.x + (position[0] - 3 - cameraPosition.x) * 0.05,
        cameraPosition.y + (position[1] + 3 - cameraPosition.y) * 0.05,
        cameraPosition.z + (position[2] - 3 - cameraPosition.z) * 0.05
      );
    }
    CameraControlRef.current.setTarget(
      position[0],
      position[1] + 0.3,
      position[2]
    );
  });
};

type Props = {
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({ CameraControlRef }) => {
  const { position, rotation, scale, playAnimation } = useControl();

  const {
    scale: startingScale,
    position: startingPosition,
    playAnimation: startingPlayAnimation,
    isPlaying,
  } = useAnimation(position[0], position[2]);

  useCamaeraControl(CameraControlRef, isPlaying, position);

  return (
    <Model
      position={isPlaying ? startingPosition : (position as Vector3)}
      rotation={rotation as Euler}
      scale={isPlaying ? startingScale : scale}
      playAnimation={isPlaying ? startingPlayAnimation : playAnimation}
    />
  );
};

export default GameObject;
