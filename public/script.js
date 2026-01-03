import { io } from "socket.io-client";

const name = localStorage.getItem("name");
if (!name) window.location.href = "/"; // registratsiyaga qaytaradi, agar ism yo'q bo'lsa

const socket = io("http://localhost:8080", {
  auth: { name }
});

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

socket.on("connect", () => {
  console.log("Socket ulandi:", socket.id);
});

// Xabar yuborish
sendBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  socket.emit("chat message", { name, msg: input.value });
  input.value = "";
});

// Xabarlarni olish
socket.on("chat message", data => {
  const div = document.createElement("div");
  div.innerHTML = `<b>${data.name}</b>: ${data.msg}`;
  messages.appendChild(div);
});
