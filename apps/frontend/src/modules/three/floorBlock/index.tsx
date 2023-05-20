import React, { FC } from "react";
import { Model } from "./Model";
import useAnimation from "./hooks/useAnimation";

type Props = {
  x: number;
  y: number;
};

const GameObject: FC<Props> = ({ x, y }) => {
  const { scale, position } = useAnimation(x, y);

  return <Model position={position} scale={scale} />;
};

export default GameObject;
