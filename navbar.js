document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;

        // ✅ Attache le menu burger en JavaScript (plus fiable)
        const toggleBtn = document.querySelector(".menu-toggle");
        const navLinks = document.getElementById("navLinks");

        if (toggleBtn && navLinks) {
          toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }

        // ✅ (Optionnel) Ajoute une classe CSS si besoin
        const links = placeholder.querySelectorAll("nav a");
        links.forEach(link => link.classList.add("navlink"));
      })
      .catch(err => console.error("Erreur de chargement de la navbar :", err));
  }
});
