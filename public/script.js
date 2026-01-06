document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("name");
  if (!name) return alert("Name yo‘q!");

  const socket = io();

  const messages = document.getElementById("messages");
  const input = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");

  function sendMessage() {
    if (!input.value.trim()) return;

    socket.emit("chat message", {
      name,
      msg: input.value,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    });

    input.value = "";
  }

  sendBtn.onclick = sendMessage;
  input.onkeydown = e => e.key === "Enter" && sendMessage();

  socket.on("chat message", data => {
    const div = document.createElement("div");
    div.className = "message " + (data.name === name ? "self" : "other");

    div.innerHTML = `
      <div>${data.msg}</div>
      <div class="meta">${data.time}</div>
    `;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
});