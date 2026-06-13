import { useState } from 'react';

const EMPTY_FORM = { date: '', title: '', story: '', mood: 'happy', imageUrl: '' };

export function MemoryForm({ onAdd }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const updateField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.story.trim()) return;

    const formattedDate = formData.date
      ? new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : 'New Memory';

    onAdd({
      id: crypto.randomUUID(),
      date: formattedDate,
      title: formData.title.trim(),
      story: formData.story.trim(),
      mood: formData.mood,
      imageUrl: formData.imageUrl.trim() || '',
      userAdded: true
    });

    setFormData(EMPTY_FORM);
  };

  return (
    <div className="memory-form reveal">
      <h3>Add a New Memory</h3>
      <p className="memory-form-sub">Write your own moment and mark it as happy or sad.</p>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            Date
            <input type="date" value={formData.date} onChange={updateField('date')} />
          </label>

          <label>
            Mood
            <select value={formData.mood} onChange={updateField('mood')}>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
            </select>
          </label>

          <label className="full-row">
            Title
            <input
              type="text"
              required
              placeholder="Memory title"
              value={formData.title}
              onChange={updateField('title')}
            />
          </label>

          <label className="full-row">
            Story
            <textarea
              required
              rows="4"
              placeholder="Write the memory"
              value={formData.story}
              onChange={updateField('story')}
            />
          </label>

          <label className="full-row">
            Optional image URL
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={formData.imageUrl}
              onChange={updateField('imageUrl')}
            />
          </label>
        </div>

        <button type="submit" className="add-memory-btn">
          Save Memory
        </button>
      </form>
    </div>
  );
}
