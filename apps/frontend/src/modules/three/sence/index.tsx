import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import FloorBlock from "@/modules/three/floorBlock";
import WallBlock from "@/modules/three/wallBlock";
import Player from "@/modules/three/player";
import OtherPlayer from "@/modules/three/otherPlayer";
import { Player as TypePlayer } from "models";
import { Stats, OrbitControls, CameraControls } from "@react-three/drei";
import { Vector3 } from "three";
import { socket } from "@/utils/socket";
import { match, P } from "ts-pattern";

const useOtherPlayersUpdate = () => {
  const [otherPlayers, setOtherPlayers] = useState<TypePlayer[]>([]);

  useEffect(() => {
    function playerUpdate(playersList: TypePlayer[]) {
      const players = playersList.filter((player) => player.id !== socket.id);

      setOtherPlayers(players);
    }

    socket.on("player:update", playerUpdate);

    return () => {
      socket.off("player:update", playerUpdate);
    };
  }, []);

  return otherPlayers;
};

const Sence = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const otherPlayers = useOtherPlayersUpdate();
  return (
    <Canvas camera={{ fov: 45, position: [-4, 6, -4] }}>
      {match(process.env.ENV)
        .with("DEV", () => <OrbitControls target={[4, 0, 4]} />)
        .otherwise(() => (
          <CameraControls ref={cameraControlRef} />
        ))}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* 建立 8x8 的地板 */}
      {Array.from({ length: 8 }, (_, x) =>
        Array.from({ length: 8 }, (_, y) => (
          <FloorBlock key={`${x}${y}`} x={x} y={y} />
        ))
      )}
      <WallBlock />
      <Player CameraControlRef={cameraControlRef} />

      {otherPlayers.map(({ id, position, rotation, playAnimation }) => (
        <OtherPlayer
          key={id}
          position={position}
          rotation={rotation}
          playAnimation={playAnimation}
        />
      ))}
    </Canvas>
  );
};

export default Sence;
