import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';

import {
  mototrackThemes,
  type MotoTrackTheme,
  type ThemeMode,
} from '@/constants/mototrack-theme';

const STORAGE_KEY = 'mototrack-theme-mode';

type ThemeModeContextValue = {
  mode: ThemeMode;
  theme: MotoTrackTheme;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark') {
        setModeState(stored);
      }
    });
  }, []);

  const theme = mototrackThemes[mode];

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background);

    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = theme.background;
    }
  }, [theme.background]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = useMemo(
    () => ({ mode, theme, toggleMode, setMode }),
    [mode, theme, toggleMode, setMode],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useMotoTrackTheme() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useMotoTrackTheme must be used within ThemeModeProvider');
  }
  return context;
}
