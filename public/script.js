// const name = localStorage.getItem("name");
// if (!name) {
//   window.location.href = "/";
// }

// const socket = io({
//   transports: ["websocket"]
// });

// const messages = document.getElementById("messages");
// const input = document.getElementById("input");
// const sendBtn = document.getElementById("sendBtn");

// function formatTime() {
//   const d = new Date();
//   return d.getHours().toString().padStart(2, "0") + ":" +
//          d.getMinutes().toString().padStart(2, "0");
// }

// socket.on("old messages", msgs => {
//   msgs.forEach(addMessage);
// });

// sendBtn.addEventListener("click", sendMessage);
// input.addEventListener("keypress", e => {
//   if (e.key === "Enter") sendMessage();
// });

// function sendMessage() {
//   if (!input.value.trim()) return;

//   const msg = {
//     id: Date.now(),
//     name,
//     text: input.value,
//     time: formatTime()
//   };

//   socket.emit("chat message", msg);
//   input.value = "";
// }

// socket.on("chat message", addMessage);

// function addMessage(data) {
//   const div = document.createElement("div");
//   div.classList.add("message");

//   const isMe = data.name === name;
//   div.classList.add(isMe ? "self" : "other");

//   div.innerHTML = `
//     ${!isMe ? <div class="name">${data.name}</div> : ""}
//     <div>${data.text}</div>
//     <div class="meta">
//       <span>${data.time}</span>
//       ${isMe ? <span class="seen">✓✓</span> : ""}
//     </div>
//     ${isMe ? <span class="delete-btn">🗑</span> : ""}
//   `;

//   if (isMe) {
//     div.querySelector(".delete-btn").onclick = () => {
//       socket.emit("delete message", data.id);
//     };
//   }

//   messages.appendChild(div);
//   messages.scrollTop = messages.scrollHeight;
// }

// socket.on("delete message", id => {
//   [...document.querySelectorAll(".message")].forEach(m => {
//     if (m.innerHTML.includes(id)) m.remove();
//   });
// });

const name = localStorage.getItem("name");
if (!name) {
  window.location.href = "/";
}

const socket = io(); // MUHIM!

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
  div.innerHTML = `<b>${data.name}</b>: ${data.msg}`;
  messages.appendChild(div);
});