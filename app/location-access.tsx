import { BorderRadius, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type LocationOption = 'always' | 'while_using' | 'deny';

const LOCATION_OPTIONS = [
  {
    id: 'always' as LocationOption,
    title: 'Always Allow',
    description: 'Background access for alerts',
  },
  {
    id: 'while_using' as LocationOption,
    title: 'Allow only while using the app',
    description: 'Recommended for privacy',
  },
  {
    id: 'deny' as LocationOption,
    title: 'Deny',
    description: 'Location features will be disabled',
  },
];

export default function LocationAccessScreen() {
  const { colors, isDark, accent } = useTheme();
  const [selectedOption, setSelectedOption] = useState<LocationOption>('while_using');

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Location Access</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.heroSection}
        >
          <View style={[styles.heroIconContainer, { backgroundColor: accent.primaryLight }]}>
            <MaterialIcons name="location-on" size={48} color={accent.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>Location Services</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSub }]}>
            We use your location to provide personalized health insights, local event recommendations, and accurate weather-related cycle predictions.
          </Text>
        </Animated.View>

        {/* Options Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>ALLOW LOCATION ACCESS</Text>
        </Animated.View>

        {LOCATION_OPTIONS.map((option, index) => {
          const isSelected = selectedOption === option.id;
          return (
            <Animated.View 
              key={option.id}
              entering={FadeInDown.delay(250 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  { 
                    backgroundColor: colors.surface,
                    borderColor: isSelected ? accent.primary : 'transparent',
                    borderWidth: isSelected ? 2 : 0,
                  },
                ]}
                onPress={() => setSelectedOption(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                  <Text style={[styles.optionDescription, { color: colors.textSub }]}>
                    {option.description}
                  </Text>
                </View>
                <View style={[
                  styles.radioOuter,
                  { borderColor: isSelected ? accent.primary : colors.border }
                ]}>
                  {isSelected && (
                    <View style={[styles.radioInner, { backgroundColor: accent.primary }]} />
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
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
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  heroIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: typography.size.h3,
    fontWeight: '600',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: typography.size.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: typography.size.small,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  optionContent: {
    flex: 1,
    marginRight: Spacing.md,
  },
  optionTitle: {
    fontSize: typography.size.body,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: typography.size.small,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
