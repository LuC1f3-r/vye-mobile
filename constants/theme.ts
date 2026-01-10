/**
 * Period Tracker App Theme
 * Colors extracted from the HTML designs
 */

import { Platform } from 'react-native';

export const typography = {
  fontFamily: {
    heading: 'Nunito-Bold',
    subheading: 'Nunito-SemiBold',
    body: 'Inter-Regular',
    bodyBold: 'Inter-Bold',
  },

  // Font Sizes
  size: {
    h1: 32, // Large greetings (e.g., "Hello, User")
    h2: 24, // Section headers (e.g., "Cycle Trends")
    h3: 20, // Card titles
    body: 16, // Standard reading text
    caption: 14, // Labels (e.g., "Light Flow")
    small: 12, // Dates under items
  },

  // Line Heights (Crucial for readability)
  lineHeight: {
    h1: 40,
    body: 24, // 1.5x of body size is the "Golden Ratio" for readability
  }
}

// Primary colors from the design
export const Colors = {
  // Brand colors
  primary: '#DB6C87',        // Pinkish-red (main accent)
  primaryLight: '#FADBE2',   // Light pink for highlights
  primaryDark: '#B04D65',    // Darker pink
  secondary: '#9C89B8',      // Soft purple for ovulation
  secondaryLight: '#E0D8EB', // Light purple
  success: '#10B981',        // Green for "Normal" status

  light: {
    text: '#1F2937',
    textSub: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    tint: '#DB6C87',
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#DB6C87',
  },
  dark: {
    text: '#F3F4F6',
    textSub: '#9CA3AF',
    background: '#18181B',
    surface: '#27272A',
    border: '#3F3F46',
    tint: '#DB6C87',
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#DB6C87',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Spacing constants
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Border radius constants
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
