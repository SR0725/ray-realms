import React, { FC } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { P, match } from "ts-pattern";
import HairCheck from "@modules/videoDaily/HairCheck/HairCheck";
import VideoDollyTray from "@modules/videoDaily/Tray/Tray";
import { joinState } from "../videoDaily";
import { useRecoilState, useRecoilValue } from "recoil";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const ProfileMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="ml-auto flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

const JoinedMenu: FC = () => {
  return (
    <div className="relative mx-auto flex items-center text-blue-gray-900">
      <Typography
        as="a"
        href="#"
        className="ml-2 mr-4 cursor-pointer py-1.5 font-medium"
      >
        Room #0
      </Typography>
      <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
        <VideoDollyTray />
      </div>
      <ProfileMenu />
    </div>
  );
};

const StartedMenu: FC = () => {
  return (
    <div className="ga relative mx-auto flex w-full flex-col gap-4 p-4 text-blue-gray-800">
      <HairCheck />
    </div>
  );
};

const ComplexNavbar: FC = () => {
  const isJoined = useRecoilValue(joinState);
  console.log("ComplexNavbarisJoined", isJoined);

  return (
    <div className="fixed bottom-4 left-0 w-full">
      <Navbar
        className={`mx-auto p-2 transition-all duration-300 ${match(isJoined)
          .with(true, () => "h-14 max-w-sm rounded-full pl-6")
          .otherwise(() => "h-[30rem] max-w-md rounded-3xl ")}`}
      >
        {match(isJoined)
          .with(true, () => <JoinedMenu />)
          .otherwise(() => (
            <StartedMenu />
          ))}
      </Navbar>
    </div>
  );
};

export default ComplexNavbar;
