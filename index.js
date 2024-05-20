import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { register, login, getAllUsers } from "./controller/UserController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

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

app.post("/register", register);
app.post("/login", login);
app.get("/users", getAllUsers);

app.listen(PORT, () => {
  console.log(`Server is working.`);
});
