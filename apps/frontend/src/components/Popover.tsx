import { FC, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/popover";

type Props = {
  children: React.ReactNode;
  popupContent: React.ReactNode;
  placement?: placement;
};

const CustomPopover: FC<Props> = ({
  children,
  popupContent,
  placement = "bottom",
}) => {
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover} placement={placement}>
      <PopoverHandler {...triggers}>
        <div>{children}</div>
      </PopoverHandler>
      <PopoverContent {...triggers} className="relative">
        {popupContent}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
