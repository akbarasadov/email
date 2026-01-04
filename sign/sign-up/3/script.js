document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    button.onclick = async (event) => {
        event.preventDefault();

        let password = document.querySelector(".password");

        if (password.value.trim() === "") {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const enteredPassword = password.value.trim();
        const savedPassword = localStorage.getItem("password123");

        if (savedPassword === enteredPassword) {
            const users = {
                phone: localStorage.getItem("phone"),
                name: localStorage.getItem("name"),
                surname: localStorage.getItem("surname"),
                password: savedPassword
            };

            const res = await fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(users)
            });

            if (res.ok) {
                window.location.href = "/chat.html";
            }
        } else {
            alert("Пароли не совпадают");
        }
    };
});