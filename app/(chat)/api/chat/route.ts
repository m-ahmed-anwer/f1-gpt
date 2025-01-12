import "dotenv/config";
import { openai } from "@ai-sdk/openai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { streamText } from "ai";
import OpenAI from "openai";

// Define the embedding function
const {
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  OPENAI_API_KEY,
} = process.env;

const ai = new OpenAI({ apiKey: OPENAI_API_KEY });
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, {
  namespace: ASTRA_DB_NAMESPACE,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embedding = await ai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection("f1gpt");
      const cursor = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });
      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (error) {
      console.error("Error in POST function:", error);
      return new Response("Internal server error", { status: 500 });
    }

    const systemMessage = `You are an AI assistant who knows everything about Formula 1.
    Use the context below to augment your knowledge of Formula 1 racing.
    The context is retrieved from trusted sources such as Wikipedia, the official F1 website, Sky Sports, and Forbes.
    If the context doesn't include the information you need, answer based on your existing knowledge.
    Format responses using markdown where applicable.
      
    - - - - - - - - -
    START CONTEXT
    ${docContext}
    END CONTEXT
    - - - - - - - - -
      
    QUESTION: ${latestMessage}`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemMessage,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST function:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
