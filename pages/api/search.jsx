import { startup } from "@/db/base_db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Get the url from the request body
    const { url } = req.body;

    // Try to find the url in the database
    const db = await startup();
    let results = await db.collection("urls").findOne({ url: url });
    // If it doesn't exist, create it
    if (!results) {
      const default_obj = { url: url, comments: [], karma: 0 };
      await db.collection("urls").insertOne(default_obj);
    }

    results = await db.collection("urls").findOne({ url: url });

    return res.json(results);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
