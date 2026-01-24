import { useTheme } from '@/constants/ThemeContext';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: isDark ? '#18181B' : '#F9FAFB',
        },
      }}
    >
      <Stack.Screen name="birthday" />
      <Stack.Screen name="last-period" />
      <Stack.Screen name="cycle-length" />
      <Stack.Screen name="privacy-consent" />
      <Stack.Screen name="reminders" />
    </Stack>
  );
}
