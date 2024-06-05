import { UserModel } from "../models/UserSchema.js";
import { CommentModel } from "../models/CommentSchema.js";

export const createComment = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    const { fullName } = user;

    const doc = new CommentModel({
      comment: req.body.comment,
      userId: req.userId,
      userName: fullName,
      postId: req.body.postId,
    });

    const comment = await doc.save();

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not create comment",
    });
  }
};

export const getAllComments = async (req, res) => {
  const comments = await CommentModel.find();
  res.status(200).json(comments);
};

export const removeComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const doc = await CommentModel.findById(commentId);

    if (doc.userId !== req.userId) {
      return res.status(403).json({
        message: "no permission",
      });
    }

    await CommentModel.findByIdAndDelete(commentId);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to delete comment",
    });
  }
};
