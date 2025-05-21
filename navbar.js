document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");

  if (placeholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;

        // Connecte proprement le bouton burger au menu
        const toggle = placeholder.querySelector(".menu-toggle");
        const nav = placeholder.querySelector("#navLinks");

        if (toggle && nav) {
          toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
          });
        }
      })
      .catch(err => console.error("Erreur de chargement de la navbar :", err));
  }
});
