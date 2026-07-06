import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'auto' | 'light' | 'dark';
export type SelectedTheme = 'light' | 'dark';

const THEME_MODES: ThemeMode[] = ['auto', 'light', 'dark'];
const PREFERS_DARK = '(prefers-color-scheme: dark)';

const getSystemTheme = (): SelectedTheme => {
  return window.matchMedia(PREFERS_DARK).matches ? 'dark' : 'light';
};

const selectTheme = (theme: ThemeMode): SelectedTheme => {
  return theme === 'auto' ? getSystemTheme() : theme;
};

type ThemeState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'auto',

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        const nextIndex = (THEME_MODES.indexOf(get().theme) + 1) % THEME_MODES.length;

        set({ theme: THEME_MODES[nextIndex] });
      },
    }),
    { name: 'theme' },
  ),
);

export const useThemeSync = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = selectTheme(theme);
    };

    apply();

    if (theme !== 'auto') {
      return;
    }

    const mediaQuery = window.matchMedia(PREFERS_DARK);

    mediaQuery.addEventListener('change', apply);

    return () => {
      mediaQuery.removeEventListener('change', apply);
    };
  }, [theme]);
};
