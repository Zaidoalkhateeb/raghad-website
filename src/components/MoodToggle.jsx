import { ICONS } from '../data.js';

const MOODS = [
  { value: 'happy', label: 'Happy', icon: ICONS.happy },
  { value: 'sad', label: 'Sad', icon: ICONS.sad }
];

export function MoodToggle({ value, onChange, labelledBy }) {
  return (
    <div className="mood-toggle" role="group" aria-labelledby={labelledBy}>
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          type="button"
          className={`mood-toggle-btn mood-${mood.value}${value === mood.value ? ' is-active' : ''}`}
          aria-pressed={value === mood.value}
          onClick={() => onChange(mood.value)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: mood.icon }} />
          {mood.label}
        </button>
      ))}
    </div>
  );
}
