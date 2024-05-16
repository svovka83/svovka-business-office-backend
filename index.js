import express from "express";
import mongoose from "mongoose";

import { register, getAllUsers } from "./controller/UserController.js";

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

app.post("/register", register);
app.get("/users", getAllUsers);

app.listen(5555, () => {
  console.log(`Server is working.`);
});
