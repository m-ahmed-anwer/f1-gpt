// import { ChatRequestOptions, Message } from "ai";
// import { PreviewMessage, ThinkingMessage } from "./message";

import { Overview } from "./overview";
import { memo } from "react";
import equal from "fast-deep-equal";
import { useScrollToBottom } from "./use-scroll-to-bottom";

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  isReadonly: boolean;
  isBlockVisible: boolean;
}

function PureMessages({ chatId, isLoading, isReadonly }: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      <Overview />

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isBlockVisible && nextProps.isBlockVisible) return true;

  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;

  return true;
});
