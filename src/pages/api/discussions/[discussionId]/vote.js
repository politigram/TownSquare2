import dbConnect from "../../../../lib/dbConnect";
import Discussion from "../../../../models/Discussion";

export default async function handler(req, res) {
  await dbConnect();

  const { discussionId } = req.query;

  if (req.method === "POST") {
    try {
      const { voteType, replyIndex } = req.body; // replyIndex is optional
      if (!["like", "dislike"].includes(voteType)) {
        return res.status(400).json({ error: "Invalid vote type." });
      }

      const post = await Discussion.findById(discussionId);
      if (!post) return res.status(404).json({ error: "Post not found." });

      if (replyIndex !== undefined) {
        // Vote on a reply
        if (!post.replies[replyIndex]) {
          return res.status(404).json({ error: "Reply not found." });
        }
        if (voteType === "like") post.replies[replyIndex].likes += 1;
        if (voteType === "dislike") post.replies[replyIndex].dislikes += 1;
      } else {
        // Vote on the post itself
        if (voteType === "like") post.likes += 1;
        if (voteType === "dislike") post.dislikes += 1;
      }

      await post.save();
      res.status(200).json({ message: "Vote recorded.", post });
    } catch (error) {
      console.error("Error handling vote:", error);
      res.status(500).json({ error: "Error processing vote." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
