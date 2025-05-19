document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      placeholder.innerHTML = data;

      // Activer le bouton burger une fois le HTML injecté
      const toggleBtn = placeholder.querySelector(".menu-toggle");
      const navLinks = placeholder.querySelector("#navLinks");

      if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }

      // ✅ Appliquer classe CSS à chaque lien pour le style hover ::after
      const links = placeholder.querySelectorAll("nav a");
      links.forEach(link => {
        link.classList.add("navlink");
      });
    })
    .catch(err => console.error("Erreur de chargement de la navbar :", err));
});
