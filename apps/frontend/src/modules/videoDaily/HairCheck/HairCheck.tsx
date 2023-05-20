import React, { useCallback, useState, FC } from "react";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import UserMediaError from "../UserMediaError/UserMediaError";
import {  useJoinedDailyApp } from "../index";
import { Button, Select, Option, Input } from "@material-tailwind/react";

const HairCheck: FC = () => {
  const { joinCall } = useJoinedDailyApp();

  const localParticipant = useLocalParticipant();
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!callObject) return;
    callObject.setUserName(e.target.value);
  };

  const updateMicrophone = (value: string | undefined) => {
    setMicrophone(value || "");
  };

  const updateSpeakers = (value: string | undefined) => {
    setSpeaker(value || "");
  };

  const updateCamera = (value: string | undefined) => {
    setCamera(value || "");
  };

  return getUserMediaError ? (
    <UserMediaError />
  ) : (
    <>
      {/* Video preview */}
      <div className="relative -top-12 m-auto h-36 w-64 rounded-2xl bg-black shadow">
        <DailyVideo
          sessionId={localParticipant?.session_id || ""}
          mirror
          type="video"
        />
      </div>
      {/* Username */}
      <Input
        label="Username"
        variant="standard"
        onChange={(e) => onChange(e)}
        value={localParticipant?.user_name || " "}
      />

      {/* Microphone select */}
      <Select label="Microphone" variant="standard" onChange={updateMicrophone}>
        {microphones?.map((mic) => (
          <Option
            key={`mic-${mic.device.deviceId}`}
            value={mic.device.deviceId}
          >
            {mic.device.label}
          </Option>
        ))}
      </Select>

      {/* Speakers select */}
      <Select label="Speakers" variant="standard" onChange={updateSpeakers}>
        {speakers?.map((speaker) => (
          <Option
            key={`speaker-${speaker.device.deviceId}`}
            value={speaker.device.deviceId}
          >
            {speaker.device.label}
          </Option>
        ))}
      </Select>

      {/* Camera select */}
      <Select label="Camera" variant="standard" onChange={updateCamera}>
        {cameras?.map((camera) => (
          <Option
            key={`cam-${camera.device.deviceId}`}
            value={camera.device.deviceId}
          >
            {camera.device.label}
          </Option>
        ))}
      </Select>

      <Button variant="outlined" onClick={joinCall}>
        Join
      </Button>
    </>
  );
};

export default HairCheck;
