import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
  body: { type: String, required: true },
  userId: { type: String, required: false },
  username: { type: String, required: false, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  replies: [
    {
      body: { type: String, required: true },
      userId: { type: String, required: false },
      username: { type: String, required: false, default: "Anonymous" },
      createdAt: { type: Date, default: Date.now },
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
    },
  ],
});

const Discussion = mongoose.models.Discussion || mongoose.model("Discussion", DiscussionSchema);
export default Discussion;


