document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".button");
  const password = document.querySelector(".password");

  

  button.onclick = (e) => {
    e.preventDefault();

    if (!password.value.trim()) {
      alert("Parol kiriting");
      return;
    }

    localStorage.setItem("password123", password.value.trim());

    window.location.href = "/sign/sign-up/3/index.html";
  };
});