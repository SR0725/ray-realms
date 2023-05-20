import { useEffect, useState } from "react";
import { useJoyStickControllerProvider } from "@/modules/ui/JoyStickController";
import isTouchDevice from "@utils/isTouchDevice";

const moveFieldByKey = (key: string) => keys[key as keyof typeof keys];
const keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "jump",
};

const usePersonControls = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  const { forward, backward, left, right } = useJoyStickControllerProvider();

  useEffect(() => {
    setMovement((m) => ({
      forward,
      backward,
      left,
      right,
      jump: m.jump,
    }));

    const handleKeyDown = (e: KeyboardEvent) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [forward, backward, left, right, isTouch]);
  return movement;
};

export default usePersonControls;
