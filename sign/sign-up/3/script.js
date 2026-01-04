document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    button.onclick = async (event) => {
        event.preventDefault();

        let password = document.querySelector(".password");

        if (
            password.value.trim() === ""
        ) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const passwords121 = {
            password: password.value.trim()
        };

        let se = localStorage.getItem("password123");

        console.log(passwords121, se);


        if (se === passwords121.password) {
            let phone = localStorage.getItem("phone")
            let name = localStorage.getItem("name")
            let surname = localStorage.getItem("surname")
            const users = {
                phone: phone,
                name: name,
                surname: surname,
                password: se
            };


            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(users)
            });

            if (res.ok) {
                window.location.href = "/public/index.html";
            }

        } else {
            alert("Пароли не совподают")
        }
    };
});