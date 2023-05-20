import { log } from "logger";
import DailyIframe, { DailyCall, DailyEvent } from "@daily-co/daily-js";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { atom, useSetRecoilState } from "recoil";
import { useCallback, useEffect, useState, FC } from "react";
const ROOM_URL = "https://ray-realms.daily.co/my-room";

export const joinState = atom({
  key: "isJoined",
  default: false,
});

export function useJoinedDailyApp() {
  const setIsJoined = useSetRecoilState(joinState);
  const callObject = useDaily();
  const joinCall = useCallback(() => {
    if (!ROOM_URL || !callObject) {
      return;
    }
    callObject.join({ url: ROOM_URL });
    setIsJoined(true);
  }, [callObject]);

  return { joinCall };
}

type DailyAppType = {
  children: React.ReactNode;
};
const DailyApp: FC<DailyAppType> = ({ children }) => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  const startHairCheck = useCallback(async (url: string) => {
    const newCallObject = DailyIframe.createCallObject();
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
    setCallObject(newCallObject);
  }, []);

  useEffect(() => {
    startHairCheck(ROOM_URL);
  }, [startHairCheck]);

  useEffect(() => {
    if (!callObject) return;

    const events: DailyEvent[] = [
      "joined-meeting",
      "left-meeting",
      "error",
      "camera-error",
    ];

    function handleNewMeetingState() {
      if (!callObject) return;
      console.log(callObject.meetingState());
      switch (callObject.meetingState()) {
        case "joined-meeting":
          break;
        case "error":
          log("error");
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  return (
    <DailyProvider callObject={callObject as DailyCall}>
      {children}
    </DailyProvider>
  );
};

export default DailyApp;
