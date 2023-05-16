import { log } from "logger";
import Head from "next/head";
import Sence from "@/modules/three/sence";

export default function Page() {
  return (
    <>
      <Head>
        <title>Store | Kitchen Sink</title>
      </Head>
      <div className=" fixed left-0 top-0 hidden h-screen w-screen bg-black">
        <Sence />
      </div>
    </>
  );
}
