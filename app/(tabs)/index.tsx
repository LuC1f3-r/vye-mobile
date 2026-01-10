import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Calendar data for January 2024
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CALENDAR_DATA = [
  { day: null }, { day: 1 }, { day: 2 }, { day: 3, isToday: true }, { day: 4 }, { day: 5 }, { day: 6 },
  { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 },
  { day: 12, isPeriod: true }, { day: 13, isPeriod: true },
  { day: 14, isPeriod: true }, { day: 15, isPeriod: true }, { day: 16, isPeriod: true },
  { day: 17 }, { day: 18 }, { day: 19 },
  { day: 20, isFertile: true }, { day: 21, isFertile: true }, { day: 22, isFertile: true },
  { day: 23, isFertile: true }, { day: 24, isFertile: true },
  { day: 25, isOvulation: true },
  { day: 26, isFertile: true },
  { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
];

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentMonth] = useState('January, 2024');

  const renderCalendarDay = (item: typeof CALENDAR_DATA[0], index: number) => {
    if (item.day === null) {
      return <View key={index} style={styles.dayCell} />;
    }

    let backgroundColor = 'transparent';
    let textColor = colors.text;
    let showRing = false;
    let ringColor = Colors.primary;

    if (item.isPeriod) {
      backgroundColor = Colors.primary;
      textColor = '#FFFFFF';
    } else if (item.isOvulation) {
      backgroundColor = Colors.secondary;
      textColor = '#FFFFFF';
    } else if (item.isFertile) {
      backgroundColor = Colors.primaryLight;
      textColor = Colors.primary;
    } else if (item.isToday) {
      showRing = true;
    }

    return (
      <View key={index} style={styles.dayCell}>
        {item.isFertile && !item.isOvulation && (
          <View style={[styles.fertileBackground, { backgroundColor: Colors.primaryLight }]} />
        )}
        {item.isPeriod && (
          <View style={[styles.fertileBackground, { backgroundColor: Colors.primaryLight, opacity: 0.4 }]} />
        )}
        <View
          style={[
            styles.dayCircle,
            backgroundColor !== 'transparent' && { backgroundColor },
            showRing && { borderWidth: 1, borderColor: colors.textSub },
          ]}
        >
          <Text style={[styles.dayText, { color: textColor }]}>{item.day}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={[styles.profileButton, { backgroundColor: colors.surface }]}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.profileImage}
            />
            <Text style={[styles.profileName, { color: colors.text }]}>Sreelakshmi S Raj</Text>
            <MaterialIcons name="expand-more" size={20} color={colors.textSub} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/notifications')}
          >
            <MaterialIcons name="notifications-none" size={24} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Calendar Card */}
        <View style={[styles.calendarCard, { backgroundColor: colors.surface }]}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.navButton}>
              <MaterialIcons name="chevron-left" size={24} color={colors.textSub} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: colors.text }]}>{currentMonth}</Text>
            <TouchableOpacity style={styles.navButton}>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </TouchableOpacity>
          </View>

          {/* Day names */}
          <View style={styles.dayNamesRow}>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayNameCell}>
                <Text style={[styles.dayNameText, { color: colors.textSub }]}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {CALENDAR_DATA.map((item, index) => renderCalendarDay(item, index))}
          </View>

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
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, { borderWidth: 1, borderColor: colors.textSub }]} />
                <Text style={[styles.legendText, { color: colors.textSub }]}>Today</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, { backgroundColor: Colors.primaryLight }]} />
                <Text style={[styles.legendText, { color: colors.textSub }]}>Fertile</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, { backgroundColor: Colors.primary }]} />
                <Text style={[styles.legendText, { color: colors.textSub }]}>Period</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, { backgroundColor: Colors.secondary }]} />
                <Text style={[styles.legendText, { color: colors.textSub }]}>Ovulation</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Cards */}
        <View style={styles.actionCardsRow}>
          {/* Feeling Card */}
          <TouchableOpacity
            style={[styles.feelingCard, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/add-state')}
          >
            <Text style={[styles.feelingTitle, { color: Colors.primary }]}>
              How are you{'\n'}feeling today?
            </Text>
            <View style={styles.feelingButtonContainer}>
              <View style={[styles.addButton, { backgroundColor: colors.background }]}>
                <MaterialIcons name="add" size={24} color={colors.textSub} />
              </View>
              <Text style={[styles.addStateText, { color: colors.textSub }]}>Add state</Text>
            </View>
          </TouchableOpacity>

          {/* Right column cards */}
          <View style={styles.rightCardsColumn}>
            <TouchableOpacity
              style={[styles.miniCard, { backgroundColor: colors.surface }]}
              onPress={() => router.push('/records')}
            >
              <View style={styles.miniCardHeader}>
                <Text style={[styles.miniCardTitle, { color: Colors.primary }]}>View Records</Text>
                <MaterialIcons name="analytics" size={16} color={Colors.primary} />
              </View>
              <Text style={[styles.miniCardDesc, { color: colors.textSub }]}>
                Know how your past cycles went and the challenges you faced.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.miniCard, { backgroundColor: colors.surface }]}>
              <View style={styles.miniCardHeader}>
                <Text style={[styles.miniCardTitle, { color: Colors.primary }]}>Edit your cycle</Text>
                <MaterialIcons name="edit-calendar" size={16} color={Colors.primary} />
              </View>
              <Text style={[styles.miniCardDesc, { color: colors.textSub }]}>
                You can always edit the first day of your last period.
              </Text>
            </TouchableOpacity>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  calendarCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fertileBackground: {
    position: 'absolute',
    top: '25%',
    bottom: '25%',
    left: 0,
    right: 0,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 24,
    paddingHorizontal: 4,
  },
  daysUntil: {},
  daysRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  daysNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  daysLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  daysSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    maxWidth: 140,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 10,
  },
  actionCardsRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    gap: 12,
  },
  feelingCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: 16,
    height: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  feelingTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  feelingButtonContainer: {
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addStateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightCardsColumn: {
    flex: 1,
    gap: 12,
  },
  miniCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  miniCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  miniCardTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  miniCardDesc: {
    fontSize: 9,
    lineHeight: 12,
  },
});
