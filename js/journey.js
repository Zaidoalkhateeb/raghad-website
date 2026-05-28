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
    date:  "25 August 2025 · Cleo's Eatery",
    title: 'Pizza & a Little Shyness',
    story: 'She showed up late — as usual — but walked in looking like she always does, effortlessly beautiful. We ordered pizza, and she was so shy eating in front of me, taking the tiniest bites. I pretended not to notice.',
    img:   null,   // replace null with e.g. 'pizza-date.jpg'
  },
  {
    date:  'A Tuesday in September 2025',
    title: 'That Quiet Walk',
    story: 'We walked without a destination, talking about everything and nothing. I remember thinking: I could do this forever. Walk beside her until the world runs out of roads.',
    img:   null,
  },
  {
    date:  'October 2025',
    title: 'The First "I Love You"',
    story: 'Words I had rehearsed a thousand times in my head came out all wrong — but somehow they landed perfectly. She looked at me and my heart forgot how to beat normally.',
    img:   null,
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
