/* Fade-in elements with class="reveal" when they enter the viewport */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
