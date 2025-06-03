document.addEventListener("DOMContentLoaded", function () {
    // Validação de CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
            return false; // Verifica se o CNPJ tem 14 dígitos e não é repetitivo
        }

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado == digitos.charAt(1);
    }

    var cnpjInput = document.getElementById("cnpj");

    cnpjInput.addEventListener("blur", function () {
        if (!validarCNPJ(cnpjInput.value)) {
            alert("CNPJ inválido! Por favor, digite um CNPJ válido.");
            cnpjInput.value = "";
            cnpjInput.focus();
        }
    });

    // Validação de E-mail
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