import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export function Hearts() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const hearts = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const size = Math.floor(8 + Math.random() * 18);
      const dur = 18 + Math.random() * 22;
      const del = Math.random() * 25;
      const left = Math.random() * 100;
      return { id: i, size, dur, del, left };
    });
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div id="hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          className="fh"
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.dur}s`,
            animationDelay: `${heart.del}s`
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24">
            <path d="M12 21.6C6.4 16.1 1 11.4 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.2 2 23 3.6 23 7.2c0 4.2-5.1 8.8-11 14.4z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
