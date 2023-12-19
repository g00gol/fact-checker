import { ObjectId } from "mongodb";

import { startup } from "@/db/base_db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get the id
    const { id } = req.query;

    // Try to find the url in the database
    const db = await startup();
    let results = await db
      .collection("urls")
      .findOne({ _id: new ObjectId(id) });

    if (!results) {
      return res.status(404).json({ message: "Not found" });
    }
    results._id = results._id.toString();

    return res.json(results);
  } else if (req.method === "POST") {
    // Get the id
    const { id } = req.query;
    // Get the comment from the request body
    const { comment } = req.body;

    // Insert the comment into the database if the id exists
    const db = await startup();
    await db
      .collection("urls")
      .updateOne({ _id: new ObjectId(id) }, { $push: { comments: comment } });

    // Get the updated document
    let results = await db
      .collection("urls")
      .findOne({ _id: new ObjectId(id) });

    if (!results) {
      return res.status(404).json({ message: "Not found" });
    }
    results._id = results._id.toString();

    return res.json(results);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
