const toggleMenuButton = document.querySelector(".toggle-menu");
const navbar = document.querySelector(".navbar");
const corPadrao = Array.from(navbar.classList).find((classe) =>
  classe.includes("text-")
);

toggleMenuButton.addEventListener("click", function () {
  const menu = document.querySelector(".menu-links");
  menu.classList.toggle("show");
  toggleMenuButton.innerText =
    toggleMenuButton.innerText == "Menu" ? "Fechar" : "Menu";
  document.body.classList.toggle("menu-open");

  navbar.classList.toggle(corPadrao);
  navbar.classList.toggle("text-secondary");
});
