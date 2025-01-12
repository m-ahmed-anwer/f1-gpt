import React from "react";
import HeaderTooltip from "./chat-header-tooltip";

export function ChatHeader() {
  return (
    <header className="flex  top-2 bg-background py-1.5 items-center  px-3 md:px-2 gap-2">
      <HeaderTooltip />
    </header>
  );
}
