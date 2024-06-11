import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      default: "other",
    },
    status: {
      type: String,
      default: "free",
    },
    country: {
      type: String,
      default: "no country",
    },
    job: {
      type: String,
      default: "programmer",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);
