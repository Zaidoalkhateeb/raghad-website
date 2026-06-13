import { useEffect, useMemo, useRef, useState } from 'react';
import { BASE_MEMORIES } from '../content.js';
import { useLocalStorage } from './useLocalStorage.js';

const MEMORIES_STORAGE_KEY = 'customMemories';
const HIDDEN_STORAGE_KEY = 'hiddenMemoryIds';
const UNDO_WINDOW_MS = 5000;

// Owns the full memory list: user-added entries, hidden built-in entries,
// mood filtering, and delete-with-undo for ANY memory (built-in or custom).
export function useMemories() {
  const [customMemories, setCustomMemories] = useLocalStorage(MEMORIES_STORAGE_KEY, []);
  const [hiddenIds, setHiddenIds] = useLocalStorage(HIDDEN_STORAGE_KEY, []);
  const [filter, setFilter] = useState('all');
  const [pendingDelete, setPendingDelete] = useState(null);
  const deleteTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(deleteTimerRef.current), []);

  const allMemories = useMemo(() => {
    const merged = [...customMemories, ...BASE_MEMORIES];
    return hiddenIds.length ? merged.filter((memory) => !hiddenIds.includes(memory.id)) : merged;
  }, [customMemories, hiddenIds]);

  const visibleMemories = useMemo(() => {
    const list = filter === 'all' ? allMemories : allMemories.filter((memory) => memory.mood === filter);
    return pendingDelete ? list.filter((memory) => memory.id !== pendingDelete.id) : list;
  }, [allMemories, filter, pendingDelete]);

  const commitDelete = (memory) => {
    if (memory.userAdded) {
      setCustomMemories((prev) => prev.filter((item) => item.id !== memory.id));
    } else {
      setHiddenIds((prev) => (prev.includes(memory.id) ? prev : [...prev, memory.id]));
    }
  };

  const addMemory = (entry) => {
    setCustomMemories((prev) => [entry, ...prev]);
    setFilter('all');
  };

  const requestDelete = (memory) => {
    if (pendingDelete) {
      clearTimeout(deleteTimerRef.current);
      commitDelete(pendingDelete.memory);
    }

    setPendingDelete({ id: memory.id, title: memory.title, memory });
    deleteTimerRef.current = setTimeout(() => {
      commitDelete(memory);
      setPendingDelete(null);
    }, UNDO_WINDOW_MS);
  };

  const undoDelete = () => {
    clearTimeout(deleteTimerRef.current);
    setPendingDelete(null);
  };

  return {
    allMemories,
    visibleMemories,
    filter,
    setFilter,
    addMemory,
    requestDelete,
    undoDelete,
    pendingDelete
  };
}
