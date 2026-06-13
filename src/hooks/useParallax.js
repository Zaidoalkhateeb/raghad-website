import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

// Returns a ref to attach to a background layer that drifts at `factor`
// of the scroll speed. Mutates the DOM directly (no re-renders) and is a
// no-op when the user prefers reduced motion.
export function useParallax(factor = 0.35) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    let ticking = false;
    const update = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor, prefersReducedMotion]);

  return ref;
}
