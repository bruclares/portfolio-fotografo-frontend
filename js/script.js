const toggleMenuButtons = document.querySelectorAll(".toggle-menu");

toggleMenuButtons.forEach((botao) =>
  botao.addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("show");
  })
);
