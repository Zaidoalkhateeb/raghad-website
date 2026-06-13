import { useSequentialReveal } from '../hooks/useSequentialReveal.js';
import { SectionHeader } from './SectionHeader.jsx';
import { MemoryForm } from './MemoryForm.jsx';
import { MemoryFilters } from './MemoryFilters.jsx';
import { MemoryCard } from './MemoryCard.jsx';

export function Journey({ memories }) {
  const { visibleMemories, filter, setFilter, addMemory, requestDelete } = memories;
  const { revealedCount, setItemRef } = useSequentialReveal(visibleMemories.length);
  const memoriesToRender = visibleMemories.slice(0, Math.min(revealedCount + 1, visibleMemories.length));

  return (
    <section id="journey">
      <SectionHeader title="Our Beautiful Journey" subtitle="Every chapter written together is my favourite." />

      <MemoryForm onAdd={addMemory} />
      <MemoryFilters filter={filter} onChange={setFilter} />

      <div className="memories">
        {memoriesToRender.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            ref={setItemRef(index)}
            memory={memory}
            isRevealed={index < revealedCount}
            onDelete={requestDelete}
          />
        ))}
      </div>
    </section>
  );
}
