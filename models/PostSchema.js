import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: -1,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    userLikes: {
      type: Array,
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("Post", PostSchema);
