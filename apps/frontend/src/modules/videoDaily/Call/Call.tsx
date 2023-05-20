import React, { useState, useCallback, useMemo } from "react";
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from "@daily-co/daily-react";

import Tile from "../Tile/Tile";
import UserMediaError from "../UserMediaError/UserMediaError";

export default function Call() {
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });

  const localParticipant = useLocalParticipant();
  const isAlone = useMemo(
    () => remoteParticipantIds?.length < 1 || screens?.length < 1,
    [remoteParticipantIds, screens]
  );

  const renderCallScreen = () => (
    <div className={`fixed right-2 top-2 flex gap-4`}>
      {/* Your self view */}
      {localParticipant && (
        <Tile
          id={localParticipant.session_id}
          isScreenShare={false}
          isLocal
          isAlone={isAlone}
        />
      )}
      {remoteParticipantIds.map((id) => (
        <Tile key={id} id={id} />
      ))}
      {screens.map((screen) => (
        <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
      ))}
      <DailyAudio />
    </div>
  );

  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}
