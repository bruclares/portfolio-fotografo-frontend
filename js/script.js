const toggleMenuButton = document.querySelector(".toggle-menu");

toggleMenuButton.addEventListener("click", function () {
  const menu = document.querySelector(".menu-links");
  menu.classList.toggle("show");
  toggleMenuButton.innerText =
    toggleMenuButton.innerText == "Menu" ? "Fechar" : "Menu";
  document.body.classList.toggle("menu-open");

  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("text-secondary");
  navbar.classList.toggle("text-highlight");
});
