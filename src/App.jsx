import React, { useEffect, useMemo, useState } from 'react';
import { BASE_MEMORIES, ICONS, REASONS, START_DATE } from './data.js';

const MEMORIES_STORAGE_KEY = 'customMemories';

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.1 }
    );

    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);
}

function Hearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const size = Math.floor(8 + Math.random() * 18);
      const dur = 18 + Math.random() * 22;
      const del = Math.random() * 25;
      const left = Math.random() * 100;
      return { id: i, size, dur, del, left };
    });
  }, []);

  return (
    <div id="hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          className="fh"
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.dur}s`,
            animationDelay: `${heart.del}s`
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24">
            <path d="M12 21.6C6.4 16.1 1 11.4 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.2 2 23 3.6 23 7.2c0 4.2-5.1 8.8-11 14.4z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function App() {
  useReveal();

  const [customMemories, setCustomMemories] = useState([]);

  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    story: '',
    mood: 'happy',
    imageUrl: ''
  });

  const daysTogether = useMemo(() => {
    return Math.floor((Date.now() - new Date(START_DATE).getTime()) / 86400000);
  }, []);

  const allMemories = useMemo(() => {
    return [...customMemories, ...BASE_MEMORIES];
  }, [customMemories]);

  const visibleMemories = useMemo(() => {
    if (filter === 'all') return allMemories;
    return allMemories.filter((item) => item.mood === filter);
  }, [allMemories, filter]);

  useEffect(() => {
    const stored = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (!stored) return;

    try {
      setCustomMemories(JSON.parse(stored));
    } catch {
      setCustomMemories([]);
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.story.trim()) {
      return;
    }

    const formattedDate = formData.date
      ? new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : 'New Memory';

    const entry = {
      id: crypto.randomUUID(),
      date: formattedDate,
      title: formData.title.trim(),
      story: formData.story.trim(),
      mood: formData.mood,
      imageUrl: formData.imageUrl.trim() || '',
      userAdded: true
    };

    setCustomMemories((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setFormData({ date: '', title: '', story: '', mood: 'happy', imageUrl: '' });
    setFilter('all');
  };

  return (
    <>
      <Hearts />

      <section id="hero">
        <p className="hero-eyebrow">For My Dearest</p>
        <h1 className="hero-name">Raghad</h1>
        <p className="hero-sub">
          To the one who makes every day brighter
          <br />
          and my heart fuller.
        </p>

        <div className="counter-wrap">
          <div className="petal-ring" />
          <p className="counter-eyebrow">Together For</p>
          <div className="counter-num">
            <span>{daysTogether}</span>
            <span className="unit">days</span>
          </div>
          <p className="counter-since">Since July 30, 2025</p>
        </div>

        <div className="scroll-cue">
          <span>Scroll to Discover</span>
          <div className="scroll-bar" />
        </div>
      </section>

      <section id="letter">
        <div className="letter-card reveal">
          <span className="big-quote">&#10077;</span>
          <p className="letter-greeting">My beautiful Raghad,</p>
          <div className="letter-body">
            <p>
              If I could gather all the words in the world, they still would not be enough to express
              what you mean to me. From the moment you entered my life, everything shifted. The colors
              became brighter, the days felt warmer, and I suddenly understood what all those love songs
              were truly about.
            </p>
            <p>
              You are my quietest peace and my greatest adventure. I love the way your mind works, the
              gentleness of your spirit, and how you see the world with such grace. When I look at you, I
              do not just see the person I love - I see my home.
            </p>
            <p>
              This little space is just a small reminder of all the reasons why you hold my heart, today
              and always. Thank you for being exactly who you are.
            </p>
          </div>
          <div className="letter-sig">
            <span className="sig-forever">Forever yours,</span>
            <span className="sig-name">Someone who loves you</span>
          </div>
        </div>
      </section>

      <section id="reasons">
        <div className="sec-header reveal">
          <h2 className="sec-title">Reasons I Love You</h2>
          <div className="sec-divider">
            <span />
            <span className="diamond" />
            <span />
          </div>
          <p className="sec-sub">Though a thousand more would still fall short.</p>
        </div>

        <div className="reasons-grid">
          {REASONS.map((reason, index) => (
            <div
              className="rc reveal"
              key={reason.title}
              style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
            >
              <div className="rc-icon">
                <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[reason.icon] }} />
              </div>
              <h3 className="rc-title">{reason.title}</h3>
              <p className="rc-desc">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="journey">
        <div className="sec-header reveal">
          <h2 className="sec-title">Our Beautiful Journey</h2>
          <div className="sec-divider">
            <span />
            <span className="diamond" />
            <span />
          </div>
          <p className="sec-sub">Every chapter written together is my favourite.</p>
        </div>

        <div className="memory-form reveal">
          <h3>Add a New Memory</h3>
          <p className="memory-form-sub">Write your own moment and mark it as happy or sad.</p>
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <label>
                Date
                <input
                  type="date"
                  value={formData.date}
                  onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                />
              </label>

              <label>
                Mood
                <select
                  value={formData.mood}
                  onChange={(event) => setFormData((prev) => ({ ...prev, mood: event.target.value }))}
                >
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
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>

              <label className="full-row">
                Story
                <textarea
                  required
                  rows="4"
                  placeholder="Write the memory"
                  value={formData.story}
                  onChange={(event) => setFormData((prev) => ({ ...prev, story: event.target.value }))}
                />
              </label>

              <label className="full-row">
                Optional image URL
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.imageUrl}
                  onChange={(event) => setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))}
                />
              </label>
            </div>

            <button type="submit" className="add-memory-btn">
              Save Memory
            </button>
          </form>
        </div>

        <div className="memory-filters reveal">
          <button
            className={filter === 'all' ? 'is-active' : ''}
            type="button"
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'happy' ? 'is-active' : ''}
            type="button"
            onClick={() => setFilter('happy')}
          >
            Happy
          </button>
          <button
            className={filter === 'sad' ? 'is-active' : ''}
            type="button"
            onClick={() => setFilter('sad')}
          >
            Sad
          </button>
        </div>

        <div className="memories">
          {visibleMemories.map((memory) => {
            const pos = memory.imgPos || 'center top';
            const moodClass = memory.mood === 'sad' ? 'mood-sad' : 'mood-happy';
            return (
              <div className="mem reveal" key={memory.id}>
                <div className="mem-img">
                  {memory.imageUrl ? (
                    <img src={memory.imageUrl} alt={memory.title} style={{ objectPosition: pos }} />
                  ) : memory.img ? (
                    <img src={`${import.meta.env.BASE_URL}images/${memory.img}`} alt={memory.title} style={{ objectPosition: pos }} />
                  ) : (
                    <div className="mem-img-placeholder">{PLACEHOLDER_SVG}</div>
                  )}
                </div>
                <div className="mem-text">
                  <p className="mem-date">{memory.date}</p>
                  <h3 className="mem-title">{memory.title}</h3>
                  <p className="mem-story">{memory.story}</p>
                  <p className={`mem-mood ${moodClass}`}>{memory.mood} memory</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-left">
            <h2 className="footer-headline">
              Built for <em>you</em>,
              <br />
              by me.
            </h2>
            <p className="footer-tagline">
              The whole point of this little place is that it grows.
              <br />
              Add a memory.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-row">
              <span>Days together</span>
              <span>{daysTogether}</span>
            </div>
            <div className="footer-row">
              <span>Reasons listed</span>
              <span>{REASONS.length} of infinity</span>
            </div>
            <div className="footer-row">
              <span>Memories saved</span>
              <span>{allMemories.length}</span>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-row">
              <span>Founded</span>
              <em>Jul 30, 2025</em>
            </div>
            <div className="footer-row">
              <span>Status</span>
              <em>in love</em>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
