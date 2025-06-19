document.addEventListener('DOMContentLoaded', () => {
  // Para cada bloco de input de arquivo
  document.querySelectorAll('.file-container').forEach(container => {
    const fileInput = container.querySelector('input[type="file"]');
    const dateInput = container.querySelector('input[type="date"]'); // <- campo de validade, se existir
    const uploadBtn = container.querySelector('.upload-btn');
    const removeBtn = container.querySelector('.remove-btn');
    const toggleBtn = container.querySelector('.toggle-btn');
    const fileFeedback = container.querySelector('.file-feedback');

    // Abrir seletor de arquivo
    uploadBtn.addEventListener('click', () => {
      if (!fileInput.disabled) {
        fileInput.click();
      }
    });

    // Mostrar arquivos selecionados
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileNames = Array.from(fileInput.files).map(f => f.name).join(', ');
        fileFeedback.innerHTML = `<span>${fileNames}</span>`;
        removeBtn.style.display = 'inline-block';
      } else {
        resetFile();
      }
    });

    // Remover arquivos selecionados
    removeBtn.addEventListener('click', () => {
      resetFile();
    });

    // Desativar / Ativar input
    toggleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isDisabled = fileInput.disabled;

      // Alternar estado do input de arquivo
      fileInput.disabled = !isDisabled;
      toggleBtn.textContent = isDisabled ? 'Desativar' : 'Ativar';

      // Se existir input de data, desativa também
      if (dateInput) {
        dateInput.disabled = !isDisabled;
      }

      if (isDisabled) {
        uploadBtn.style.opacity = '1';
        uploadBtn.style.pointerEvents = 'auto';
        removeBtn.style.opacity = '1';
        removeBtn.style.pointerEvents = 'auto';
      } else {
        resetFile();
        uploadBtn.style.opacity = '0.5';
        uploadBtn.style.pointerEvents = 'none';
        removeBtn.style.opacity = '0.5';
        removeBtn.style.pointerEvents = 'none';
      }
    });

    function resetFile() {
      fileInput.value = '';
      fileFeedback.textContent = 'Nenhum arquivo selecionado';
      removeBtn.style.display = 'none';
    }
  });
});
