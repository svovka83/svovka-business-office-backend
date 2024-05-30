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

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    let doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({
      message: "post not found",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        viewCount: req.body.viewCount,
        likes: req.body.likes,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to update post",
    });
  }
};

export const removePost = async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: "post is deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to delete post",
    });
  }
};
