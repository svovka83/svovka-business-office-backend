import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/UserSchema.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretTokenKey",
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "registration error" });
  }
};

export const login = (req, res) => {
  const user = UserModel.findOne(req.body.email);

  // const password = await bcrypt.compare(req.body.password);

  const token = jwt.sign(
    {
      email: req.body.email,
    },
    "secretTokenKey"
  );

  res.json({
    message: "ok",
    token,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json(users);
};
