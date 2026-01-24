import { BorderRadius, Colors, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ReminderSetting {
  id: string;
  title: string;
  enabled: boolean;
  settings: {
    label: string;
    value: string;
  }[];
}

const INITIAL_REMINDERS: ReminderSetting[] = [
  {
    id: 'period',
    title: 'Period reminders',
    enabled: true,
    settings: [
      { label: 'Schedule', value: '1 day before' },
      { label: 'Time', value: '07:00 AM' },
      { label: 'Message', value: 'Your period will start ...' },
    ],
  },
  {
    id: 'fertile',
    title: 'Fertile window reminders',
    enabled: false,
    settings: [
      { label: 'Schedule', value: '1 day before' },
      { label: 'Time', value: '06:00 PM' },
      { label: 'Message', value: 'Your will be fertile so...' },
    ],
  },
  {
    id: 'ovulation',
    title: 'Ovulation reminders',
    enabled: false,
    settings: [
      { label: 'Schedule', value: '1 day before' },
      { label: 'Time', value: '06:00 PM' },
      { label: 'Message', value: 'Your will be ovulatin...' },
    ],
  },
  {
    id: 'medicine',
    title: 'Medicine reminder',
    enabled: true,
    settings: [
      { label: 'Medicine name', value: 'Vitamin D' },
      { label: 'Timings', value: '09:00 AM | 09:00 PM' },
      { label: 'Message', value: 'Its time to take vita...' },
    ],
  },
];

export default function RemindersScreen() {
  const { isDark, colors, accent } = useTheme();
  const [reminders, setReminders] = useState<ReminderSetting[]>(INITIAL_REMINDERS);

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const handleFinish = () => {
    // Save reminder settings and complete onboarding
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
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
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Bell Icon */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.iconContainer}>
          <MaterialIcons name="notifications-none" size={48} color={colors.text} />
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Set your reminder{'\n'}notification
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            This reminder will help you feel prepared for your next cycle
          </Text>
        </Animated.View>

        {/* Reminder Cards */}
        {reminders.map((reminder, index) => (
          <Animated.View 
            key={reminder.id}
            entering={FadeInDown.delay(300 + index * 100).springify()}
          >
            <View 
              style={[
                styles.reminderCard, 
                { 
                  backgroundColor: colors.surface, 
                  borderColor: colors.border,
                  opacity: reminder.enabled ? 1 : 0.7,
                }
              ]}
            >
              {/* Header Row */}
              <View style={styles.reminderHeader}>
                <Text style={[styles.reminderTitle, { color: colors.text }]}>
                  {reminder.title}
                </Text>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: colors.border, true: `${accent.primary}40` }}
                  thumbColor={reminder.enabled ? accent.primary : colors.textSub}
                  ios_backgroundColor={colors.border}
                />
              </View>

              {/* Settings Rows */}
              {reminder.settings.map((setting, settingIndex) => (
                <View key={settingIndex} style={styles.settingRow}>
                  <Text style={[styles.settingLabel, { color: reminder.enabled ? colors.textSub : colors.border }]}>
                    {setting.label}
                  </Text>
                  <View style={styles.settingValueContainer}>
                    <Text 
                      style={[
                        styles.settingValue, 
                        { color: reminder.enabled ? colors.text : colors.textSub }
                      ]}
                      numberOfLines={1}
                    >
                      {setting.value}
                    </Text>
                    <MaterialIcons 
                      name="edit" 
                      size={14} 
                      color={reminder.enabled ? colors.textSub : colors.border} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Finish Button - Fixed at bottom */}
      <Animated.View entering={FadeInDown.delay(700).springify()} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.finishButton, { backgroundColor: accent.primary }]}
          onPress={handleFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </Animated.View>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: typography.size.h3,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.caption,
    textAlign: 'center',
    lineHeight: 20,
  },
  reminderCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reminderTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  settingLabel: {
    fontSize: typography.size.small,
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '60%',
  },
  settingValue: {
    fontSize: typography.size.small,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  finishButton: {
    width: '100%',
    height: 56,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
