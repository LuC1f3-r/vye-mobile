import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';

export default function CommunityScreen() {
  const { colors, isDark, accent } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Animated.View entering={FadeInUp.springify()} style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="groups" size={48} color={accent.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Community</Text>
        <Text style={[styles.subtitle, { color: colors.textSub }]}>
          Connect with others and share your experiences
        </Text>
        <Text style={[styles.comingSoon, { color: accent.primary }]}>Coming Soon! 💕</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.size.caption,
    textAlign: 'center',
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
