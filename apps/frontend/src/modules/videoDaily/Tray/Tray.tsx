import React, { useCallback, useState } from "react";
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
} from "@daily-co/daily-react";

import { MenuItem } from "@material-tailwind/react";
import { P, match } from "ts-pattern";
import {
  MdMic,
  MdMicOff,
  MdHeadset,
  MdHeadsetOff,
  MdVideocam,
  MdVideocamOff,
  MdScreenShare,
  MdStopScreenShare,
} from "react-icons/md";

export default function Tray() {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id || "");
  const localAudio = useAudioTrack(localParticipant?.session_id || "");
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    if (!callObject) return;
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    if (!callObject) return;
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  return (
    <ul className="mb-0 mt-0 flex flex-row items-center gap-2">
      <MenuItem onClick={toggleAudio} className="rounded-full">
        {match(mutedAudio)
          .with(true, () => <MdMicOff />)
          .otherwise(() => (
            <MdMic />
          ))}
      </MenuItem>
      {/* <MenuItem className="rounded-full">
        {match(isHeadphoneOpen)
          .with(true, () => <MdHeadset />)
          .otherwise(() => (
            <MdHeadsetOff />
          ))}
      </MenuItem> */}
      <MenuItem onClick={toggleVideo} className="rounded-full">
        {match(mutedVideo)
          .with(true, () => <MdVideocamOff />)
          .otherwise(() => (
            <MdVideocam />
          ))}
      </MenuItem>
      <MenuItem onClick={toggleScreenShare} className="rounded-full">
        {match(isSharingScreen)
          .with(true, () => <MdStopScreenShare />)
          .otherwise(() => (
            <MdScreenShare />
          ))}
      </MenuItem>
    </ul>
  );
}