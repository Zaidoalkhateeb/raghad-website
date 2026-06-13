import { useMemo } from 'react';
import { START_DATE } from './data.js';
import { useReveal } from './hooks/useReveal.js';
import { useTheme } from './hooks/useTheme.js';
import { useMemories } from './hooks/useMemories.js';
import { Hearts } from './components/Hearts.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { Hero } from './components/Hero.jsx';
import { LoveLetter } from './components/LoveLetter.jsx';
import { Reasons } from './components/Reasons.jsx';
import { Journey } from './components/Journey.jsx';
import { UndoToast } from './components/UndoToast.jsx';
import { Footer } from './components/Footer.jsx';

function App() {
  const [theme, toggleTheme] = useTheme();
  const memories = useMemories();

  useReveal();

  const daysTogether = useMemo(() => {
    return Math.floor((Date.now() - new Date(START_DATE).getTime()) / 86400000);
  }, []);

  return (
    <>
      <Hearts />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <Hero daysTogether={daysTogether} />
      <LoveLetter />
      <Reasons />
      <Journey memories={memories} />

      <UndoToast pendingDelete={memories.pendingDelete} onUndo={memories.undoDelete} />

      <Footer daysTogether={daysTogether} memoriesCount={memories.allMemories.length} />
    </>
  );
}

export default App;
