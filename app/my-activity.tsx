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

type FilterTab = 'All' | 'Logging' | 'Settings' | 'Account';

const FILTER_TABS: FilterTab[] = ['All', 'Logging', 'Settings', 'Account'];

const ACTIVITIES = {
  TODAY: [
    {
      id: '1',
      icon: 'water-drop',
      iconColor: '#DB6C87',
      iconBg: '#FCE4EC',
      title: 'Logged Period Start',
      description: 'Recorded start of flow. Symptom: Cramps (Mild).',
      time: '10:42 AM',
      category: 'Logging',
    },
    {
      id: '2',
      icon: 'settings',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      title: 'Updated Reminder',
      description: 'Changed daily pill reminder to 8:00 AM.',
      time: '09:15 AM',
      category: 'Settings',
    },
  ],
  YESTERDAY: [
    {
      id: '3',
      icon: 'monitor-weight',
      iconColor: '#DB6C87',
      iconBg: '#FCE4EC',
      title: 'Weight Logged',
      description: 'Recorded weight: 62.5 kg.',
      time: '08:30 PM',
      category: 'Logging',
    },
    {
      id: '4',
      icon: 'lock-reset',
      iconColor: '#F97316',
      iconBg: '#FFEDD5',
      title: 'Password Changed',
      description: '',
      time: '02:15 PM',
      category: 'Account',
    },
  ],
};

export default function MyActivityScreen() {
  const { colors, isDark, accent } = useTheme();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filterActivities = (activities: typeof ACTIVITIES.TODAY) => {
    if (activeTab === 'All') return activities;
    return activities.filter(activity => activity.category === activeTab);
  };

  const filteredToday = filterActivities(ACTIVITIES.TODAY);
  const filteredYesterday = filterActivities(ACTIVITIES.YESTERDAY);

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Activity</Text>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <MaterialIcons name="tune" size={24} color={accent.primary} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.statsContainer}
        >
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <MaterialIcons name="event-note" size={18} color={accent.primary} />
              <Text style={[styles.statLabel, { color: colors.textSub }]}>ENTRIES</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>24</Text>
            <Text style={[styles.statChange, { color: accent.primary }]}>↗ +3 this week</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <View style={styles.statHeader}>
              <MaterialIcons name="update" size={18} color="#3B82F6" />
              <Text style={[styles.statLabel, { color: colors.textSub }]}>UPDATES</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
            <Text style={[styles.statSubtext, { color: colors.textSub }]}>Last 30 days</Text>
          </View>
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View 
          entering={FadeInDown.delay(150).springify()}
          style={styles.tabsContainer}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: accent.primary },
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                { color: activeTab === tab ? '#FFFFFF' : colors.text },
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Today Section */}
        {filteredToday.length > 0 && (
          <>
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <Text style={[styles.sectionTitle, { color: colors.textSub }]}>TODAY</Text>
            </Animated.View>

            {filteredToday.map((activity, index) => (
              <Animated.View 
                key={activity.id}
                entering={FadeInDown.delay(250 + index * 50).springify()}
              >
                <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
                  <View style={[styles.activityIcon, { backgroundColor: activity.iconBg }]}>
                    <MaterialIcons name={activity.icon as any} size={20} color={activity.iconColor} />
                  </View>
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <Text style={[styles.activityTitle, { color: colors.text }]}>
                        {activity.title}
                      </Text>
                      <Text style={[styles.activityTime, { color: colors.textSub }]}>
                        {activity.time}
                      </Text>
                    </View>
                    {activity.description && (
                      <Text style={[styles.activityDescription, { color: colors.textSub }]}>
                        {activity.description}
                      </Text>
                    )}
                  </View>
                </View>
              </Animated.View>
            ))}
          </>
        )}

        {/* Yesterday Section */}
        {filteredYesterday.length > 0 && (
          <>
            <Animated.View entering={FadeInDown.delay(350).springify()}>
              <Text style={[styles.sectionTitle, { color: colors.textSub }]}>YESTERDAY</Text>
            </Animated.View>

            {filteredYesterday.map((activity, index) => (
              <Animated.View 
                key={activity.id}
                entering={FadeInDown.delay(400 + index * 50).springify()}
              >
                <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
                  <View style={[styles.activityIcon, { backgroundColor: activity.iconBg }]}>
                    <MaterialIcons name={activity.icon as any} size={20} color={activity.iconColor} />
                  </View>
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <Text style={[styles.activityTitle, { color: colors.text }]}>
                        {activity.title}
                      </Text>
                      <Text style={[styles.activityTime, { color: colors.textSub }]}>
                        {activity.time}
                      </Text>
                    </View>
                    {activity.description && (
                      <Text style={[styles.activityDescription, { color: colors.textSub }]}>
                        {activity.description}
                      </Text>
                    )}
                  </View>
                </View>
              </Animated.View>
            ))}
          </>
        )}
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
  filterButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: typography.size.small - 1,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: typography.size.h2,
    fontWeight: '700',
    marginBottom: 4,
  },
  statChange: {
    fontSize: typography.size.small,
    fontWeight: '500',
  },
  statSubtext: {
    fontSize: typography.size.small,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  tabText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: typography.size.small,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  activityCard: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  activityTime: {
    fontSize: typography.size.small,
  },
  activityDescription: {
    fontSize: typography.size.small,
    lineHeight: 18,
  },
});
