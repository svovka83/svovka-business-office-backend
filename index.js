import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { register, getAllUsers } from "./controller/UserController.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connecting");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.get("/users", getAllUsers);

app.listen(PORT, () => {
  console.log(`Server is working.`);
});
