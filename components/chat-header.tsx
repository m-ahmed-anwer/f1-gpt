import React, { Dispatch, SetStateAction } from "react";
import HeaderTooltip from "./chat-header-tooltip";
import { Message } from "ai";

export function ChatHeader({
  setMessages,
  stop,
  isLoading,
}: {
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  stop: () => void;
  isLoading: boolean;
}) {
  return (
    <header className="flex  top-2 bg-background py-1.5 items-center  px-3 md:px-2 gap-2">
      <HeaderTooltip
        setMessages={setMessages}
        stop={stop}
        isLoading={isLoading}
      />
    </header>
  );
}
