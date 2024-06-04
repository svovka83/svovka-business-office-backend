import { UserModel } from "../models/UserSchema.js";
import { PostModel } from "../models/PostSchema.js";

export const createPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    const { fullName } = user;

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      userId: req.userId,
      userName: fullName,
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
        likeCount: req.body.likeCount,
        isLike: req.body.isLike,
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
    const postId = req.params.id;
    let post = await PostModel.findById(postId);

    if (post.userId !== req.userId) {
      return res.status(403).json({
        message: "no permission",
      });
    }

    await PostModel.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to delete post",
    });
  }
};
