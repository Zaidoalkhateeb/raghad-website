import { ICONS } from '../data.js';
import { MemoryImage } from './MemoryImage.jsx';

export function MemoryCard({ memory, onDelete }) {
  const pos = memory.imgPos || 'center top';
  const moodClass = memory.mood === 'sad' ? 'mood-sad' : 'mood-happy';

  return (
    <div className={`mem ${moodClass}`}>
      <div className="mem-dot" aria-hidden="true" />
      <div className="mem-img">
        {memory.imageUrl ? (
          <MemoryImage src={memory.imageUrl} alt={memory.title} pos={pos} />
        ) : memory.img ? (
          <MemoryImage src={`${import.meta.env.BASE_URL}images/${memory.img}`} alt={memory.title} pos={pos} />
        ) : (
          <div className="mem-img-placeholder">
            <svg viewBox="0 0 24 24" strokeWidth="1" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS.image }} />
          </div>
        )}
      </div>
      <div className="mem-text">
        <p className="mem-date">{memory.date}</p>
        <h3 className="mem-title">{memory.title}</h3>
        <p className="mem-story">{memory.story}</p>
        <p className={`mem-mood ${moodClass}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[memory.mood === 'sad' ? 'sad' : 'happy'] }} />
          {memory.mood} memory
        </p>
        <button
          type="button"
          className="mem-delete-btn"
          aria-label={`Delete memory: ${memory.title}`}
          onClick={() => onDelete(memory)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
