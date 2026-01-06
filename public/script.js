const name = localStorage.getItem("name");
if (!name) window.location.href = "/";

const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

function getTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2, "0") + ":" +
         d.getMinutes().toString().padStart(2, "0");
}

function sendMessage() {
  if (!input.value.trim()) return;

  socket.emit("chat message", {
    name,
    text: input.value,
    time: getTime()
  });

  input.value = "";
}

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

socket.on("chat message", data => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(data.name === name ? "self" : "other");

  div.innerHTML = `
    ${data.name !== name ? <div class="name">${data.name}</div> : ""}
    <div>${data.text}</div>
    <div class="time">${data.time}</div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});