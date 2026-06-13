import { SectionHeader } from './SectionHeader.jsx';
import { MemoryForm } from './MemoryForm.jsx';
import { MemoryFilters } from './MemoryFilters.jsx';
import { MemoryCard } from './MemoryCard.jsx';

export function Journey({ memories }) {
  const { visibleMemories, filter, setFilter, addMemory, requestDelete } = memories;

  return (
    <section id="journey">
      <SectionHeader title="Our Beautiful Journey" subtitle="Every chapter written together is my favourite." />

      <MemoryForm onAdd={addMemory} />
      <MemoryFilters filter={filter} onChange={setFilter} />

      {visibleMemories.length > 0 ? (
        <div className="memories reveal">
          {visibleMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} onDelete={requestDelete} />
          ))}
        </div>
      ) : (
        <p className="memories-empty">
          {filter === 'all' ? 'No memories yet' : `No ${filter} memories yet`} &mdash; add one above.
        </p>
      )}
    </section>
  );
}
