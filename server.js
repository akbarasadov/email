const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

io.on("connection", socket => {
  const { name } = socket.handshake.auth;
  console.log("Client ulandi:", name);

  socket.on("chat message", data => io.emit("chat message", data));

  socket.on("disconnect", () => console.log("Client chiqdi:", name));
});

server.listen(8080, () => console.log("Socket.IO server 8080 da ishlayapti"));
