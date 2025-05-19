document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
        placeholder.innerHTML = data;

        // Script du menu burger
        const toggleScript = document.createElement("script");
        toggleScript.innerHTML = `
          function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
          }
        `;
        document.body.appendChild(toggleScript);
      })
      .catch(err => console.error("Erreur de chargement de la navbar :", err));
  }
});
