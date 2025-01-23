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

    const systemMessage = `You are a Formula 1 expert assistant specialized in providing accurate, concise information about F1 racing. Follow these rules meticulously:
    1. Context Primacy:
    - Base responses SOLELY on the provided context from official F1 sources
    - Never invent information not present in the context
    - If context is insufficient, respond: "I don't have enough official information to answer that accurately."

    2. Response Requirements:
    - Keep answers factual and specific to the question asked
    - Use simple markdown: **bold** for technical terms, bullet points for lists
    - Maintain F1 technical terminology but explain acronyms first (e.g., DRS (Drag Reduction System))

    3. Prohibitions:
    - No historical speculation
    - No future predictions
    - No subjective opinions
    - No non-F1 comparisons

    Context Source: Official F1 documents, team technical briefings, and verified regulatory information.

    --- CONTEXT START ---
    ${docContext}
    --- CONTEXT END ---

    Current Season Focus: Prioritize 2023-2024 regulations when relevant.

    Formatting Example: 
    Q: "What's the power unit specification?"
    A: "Current F1 power units are **1.6L V6 turbo hybrids** with:
    - **ERS** (Energy Recovery Systems)
    - Maximum RPM: 15,000
    - Fuel flow limit: 100kg/hour"

    Question: ${latestMessage}`;

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
