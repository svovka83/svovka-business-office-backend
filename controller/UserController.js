import UserModel from "../models/UserSchema.js";

export const register = async (req, res) => {
  const doc = new UserModel({
    fullName: req.body.fullName,
    password: req.body.password,
  });

  const user = await doc.save();

  res.status(201).json({
    message: `${req.body.fullName} is created`,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json(users);
};
