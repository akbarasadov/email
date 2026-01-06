const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));
app.use("/public", express.static("public"));

io.on("connection", socket => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server running on", PORT));