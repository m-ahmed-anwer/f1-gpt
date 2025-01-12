"use client";

import { useChat } from "ai/react";
import { ChatHeader } from "./chat-header";
import { Messages } from "./messages";
import { PureMultimodalInput } from "./multimodal-input";

export function Chat() {
  const {
    messages,
    setMessages,
    handleSubmit,
    setInput,
    input,
    isLoading,
    stop,
    append,
  } = useChat();

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader />

        <Messages messages={messages} isLoading={isLoading} />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <PureMultimodalInput
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            messages={messages}
            input={input}
            append={append}
          />
        </form>
      </div>
    </>
  );
}
