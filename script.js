// ===== Theme toggle (persisted) =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
});

// ===== Mobile nav toggle =====
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
navBurger.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('is-open'))
);

// ===== Typing effect in hero =====
const roles = ['Web Developer', 'CS Student', 'Problem Solver', 'Lifelong Learner'];
const typingEl = document.getElementById('typingText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== Reveal-on-scroll =====
const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => io.observe(el));

// ===== Cursor glow (desktop only) =====
const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===== Projects data — EDIT THIS to add your own projects =====
const PROJECTS = [
  {
    title: 'Task Flow',
    desc: 'A minimal task manager with drag-and-drop boards, built to learn state management.',
    img: 'https://placehold.co/600x400/1E2230/5EEAD4?text=Task+Flow',
    tags: ['React', 'Tailwind', 'LocalStorage'],
    live: '#',
    code: 'https://github.com/yourusername/task-flow'
  },
  {
    title: 'Weather Now',
    desc: 'Real-time weather app using a public API, with animated icons per condition.',
    img: 'https://placehold.co/600x400/1E2230/FF8966?text=Weather+Now',
    tags: ['JavaScript', 'API', 'CSS'],
    live: '#',
    code: 'https://github.com/yourusername/weather-now'
  },
  {
    title: 'Campus Connect',
    desc: 'A student event-sharing platform built for a university hackathon.',
    img: 'https://placehold.co/600x400/1E2230/5EEAD4?text=Campus+Connect',
    tags: ['Node.js', 'Express', 'MongoDB'],
    live: '#',
    code: 'https://github.com/yourusername/campus-connect'
  }
];

const grid = document.getElementById('projectsGrid');
PROJECTS.forEach(p => {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.innerHTML = `
    <img class="project-img" src="${p.img}" alt="${p.title} preview" loading="lazy">
    <div class="project-body">
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="project-links">
        <a href="${p.live}" target="_blank" rel="noopener">Live demo ↗</a>
        <a href="${p.code}" target="_blank" rel="noopener">Source code ↗</a>
      </div>
    </div>`;
  grid.appendChild(card);
  io.observe(card);
});

// ===== Contact form (front-end only demo) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = '> message ready — connect a form service (see README) to send it for real.';
  form.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
