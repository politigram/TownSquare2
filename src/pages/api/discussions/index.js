import dbConnect from "../../../lib/dbConnect";
import Discussion from "../../../models/Discussion";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { sort = "new", section } = req.query;
      let sortOption = { createdAt: -1 }; // Default: Newest First

      if (sort === "most_liked") sortOption = { likes: -1 };
      if (sort === "controversial") sortOption = { $expr: { $gt: [{ $add: ["$likes", "$dislikes"] }, 0] } };

      const query = section ? { section } : {}; // Filter by discussion section if provided

      const discussions = await Discussion.find(query).sort(sortOption);
      res.status(200).json(discussions);
    } catch (error) {
      console.error("Error fetching discussions:", error);
      res.status(500).json({ error: "Error retrieving discussions" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
