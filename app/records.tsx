import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Sample cycle data
const CYCLES = [
  { dateRange: 'Mar 5 - Now', periodDays: 5, cycleDays: 18, current: true },
  { dateRange: 'Feb 8 - Mar 4', periodDays: 5, cycleDays: 28, current: false },
  { dateRange: 'Jan 12 - Feb 7', periodDays: 5, cycleDays: 29, current: false },
];

const TIMELINE_ENTRIES = [
  {
    date: '03 Jan 2024',
    daysUntil: 8,
    weight: '60 kg',
    temp: '32°C',
    emotion: 'Happy',
    emotionIcon: 'sentiment-satisfied',
    symptoms: '-',
    energy: 'High',
    energyIcon: 'bolt',
    sleep: '6-9 hrs',
    activity: '-',
  },
  {
    date: '02 Jan 2024',
    daysUntil: 9,
    weight: '60 kg',
    temp: '34°C',
    emotion: 'Stressed',
    emotionIcon: 'sentiment-stressed',
    symptoms: 'Headache',
    symptomsIcon: 'sick',
    energy: 'Low',
    energyIcon: 'battery-low',
    sleep: '3-6 hrs',
    activity: '-',
  },
  {
    date: '01 Jan 2024',
    daysUntil: 10,
    weight: '61 kg',
    temp: '34°C',
    emotion: '-',
    symptoms: '-',
    energy: '-',
    sleep: '-',
    activity: '-',
  },
];

function CycleBar({ current }: { current: boolean }) {
  return (
    <View style={styles.cycleBarContainer}>
      {Array.from({ length: 28 }).map((_, i) => {
        let color = Colors[current ? 'light' : 'light'].border;
        let height = 16;

        if (i < 5) {
          color = Colors.primary;
          height = i < 4 ? 32 : 24;
        } else if (i >= 9 && i <= 12) {
          color = Colors.primaryLight;
          height = 20;
        } else if (i === 13) {
          color = Colors.secondary;
          height = 24;
        }

        return (
          <View
            key={i}
            style={[
              styles.cycleBarSegment,
              { backgroundColor: color, height },
            ]}
          />
        );
      })}
    </View>
  );
}

function CyclesView() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.tabContent}>
      {/* Average Stats Card */}
      <View style={[styles.statsCard, { backgroundColor: colors.surface }]}>
        <View style={[styles.statColumn, { borderRightWidth: 1, borderRightColor: colors.border }]}>
          <Text style={[styles.statLabel, { color: colors.textSub }]}>Average cycle</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>28 Days</Text>
          <View style={styles.normalBadge}>
            <MaterialIcons name="check-circle" size={14} color={Colors.success} />
            <Text style={styles.normalText}>Normal</Text>
          </View>
        </View>
        <View style={styles.statColumn}>
          <Text style={[styles.statLabel, { color: colors.textSub }]}>Average period</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>5 Days</Text>
          <View style={styles.normalBadge}>
            <MaterialIcons name="check-circle" size={14} color={Colors.success} />
            <Text style={styles.normalText}>Normal</Text>
          </View>
        </View>
      </View>

      {/* Cycle History Header */}
      <View style={styles.historyHeader}>
        <Text style={[styles.historyTitle, { color: colors.text }]}>Cycle history</Text>
        <TouchableOpacity style={[styles.shareButton, { borderColor: colors.border }]}>
          <Text style={[styles.shareText, { color: colors.text }]}>Share Report</Text>
          <MaterialIcons name="ios-share" size={14} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
          <Text style={[styles.legendText, { color: colors.textSub }]}>Period phase</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primaryLight }]} />
          <Text style={[styles.legendText, { color: colors.textSub }]}>Fertile window</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.secondary }]} />
          <Text style={[styles.legendText, { color: colors.textSub }]}>Ovulation phase</Text>
        </View>
      </View>

      {/* Cycle Cards */}
      {CYCLES.map((cycle, index) => (
        <View key={index} style={[styles.cycleCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cycleDateRange, { color: colors.text }]}>{cycle.dateRange}</Text>
          <CycleBar current={cycle.current} />
          <View style={styles.cycleStats}>
            <View style={styles.cycleStat}>
              <Text style={[styles.cycleStatText, { color: colors.textSub }]}>
                Period - {cycle.periodDays} days
              </Text>
              <MaterialIcons name="check-circle" size={12} color={Colors.success} />
              <Text style={styles.cycleStatNormal}>Normal</Text>
            </View>
            <View style={styles.cycleStat}>
              <Text style={[styles.cycleStatText, { color: colors.textSub }]}>
                Cycle - {cycle.cycleDays} days
              </Text>
              <MaterialIcons name="check-circle" size={12} color={Colors.success} />
              <Text style={styles.cycleStatNormal}>Normal</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function TimelineView() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.tabContent}>
      <View style={styles.timelineHeader}>
        <Text style={[styles.timelineTitle, { color: colors.text }]}>Timeline</Text>
        <TouchableOpacity style={[styles.shareButton, { borderColor: colors.border }]}>
          <Text style={[styles.shareText, { color: colors.text }]}>Share Report</Text>
          <MaterialIcons name="ios-share" size={14} color={colors.text} />
        </TouchableOpacity>
      </View>

      {TIMELINE_ENTRIES.map((entry, index) => (
        <View key={index} style={[styles.timelineCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.timelineCardHeader, { borderBottomColor: colors.border }]}>
            <View>
              <Text style={[styles.timelineDate, { color: Colors.primary }]}>{entry.date}</Text>
              <Text style={[styles.timelineDaysUntil, { color: colors.textSub }]}>
                {entry.daysUntil} Days until next period
              </Text>
            </View>
            <View style={styles.timelineMetrics}>
              <View style={styles.metric}>
                <MaterialIcons name="monitor-weight" size={14} color={colors.textSub} />
                <Text style={[styles.metricText, { color: colors.textSub }]}>{entry.weight}</Text>
              </View>
              <View style={styles.metric}>
                <MaterialIcons name="thermostat" size={14} color={colors.textSub} />
                <Text style={[styles.metricText, { color: colors.textSub }]}>{entry.temp}</Text>
              </View>
            </View>
          </View>

          <View style={styles.timelineGrid}>
            <View style={styles.timelineGridItem}>
              <MaterialIcons
                name={entry.emotion !== '-' ? 'sentiment-satisfied' : 'sentiment-neutral'}
                size={24}
                color={entry.emotion !== '-' ? Colors.primary : colors.textSub}
              />
              <Text style={[styles.gridLabel, { color: colors.textSub }]}>Emotions</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{entry.emotion}</Text>
            </View>
            <View style={styles.timelineGridItem}>
              <MaterialIcons
                name="healing"
                size={24}
                color={entry.symptoms !== '-' ? Colors.primary : colors.textSub}
              />
              <Text style={[styles.gridLabel, { color: colors.textSub }]}>Symptoms</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{entry.symptoms}</Text>
            </View>
            <View style={styles.timelineGridItem}>
              <MaterialIcons
                name="bolt"
                size={24}
                color={entry.energy !== '-' ? Colors.primary : colors.textSub}
              />
              <Text style={[styles.gridLabel, { color: colors.textSub }]}>Energy</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{entry.energy}</Text>
            </View>
            <View style={styles.timelineGridItem}>
              <MaterialIcons
                name="bedtime"
                size={24}
                color={entry.sleep !== '-' ? Colors.primary : colors.textSub}
              />
              <Text style={[styles.gridLabel, { color: colors.textSub }]}>Sleep</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{entry.sleep}</Text>
            </View>
            <View style={styles.timelineGridItem}>
              <MaterialIcons name="favorite" size={24} color={colors.textSub} />
              <Text style={[styles.gridLabel, { color: colors.textSub }]}>Sexual Act.</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{entry.activity}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function RecordsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'cycles' | 'timeline'>('cycles');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'cycles' && styles.activeTab]}
          onPress={() => setActiveTab('cycles')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'cycles' ? Colors.primary : colors.textSub },
            ]}
          >
            Cycles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'timeline' && styles.activeTab]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'timeline' ? Colors.primary : colors.textSub },
            ]}
          >
            Timeline
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'cycles' ? <CyclesView /> : <TimelineView />}
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.lg,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 40,
  },
  tabContent: {
    gap: 16,
  },
  statsCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statColumn: {
    flex: 1,
    gap: 4,
    paddingRight: 16,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  normalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  normalText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  shareText: {
    fontSize: 12,
    fontWeight: '500',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
  },
  cycleCard: {
    borderRadius: BorderRadius.lg,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cycleDateRange: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  cycleBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 32,
    gap: 2,
    marginBottom: 12,
  },
  cycleBarSegment: {
    flex: 1,
    borderRadius: 2,
  },
  cycleStats: {
    flexDirection: 'row',
    gap: 16,
  },
  cycleStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cycleStatText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cycleStatNormal: {
    fontSize: 10,
    color: Colors.success,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  timelineCard: {
    borderRadius: BorderRadius.lg,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  timelineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  timelineDate: {
    fontSize: 18,
    fontWeight: '600',
  },
  timelineDaysUntil: {
    fontSize: 12,
    marginTop: 4,
  },
  timelineMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timelineGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineGridItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '500',
  },
});
