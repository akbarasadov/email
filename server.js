const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const FILE = path.join(__dirname, "messages.json");

function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  fs.writeFileSync(FILE, JSON.stringify(messages, null, 2));
}

io.on("connection", (socket) => {

  socket.emit("all messages", readMessages());

  socket.on("chat message", (data) => {
    const messages = readMessages();

    const msg = {
      id: Date.now(),
      name: data.name,
      msg: data.msg
    };

    messages.push(msg);
    saveMessages(messages);

    io.emit("all messages", messages);
  });

  socket.on("delete message", (id) => {
    let messages = readMessages();
    messages = messages.filter(m => m.id !== id);
    saveMessages(messages);

    io.emit("all messages", messages);
  });
});

server.listen(3000, () => {
  console.log("Server ishlayapti: http://localhost:3000");
});
