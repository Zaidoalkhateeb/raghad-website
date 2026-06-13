import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

const THEME_STORAGE_KEY = 'themePreference';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    THEME_STORAGE_KEY,
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return [theme, toggleTheme];
}
