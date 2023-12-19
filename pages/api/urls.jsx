import { startup } from "@/db/base_db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get the first 10 urls
    const db = await startup();
    let results = await db.collection("urls").find().limit(10).toArray();

    return res.json(results);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
