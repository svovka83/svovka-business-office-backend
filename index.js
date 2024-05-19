import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { register, getAllUsers } from "./controller/UserController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is working.`);
    });
    console.log("DB connecting");
  })
  .catch((err) => {
    console.log("DB error", err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "server is working",
  });
});
app.post("/register", register);
app.get("/users", getAllUsers);
