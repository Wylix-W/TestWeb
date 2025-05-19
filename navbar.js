document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;

        // Script menu burger
        const toggleScript = document.createElement("script");
        toggleScript.innerHTML = `
          function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
          }
        `;
        document.body.appendChild(toggleScript);

        // ✅ Re-forcer le CSS : on ajoute une classe après injection
        const links = placeholder.querySelectorAll("nav a");
        links.forEach(link => {
          link.classList.add("navlink"); // optionnel
        });
      })
      .catch(err => console.error("Erreur de chargement de la navbar :", err));
  }
});
