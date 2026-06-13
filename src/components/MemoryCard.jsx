import { forwardRef } from 'react';
import { MemoryImage } from './MemoryImage.jsx';

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const HAPPY_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.6C6.4 16.1 1 11.4 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.2 2 23 3.6 23 7.2c0 4.2-5.1 8.8-11 14.4z" />
  </svg>
);

const SAD_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const MemoryCard = forwardRef(function MemoryCard({ memory, isRevealed, onDelete }, ref) {
  const pos = memory.imgPos || 'center top';
  const moodClass = memory.mood === 'sad' ? 'mood-sad' : 'mood-happy';

  return (
    <div ref={ref} className={`mem mem-reveal ${moodClass}${isRevealed ? ' vis' : ''}`}>
      <div className="mem-dot" aria-hidden="true" />
      <div className="mem-img">
        {memory.imageUrl ? (
          <MemoryImage src={memory.imageUrl} alt={memory.title} pos={pos} />
        ) : memory.img ? (
          <MemoryImage src={`${import.meta.env.BASE_URL}images/${memory.img}`} alt={memory.title} pos={pos} />
        ) : (
          <div className="mem-img-placeholder">{PLACEHOLDER_SVG}</div>
        )}
      </div>
      <div className="mem-text">
        <p className="mem-date">{memory.date}</p>
        <h3 className="mem-title">{memory.title}</h3>
        <p className="mem-story">{memory.story}</p>
        <p className={`mem-mood ${moodClass}`}>
          {memory.mood === 'sad' ? SAD_ICON : HAPPY_ICON}
          {memory.mood} memory
        </p>
        <button type="button" className="mem-delete-btn" onClick={() => onDelete(memory)}>
          Delete
        </button>
      </div>
    </div>
  );
});
