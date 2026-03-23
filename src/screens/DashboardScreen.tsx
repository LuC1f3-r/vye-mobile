import { BorderRadius, Colors, Spacing } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Easing,
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_HORIZONTAL_MARGIN = Spacing.md;
const CALENDAR_PADDING = 20;
const CALENDAR_WIDTH = SCREEN_WIDTH - (CARD_HORIZONTAL_MARGIN * 2);
const CALENDAR_INNER_WIDTH = CALENDAR_WIDTH - (CALENDAR_PADDING * 2);
const DAY_CELL_SIZE = Math.floor(CALENDAR_INNER_WIDTH / 7);

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateCalendarRows = (year: number, month: number): (number | null)[][] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const rows: (number | null)[][] = [];
  let currentRow: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    currentRow.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentRow.push(day);

    if (currentRow.length === 7) {
      rows.push(currentRow);
      currentRow = [];
    }
  }

  while (currentRow.length > 0 && currentRow.length < 7) {
    currentRow.push(null);
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

const PERIOD_DAYS = [12, 13, 14, 15, 16];
const FERTILE_DAYS = [20, 21, 22, 23, 24, 25, 26];
const OVULATION_DAY = 25;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AnimatedCardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  delay?: number;
};

function AnimatedCard({ children, onPress, style, delay = 0 }: AnimatedCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(delay).springify()}
      style={[style, animatedStyle]}
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      {children}
    </AnimatedPressable>
  );
}

export default function HomeScreen() {
  const { colors, isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const blinkOpacity = useSharedValue(1);

  useEffect(() => {
    blinkOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(blinkOpacity);
    };
  }, []);

  const todayBorderStyle = useAnimatedStyle(() => ({
    borderWidth: 2,
    borderColor: `rgba(219, 108, 135, ${blinkOpacity.value})`,
  }));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const currentMonth = `${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;

  const goToPreviousMonth = () => {
    setSlideDirection('left');
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setSlideDirection('right');
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  const todayDay = isCurrentMonth ? today.getDate() : -1;

  const calendarRows = generateCalendarRows(currentDate.getFullYear(), currentDate.getMonth());

  const getDayStyle = (day: number | null) => {
    if (day === null) return { type: 'empty' };

    if (day === OVULATION_DAY) return { type: 'ovulation' };
    if (PERIOD_DAYS.includes(day)) return { type: 'period' };
    if (FERTILE_DAYS.includes(day)) return { type: 'fertile' };
    if (day === todayDay) return { type: 'today' };
    return { type: 'normal' };
  };

  const isInFertileBand = (day: number | null) => {
    return day !== null && FERTILE_DAYS.includes(day);
  };

  const isInPeriodBand = (day: number | null) => {
    return day !== null && PERIOD_DAYS.includes(day);
  };

  const renderCalendarRow = (row: (number | null)[], rowIndex: number) => {
    return (
      <View key={rowIndex} style={styles.calendarRow}>
        {row.map((day, colIndex) => {
          const dayStyle = getDayStyle(day);
          const inFertile = isInFertileBand(day);
          const inPeriod = isInPeriodBand(day);
          const isToday = dayStyle.type === 'today';

          const prevDay = colIndex > 0 ? row[colIndex - 1] : null;
          const nextDay = colIndex < 6 ? row[colIndex + 1] : null;
          const prevInFertile = isInFertileBand(prevDay);
          const nextInFertile = isInFertileBand(nextDay);
          const prevInPeriod = isInPeriodBand(prevDay);
          const nextInPeriod = isInPeriodBand(nextDay);

          const isFirstInBand = (inFertile && !prevInFertile) || (inPeriod && !prevInPeriod);
          const isLastInBand = (inFertile && !nextInFertile) || (inPeriod && !nextInPeriod);

          return (
            <View key={colIndex} style={styles.dayCell}>
              {(inFertile || inPeriod) && (
                <View
                  style={[
                    styles.bandBackground,
                    { backgroundColor: inPeriod ? 'rgba(219, 108, 135, 0.2)' : accent.primaryLight },
                    isFirstInBand && styles.bandFirst,
                    isLastInBand && styles.bandLast,
                  ]}
                />
              )}

              <Animated.View
                style={[
                  styles.dayCircle,
                  dayStyle.type === 'period' && { backgroundColor: accent.primary },
                  dayStyle.type === 'ovulation' && { backgroundColor: Colors.secondary },
                  isToday && todayBorderStyle,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: colors.text },
                    dayStyle.type === 'period' && { color: '#FFFFFF', fontWeight: '600' },
                    dayStyle.type === 'ovulation' && { color: '#FFFFFF', fontWeight: '600' },
                    dayStyle.type === 'fertile' && { color: accent.primary },
                    isToday && { fontWeight: '700', color: accent.primary },
                  ]}
                >
                  {day}
                </Text>
              </Animated.View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.profileImage}
            />
            <Text
              style={[styles.profileName, { color: colors.text }]}
              numberOfLines={1}
            >
              Angela
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="notifications-none" size={26} color={accent.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Calendar Card */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={[styles.calendarCard, { backgroundColor: colors.surface }]}
        >
          {/* Month Navigation */}
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.navButton} activeOpacity={0.6} onPress={goToPreviousMonth}>
              <MaterialIcons name="chevron-left" size={28} color={colors.textSub} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: colors.text }]}>{currentMonth}</Text>
            <TouchableOpacity style={styles.navButton} activeOpacity={0.6} onPress={goToNextMonth}>
              <MaterialIcons name="chevron-right" size={28} color={colors.textSub} />
            </TouchableOpacity>
          </View>

          {/* Day names */}
          <View style={styles.dayNamesRow}>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayCell}>
                <Text style={[styles.dayNameText, { color: colors.textSub }]}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar grid */}
          <Animated.View
            key={currentMonth}
            entering={slideDirection === 'right' ? FadeInRight.duration(250) : FadeInLeft.duration(250)}
            style={styles.calendarGrid}
          >
            {calendarRows.map((row: (number | null)[], index: number) => renderCalendarRow(row, index))}
          </Animated.View>

          {/* Days until period + Legend */}
          <View style={styles.calendarFooter}>
            <View style={styles.daysUntil}>
              <View style={styles.daysRow}>
                <Text style={[styles.daysNumber, { color: colors.text }]}>8</Text>
                <Text style={[styles.daysLabel, { color: colors.text }]}> Days</Text>
              </View>
              <Text style={[styles.daysSubtitle, { color: colors.textSub }]}>left for your period</Text>
            </View>
            <View style={styles.legend}>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendBox, { borderWidth: 2, borderColor: colors.text }]} />
                  <Text style={[styles.legendText, { color: colors.textSub }]}>Today</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: accent.primaryLight }]} />
                  <Text style={[styles.legendText, { color: colors.textSub }]}>Fertile</Text>
                </View>
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: accent.primary }]} />
                  <Text style={[styles.legendText, { color: colors.textSub }]}>Period</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: Colors.secondary }]} />
                  <Text style={[styles.legendText, { color: colors.textSub }]}>Ovulation</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Cards */}
        <View style={styles.actionCardsRow}>
          {/* Feeling Card */}
          <AnimatedCard
            style={[styles.feelingCard, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('AddState')}
            delay={300}
          >
            <Text style={[styles.feelingTitle, { color: accent.primary }]}>
              How are you{'\n'}feeling today?
            </Text>
            <View style={styles.feelingButtonContainer}>
              <View style={[styles.addButton, { backgroundColor: colors.background }]}>
                <MaterialIcons name="add" size={28} color={accent.primary} />
              </View>
            </View>
          </AnimatedCard>

          {/* Right column cards */}
          <View style={styles.rightCardsColumn}>
            <AnimatedCard
              style={[styles.miniCard, { backgroundColor: colors.surface }]}
              onPress={() => navigation.navigate('Records')}
              delay={400}
            >
              <View style={styles.miniCardHeader}>
                <Text style={[styles.miniCardTitle, { color: accent.primary }]}>View Records</Text>
                <MaterialIcons name="analytics" size={18} color={accent.primary} />
              </View>
              <Text style={[styles.miniCardDesc, { color: colors.textSub }]} numberOfLines={2}>
                Know how your past cycles went and the challenges you faced.
              </Text>
            </AnimatedCard>

            <AnimatedCard
              style={[styles.miniCard, { backgroundColor: colors.surface }]}
              delay={500}
            >
              <View style={styles.miniCardHeader}>
                <Text style={[styles.miniCardTitle, { color: accent.primary }]}>Edit your cycle</Text>
                <MaterialIcons name="edit-calendar" size={18} color={accent.primary} />
              </View>
              <Text style={[styles.miniCardDesc, { color: colors.textSub }]} numberOfLines={2}>
                You can always edit the first day of your last period.
              </Text>
            </AnimatedCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_HORIZONTAL_MARGIN,
    paddingVertical: Spacing.md,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 4,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  calendarCard: {
    marginHorizontal: CARD_HORIZONTAL_MARGIN,
    borderRadius: BorderRadius.xl,
    padding: CALENDAR_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calendarGrid: {
    marginBottom: 20,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayCell: {
    width: DAY_CELL_SIZE,
    height: DAY_CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bandBackground: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 0,
    right: 0,
  },
  bandFirst: {
    left: 6,
    borderTopLeftRadius: DAY_CELL_SIZE / 2,
    borderBottomLeftRadius: DAY_CELL_SIZE / 2,
  },
  bandLast: {
    right: 6,
    borderTopRightRadius: DAY_CELL_SIZE / 2,
    borderBottomRightRadius: DAY_CELL_SIZE / 2,
  },
  dayCircle: {
    width: DAY_CELL_SIZE - 12,
    height: DAY_CELL_SIZE - 12,
    borderRadius: (DAY_CELL_SIZE - 12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
  },
  dayNameText: {
    fontSize: 13,
    fontWeight: '500',
  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  daysUntil: {
    flex: 1,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  daysNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  daysLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  daysSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  legend: {
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 75,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '500',
  },
  actionCardsRow: {
    flexDirection: 'row',
    marginHorizontal: CARD_HORIZONTAL_MARGIN,
    marginTop: Spacing.md,
    gap: 12,
  },
  feelingCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: 16,
    minHeight: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  feelingTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  feelingButtonContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightCardsColumn: {
    flex: 1,
    gap: 12,
  },
  miniCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: 14,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  miniCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  miniCardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  miniCardDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
});
