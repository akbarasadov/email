const socket = io();

let username = "";

function setUsername() {
  const input = document.getElementById("usernameInput");
  if (input.value.trim() === "") return;

  username = input.value;

  document.getElementById("username-box").style.display = "none";
  document.getElementById("chat-container").style.display = "flex";
}

function send() {
  const input = document.getElementById("input");
  if (input.value.trim() === "") return;

  socket.emit("chat message", {
    name: username,
    msg: input.value
  });

  input.value = "";
}

socket.on("chat message", (data) => {
  const div = document.createElement("div");

  if (data.name === username) {
    div.className = "self";
    div.innerText = `Siz: ${data.msg}`;
  } else {
    div.className = "other";
    div.innerText = `${data.name}: ${data.msg}`;
  }

  const messages = document.getElementById("messages");
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
