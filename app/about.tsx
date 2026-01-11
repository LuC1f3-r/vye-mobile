import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing, typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LEGAL_ITEMS = [
  { icon: 'policy', label: 'Privacy Policy', color: Colors.primary },
  { icon: 'description', label: 'Terms of Service', color: Colors.secondary },
  { icon: 'code', label: 'Open Source Licenses', color: '#10B981' },
];

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About Vye</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* App Icon & Info */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.appInfo}>
          <View style={styles.appIcon}>
            <MaterialIcons name="local-florist" size={48} color="#FFFFFF" />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>Vye App</Text>
          <Text style={[styles.appVersion, { color: colors.textSub }]}>Version 1.0.0 (Build 1042)</Text>
        </Animated.View>

        <Animated.Text 
          entering={FadeInDown.delay(200).springify()}
          style={[styles.description, { color: colors.textSub }]}
        >
          Empowering women to understand their bodies better. Vye combines science and data to provide personalized insights for your cycle, fertility, and overall well-being.
        </Animated.Text>

        {/* Legal & Information */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionLabel, { color: colors.textSub }]}>LEGAL & INFORMATION</Text>

          {LEGAL_ITEMS.map((item, index) => (
            <Animated.View
              key={item.label}
              entering={FadeInDown.delay(350 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.legalCard, { backgroundColor: colors.surface }]}
                activeOpacity={0.7}
              >
                <View style={[styles.legalIcon, { backgroundColor: `${item.color}15` }]}>
                  <MaterialIcons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={[styles.legalLabel, { color: colors.text }]}>{item.label}</Text>
                <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: typography.size.body + 2,
    fontWeight: 'bold',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  appInfo: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  appName: {
    fontSize: typography.size.h2,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: typography.size.caption,
  },
  description: {
    fontSize: typography.size.caption,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  legalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.lg,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  legalIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  legalLabel: {
    flex: 1,
    fontSize: typography.size.caption,
    fontWeight: '500',
  },
});
