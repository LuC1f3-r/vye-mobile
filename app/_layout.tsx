import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/constants/ThemeContext';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { isDark, accent } = useTheme();

  // Custom theme with Period Tracker colors
  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: accent.primary,
      background: Colors.light.background,
      card: Colors.light.surface,
      text: Colors.light.text,
      border: Colors.light.border,
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: accent.primary,
      background: Colors.dark.background,
      card: Colors.dark.surface,
      text: Colors.dark.text,
      border: Colors.dark.border,
    },
  };

  return (
    <NavigationThemeProvider value={isDark ? customDarkTheme : customLightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="notifications" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="add-state" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="records" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="notification-settings" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="help-feedback" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="language" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="data-privacy" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="themes" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="personal-information" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="community-settings" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="backup-data" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="manage-users" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="password-security" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="location-access" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="my-activity" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="edit-profile" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="sign-in" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="sign-up" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="forgot-password" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
