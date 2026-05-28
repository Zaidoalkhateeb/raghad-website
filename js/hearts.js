/* Spawns floating heart particles in the background */
(function () {
  const wrap = document.getElementById('hearts');

  for (let i = 0; i < 28; i++) {
    const el  = document.createElement('div');
    el.className = 'fh';

    const size = Math.floor(8 + Math.random() * 18);
    const dur  = 18 + Math.random() * 22;
    const del  = Math.random() * 25;

    el.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${dur}s;
      animation-delay: ${del}s;
    `;

    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24">
        <path d="M12 21.6C6.4 16.1 1 11.4 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.2 2 23 3.6 23 7.2c0 4.2-5.1 8.8-11 14.4z"/>
      </svg>
    `;

    wrap.appendChild(el);
  }
})();
