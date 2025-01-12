"use client";

import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function SuggestedActions({
  append,
}: {
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}) {
  const suggestedActions = [
    {
      title: "Who is the current",
      label: "F1 World Champion?",
      action: "Who is the current F1 World Champion?",
    },
    {
      title: "Explain the rules of",
      label: "a Formula 1 race",
      action: "Explain the rules of a Formula 1 race",
    },
    {
      title: "What are the top lap times",
      label: "in Monaco Grand Prix?",
      action: "What are the top lap times in Monaco Grand Prix?",
    },
    {
      title: "Give me the history of",
      label: "Ferrari in F1",
      action: "Give me the history of Ferrari in F1",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}>
          <Button
            variant="ghost"
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
            onClick={async () => {
              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}>
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
