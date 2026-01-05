const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());

// ===== API =====
app.post("/users", (req, res) => {
  console.log("New user:", req.body);
  res.status(201).json({ ok: true });
});

// ===== FRONTEND =====
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// ===== SOCKET =====
let messages = [];

const io = new Server(server);

io.on("connection", socket => {
  socket.emit("old messages", messages);

  socket.on("chat message", data => {
    messages.push(data);
    io.emit("chat message", data);
  });

  socket.on("delete message", id => {
    messages = messages.filter(m => m.id !== id);
    io.emit("delete message", id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});