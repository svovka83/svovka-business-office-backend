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
