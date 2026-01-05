document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    let name = localStorage.getItem("name")

    if (name) {
        window.location.href = "/chat.html"
    }

    button.onclick = async (event) => {
        event.preventDefault();

        let phone = document.querySelector(".phone");
        let password = document.querySelector(".password");

        if (
            phone.value.trim() === "" ||
            password.value.trim() === ""
        ) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }


        const res = await fetch("/users");
        const users = await res.json();

        const user = users.find(u => u.phone === phone.value.trim());

        if (user.password.trim() === password.value.trim()) {
            localStorage.setItem("name", user.name)
            localStorage.setItem("surname", user.surname)
            localStorage.setItem("password", user.password)
            localStorage.setItem("phone", user.phone)
            window.location.href = "/chat.html"
        }


    };
});