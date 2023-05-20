import { DailyVideo } from "@daily-co/daily-react";
import Username from "../Username/Username";
import { FC } from "react";
type TileType = {
  id: string;
  isScreenShare?: boolean;
  isLocal?: boolean;
  isAlone?: boolean;
};

const Tile: FC<TileType> = ({ id, isScreenShare, isLocal, isAlone }) => {
  return (
    <div className={`flex flex-col items-center gap-2`}>
      <div
        className={`flex flex-col items-center gap-2 rounded-lg bg-black ${
          isScreenShare ? "h-54 w-96" : "h-18 w-32"
        } hover:h-54 transition-all duration-500 ease-in-out hover:w-96`}
      >
        <DailyVideo
          automirror
          sessionId={id}
          type={isScreenShare ? "screenVideo" : "video"}
          className="rounded-lg "
        />
      </div>
      <Username id={id} isLocal={isLocal} />
    </div>
  );
};

export default Tile;
