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

// STATIC FILES
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// ✅ EXPRESS 5 UCHUN TO‘G‘RI FALLBACK
app.use((req, res) => {
  const requestedFile = path.join(distPath, req.path);

  // agar .html bo‘lsa → o‘shani ber
  if (req.path.endsWith(".html")) {
    return res.sendFile(requestedFile, err => {
      if (err) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  // boshqa hamma holatda index.html
  res.sendFile(path.join(distPath, "index.html"));
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