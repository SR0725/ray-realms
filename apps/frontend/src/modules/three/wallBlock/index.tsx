import React, { FC } from "react";
import { Model } from "./Model";
import useAnimation from "./hooks/useAnimation";

const GameObject: FC = () => {
  const { scale, position } = useAnimation();

  return <Model position={position} scale={scale} />;
};

export default GameObject;
