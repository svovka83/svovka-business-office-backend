import { DialogModel } from "../models/DialogsSchema.js";

export const createDialog = async (req, res) => {
  try {
    const myId = req.userId;
    const userId = req.params.id;

    const usersId1 = [];
    const usersId2 = [];

    usersId1.push(myId);
    usersId1.push(userId);
    usersId2.push(myId);
    usersId2.push(userId);

    const doc = new DialogModel({
      usersId1: usersId1,
      usersId2: usersId2,
    });

    const dialog = await doc.save();

    res.status(200).json(dialog);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not create dialog",
    });
  }
};

export const getOneDialog = async (req, res) => {
  try {
    const myId = req.userId;
    const userId = req.params.id;

    const oldDialogs = await DialogModel.findOne({
      usersId1: myId,
      usersId2: userId,
    });

    res.status(200).json(oldDialogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not get dialog",
    });
  }
};

export const updateDialog = async (req, res) => {
  try {
    const myId = req.userId;
    const userId = req.params.id;

    const oldDialogs = await DialogModel.findOne({
      usersId1: myId,
      usersId2: userId,
    });
    const dialog = oldDialogs.dialog;
    const message = req.body.dialog;
    const newDialog = dialog.concat([message]);

    const newDialogs = await DialogModel.findOneAndUpdate(
      {
        usersId1: myId,
        usersId2: userId,
      },
      {
        dialog: newDialog,
      },
      { returnOriginal: false }
    );

    res.status(200).json(newDialogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not get dialog",
    });
  }
};

export const removeDialog = async (req, res) => {
  try {
    const myId = req.userId;
    const userId = req.params.id;

    await DialogModel.findOneAndDelete({
      usersId1: myId,
      usersId2: userId,
    });

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "could not remove dialog",
    });
  }
};
