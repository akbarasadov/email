const socket = io();
let selfName = "Siz"; // keyin username qo‘shsak oson o‘zgaradi

function send() {
  const input = document.getElementById("input");
  if (input.value.trim() === "") return;
  socket.emit("chat message", { msg: input.value, name: selfName });
  input.value = "";
}

socket.on("chat message", (data) => {
  const div = document.createElement("div");
  if (data.name === selfName) {
    div.className = "self";
  } else {
    div.className = "other";
  }
  div.innerText = `${data.name}: ${data.msg}`;
  document.getElementById("messages").appendChild(div);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});
