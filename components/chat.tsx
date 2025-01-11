"use client";

// import type { Attachment, Message } from "ai";
// import { useChat } from "ai/react";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { ChatHeader } from "./chat-header";
import { Messages } from "./messages";
import { PureMultimodalInput } from "./multimodal-input";
import { string } from "zod";
// import { Block } from "./block";
// import { MultimodalInput } from "./multimodal-input";
// import { Messages } from "./messages";
// import { VisibilityType } from "./visibility-selector";

export function Chat({
  id,
  selectedModelId,
  isReadonly,
}: {
  id: string;
  selectedModelId: string;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  //   const {
  //     messages,
  //     setMessages,
  //     handleSubmit,
  //     input,
  //     setInput,
  //     append,
  //     isLoading,
  //     stop,
  //     reload,
  //   } = useChat({
  //     id,
  //     body: { id, modelId: selectedModelId },
  //     initialMessages,
  //     experimental_throttle: 100,
  //     onFinish: () => {
  //       mutate("/api/history");
  //     },
  //   });

  //   const isBlockVisible = useBlockSelector((state) => state.isVisible);

  const [input, setInput] = useState("");
  const setInputting = (value: string) => {
    setInput(value);
  };

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          //   selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={false}
          isReadonly={isReadonly}
          isBlockVisible={true}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <PureMultimodalInput
              input={input}
              setInput={setInputting}
              isLoading={false}
              stop={stop}
            />
          )}
        </form>
      </div>

      {/* <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      /> */}
    </>
  );
}
