import dbConnect from "../../../../lib/dbConnect";
import Discussion from "../../../../models/Discussion";

export default async function handler(req, res) {
  await dbConnect();

  const { discussionId } = req.query;

  if (req.method === "POST") {
    try {
      const { body, userId, username } = req.body;

      if (!body || body.trim() === "") {
        return res.status(400).json({ error: "Reply cannot be empty." });
      }

      const post = await Discussion.findById(discussionId);
      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      const newReply = {
        body,
        userId: userId || null,
        username: username || "Anonymous",
        createdAt: new Date(),
      };

      post.replies.push(newReply);
      await post.save();

      res.status(201).json(newReply);
    } catch (error) {
      console.error("Error adding reply:", error);
      res.status(500).json({ error: "Error adding reply" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
