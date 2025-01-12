"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";

import { PlusIcon } from "lucide-react";
import { ModeToggle } from "./theme-button";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Message } from "ai";

function HeaderTooltip({
  setMessages,
  stop,
  isLoading,
}: {
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  stop: () => void;
  isLoading: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="order-2 ">
          <ModeToggle />
        </div>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mr-auto">
            <Button
              variant="outline"
              className="order-2 px-4 "
              onClick={() => {
                if (isLoading) {
                  stop();
                }
                setMessages([]);
              }}>
              <PlusIcon />
              <span className="max-md:sr-only">New Chat</span>
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>New Chat</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HeaderTooltip;
