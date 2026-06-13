import { forwardRef } from 'react';
import { MemoryImage } from './MemoryImage.jsx';

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
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
        <p className={`mem-mood ${moodClass}`}>{memory.mood} memory</p>
        <button type="button" className="mem-delete-btn" onClick={() => onDelete(memory)}>
          Delete
        </button>
      </div>
    </div>
  );
});
