import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const input = document.querySelector("#input");
const messages = document.querySelector("#messages");
const button = document.querySelector("#send");

button.onclick = () => {
  const msg = input.value.trim();
  if (!msg) return;

  socket.emit("chat message", { name: "User", msg });
  input.value = "";
};

socket.on("old messages", (msgs) => {
  msgs.forEach(m => {
    const div = document.createElement("div");
    div.textContent = `${m.name}: ${m.msg}`;
    messages.appendChild(div);
  });
});

socket.on("chat message", (data) => {
  const div = document.createElement("div");
  div.textContent = `${data.name}: ${data.msg}`;
  messages.appendChild(div);
});
