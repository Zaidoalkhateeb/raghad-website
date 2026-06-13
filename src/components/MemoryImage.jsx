import { useState } from 'react';

// Shows a shimmering skeleton until the memory photo finishes loading.
export function MemoryImage({ src, alt, pos }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`mem-img-frame${loaded ? ' is-loaded' : ''}`}>
      <img
        src={src}
        alt={alt}
        style={{ objectPosition: pos }}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
