import express from "express";
import mongoose from "mongoose";

import UserModel from "./models/UserSchema.js";

mongoose
  .connect(
    "mongodb+srv://svovka83:WRbG9BycwD5FwSfb@cluster0.rgue1es.mongodb.net/kids?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB connecting");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const doc = new UserModel({
    fullName: req.body.fullName,
    password: req.body.password,
  });

  const user = await doc.save();

  res.json(user);
});

app.get("/users", async () => {
  const users = await UserModel.find();

  console.log(users);

  res.status(200).json(users);
});

app.listen(5555, () => {
  console.log(`Server is working.`);
});
