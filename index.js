const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { createRoom, getRoom, voteInRoom, isVotingOpen } = require("./room");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("create-room", ({ roomId, question, optionA, optionB }, callback) => {
    createRoom(roomId, question, optionA, optionB);
    callback();
  });

  socket.on("join-room", ({ roomId }, callback) => {
    const room = getRoom(roomId);
    if (room) {
      socket.join(roomId);
      callback({ success: true, ...room });
    } else {
      callback({ success: false });
    }
  });

  socket.on("cast-vote", ({ roomId, option }) => {
    if (voteInRoom(roomId, option)) {
      const room = getRoom(roomId);
      io.to(roomId).emit("update-votes", room.votes);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
