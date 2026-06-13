const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'happy', label: 'Happy' },
  { value: 'sad', label: 'Sad' }
];

export function MemoryFilters({ filter, onChange }) {
  return (
    <div className="memory-filters reveal" role="group" aria-label="Filter memories by mood">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={filter === value ? 'is-active' : ''}
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
