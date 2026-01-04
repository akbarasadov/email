const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());

// API
app.post("/users", (req, res) => {
  console.log("New user:", req.body);
  res.status(201).json({ ok: true });
});

// FRONTEND
app.use(express.static(path.join(__dirname, "dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// SOCKET
const io = new Server(server);
io.on("connection", socket => {
  socket.on("chat message", data => {
    io.emit("chat message", data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});