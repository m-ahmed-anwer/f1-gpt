import { cookies } from "next/headers";

import { Chat } from "@/components/chat";

import { generateUUID } from "@/lib/utils";
// import { DataStreamHandler } from "@/components/data-stream-handler";

export default async function Page() {
  return (
    <>
      <Chat />
    </>
  );
}
