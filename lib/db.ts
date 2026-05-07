import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

/** Reuses a MongoDB client across serverless invocations to reduce connection churn. */
export async function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }

  return cachedClient;
}

/** Returns the configured application database for order and user collections. */
export async function getDatabase() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB ?? "diecaste-os");
}
