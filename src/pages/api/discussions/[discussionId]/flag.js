import dbConnect from "../../../../lib/dbConnect";
import Discussion from "../../../../models/Discussion";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { discussionId } = req.query;

    try {
      const discussion = await Discussion.findById(discussionId);
      if (!discussion) return res.status(404).json({ message: "Discussion not found." });

      discussion.flagged = true;
      await discussion.save();

      return res.status(200).json({ message: "Discussion flagged for review." });
    } catch (error) {
      return res.status(500).json({ message: "Error flagging discussion.", error });
    }
  }

  res.status(405).json({ message: "Method not allowed." });
}

