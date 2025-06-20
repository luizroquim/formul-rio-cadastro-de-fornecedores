document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll('.stars span');
  const notaTexto = document.getElementById('nota-texto');
  const inputNota = document.getElementById('avaliacao');

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const value = parseInt(star.dataset.value);
      highlightStars(value);
    });

    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.value);
      inputNota.value = value;
      notaTexto.textContent = `Nota: ${value}`;
      selectStars(value);
    });

    star.addEventListener('mouseout', () => {
      const savedValue = parseInt(inputNota.value);
      selectStars(savedValue);
    });
  });

  function highlightStars(value) {
    stars.forEach(s => {
      const starValue = parseInt(s.dataset.value);
      s.classList.toggle('hover', starValue <= value);
    });
  }

  function selectStars(value) {
    stars.forEach(s => {
      const starValue = parseInt(s.dataset.value);
      s.classList.toggle('selected', starValue <= value);
      s.classList.remove('hover');
    });
  }
});
