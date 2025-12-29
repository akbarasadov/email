const socket = io();
const messages = document.getElementById("messages");
const input = document.getElementById("input");

function send() {
  if (input.value.trim() === "") return;
  socket.emit("chat message", input.value);
  input.value = "";
}

socket.on("chat message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messages.appendChild(div);
});
