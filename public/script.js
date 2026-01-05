const name = localStorage.getItem("name");
if (!name) window.location.href = "/";

const socket = io({
  auth: { name }
});

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  socket.emit("chat message", {
    name,
    msg: input.value
  });

  input.value = "";
});

socket.on("chat message", data => {
  const div = document.createElement("div");
  div.classList.add("message");

  if (data.name === name) {
    div.classList.add("self");
  } else {
    div.classList.add("other");
  }

  div.innerHTML = `<strong>${data.name}</strong><br>${data.msg}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});