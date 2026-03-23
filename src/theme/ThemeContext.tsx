import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useColorScheme as useSystemColorScheme} from 'react-native';

import {Colors} from './theme';

export const ACCENT_COLORS = {
  pink: {
    primary: '#DB6C87',
    primaryLight: '#F8D7DE',
    secondary: '#9C89B8',
  },
  lavender: {
    primary: '#9C89B8',
    primaryLight: '#E8E2F4',
    secondary: '#7B6B9A',
  },
  mint: {
    primary: '#10B981',
    primaryLight: '#D1FAE5',
    secondary: '#0F766E',
  },
  ocean: {
    primary: '#3B82F6',
    primaryLight: '#DBEAFE',
    secondary: '#1D4ED8',
  },
  sunset: {
    primary: '#F97316',
    primaryLight: '#FFEDD5',
    secondary: '#C2410C',
  },
  custom: {
    primary: '#DB6C87',
    primaryLight: '#F8D7DE',
    secondary: '#9C89B8',
  },
};

export type AccentColorKey = keyof typeof ACCENT_COLORS;
export type AppearanceMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  appearance: AppearanceMode;
  setAppearance: (mode: AppearanceMode) => Promise<void>;
  accentColor: AccentColorKey;
  setAccentColor: (color: AccentColorKey) => Promise<void>;
  isDark: boolean;
  colors: typeof Colors.light;
  accent: (typeof ACCENT_COLORS)['pink'];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  appearance: '@theme_appearance',
  accent: '@theme_accent',
};

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const systemColorScheme = useSystemColorScheme();
  const [appearance, setAppearanceState] = useState<AppearanceMode>('system');
  const [accentColor, setAccentColorState] = useState<AccentColorKey>('pink');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedAppearance, savedAccent] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.appearance),
          AsyncStorage.getItem(STORAGE_KEYS.accent),
        ]);

        if (savedAppearance === 'light' || savedAppearance === 'dark' || savedAppearance === 'system') {
          setAppearanceState(savedAppearance);
        }

        if (savedAccent && savedAccent in ACCENT_COLORS) {
          setAccentColorState(savedAccent as AccentColorKey);
        }
      } finally {
        setHydrated(true);
      }
    };

    loadPreferences();
  }, []);

  const setAppearance = async (mode: AppearanceMode) => {
    setAppearanceState(mode);
    await AsyncStorage.setItem(STORAGE_KEYS.appearance, mode);
  };

  const setAccentColor = async (color: AccentColorKey) => {
    setAccentColorState(color);
    await AsyncStorage.setItem(STORAGE_KEYS.accent, color);
  };

  const isDark = appearance === 'system' ? systemColorScheme === 'dark' : appearance === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const accent = ACCENT_COLORS[accentColor];

  const value = useMemo(
    () => ({appearance, setAppearance, accentColor, setAccentColor, isDark, colors, accent}),
    [appearance, accentColor, isDark, colors, accent],
  );

  if (!hydrated) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
