export function UndoToast({ pendingDelete, onUndo }) {
  if (!pendingDelete) return null;

  return (
    <div className="undo-toast" role="status" aria-live="polite">
      <span>&ldquo;{pendingDelete.title}&rdquo; deleted</span>
      <button type="button" onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}
