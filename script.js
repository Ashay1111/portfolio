document.addEventListener('DOMContentLoaded', () => {
  // Fade-in body on load
  document.body.style.opacity = '1';

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for .fade-in elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // AI Symbol Layer
  const symbolLayer = document.createElement('div');
  symbolLayer.id = 'aiSymbols';
  Object.assign(symbolLayer.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: '0',
    pointerEvents: 'none',
    overflow: 'hidden'
  });
  document.body.appendChild(symbolLayer);

  const symbols = ['∑', '∆', '∇', '∫', '∞', '≈', '≠', '≤', '≥', '∈', '∃', '∀',
  '⊂', '⊃', '∩', '∪', 'λ', 'μ', 'σ', 'θ', 'φ', 'ψ', 'ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η',
  '⊆', '⊇', '⊄', '⊥', '⊢', '⊨', '⇒', '⇔', '¬', '∴', '∵',
  'π', 'κ', 'ν', 'ρ', 'ξ', 'χ', 'τ', 'Π', 'Ω',
  '∂', 'ℓ', 'ℝ', 'ℕ', 'ℤ', '⊤', '⊘', '⊗', '∝', '⊕', '⊗', '⊥', '∪', '∩', '∅', 'ℵ', '℘', 'ℏ', 'ℑ', 'ℜ'];

  function createSymbol() {
    const sym = document.createElement('div');
    sym.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(sym.style, {
      position: 'absolute',
      left: Math.random() * 100 + 'vw',
      top: '100vh',
      fontSize: (12 + Math.random() * 24) + 'px',
      color: 'rgba(37, 99, 235, 0.5)',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      textShadow: '0 0 2px rgba(37, 99, 235, 0.3)',
      animation: `floatUp ${12 + Math.random() * 10}s linear forwards`
    });
    symbolLayer.appendChild(sym);
    setTimeout(() => symbolLayer.removeChild(sym), 25000);
  }

  setInterval(createSymbol, 1500);
  for (let i = 0; i < 5; i++) setTimeout(createSymbol, i * 500);

  // Floating Symbol Animation Keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10%, 90% { opacity: 0.6; }
      100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Fractal Background Canvas
  const canvas = document.getElementById('fractalCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawFractal(time = 0) {
      const w = canvas.width, h = canvas.height;
      const imgData = ctx.createImageData(w, h), data = imgData.data;
      const cx = Math.cos(time * 0.0003) * 0.7885;
      const cy = Math.sin(time * 0.0003) * 0.7885;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let zx = 1.5 * (x - w / 2) / (0.5 * w);
          let zy = (y - h / 2) / (0.5 * h);
          let i = 0;
          while (zx * zx + zy * zy < 4 && i < 255) {
            const tmp = zx * zx - zy * zy + cx;
            zy = 2.0 * zx * zy + cy;
            zx = tmp;
            i++;
          }
          const p = (y * w + x) * 4;
          const color = i === 255 ? 0 : 255 - i;
          data[p + 0] = color;
          data[p + 1] = color + 30;
          data[p + 2] = 255;
          data[p + 3] = 25;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(drawFractal);
    }
    drawFractal();
  }

  // Nav Scroll Style Toggle
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Just a marker log
  console.log('Portfolio loaded successfully - Ashay Patel');
});