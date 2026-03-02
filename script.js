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

// Custom cursor
  // Custom cursor (Otimizado com translate3d e RAF)
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let cursorOffset = 5, ringOffset = 18; // Metade da largura para centralizar

  // Usamos passive: true para não travar a rolagem da página
  document.addEventListener('mousemove', e => {
    mx = e.clientX; 
    my = e.clientY;
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * 0.12; 
    ry += (my - ry) * 0.12;
    
    // translate3d força o uso da GPU, zerando o Reflow
    cursor.style.transform = `translate3d(${mx - cursorOffset}px, ${my - cursorOffset}px, 0)`;
    ring.style.transform = `translate3d(${rx - ringOffset}px, ${ry - ringOffset}px, 0)`;
    
    requestAnimationFrame(animRing);
  })();

  // Correção do efeito Hover
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '25px'; cursor.style.height = '25px'; cursorOffset = 12.5;
      ring.style.width = '64px'; ring.style.height = '64px'; ringOffset = 32;
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'; cursor.style.height = '10px'; cursorOffset = 5;
      ring.style.width = '36px'; ring.style.height = '36px'; ringOffset = 18;
    });
  });

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
