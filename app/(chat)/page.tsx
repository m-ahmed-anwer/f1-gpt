import { cookies } from "next/headers";

import { Chat } from "@/components/chat";

import { generateUUID } from "@/lib/utils";
// import { DataStreamHandler } from "@/components/data-stream-handler";

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  return (
    <>
      <Chat
        key={id}
        id={id}
        selectedModelId={modelIdFromCookie as string}
        isReadonly={false}
      />
    </>
  );
}
