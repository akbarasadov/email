const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, "users.json");

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

app.post("/users", (req, res) => {
  const users = readUsers();
  const user = req.body;

  users.push({
    id: Date.now(),
    ...user
  });

  saveUsers(users);
  res.status(201).json({ message: "User saved" });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
