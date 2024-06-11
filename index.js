import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
} from "./validations/validationConditions.js";
import { validationErrors } from "./validations/validationErrors.js";
import { checkAuth } from "./utils/checkAuth.js";
import { addFriend } from "./utils/addFriend.js";
import { removeFriend } from "./utils/removeFriend.js";

import {
  register,
  login,
  getMe,
  updateMe,
  getAllUsers,
  getOneUser,
  updateFriends,
} from "./controller/UserController.js";
import {
  createPosts,
  getAllPosts,
  getOnePost,
  updatePost,
  removePost,
} from "./controller/PostController.js";
import {
  createComment,
  getAllComments,
  removeComment,
} from "./controller/CommentController.js";

const app = express();
const PORT = process.env.PORT || 5555;

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DataBase connecting");
  })
  .catch((err) => {
    console.log("DataBase error", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.post("/register", registerValidation, validationErrors, register);
app.post("/login", loginValidation, validationErrors, login);
app.get("/me", checkAuth, getMe);
app.put("/me", checkAuth, updateMe)
app.get("/users", getAllUsers);
app.get("/users/:id", getOneUser);
app.put("/users/add_friend/:id", checkAuth, addFriend, updateFriends);
app.put("/users/remove_friend/:id", checkAuth, removeFriend, updateFriends);

app.post("/posts", checkAuth, createPosts);
app.get("/posts", getAllPosts);
app.get("/posts/:id", getOnePost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", checkAuth, removePost);

app.post("/comments", checkAuth, createComment);
app.get("/comments", getAllComments);
app.delete("/comments/:id", checkAuth, removeComment);

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Some error:", err);
  }
  console.log("Server is working.");
});
