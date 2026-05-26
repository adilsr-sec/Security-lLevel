/* ============================================================
   JAVASCRIPT — Adil S R Cybersecurity Portfolio
   ============================================================ */

// ─────────────────────────────────────────────
// 1. NAVBAR — Scroll State & Active Link
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const links   = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }, { passive: true });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
})();


// ─────────────────────────────────────────────
// 2. MATRIX CANVAS — Background Effect
// ─────────────────────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const chars   = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ</>{}[];=';
  const fontSize = 13;
  let columns   = Math.floor(canvas.width / fontSize);
  let drops     = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 13, 18, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#63b3ed';
    ctx.font      = `${fontSize}px JetBrains Mono, monospace`;

    // Recalculate columns if canvas was resized
    columns = Math.floor(canvas.width / fontSize);
    while (drops.length < columns) drops.push(1);

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 55);
})();


// ─────────────────────────────────────────────
// 3. TYPEWRITER — Hero Role Titles
// ─────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typed-title');
  if (!el) return;

  const roles = [
    'Cybersecurity Engineer',
    'SOC Analyst',
    'Digital Forensics Investigator',
    'Incident Responder',
    'Ethical Hacker',
    'Vulnerability Analyst',
    'Security Operations',
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  function type() {
    const current = roles[roleIdx];

    if (paused) {
      paused = false;
      setTimeout(type, 1800);
      return;
    }

    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        paused   = true;
        setTimeout(type, 10);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    const speed = deleting ? 45 : 80;
    setTimeout(type, speed);
  }

  setTimeout(type, 600);
})();


// ─────────────────────────────────────────────
// 4. INTERSECTION OBSERVER — Reveal Animations
// ─────────────────────────────────────────────
(function initReveal() {
  // Add reveal class to all desired elements
  const targets = document.querySelectorAll(
    '.skill-category, .tool-card, .project-card, .edu-card, ' +
    '.timeline-content, .contact-card, .info-card, .platforms-card, ' +
    '.about-text, .about-sidebar, .section-header, .stat-item, ' +
    '.target-tag, .course-item, .lab-item, .github-cta-section'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, 60 * (entry.target.dataset.revealDelay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.revealDelay = i % 6;
    observer.observe(el);
  });
})();


// ─────────────────────────────────────────────
// 5. SKILL TAGS — Staggered Reveal
// ─────────────────────────────────────────────
(function initSkillStagger() {
  const categories = document.querySelectorAll('.skill-category');
  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          setTimeout(() => {
            tag.style.opacity   = '1';
            tag.style.transform = 'translateY(0)';
          }, i * 60);
        });
        catObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  categories.forEach(cat => {
    const tags = cat.querySelectorAll('.skill-tag');
    tags.forEach(tag => {
      tag.style.opacity   = '0';
      tag.style.transform = 'translateY(8px)';
      tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    catObserver.observe(cat);
  });
})();


// ─────────────────────────────────────────────
// 6. SMOOTH SCROLL — All Anchor Links
// ─────────────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


// ─────────────────────────────────────────────
// 7. HERO PARALLAX — Subtle Grid Movement
// ─────────────────────────────────────────────
(function initParallax() {
  const overlay = document.querySelector('.hero-grid-overlay');
  if (!overlay) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    overlay.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
})();


// ─────────────────────────────────────────────
// 8. COUNTER ANIMATION — Hero Stats
// ─────────────────────────────────────────────
(function initCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el        = entry.target;
        const rawTarget = el.textContent.trim();
        const suffix    = rawTarget.replace(/[0-9]/g, '');
        const target    = parseInt(rawTarget) || 0;

        if (target === 0) return;

        let current  = 0;
        const step   = Math.ceil(target / 30);
        const timer  = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 50);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => counterObserver.observe(stat));
})();


// ─────────────────────────────────────────────
// 9. CURSOR GLOW — Subtle Mouse Follower
// ─────────────────────────────────────────────
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    z-index: 0;
    top: 0;
    left: 0;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();


// ─────────────────────────────────────────────
// 10. NAV SCROLL PROGRESS — Top Bar
// ─────────────────────────────────────────────
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #63b3ed, #4fd1c5);
    z-index: 9999;
    transition: width 0.1s ease;
    width: 0%;
    box-shadow: 0 0 10px rgba(99,179,237,0.5);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    bar.style.width    = scrollPercent + '%';
  }, { passive: true });
})();
