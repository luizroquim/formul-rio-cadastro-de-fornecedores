document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const errorDiv = emailInput.nextElementSibling;

    emailInput.addEventListener("blur", function () {
        const emailValue = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            errorDiv.style.display = "flex";
            emailInput.classList.add("invalid");
        } else {
            errorDiv.style.display = "none";
            emailInput.classList.remove("invalid");
        }
    });
});