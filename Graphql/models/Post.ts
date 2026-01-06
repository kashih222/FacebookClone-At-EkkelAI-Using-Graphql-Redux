import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  imageUrls: {
    type: [String],
    default: [],
  },
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  reactions: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      type: {
        type: String,
        enum: ["like", "love", "haha", "wow", "sad", "angry"],
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },

  createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models.Post || model("Post", postSchema);
