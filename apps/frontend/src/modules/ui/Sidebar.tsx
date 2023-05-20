import {
  Button,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import { FC } from "react";
import {
  MdInsertComment,
  MdAdd,
  MdAddComment,
  MdOutlineAddToQueue,
  MdSpaceDashboard,
} from "react-icons/md";
import Popover from "@components/Popover";

type SidebarProps = {
  isMiroOpen: boolean;
  setIsMiroOpen: (isMiroOpen: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ isMiroOpen, setIsMiroOpen }) => {
  return (
    <div className=" fixed left-2 top-2">
      <div className="flex flex-col gap-4">
        <Button
          size="lg"
          className="flex items-center gap-2 rounded-full"
          color="white"
        >
          <MdInsertComment className="h-4 w-4" /> 文字頻道
        </Button>
        <Button
          size="lg"
          className="flex items-center gap-2 rounded-full"
          color={isMiroOpen ? "gray" : "white"}
          onClick={() => setIsMiroOpen(!isMiroOpen)}
        >
          <MdSpaceDashboard className="h-4 w-4" /> 繪圖白板
        </Button>
        <SpeedDial placement="right">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <MdAdd className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="relative flex-row">
            <Popover popupContent={"(尚未完成) 新增文字聊天"}>
              <SpeedDialAction>
                <MdAddComment className=" h-5 w-5" />
              </SpeedDialAction>
            </Popover>
            <Popover popupContent={"(尚未完成) 新增共同白板"}>
              <SpeedDialAction>
                <MdOutlineAddToQueue className="h-5 w-5" />
              </SpeedDialAction>
            </Popover>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
};

export default Sidebar;
