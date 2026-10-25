/* ==========================================================================
   CANVAS BACKGROUND PARTICLES & MESH INTERACTION
   Smooth interactive node constellation with mouse gravity & theme response
   ========================================================================== */

(function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 65; // Balanced performance & aesthetics
  const maxDistance = 140;
  let mouse = { x: null, y: null, radius: 160 };

  // Adjust canvas size
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse interaction
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle object constructor
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.size = Math.random() * 2 + 1.2;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse proximity interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 1.5;
          this.y -= dirY * force * 1.5;
        }
      }
    }

    draw(themeHue) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${themeHue}, 85%, 65%, ${this.baseAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${themeHue}, 90%, 65%, 0.5)`;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation frame loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Retrieve active theme hue from CSS custom property
    const compStyle = getComputedStyle(document.documentElement);
    const themeHue = compStyle.getPropertyValue('--hue-primary').trim() || '260';

    // Draw connection lines between neighboring particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(${themeHue}, 80%, 60%, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw(themeHue);
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
