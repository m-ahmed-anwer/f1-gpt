"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";

import { PlusIcon } from "lucide-react";
import { ModeToggle } from "./theme-button";
import React from "react";
import { Button } from "@/components/ui/button";

function HeaderTooltip() {
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
            <a href="/">
              <Button variant="outline" className="order-2 px-4 ">
                <PlusIcon />
                <span className="max-md:sr-only">New Chat</span>
              </Button>
            </a>
          </div>
        </TooltipTrigger>
        <TooltipContent>New Chat</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HeaderTooltip;
