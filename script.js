// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}, { passive: true });

// ===== NAV =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== SLIDING NAV PILL =====
const navLinksEl = document.getElementById('navLinks');
const navPill = document.getElementById('navPill');
const navAnchors = navLinksEl ? Array.from(navLinksEl.querySelectorAll('a')) : [];

function movePillTo(el) {
  if (!el || !navPill) return;
  const listRect = navLinksEl.getBoundingClientRect();
  const linkRect = el.getBoundingClientRect();
  navPill.style.left = (linkRect.left - listRect.left) + 'px';
  navPill.style.width = linkRect.width + 'px';
}

navAnchors.forEach(a => {
  a.addEventListener('mouseenter', () => movePillTo(a));
  a.addEventListener('mouseleave', () => {
    const active = navLinksEl.querySelector('a.active');
    if (active) movePillTo(active); else navPill.style.width = '0';
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        const active = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('active', active);
        if (active) movePillTo(a);
      });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => sectionObserver.observe(s));

// ===== TYPED ROLE =====
const roles = [
  'Full-Stack Software Engineer',
  'Backend Developer',
  'Django & Node.js Builder',
  'AI Systems Developer',
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 65);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 35);
  }
}
typeLoop();

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.6 + 0.15;
    this.color = Math.random() > 0.5 ? '220,220,220' : '255,255,255';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

let mouseX = -9999, mouseY = -9999;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const dx = p.x - mouseX, dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.strokeStyle = `rgba(200,200,200,${0.18 * (1 - dist / 120)})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx2 = p.x - q.x, dy2 = p.y - q.y;
      const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (d2 < 80) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(200,200,200,${0.08 * (1 - d2 / 80)})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
    const delay = siblings.indexOf(entry.target) * 90;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar[data-width]');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    setTimeout(() => {
      bar.style.width = bar.dataset.width + '%';
    }, 200);
    barObserver.unobserve(bar);
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const startTime = performance.now();
  const startVal = target > 100 ? target - 60 : 0;

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(startVal + (target - startVal) * ease);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

const statEls = document.querySelectorAll('.hero-stat-num[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
statEls.forEach(el => statsObserver.observe(el));

// ===== SCROLL INDICATOR HIDE =====
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  if (scrollIndicator) scrollIndicator.classList.toggle('hidden', window.scrollY > 100);
}, { passive: true });

// ===== BACK TO TOP =====
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== COPY TO CLIPBOARD =====
const toast = document.getElementById('toast');
let toastTimer;

function copyText(btn) {
  const text = btn.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ===== TESLA ROBOT MOUSE TRACKING =====
const robotSvg = document.getElementById('robot-svg');
const botHead = document.getElementById('bot-head');
const rPupilL = document.getElementById('pupil-left');
const rPupilR = document.getElementById('pupil-right');
const rSpecL = document.getElementById('spec-left');
const rSpecR = document.getElementById('spec-right');

const R_SVG_W = 160, R_SVG_H = 290;
const R_PIVOT = { x: 80, y: 112 };
const R_EYE_L = { x: 50, y: 54 };
const R_EYE_R = { x: 110, y: 54 };
const R_MAX_ANGLE = 26;
const R_MAX_PUPIL = 6;

const rSpecL2 = document.getElementById('spec-left-2');
const rSpecR2 = document.getElementById('spec-right-2');

function trackRobot(mx, my) {
  if (!robotSvg || !botHead) return;
  const rect = robotSvg.getBoundingClientRect();
  if (!rect.width) return;

  const sx = rect.width / R_SVG_W;
  const sy = rect.height / R_SVG_H;

  // Head pivot in viewport coordinates
  const pvx = rect.left + R_PIVOT.x * sx;
  const pvy = rect.top + R_PIVOT.y * sy;

  // Horizontal rotation clamped to ±MAX_ANGLE
  const dx = mx - pvx;
  const norm = dx / (window.innerWidth * 0.6);
  const headAngle = Math.max(-R_MAX_ANGLE, Math.min(R_MAX_ANGLE, norm * R_MAX_ANGLE));
  botHead.setAttribute('transform', `rotate(${headAngle.toFixed(2)}, ${R_PIVOT.x}, ${R_PIVOT.y})`);

  // Track each eye pupil toward mouse
  function moveEye(eyeSvg, pupilEl, specEl, spec2El, specOff, spec2Off) {
    const evx = rect.left + eyeSvg.x * sx;
    const evy = rect.top + eyeSvg.y * sy;
    const angle = Math.atan2(my - evy, mx - evx);
    const rawDist = Math.hypot(mx - evx, my - evy);
    const dist = Math.min(R_MAX_PUPIL, rawDist * 0.02);
    const px = eyeSvg.x + Math.cos(angle) * dist;
    const py = eyeSvg.y + Math.sin(angle) * dist;
    pupilEl.setAttribute('cx', px.toFixed(2));
    pupilEl.setAttribute('cy', py.toFixed(2));
    specEl.setAttribute('cx', (px + specOff.x).toFixed(2));
    specEl.setAttribute('cy', (py + specOff.y).toFixed(2));
    if (spec2El) {
      spec2El.setAttribute('cx', (px + spec2Off.x).toFixed(2));
      spec2El.setAttribute('cy', (py + spec2Off.y).toFixed(2));
    }
  }

  moveEye(R_EYE_L, rPupilL, rSpecL, rSpecL2, { x: -4, y: -4 }, { x: 6, y: 6 });
  moveEye(R_EYE_R, rPupilR, rSpecR, rSpecR2, { x: -4, y: -4 }, { x: 6, y: 6 });
}

document.addEventListener('mousemove', e => trackRobot(e.clientX, e.clientY), { passive: true });

// ===== SKILL PILL TILT (legacy pills removed, keep for future) =====
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mousemove', e => {
    const rect = pill.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    pill.style.transform = `translateY(-2px) rotateX(${y}deg) rotateY(${x}deg)`;
    pill.style.transition = 'transform 0.1s';
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.transform = '';
    pill.style.transition = 'transform 0.3s cubic-bezier(.22,1,.36,1)';
  });
});
