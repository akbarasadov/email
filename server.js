const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// ===== SOCKET =====
const io = new Server(server);

let messages = []; // 🧠 XABARLAR SAQLANADI

io.on("connection", socket => {
  console.log("Client connected");

  // eski xabarlar
  socket.emit("old messages", messages);

  // yangi xabar
  socket.on("chat message", msg => {
    messages.push(msg);
    io.emit("chat message", msg);
  });

  // xabar o‘chirish
  socket.on("delete message", id => {
    messages = messages.filter(m => m.id !== id);
    io.emit("delete message", id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});