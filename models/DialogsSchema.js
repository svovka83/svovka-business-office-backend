import mongoose from "mongoose";

const DialogSchema = new mongoose.Schema(
  {
    usersId1: {
      type: Array,
      required: true,
    },
    usersId2: {
      type: Array,
      required: true,
    },
    dialog: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const DialogModel = mongoose.model("Dialog", DialogSchema);
