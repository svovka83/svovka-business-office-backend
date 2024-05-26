import { PostModel } from "../models/PostSchema.js";

export const createPosts = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
    });

    const post = await doc.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).send({
      message: "unable to create a post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "unable to retrieve posts",
    });
  }
};
