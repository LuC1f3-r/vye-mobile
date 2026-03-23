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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

type ReminderCardProps = {
  title: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  schedule: string;
  time: string;
  message: string;
  showInterval?: boolean;
  intervalText?: string;
  note?: string;
  delay?: number;
};

function ReminderCard({
  title,
  enabled,
  onToggle,
  schedule,
  time,
  message,
  showInterval,
  intervalText,
  note,
  delay = 0,
}: ReminderCardProps) {
  const { colors, accent } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      style={[
        styles.reminderCard,
        { backgroundColor: colors.surface },
        !enabled && styles.cardDisabled,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: colors.border, true: accent.primary }}
          thumbColor="#FFFFFF"
        />
      </View>

      {note && (
        <Text style={[styles.cardNote, { color: colors.textSub }]}>{note}</Text>
      )}

      <View style={[styles.cardContent, !enabled && styles.contentDisabled]}>
        {showInterval ? (
          <>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Interval</Text>
              <View style={styles.settingValue}>
                <Text style={[styles.settingText, { color: colors.textSub }]}>{intervalText}</Text>
                <MaterialIcons name="edit" size={14} color={colors.textSub} />
              </View>
            </View>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Time</Text>
              <View style={styles.settingValue}>
                <Text style={[styles.settingText, { color: colors.textSub }]}>{time}</Text>
                <MaterialIcons name="edit" size={14} color={colors.textSub} />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Schedule</Text>
              <View style={styles.settingValue}>
                <Text style={[styles.settingText, { color: colors.textSub }]}>{schedule}</Text>
                <MaterialIcons name="edit" size={14} color={colors.textSub} />
              </View>
            </View>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Time</Text>
              <View style={styles.settingValue}>
                <Text style={[styles.settingText, { color: colors.textSub }]}>{time}</Text>
                <MaterialIcons name="edit" size={14} color={colors.textSub} />
              </View>
            </View>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Message</Text>
              <View style={styles.settingValue}>
                <Text
                  style={[styles.settingText, { color: colors.textSub }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {message}
                </Text>
                <MaterialIcons name="edit" size={14} color={colors.textSub} />
              </View>
            </View>
          </>
        )}
      </View>
    </Animated.View>
  );
}

export default function NotificationsScreen() {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [periodEnabled, setPeriodEnabled] = useState(true);
  const [fertileEnabled, setFertileEnabled] = useState(false);
  const [ovulationEnabled, setOvulationEnabled] = useState(false);
  const [padEnabled, setPadEnabled] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title Section */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.titleSection}>
          <MaterialIcons name="notifications" size={40} color={colors.text} />
          <Text style={[styles.title, { color: colors.text }]}>Set your reminder notification</Text>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            This reminder will help you feel prepared for your next cycle
          </Text>
        </Animated.View>

        {/* Reminder Cards */}
        <View style={styles.cardsContainer}>
          <ReminderCard
            title="Period reminders"
            enabled={periodEnabled}
            onToggle={setPeriodEnabled}
            schedule="1 day before"
            time="07:00 AM"
            message="Your period will start soon"
            delay={200}
          />

          <ReminderCard
            title="Fertile window reminders"
            enabled={fertileEnabled}
            onToggle={setFertileEnabled}
            schedule="1 day before"
            time="06:00 PM"
            message="You will be fertile soon"
            delay={300}
          />

          <ReminderCard
            title="Ovulation reminders"
            enabled={ovulationEnabled}
            onToggle={setOvulationEnabled}
            schedule="1 day before"
            time="06:00 PM"
            message="You will be ovulating soon"
            delay={400}
          />

          <ReminderCard
            title="Pad change reminders"
            enabled={padEnabled}
            onToggle={setPadEnabled}
            schedule=""
            time="08:00 AM - 10:00 PM"
            message=""
            showInterval
            intervalText="Every 4 hours"
            note="(This reminder works only when you are having your period.)"
            delay={500}
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
    overflow: 'hidden',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: typography.size.h3,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
    lineHeight: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  reminderCard: {
    borderRadius: BorderRadius.lg,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  cardDisabled: {
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: typography.size.caption,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  cardNote: {
    fontSize: 10,
    marginBottom: 12,
    marginTop: -8,
  },
  cardContent: {
    gap: 12,
  },
  contentDisabled: {
    opacity: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: typography.size.small,
    fontWeight: '500',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  settingText: {
    fontSize: typography.size.small,
    maxWidth: 130,
  },
});
