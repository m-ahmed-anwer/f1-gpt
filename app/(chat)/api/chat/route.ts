import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage = `You are an AI assistant who knows everything about Formula 1
    Use below the context augment what you know about Formula 1 racing
    The context will provide you with the most recent page data from wikipedia, official f1 website, sky sports, forbes, and more.
    If the context doesn't include the information you need to answer based on your existing knowledge and don't mention the source of your information or what context does or doesn't include.
    Format responses using markdown where applicable
    - - - - - - - - -
    START CONTEXT
    ${messages}
    END CONTEXT
    - - - - - - - - -
    QUESTION: ${messages}
    - - - - - - - - - 
    
    `;

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemMessage,
      messages,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
