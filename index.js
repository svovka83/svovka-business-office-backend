import dotenv from "dotenv";
import mongoose from "mongoose";

import { server } from "./socket.js";

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

server.listen(PORT, (err) => {
  if (err) {
    return console.log("Some error:", err);
  }
  console.log("Server is working.");
});
