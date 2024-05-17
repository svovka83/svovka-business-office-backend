import UserModel from "../models/UserSchema.js";

export const register = async (req, res) => {
  const doc = new UserModel({
    fullName: req.body.fullName,
    password: req.body.password,
  });

  const user = await doc.save();

  res.send(user);
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json(users);
}
