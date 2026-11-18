/* ============================================================
   MOHANRAM K — Portfolio JavaScript
   ============================================================ */

'use strict';

/* ── Navbar scroll effect ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

/* ── Hamburger menu ── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  // close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

/* ── Typewriter ── */
(function initTypewriter() {
  const el     = document.getElementById('typewriter');
  const words  = [
    'Student'
  ];
  let wi = 0, ci = 0, deleting = false;
  const delay = { type: 90, delete: 55, pause: 1600, pauseEnd: 500 };

  function tick() {
    const word    = words[wi];
    el.textContent = word.slice(0, ci);

    if (!deleting) {
      if (ci < word.length) {
        ci++;
        setTimeout(tick, delay.type);
      } else {
        setTimeout(() => { deleting = true; tick(); }, delay.pause);
      }
    } else {
      if (ci > 0) {
        ci--;
        setTimeout(tick, delay.delete);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, delay.pauseEnd);
      }
    }
  }
  tick();
})();

/* ── Particle generator ── */
(function initParticles() {
  const container = document.getElementById('particles');
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    const left = Math.random() * 100;
    const dur  = Math.random() * 15 + 10;
    const del  = Math.random() * 15;
    p.style.cssText = `
      left:${left}%;
      width:${size}px;
      height:${size}px;
      animation-duration:${dur}s;
      animation-delay:${del}s;
      opacity:${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
})();

/* ── Scroll-triggered animations (AOS-lite) ── */
(function initAOS() {
  const items = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
})();

/* ── Skill bar animation ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width || '0%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ── Active nav link on scroll ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent2)' : '';
    });
  });
})();

/* ── Smooth scroll for all hash links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Subtle card tilt on hover ── */
(function initTilt() {
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y      = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

console.log('%c Mohanram K — Portfolio', 'color:#3B82F6;font-size:1.2rem;font-weight:bold;');
console.log('%c Built with ❤️  HTML · CSS · JavaScript', 'color:#22D3EE;font-size:0.85rem;');
