import React, { useState, FC, MutableRefObject, useEffect } from "react";
import { Model, ActionName } from "./Model";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { socket } from "@/utils/socket";
import { Player } from "models";
import useCamaeraControl from "./hooks/useCamaeraControl";
import useControl from "./hooks/useControl";
import useAnimation from "./hooks/useAnimation";

type Props = {
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({ CameraControlRef }) => {
  const { motion, position, rotation, scale, playAnimation } = useControl();

  const {
    scale: startingScale,
    position: startingPosition,
    playAnimation: startingPlayAnimation,
    isPlaying,
  } = useAnimation(position[0], position[2]);

  useCamaeraControl(CameraControlRef, isPlaying, position, motion);

  useEffect(() => {
    const newPlayer: Player = {
      id: socket.id,
      name: "test",
      position: position as [number, number, number],
      rotation: rotation as [number, number, number],
      playAnimation: playAnimation as ActionName,
    };
    socket.emit("player:join", newPlayer);
  }, []);

  useFrame(() => {
    const newPlayer: Player = {
      id: socket.id,
      name: "test",
      position: position as [number, number, number],
      rotation: rotation as [number, number, number],
      playAnimation: playAnimation as ActionName,
    };
    socket.emit("player:updateState", newPlayer);
  });

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
