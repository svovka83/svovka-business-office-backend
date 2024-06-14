import { UserModel } from "../../models/UserSchema.js";

export const removeFriend = async (req, res, next) => {
  try {
    const myId = req.userId;
    const me = await UserModel.findById(myId);
    const myFriends = me.friends;

    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    const userFriends = user.friends;

    req.newMyFriends = myFriends.filter(f => f !== userId);
    req.myId = myId;

    req.newUserFriends = userFriends.filter(f => f !== myId);
    req.userId = userId;

    next();
  } catch (err) {
    res.status(403).json({
      message: "no access",
    });
  }
};
