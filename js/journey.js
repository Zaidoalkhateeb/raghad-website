/* ── ADD / EDIT memories here ─────────────────────────────────────────────
   Each entry:
     date     — displayed above the title  (string)
     title    — headline of the memory     (string)
     story    — body text                  (string)
     img      — filename inside /images/   (e.g. 'pizza-date.jpg') or null
     imgPos   — CSS object-position        (optional, default 'center top')
─────────────────────────────────────────────────────────────────────── */
const MEMORIES = [
  {
    date:  '25 August 2025 · Cleo\'s Eatery',
    title: 'Pizza & a Little Shyness',
    story: 'She showed up late — as usual — but walked in looking like she always does, effortlessly beautiful. We ordered pizza, and she was so shy eating in front of me, taking the tiniest bites. I pretended not to notice.',
    img:   'selfie-yellow.jpg',
  },
  {
    date:  '2 March 2026 · First Ramadan Together',
    title: 'Abaya & Pizza (Again)',
    story: "I don't know why every special date ends up being pizza — but this one was different. First Ramadan together, and the first time I saw her in an abaya. She walked in and I completely forgot how long I'd been waiting. Worth every minute.",
    img:   'restaurant-date.jpg',
  },
  {
    date:  '14 January 2026 · Graduation Project',
    title: 'She Showed Up',
    story: "She was on time — not a minute late. She met Sara and Leen, smiled through every introduction even though she was shy, and stood next to me like she'd always belonged there. She showed up for me. I couldn't make it to hers, and that still sits heavy — but the fact that she came, dressed in all black and full of quiet grace, is something I will never forget.",
    img:   'together-school.jpg',
  },
  {
    date:  'Late Nights · 12:41 AM',
    title: 'All Night With You',
    story: "There's something about her at midnight — no makeup, just a hoodie and that soft sleepy smile. We'd stay on call long after we should have said goodnight, not doing anything special, just unwilling to hang up. Those late nights are some of my favourite hours with her.",
    img:    'facetime-hoodie.jpg',
    imgPos: 'center 35%',
  },
  {
    date:  '7 April 2026 · Last Study Session · Crave',
    title: 'Books, Coffee & You',
    story: "We sat across from each other at Crave, pretending to study, but mostly just existing in the same space and feeling lucky about it. I didn't know then that it would be the last time. Now I miss it more than I expected — the quiet of sitting beside her, the way she'd look up from her notes. I hope we get that back.",
    img:   'selfie-together.jpg',
  },
  {
    date:  '26 May 2026 · The Night Before Eid',
    title: 'Skincare & Soft Nights',
    story: "The night before Eid, she called me with a face full of scrub and the biggest smile. We stayed on FaceTime while she finished her routine, then she went to shower. By the time she was done, it was my turn — I started my own skincare while she watched. Then we just stayed on the line, and somewhere in the quiet, we both fell asleep. One of my favourite nights with her.",
    img:    'facetime-mask.jpg',
    imgPos: 'center 20%',
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

  const pos = m.imgPos || 'center top';
  const imgContent = m.img
    ? `<img src="images/${m.img}" alt="${m.title}" style="object-position:${pos}" />`
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
