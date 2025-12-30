document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    button.onclick = async (event) => {
        event.preventDefault();

        let email = document.querySelector(".email");
        let name = document.querySelector(".name");
        let first_name = document.querySelector(".first_name");
        let password = document.querySelector(".password");

        if (
            email.value.trim() === "" ||
            password.value.trim() === "" ||
            name.value.trim() === "" ||
            first_name.value.trim() === ""
        ) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }


        const user = {
            email: email.value.trim(),
            name: name.value.trim(),
            first_name: first_name.value.trim(),
            password: password.value.trim()
        };

        try {
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (res.ok) {
                window.location.href = "/public/index.html";
            } else {
                const errorData = await res.json();
                alert("Ошибка: " + (errorData.message || "Неизвестная ошибка"));

            }
        } catch (error) {
            alert("Ошибка подключения: " + error.message);
        }
    };
});