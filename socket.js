import { createServer } from "node:http";
import { Server } from "socket.io";

import { app } from "./app.js";

export const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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

server.setMaxListeners(0);
io.setMaxListeners(0);
io.sockets.setMaxListeners(0);