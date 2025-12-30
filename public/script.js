const socket = io();
let username = "";

function setUsername() {
  const input = document.getElementById("usernameInput");
  if (!input.value.trim()) return;

  username = input.value;
  document.getElementById("username-box").style.display = "none";
  document.getElementById("chat-container").style.display = "flex";
}

function send() {
  const input = document.getElementById("input");
  if (!input.value.trim()) return;

  socket.emit("chat message", {
    name: username,
    msg: input.value
  });

  input.value = "";
}


document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

socket.on("all messages", (messages) => {
  const box = document.getElementById("messages");
  box.innerHTML = "";

  messages.forEach(data => {
    const div = document.createElement("div");
    div.className = "message " + (data.name === username ? "self" : "other");

    const text = document.createElement("span");
    text.innerHTML = `<b>${data.name}:</b> ${data.msg}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteMessage(data.id);


    div.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      delBtn.style.display = "block";
    });

    let pressTimer;

    div.addEventListener("touchstart", () => {
      pressTimer = setTimeout(() => {
        delBtn.style.display = "block";
      }, 600);
    });

    div.addEventListener("touchend", () => {
      clearTimeout(pressTimer);
    });

    document.addEventListener("click", () => {
      delBtn.style.display = "none";
    });

    div.appendChild(text);
    div.appendChild(delBtn);
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
});


function deleteMessage(id) {
  socket.emit("delete message", id);
}
