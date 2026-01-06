const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));
app.use(express.json());

const MSG_FILE = "./messages.json";

function readMessages() {
  if (!fs.existsSync(MSG_FILE)) return [];
  return JSON.parse(fs.readFileSync(MSG_FILE, "utf8"));
}

function saveMessages(msgs) {
  fs.writeFileSync(MSG_FILE, JSON.stringify(msgs, null, 2));
}

io.on("connection", socket => {
  socket.emit("old messages", readMessages());

  socket.on("chat message", msg => {
    const msgs = readMessages();
    msgs.push(msg);
    saveMessages(msgs);
    io.emit("chat message", msg);
  });

  socket.on("read message", id => {
    io.emit("read message", id);
  });

  socket.on("delete message", id => {
    let msgs = readMessages().filter(m => m.id !== id);
    saveMessages(msgs);
    io.emit("delete message", id);
  });
});

server.listen(8080, () => {
  console.log("Server running on 8080");
});