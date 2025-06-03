document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault(); // evita comportamento padrão do botão

            // ID base do input
            const targetId = this.dataset.target;

            // Seleciona o input file correspondente
            const fileInput = document.getElementById(targetId);

            // Seleciona o input de validade, se existir
            const dateInput = document.getElementById(`${targetId}_validade`);

            if (fileInput) {
                // Alterna estado de ativado/desativado
                const isDisabled = !fileInput.disabled;
                fileInput.disabled = isDisabled;
                this.textContent = isDisabled ? "Ativar" : "Desativar";

                // Se houver um campo de validade vinculado, alterna também
                if (dateInput) {
                    dateInput.disabled = isDisabled;
                }
            } else {
                console.error(`Input com ID "${targetId}" não encontrado.`);
            }
        });
    });
        // Auto-preenchimento de endereço via CEP

    var cepInput = document.getElementById("cep");

    cepInput.addEventListener("blur", function () {
        var cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cep.length === 8) { // Confirma que o CEP tem 8 dígitos
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById("street").value = data.logradouro;
                        document.getElementById("city").value = data.localidade;
                        document.getElementById("state").value = data.uf;
                    } else {
                        alert("CEP não encontrado!");
                    }
                })
                .catch(error => console.error("Erro na consulta do CEP:", error));
        } else {
            alert("CEP inválido. Digite um CEP válido!");
        }
    });

       // Pular para o próximo campo ao pressionar Enter
      const focusableElements = Array.from(document.querySelectorAll("input, select, textarea"))
        .filter(el => !el.disabled && el.type !== "hidden");

    focusableElements.forEach((el, index) => {
        el.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();

                let nextIndex = index + 1;
                while (nextIndex < focusableElements.length) {
                    const next = focusableElements[nextIndex];
                    if (!next.disabled && next.offsetParent !== null) {
                        next.focus();
                        break;
                    }
                    nextIndex++;
                }
            }
        });
    });
});
