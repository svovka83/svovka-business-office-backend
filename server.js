import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

export const app = express();

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_chat", ({ name, room }) => {
    socket.join(room);
    console.log("join_chat");
    socket.emit("message", {
      params: { name: "Admin" },
      message: `Привіт ${name}`,
    });

    socket.broadcast.to(room).emit("message", {
      params: { name: "Admin" },
      message: `Користувач ${name} приєднався до чату.`,
    });

    socket.on("sendMessage", ({ params, message }) => {
      io.to(room).emit("message", { params, message });
    });

    socket.on("leaveRoom", ({ name, room }) => {
      io.to(room).emit("message", {
        params: { name: "Admin" },
        message: `Користувач ${name} покидає чат`,
      });
    });
  });

  socket.on("join_dialog", ({ room }) => {
    socket.join(room);
    console.log("join_dialog");

    socket.on("sendDialog", (fields) => {
      io.to(room).emit("returnDialog", fields);
    });
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});