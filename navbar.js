document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");

  if (placeholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;

        // ✅ Connecter le bouton burger au menu
        const toggle = placeholder.querySelector(".menu-toggle");
        const navLinks = placeholder.querySelector("#navLinks");

        if (toggle && navLinks) {
          toggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }
      })
      .catch(err => console.error("Erreur de chargement de la navbar :", err));
  }
});
