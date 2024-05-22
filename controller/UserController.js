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

    const { _id, email, passwordHash, ...userData } = user._doc;

    res.status(201).json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "registration error" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }); // byId checkAuth

    if (!user) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretTokenKey",
      {
        expiresIn: "1d",
      }
    );

    const { fullName } = user._doc;

    res.status(200).json({
      fullName,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to authorize" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "user not found" }); // ???
    }

    const { fullName } = user;

    res.json({ fullName });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "user not found" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      message: "users not found",
    });
  }
};
