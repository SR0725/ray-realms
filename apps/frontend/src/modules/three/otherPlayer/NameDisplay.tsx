import React, { FC, MutableRefObject, useMemo, useRef } from "react";
import { useParticipant } from "@daily-co/daily-react";
import { CameraControls, Text } from "@react-three/drei";
import { Vector3, useFrame } from "@react-three/fiber";

type Props = {
  CameraControlRef: MutableRefObject<CameraControls | null>;
  dailySessionId: string | null;
  position: [number, number, number];
};

const GameObject: FC<Props> = ({
  CameraControlRef,
  dailySessionId,
  position,
}) => {
  const remoteParticipant = useParticipant(dailySessionId ?? "");

  return (
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      position={[position[0], position[1] + 0.95, position[2]]}
      strokeColor={"black"}
      fillOpacity={0}
      strokeWidth={0.02}
      strokeOpacity={1}
      fontSize={0.1}
      rotation={[
        0,
        Math.PI - (CameraControlRef.current?.camera?.rotation?.y ?? 0),
        0,
      ]}
    >
      {remoteParticipant?.user_name ?? ""}
    </Text>
  );
};

export default GameObject;
