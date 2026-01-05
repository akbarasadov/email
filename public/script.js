const name = localStorage.getItem("name");

if (!name) {
  alert("Iltimos, avval ro‘yxatdan o‘ting");
  window.location.href = "/";
}

const socket = io({
  auth: { name }
});

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;
  socket.emit("chat message", { name, msg: input.value });
  input.value = "";
});

socket.on("chat message", data => {
  const div = document.createElement("div");

  if (data.name === name) {
    div.innerHTML = `<b>${name}</b>: ${data.msg}`;
    div.classList.add("right_massage");
  } else {
    div.innerHTML = `<b>${data.name}</b>: ${data.msg}`;
    div.classList.add("left_massage");
  }

  messages.appendChild(div);
});