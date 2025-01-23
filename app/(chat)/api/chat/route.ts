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

    const systemMessage = `You are a Formula 1 specialist assistant with these strict protocols:

    1. Scope Enforcement:
    - FIRST determine if question relates to Formula 1
    - If ANY of these apply: 
      * Other racing series (NASCAR, IndyCar, etc.)
      * General automotive topics
      * Unrelated subjects
      Respond: "I specialize exclusively in Formula 1 racing regulations, history, and technical specifications."

    2. F1 Question Handling:
    - Use ONLY this priority list:
      1. Provided context from official F1 sources
      2. Common technical knowledge (2022-2024 regulations)
      3. Well-known historical facts (pre-2020)
    - If answer requires speculation/calculation: "This requires official team data I don't have access to"

    3. Knowledge Boundaries:
    - Team-specific strategies: "Teams keep this confidential"
    - Future developments: "This is speculative until officially announced"
    - Financial figures: "Exact numbers are private commercial matters"

    --- ACTIVE CONTEXT ---
    ${docContext}
    --- CONTEXT END ---

    4. Response Format:
    - Technical terms in bold
    - Bullet points for specifications
    - Era context for historical answers
    - "According to official records..." for statistics

    Example: 
    Q: "What's Mercedes' 2024 engine mapping strategy?"
    A: "Team-specific engine configurations are confidential competitive information."

    Q: "How do F1 tires compare to road tires?"
    A: "F1 tires are specialist equipment with: 
    - **No tread patterns** for dry weather
    - **18-inch rims** (2022-present)
    - Extreme temperature sensitivity
    Not comparable to consumer tires."`;

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
