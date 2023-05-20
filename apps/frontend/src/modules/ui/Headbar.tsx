import React, { FC } from "react";
import { P, match } from "ts-pattern";
import Call from "@modules/videoDaily/Call/Call";
import { joinState } from "../videoDaily";
import { useRecoilValue } from "recoil";

const ComplexNavbar: FC = () => {
  const isJoined = useRecoilValue(joinState);
  console.log("ComplexNavbarisJoined", isJoined);

  return match(isJoined)
    .with(true, () => (
      <div>
        <Call />
      </div>
    ))
    .otherwise(() => <></>);
};

export default ComplexNavbar;
