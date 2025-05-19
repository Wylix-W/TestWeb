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
        alpha: Math.random() * 0.5 + 0.4
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(100 - dist, 0);
      const angle = Math.atan2(dy, dx);

      // FUITE : on pousse les particules dans la direction opposée à la souris
      const fx = Math.cos(angle) * force * 0.02;
      const fy = Math.sin(angle) * force * 0.02;

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
    createParticles(300);
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resizeCanvas();
  createParticles(300);
  animateParticles();
});
