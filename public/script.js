const name = localStorage.getItem("name");
if (!name) window.location.href = "/";

const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

function sendMessage() {
  if (!input.value.trim()) return;

  const msg = {
    id: Date.now(),
    name,
    msg: input.value,   // 👈 MUHIM
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  socket.emit("chat message", msg);
  input.value = "";
}

sendBtn.onclick = sendMessage;
input.onkeydown = e => e.key === "Enter" && sendMessage();

// ===== ESKI XABARLAR =====
socket.on("old messages", msgs => {
  msgs.forEach(addMessage);
});

// ===== QABUL QILISH =====
socket.on("chat message", addMessage);

function addMessage(data) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.dataset.id = data.id;

  const isMe = data.name === name;
  div.classList.add(isMe ? "self" : "other");

  div.innerHTML = `
    ${!isMe ? `<div class="name">${data.name}</div>` : ""}
    <div>${data.msg}</div>
    <div class="meta">
      <span>${data.time}</span>
      ${isMe ? `<span class="seen">✓✓</span>` : ""}
    </div>
    ${isMe ? `<span class="delete-btn">🗑</span>` : ""}
  `;

  if (isMe) {
    div.querySelector(".delete-btn").onclick = () => {
      socket.emit("delete message", data.id);
    };
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// ===== O‘CHIRISH =====
socket.on("delete message", id => {
  const el = document.querySelector(`.message[data-id="${id}"]`);
  if (el) el.remove();
});