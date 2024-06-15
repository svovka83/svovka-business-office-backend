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
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

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
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to authorize" });
  }
};

export const getMe = async (req, res) => {
  try {
    const me = await UserModel.findById(req.userId);

    if (!me) {
      res.status(404).json({ message: "user not found" }); // ???
    }

    const { passwordHash, ...meData } = me._doc;
    res.status(200).json({ ...meData });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "user not found" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const me = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        age: req.body.age,
        gender: req.body.gender,
        status: req.body.status,
        country: req.body.country,
        education: req.body.education,
        job: req.body.job,
        hobby: req.body.hobby,
      },
      { returnOriginal: false }
    );
    const { passwordHash, ...meData } = me._doc;

    res.status(200).json({ ...meData });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  // think about not return passwordHash
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      message: "users not found",
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    const { passwordHash, friends, ...userData } = user._doc;

    res.status(200).json({ ...userData });
  } catch (err) {
    res.status(404).json({
      message: "user not found",
    });
  }
};

export const updateFriends = async (req, res) => {
  try {
    const me = await UserModel.findOneAndUpdate(
      {
        _id: req.myId,
      },
      {
        friends: req.newMyFriends,
      },
      { returnOriginal: false }
    );
    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        friends: req.newUserFriends,
      },
      { returnOriginal: false }
    );
    const { passwordHash, ...meData } = me._doc;

    res.status(200).json({ ...meData });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
