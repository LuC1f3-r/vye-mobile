import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './theme';

// Accent color definitions
export const ACCENT_COLORS = {
  pink: {
    primary: '#DB6C87',
    primaryLight: '#F8D7DE',
    secondary: '#6B4C7A',
  },
  lavender: {
    primary: '#A78BFA',
    primaryLight: '#EDE9FE',
    secondary: '#7C3AED',
  },
  mint: {
    primary: '#10B981',
    primaryLight: '#D1FAE5',
    secondary: '#059669',
  },
  ocean: {
    primary: '#3B82F6',
    primaryLight: '#DBEAFE',
    secondary: '#1D4ED8',
  },
  sunset: {
    primary: '#F97316',
    primaryLight: '#FFEDD5',
    secondary: '#EA580C',
  },
  custom: {
    primary: '#A855F7',
    primaryLight: '#F3E8FF',
    secondary: '#9333EA',
  },
};

export type AccentColorKey = keyof typeof ACCENT_COLORS;
export type AppearanceMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  appearance: AppearanceMode;
  setAppearance: (mode: AppearanceMode) => void;
  accentColor: AccentColorKey;
  setAccentColor: (color: AccentColorKey) => void;
  isDark: boolean;
  colors: typeof Colors.light;
  accent: typeof ACCENT_COLORS.pink;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  APPEARANCE: '@theme_appearance',
  ACCENT: '@theme_accent',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [appearance, setAppearanceState] = useState<AppearanceMode>('system');
  const [accentColor, setAccentColorState] = useState<AccentColorKey>('pink');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedAppearance, savedAccent] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.APPEARANCE),
          AsyncStorage.getItem(STORAGE_KEYS.ACCENT),
        ]);
        
        if (savedAppearance) {
          setAppearanceState(savedAppearance as AppearanceMode);
        }
        if (savedAccent) {
          setAccentColorState(savedAccent as AccentColorKey);
        }
      } catch (error) {
        console.error('Failed to load theme preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadPreferences();
  }, []);

  // Save appearance preference
  const setAppearance = async (mode: AppearanceMode) => {
    setAppearanceState(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APPEARANCE, mode);
    } catch (error) {
      console.error('Failed to save appearance:', error);
    }
  };

  // Save accent color preference
  const setAccentColor = async (color: AccentColorKey) => {
    setAccentColorState(color);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCENT, color);
    } catch (error) {
      console.error('Failed to save accent color:', error);
    }
  };

  // Determine if dark mode should be active
  const isDark = appearance === 'system' 
    ? systemColorScheme === 'dark'
    : appearance === 'dark';

  // Get the current color scheme
  const colors = isDark ? Colors.dark : Colors.light;

  // Get the current accent colors
  const accent = ACCENT_COLORS[accentColor];

  // Override primary colors with accent
  const themedColors = {
    ...colors,
    // You can add accent overrides here if needed in the future
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider
      value={{
        appearance,
        setAppearance,
        accentColor,
        setAccentColor,
        isDark,
        colors: themedColors,
        accent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
