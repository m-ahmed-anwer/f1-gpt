import React from "react";
import cx from "classnames";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

function ThinkMessage() {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message "
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={"assistant"}>
      <div
        className={cx(
          "flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}>
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={16} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-5 text-muted-foreground mt-1">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ThinkMessage;
