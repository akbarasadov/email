const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// JSON
app.use(express.json());

const fs = require("fs");

app.post("/users", (req, res) => {
  const data = fs.readFileSync("db.json", "utf-8");
  const json = JSON.parse(data);

  json.users.push({ id: Date.now(), ...req.body });

  fs.writeFileSync("db.json", JSON.stringify(json, null, 2));

  res.status(201).json({ ok: true });
});

// 🔥 STATIC PAPKALAR
app.use(express.static(path.join(__dirname)));        // index.html, chat.html
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/sign", express.static(path.join(__dirname, "sign")));

// 🔥 EXPRESS 5 FALLBACK
app.use((req, res) => {
  // agar aniq html so‘ralsa
  if (req.path === "/chat.html") {
    return res.sendFile(path.join(__dirname, "chat.html"));
  }

  // default → registratsiya
  res.sendFile(path.join(__dirname, "index.html"));
});

// SOCKET
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  socket.on("chat message", data => {
    io.emit("chat message", data);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});