const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.post("/users", (req, res) => {
  console.log("User keldi:", req.body);
  res.status(201).json({ success: true });
});

io.on("connection", socket => {
  const { name } = socket.handshake.auth;
  console.log("Client ulandi:", name);

  socket.on("chat message", data => io.emit("chat message", data));
});

server.listen(8080, () =>
  console.log("Server 8080 da ishlayapti")
);