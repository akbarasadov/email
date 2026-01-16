const name = localStorage.getItem("name");
if (!name) location.href = "/";

const socket = io();
const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

function time() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

sendBtn.onclick = send;
input.onkeydown = e => e.key === "Enter" && send();

function send() {
  if (!input.value.trim()) return;

  socket.emit("chat message", {
    id: Date.now(),
    name,
    text: input.value,
    time: time(),
    read: false
  });

  input.value = "";
}

socket.on("old messages", msgs => msgs.forEach(addMessage));
socket.on("chat message", addMessage);

function addMessage(m) {
  const div = document.createElement("div");
  div.className = "msg " + (m.name === name ? "me" : "other");
  div.dataset.id = m.id;

  div.innerHTML = `
    <div class="text">${m.text}</div>
    <div class="meta">
      ${m.time}
      ${m.name === name ? `<span class="ticks">✓✓</span>` : ""}
    </div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  if (m.name !== name) {
    socket.emit("read message", m.id);
  }
}

socket.on("read message", id => {
  const msg = document.querySelector(`[data-id="${id}"] .ticks`);
  if (msg) msg.classList.add("read");
});

socket.on("delete message", id => {
  document.querySelector(`[data-id="${id}"]`)?.remove();
});