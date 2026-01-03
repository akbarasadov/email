document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector(".button");

    button.onclick = async (event) => {
        event.preventDefault();

        let phone = document.querySelector(".phone");
        let name = document.querySelector(".name");
        let surname = document.querySelector(".surname");

        if (
            phone.value.trim() === "" ||
            name.value.trim() === "" ||
            surname.value.trim() === ""
        ) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const user = {
            phone: phone.value.trim(),
            name: name.value.trim(),
            surname: surname.value.trim()
        };

        localStorage.setItem("phone", user.phone);
        localStorage.setItem("name", user.name);
        localStorage.setItem("surname", user.surname);

        window.location.href = "./sign/sign-up/2/index.html";
    };
});