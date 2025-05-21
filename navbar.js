document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  fetch("navbar.html")
    .then(r => r.text())
    .then(html => {
      placeholder.innerHTML = html;
      const navbar = placeholder.querySelector(".navbar");
      const toggle = navbar.querySelector(".menu-toggle");
      const nav    = navbar.querySelector("nav");

      // 1) clic sur burger
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          nav.classList.toggle("active");
        });
      }

      // 2) fonction de détection d'overflow
      function updateNavbarMode() {
        // scrollWidth = taille totale, clientWidth = taille visible
        if (nav.scrollWidth > nav.clientWidth) {
          navbar.classList.add("mobile-size");
          nav.classList.remove("active");
        } else {
          navbar.classList.remove("mobile-size");
          nav.classList.remove("active");
        }
      }

      // 3) on appelle au chargement et à chaque redimensionnement
      updateNavbarMode();
      window.addEventListener("resize", updateNavbarMode);
    })
    .catch(console.error);
});
