import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CELL_SIZE = (SCREEN_WIDTH - Spacing.lg * 2 - 48) / 7;

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function OnboardingLastPeriodScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleNext = () => {
    navigation.navigate('OnboardingCycleLength');
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <View key={`prev-${day}`} style={styles.dayCell}>
          <Text style={[styles.dayText, { color: colors.textSub, opacity: 0.4 }]}>{day}</Text>
        </View>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const isToday = day === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isSelected && [styles.selectedDay, { backgroundColor: Colors.primaryLight }],
          ]}
          onPress={() => setSelectedDate(day)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dayText,
              { color: colors.text },
              isSelected && { color: accent.primary, fontWeight: '600' },
            ]}
          >
            {day.toString().padStart(2, '0')}
          </Text>
        </TouchableOpacity>
      );
    }

    // Next month days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <View key={`next-${day}`} style={styles.dayCell}>
          <Text style={[styles.dayText, { color: colors.textSub, opacity: 0.4 }]}>{day}</Text>
        </View>
      );
    }

    return days;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
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

      {/* Title */}
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          When did your last period start?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSub }]}>
          This can be used to predict your next period.
        </Text>
      </Animated.View>

      {/* Calendar */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={[styles.calendarContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton} activeOpacity={0.7}>
            <MaterialIcons name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.text }]}>
            {MONTHS[currentMonth]}, {currentYear}
          </Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.navButton} activeOpacity={0.7}>
            <MaterialIcons name="chevron-right" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdaysRow}>
          {WEEKDAYS.map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <Text style={[styles.weekdayText, { color: colors.textSub }]}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysGrid}>
          {renderCalendarDays()}
        </View>
      </Animated.View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Next Button */}
      <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: accent.primary },
            !selectedDate && { opacity: 0.6 }
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!selectedDate}
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
  titleContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.caption,
    textAlign: 'center',
  },
  calendarContainer: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.md,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  weekdayText: {
    fontSize: typography.size.small,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    borderRadius: 100,
  },
  dayText: {
    fontSize: typography.size.caption,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  nextButton: {
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
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
