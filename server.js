const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔥 MUHIM: VITE BUILD NI SERVE QILISH
app.use(express.static(path.join(__dirname, "dist")));

// 🔥 HAR QANDAY ROUTE → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// SOCKET
io.on("connection", socket => {
  const { name } = socket.handshake.auth;
  console.log("Client ulandi:", name);

  socket.on("chat message", data => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client chiqdi:", name);
  });
});

// 🔥 RENDER PORT
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});