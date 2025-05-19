console.log("✅ particles.js chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Dessine le halo lumineux autour de la souris
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
    gradient.addColorStop(0, 'rgba(255, 47, 47, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 47, 47, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fill();

    // Particules
    particles.forEach(p => {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let force = Math.max(120 - dist, 0);
      let angle = Math.atan2(dy, dx);
      let fx = Math.cos(angle) * force * 0.015;
      let fy = Math.sin(angle) * force * 0.015;

      p.speedX -= fx;
      p.speedY -= fy;

      p.x += p.speedX;
      p.y += p.speedY;

      p.speedX *= 0.95;
      p.speedY *= 0.95;

      if (p.x < 0 || p.x > width) p.speedX *= -1;
      if (p.y < 0 || p.y > height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(150); // densité de particules ajustée
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resizeCanvas();
  createParticles(150);
  animateParticles();
});
