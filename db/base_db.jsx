import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function startup() {
  await client.connect();
  return client.db();
}

export async function shutdown() {
  await client.close();
}
