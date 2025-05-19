console.log("✅ particles.js chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let currentCount = 0;
  const targetCount = 80; // Moins de particules

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function addParticle() {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 2.5, // mouvement plus rapide et aléatoire
      speedY: (Math.random() - 0.5) * 2.5,
      alpha: Math.random() * 0.5 + 0.4
    });
  }

  function gradualCreate() {
    if (currentCount < targetCount) {
      addParticle();
      currentCount++;
      requestAnimationFrame(gradualCreate);
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

      const fx = Math.cos(angle) * force * 0.02;
      const fy = Math.sin(angle) * force * 0.02;

      p.speedX -= fx;
      p.speedY -= fy;

      // ajout d’un léger bruit pour rendre le mouvement plus organique
      p.speedX += (Math.random() - 0.5) * 0.3;
      p.speedY += (Math.random() - 0.5) * 0.3;

      p.x += p.speedX;
      p.y += p.speedY;

      p.speedX *= 0.92; // friction ajustée
      p.speedY *= 0.92;

      if (p.x < 0 || p.x > width) p.speedX *= -1;
      if (p.y < 0 || p.y > height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    });

    // lignes entre particules proches
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    particles = [];
    currentCount = 0;
    gradualCreate();
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resizeCanvas();
  gradualCreate();
  animateParticles();
});
