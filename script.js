document.addEventListener("DOMContentLoaded", () => {
  
  // 1. NAV FLUTUANTE (Otimizado com passive)
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. CURSOR CUSTOMIZADO (Otimizado para Core Web Vitals)
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = -100, my = -100, rx = -100, ry = -100; // Inicia fora do ecrã

  // O evento apenas capta as coordenadas (sem forçar renderização)
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  // Render Loop unificado: gere a animação a 60 FPS cravados
  if (cursor && ring) {
    (function renderLoop() {
      // Bolinha segue instantaneamente
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';

      // Anel segue com efeito de elástico (lerp)
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      requestAnimationFrame(renderLoop);
    })();

    // Efeito de hover nos links
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
        ring.style.width = '64px'; ring.style.height = '64px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width = '36px'; ring.style.height = '36px';
      });
    });
  }

  // 3. SCROLL REVEAL (Animações de entrada)
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => obs.observe(el));

    // Garante que o Hero Section apareça imediatamente
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 + i * 130);
    });
  }

  // 4. LÓGICA DO FAQ (Acordeão)
  const faqBtns = document.querySelectorAll('.faq-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          if (icon) icon.textContent = '+';
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

});
