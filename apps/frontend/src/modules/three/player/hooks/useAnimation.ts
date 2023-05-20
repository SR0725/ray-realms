import { useState } from "react";
import { ActionName } from "../../otherPlayer/Model";
import { Vector3 } from "@react-three/fiber";
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

export default useAnimation;
