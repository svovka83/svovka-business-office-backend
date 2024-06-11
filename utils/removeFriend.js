import { UserModel } from "../models/UserSchema.js";

export const removeFriend = async (req, res, next) => {
  try {
    const meId = req.userId;
    const me = await UserModel.findById(meId);
    const myFriends = me.friends;

    const userId = req.params.id;

    req.newFriends = myFriends.filter(f => f !== userId);
    req.userId = meId;

    next();
  } catch (err) {
    res.status(403).json({
      message: "no access",
    });
  }
};
