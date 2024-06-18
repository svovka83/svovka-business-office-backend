import multer from "multer";

import { UserModel } from "../models/UserSchema.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadAvatar = multer({ storage, fileFilter });

export const createAvatar = async (req, res) => {
  try {
    if (req.file) {
      const me = await UserModel.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          urlAvatar: req.file.path,
        },
        { returnOriginal: false }
      );

      const { passwordHash, ...userData  } = me._doc;

      res.status(200).json({ ...userData });
    }
  } catch {
    console.warn(err);
    res.status(404).json({
      message: "file not found.",
    });
  }
};
