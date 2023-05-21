import { useParticipantProperty } from "@daily-co/daily-react";
import { FC } from "react";
type UsernameType = {
  id: string;
  isLocal?: boolean;
};

const Username: FC<UsernameType> = ({ id, isLocal }) => {
  const username = useParticipantProperty(id, "user_name");

  return (
    <div className=" text-white w-max rounded-full border border-white bg-black/50 px-2">
      {username || id} {isLocal && "(you)"}
    </div>
  );
};

export default Username;
