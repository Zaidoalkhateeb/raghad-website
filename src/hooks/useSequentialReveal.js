import { useEffect, useRef, useState } from 'react';

// Reveals items one at a time as the user scrolls: only the next
// not-yet-revealed item is observed, so items appear sequentially.
// Pass `setItemRef(index)` as the `ref` prop for each rendered item.
export function useSequentialReveal(itemCount) {
  const [revealedCount, setRevealedCount] = useState(1);
  const itemRefs = useRef([]);

  useEffect(() => {
    setRevealedCount((prev) => Math.min(prev, Math.max(itemCount, 1)));
  }, [itemCount]);

  useEffect(() => {
    if (revealedCount >= itemCount) return;

    const sentinel = itemRefs.current[revealedCount];
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealedCount((prev) => Math.min(prev + 1, itemCount));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [revealedCount, itemCount]);

  const setItemRef = (index) => (node) => {
    itemRefs.current[index] = node;
  };

  return { revealedCount, setItemRef };
}
