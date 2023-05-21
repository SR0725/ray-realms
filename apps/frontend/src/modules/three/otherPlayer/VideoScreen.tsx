import React, { FC, useMemo } from "react";
import { useParticipant } from "@daily-co/daily-react";
import { useVideoTexture } from "@react-three/drei";

type Props = {
  position: [number, number, number];
  dailySessionId: string | null;
};

const VideoMaterial: FC<{ src: string }> = ({ src }) => {
  const srcObject = useMemo(
    () =>
      (document.getElementById(src) as HTMLVideoElement)
        ?.srcObject as MediaStream,
    [src]
  );
  const texture = useVideoTexture(srcObject, {
    start: true,
    muted: true,
    unsuspend: "canplay",
  });
  return <spriteMaterial map={texture} toneMapped={false} />;
};

const GameObject: FC<Props> = ({ position, dailySessionId }) => {
  const remoteParticipant = useParticipant(dailySessionId ?? "");

  return (
    <>
      <sprite
        scale={[0.6, 0.34, 1]}
        position={[position[0], position[1] + 1.2, position[2]]}
      >
        <React.Suspense
          fallback={<meshBasicMaterial wireframe color={"red"} />}
        >
          <VideoMaterial src={`${remoteParticipant?.session_id}-DailyVideo`} />
        </React.Suspense>
      </sprite>
    </>
  );
};

export default GameObject;
