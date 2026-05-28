/* ── ADD / EDIT reasons here ──────────────────────────────────────────────
   Each entry: { icon, title, desc }
   Available icons: star, heart, home, compass, sparkle, music,
                    coffee, moon, laugh, eye, sun, book
─────────────────────────────────────────────────────────────────────── */
const REASONS = [
  { icon: 'star',    title: 'Your Radiant Smile',        desc: 'It lights up every room and instantly makes my day better.' },
  { icon: 'home',    title: 'My Safe Haven',             desc: 'How just being near you feels exactly like coming home.' },
  { icon: 'sparkle', title: 'Your Inner Beauty',         desc: 'You are stunning outside, but your soul is what truly captivated me.' },
  { icon: 'music',   title: 'Your Beautiful Voice',      desc: 'Hearing you talk is my favourite melody.' },
  { icon: 'coffee',  title: 'Our Quiet Mornings',        desc: 'The simple joy of sharing coffee and early conversations.' },
  { icon: 'moon',    title: 'Late Night Talks',          desc: "When the world is asleep and it's just the two of us sharing dreams." },
  { icon: 'laugh',   title: 'Your Laughter',             desc: 'The sound that makes everything feel right in the world.' },
  { icon: 'book',    title: 'Growing Together',          desc: 'Every day I learn something new and beautiful because of you.' },
];

/* SVG paths for each icon name */
const ICONS = {
  star:    '<polyline points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  heart:   '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  home:    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  sparkle: '<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>',
  music:   '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  coffee:  '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
  moon:    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  laugh:   '<circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  eye:     '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  sun:     '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  book:    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
};

const grid = document.getElementById('reasonsGrid');

REASONS.forEach((r, i) => {
  const card = document.createElement('div');
  card.className = 'rc reveal';
  card.style.transitionDelay = (i % 4) * 0.08 + 's';

  card.innerHTML = `
    <div class="rc-icon">
      <svg viewBox="0 0 24 24">${ICONS[r.icon]}</svg>
    </div>
    <h3 class="rc-title">${r.title}</h3>
    <p class="rc-desc">${r.desc}</p>
  `;

  grid.appendChild(card);
});

