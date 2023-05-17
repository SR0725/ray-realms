import { log } from "logger";
import Head from "next/head";
import Sence from "@/modules/three/sence";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";

export default function Page() {
  return (
    <>
      <Head>
        <title>Ray-Realms</title>
      </Head>
      <div className="fixed h-full w-full">
        <Sence />
      </div>
    </>
  );
}
