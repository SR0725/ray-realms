import { useEffect, useRef, useState } from "react";

const useAnimationFrame = (
  callback: (deltaTime: number, time: number) => void,
  needUpdate: boolean
) => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const animationStartTime = useRef<number>(Date.now());

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime, (Date.now() - animationStartTime.current) / 1000);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (needUpdate) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [needUpdate]);
};

export default useAnimationFrame;
