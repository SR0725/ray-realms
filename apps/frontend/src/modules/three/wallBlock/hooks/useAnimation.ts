import { useState } from "react";
import { Vector3 } from "@react-three/fiber";
import useAnimationFrame from "@/hooks/useAnimationFrame";

const useAnimation = () => {
  const x = 3.5;
  const y = 3.5;
  const fallingTime = 2;
  const fallingRate = (Math.PI * 0.5) / fallingTime;
  const [position, setPosition] = useState<Vector3>([x, 10, y]);
  const [scale, setScale] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useAnimationFrame((deltaTime, time) => {
    const delay = (x + y) * 0.15;
    const elapsed = time - delay;
    if (elapsed > 0 && elapsed < fallingTime) {
      setScale(Math.sin(elapsed * fallingRate));
      setPosition([x, 10 - Math.sin(elapsed * fallingRate) * 10, y]);
    } else if (elapsed >= fallingTime) {
      setScale(1);
      setPosition([x, 0, y]);
      setIsPlaying(false);
    }
  }, isPlaying);
  return { scale, position };
};

export default useAnimation;
