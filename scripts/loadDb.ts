import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import OpenAI from "openai";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const insertedData = [
  "https://www.formula1.com/en/drivers",
  "https://en.wikipedia.org/wiki/List_of_Formula_One_drivers",
  "https://www.forbes.com/sites/brettknight/2024/12/10/formula-1s-highest-paid-drivers-2024/",
  "https://en.wikipedia.org/wiki/Formula_One",
  "https://www.formula1.com/en/latest/all",
  "https://www.skysports.com/f1/news",
  "https://www.forbes.com/sites/brettknight/2024/12/10/formula-1s-highest-paid-drivers-2024/",
  "https://www.formula1.com/en/results/2024/races",
  "https://www.formula1.com/en/results/2024/drivers",
  "https://en.wikipedia.org/wiki/List_of_Formula_One_World_Drivers%27_Champions",
  "https://en.wikipedia.org/wiki/Lewis_Hamilton",
];

const f1Data = ["https://en.wikipedia.org/wiki/Lewis_Hamilton"];

const {
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, {
  namespace: ASTRA_DB_NAMESPACE,
});
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const createCollection = async (
  SimilarityMetric: SimilarityMetric = "dot_product"
) => {
  await db.createCollection("f1gpt", {
    vector: {
      dimension: 1536,
      metric: SimilarityMetric,
    },
  });
};

const loadSampleData = async () => {
  const collection = await db.collection("f1gpt");

  for (const url of f1Data) {
    const content = await scrapePage(url);

    const chunks = await splitter.splitText(content);

    for await (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
        encoding_format: "float",
      });

      const vector = embedding.data[0].embedding;

      try {
        const res = await collection.insertOne({
          $vector: vector,
          text: chunk,
        });
        console.log(res);
      } catch (err) {
        console.error("Insert failed, retrying...", err);
      }
    }
  }
};

const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: { headless: true },
    gotoOptions: { waitUntil: "domcontentloaded" },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerText);
      await browser.close();
      return result;
    },
  });

  const rawContent = await loader.scrape();
  return rawContent?.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
};

loadSampleData();
