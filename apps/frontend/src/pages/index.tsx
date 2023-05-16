import { log } from "logger";
import Head from "next/head";
import Sence from "@/modules/three/sence";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

export default function Page() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.emit("player:join");

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ray-Realms</title>
      </Head>
      <div className="fixed h-full w-full">
        <div className="fixed left-0 top-0">debug: {isConnected}</div>
        <Sence />
      </div>
    </>
  );
}
