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
import { useRouter } from "next/navigation";

function HeaderTooltip() {
  const router = useRouter();

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
                router.push("/");
                router.refresh();
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
