import { Overview } from "./overview";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import ThinkMessage from "./think-message";
import { Message } from "ai";
import PreviewMessage from "./preview-message";

interface MessagesProps {
  isLoading: boolean;
  messages: Array<Message>;
}

export function Messages({ isLoading, messages }: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4">
      {messages.length === 0 && <Overview />}

      {/* Preview Message */}
      {messages.map((message) => (
        <PreviewMessage key={message.id} message={message} />
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkMessage />}

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}
