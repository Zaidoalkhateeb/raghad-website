import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BASE_MEMORIES, ICONS, REASONS, START_DATE } from './data.js';

const MEMORIES_STORAGE_KEY = 'customMemories';
const THEME_STORAGE_KEY = 'themePreference';
const UNDO_WINDOW_MS = 5000;

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const SUN_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1.6">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MOON_SVG = (
  <svg viewBox="0 0 24 24" strokeWidth="1.6">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

// Reveals memory cards one at a time as the user scrolls: only the
// next not-yet-revealed card is observed, so cards appear sequentially.
function useSequentialReveal(itemCount) {
  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    setRevealedCount((prev) => Math.min(prev, Math.max(itemCount, 1)));
  }, [itemCount]);

  useEffect(() => {
    if (revealedCount >= itemCount) return;

    const sentinel = document.querySelector('.memories .mem-reveal:not(.vis)');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealedCount((prev) => Math.min(prev + 1, itemCount));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [revealedCount, itemCount]);

  return revealedCount;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return [theme, toggleTheme];
}

// Tracks scroll position (throttled to animation frames) for the hero parallax layer.
function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollY;
}

// Shows a shimmering skeleton until the memory photo finishes loading.
function MemoryImage({ src, alt, pos }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`mem-img-frame${loaded ? ' is-loaded' : ''}`}>
      <img src={src} alt={alt} style={{ objectPosition: pos }} onLoad={() => setLoaded(true)} />
    </div>
  );
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
  const [customMemories, setCustomMemories] = useState([]);

  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    story: '',
    mood: 'happy',
    imageUrl: ''
  });

  const [pendingDelete, setPendingDelete] = useState(null);
  const deleteTimerRef = useRef(null);

  const [theme, toggleTheme] = useTheme();
  const scrollY = useParallax();

  useReveal();

  const daysTogether = useMemo(() => {
    return Math.floor((Date.now() - new Date(START_DATE).getTime()) / 86400000);
  }, []);

  const allMemories = useMemo(() => {
    return [...customMemories, ...BASE_MEMORIES];
  }, [customMemories]);

  const visibleMemories = useMemo(() => {
    const list = filter === 'all' ? allMemories : allMemories.filter((item) => item.mood === filter);
    if (!pendingDelete) return list;
    return list.filter((item) => item.id !== pendingDelete.id);
  }, [allMemories, filter, pendingDelete]);

  const revealedCount = useSequentialReveal(visibleMemories.length);
  const memoriesToRender = visibleMemories.slice(0, Math.min(revealedCount + 1, visibleMemories.length));

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

  const commitDelete = (id) => {
    setCustomMemories((prev) => {
      const updated = prev.filter((memory) => memory.id !== id);
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const requestDelete = (memory) => {
    if (pendingDelete) {
      clearTimeout(deleteTimerRef.current);
      commitDelete(pendingDelete.id);
    }

    setPendingDelete({ id: memory.id, title: memory.title });
    deleteTimerRef.current = setTimeout(() => {
      commitDelete(memory.id);
      setPendingDelete(null);
    }, UNDO_WINDOW_MS);
  };

  const undoDelete = () => {
    clearTimeout(deleteTimerRef.current);
    setPendingDelete(null);
  };

  useEffect(() => {
    return () => clearTimeout(deleteTimerRef.current);
  }, []);

  return (
    <>
      <Hearts />

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? SUN_SVG : MOON_SVG}
      </button>

      <section id="hero">
        <div className="hero-bg" style={{ transform: `translateY(${scrollY * 0.35}px)` }} />

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
          {memoriesToRender.map((memory, index) => {
            const pos = memory.imgPos || 'center top';
            const moodClass = memory.mood === 'sad' ? 'mood-sad' : 'mood-happy';
            const isRevealed = index < revealedCount;
            return (
              <div className={`mem mem-reveal ${moodClass}${isRevealed ? ' vis' : ''}`} key={memory.id}>
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
                  {memory.userAdded && (
                    <button
                      type="button"
                      className="mem-delete-btn"
                      onClick={() => requestDelete(memory)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {pendingDelete && (
        <div className="undo-toast">
          <span>&ldquo;{pendingDelete.title}&rdquo; deleted</span>
          <button type="button" onClick={undoDelete}>
            Undo
          </button>
        </div>
      )}

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
