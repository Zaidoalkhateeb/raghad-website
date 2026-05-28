/* ── ADD / EDIT memories here ─────────────────────────────────────────────
   Each entry:
     date  — displayed above the title  (string)
     title — headline of the memory     (string)
     story — body text                  (string)
     img   — filename inside /images/   (e.g. 'pizza-date.jpg')
             or null for a placeholder
─────────────────────────────────────────────────────────────────────── */
const MEMORIES = [
  {
    date:  '25 August 2025 · Cleo\'s Eatery',
    title: 'Pizza & a Little Shyness',
    story: 'She showed up late — as usual — but walked in looking like she always does, effortlessly beautiful. We ordered pizza, and she was so shy eating in front of me, taking the tiniest bites. I pretended not to notice.',
    img:   'selfie-yellow.jpg',
  },
  {
    date:  'A quiet evening together',
    title: 'That Face Mask Call',
    story: 'She called me mid-skincare routine, face covered in a chocolate mask, completely unbothered — and still somehow the most beautiful person I had ever seen on a screen. I remember laughing, then realising I was completely in love.',
    img:   'facetime-mask.jpg',
  },
  {
    date:  'A night to remember',
    title: 'Dinner & a Selfie',
    story: 'She walked in wearing that embroidered abaya, glowing under the warm lights of the restaurant. Before we even ordered she already had her phone up — I didn\'t mind. Every photo she takes looks like art.',
    img:   'restaurant-date.jpg',
  },
  {
    date:  'King Hussein School of Computing',
    title: 'Proud of Her, Always',
    story: 'Standing beside her that day, watching how far she has come — I felt something I could not name. Pride, love, admiration, all at once. She deserves every good thing the world has to give.',
    img:   'together-school.jpg',
  },
  {
    date:  'A late night',
    title: 'Running Downtown at Midnight',
    story: 'She had that hoodie on and that smile that makes you forget what you were even talking about. Late nights on call with her feel shorter than any afternoon without her.',
    img:   'facetime-hoodie.jpg',
  },
  {
    date:  'Just us',
    title: 'Ordinary Moments',
    story: 'No occasion, no plan — just sitting close, saying nothing, needing nothing. Some of my favourite memories of us are the ones where nothing happened at all.',
    img:   'selfie-together.jpg',
  },
];

/* ── Renders all memories ─────────────────────────────────────────── */
const wrap = document.getElementById('memoriesWrap');

const PLACEHOLDER_SVG = `
  <svg viewBox="0 0 24 24" stroke-width="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
`;

MEMORIES.forEach(m => {
  const item = document.createElement('div');
  item.className = 'mem reveal';

  const imgContent = m.img
    ? `<img src="images/${m.img}" alt="${m.title}" />`
    : `<div class="mem-img-placeholder">${PLACEHOLDER_SVG}</div>`;

  item.innerHTML = `
    <div class="mem-img">${imgContent}</div>
    <div class="mem-text">
      <p class="mem-date">${m.date}</p>
      <h3 class="mem-title">${m.title}</h3>
      <p class="mem-story">${m.story}</p>
    </div>
  `;

  wrap.appendChild(item);
});
