import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';

type SettingRowProps = {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  delay?: number;
};

function SettingRow({ title, description, enabled, onToggle, delay = 0 }: SettingRowProps) {
  const { colors, accent } = useTheme();

  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).springify()}
      style={[styles.settingRow, { borderBottomColor: colors.border }]}
    >
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: colors.textSub }]}>{description}</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: accent.primary }}
        thumbColor="#FFFFFF"
      />
    </Animated.View>
  );
}

export default function NotificationSettingsScreen() {
  const { colors, isDark } = useTheme();

  const [dailyReminder, setDailyReminder] = useState(true);
  const [periodPrediction, setPeriodPrediction] = useState(true);
  const [fertileWindow, setFertileWindow] = useState(true);
  const [ovulation, setOvulation] = useState(false);
  const [padChange, setPadChange] = useState(false);

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notification Settings</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.Text 
          entering={FadeInDown.delay(100).springify()}
          style={[styles.subtitle, { color: colors.textSub }]}
        >
          Manage your health and cycle reminders to stay on track.
        </Animated.Text>

        <View style={styles.settingsContainer}>
          <SettingRow
            title="Daily reminder"
            description="Log your symptoms daily"
            enabled={dailyReminder}
            onToggle={setDailyReminder}
            delay={150}
          />
          <SettingRow
            title="Period prediction"
            description="Alerts before period starts"
            enabled={periodPrediction}
            onToggle={setPeriodPrediction}
            delay={200}
          />
          <SettingRow
            title="Fertile window"
            description="Know your highest fertility days"
            enabled={fertileWindow}
            onToggle={setFertileWindow}
            delay={250}
          />
          <SettingRow
            title="Ovulation"
            description="Estimated ovulation day"
            enabled={ovulation}
            onToggle={setOvulation}
            delay={300}
          />
          <SettingRow
            title="Pad change"
            description="Hygiene reminders during period"
            enabled={padChange}
            onToggle={setPadChange}
            delay={350}
          />
        </View>
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
  subtitle: {
    fontSize: typography.size.caption,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  settingsContainer: {
    gap: 0,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: typography.size.small,
  },
});
