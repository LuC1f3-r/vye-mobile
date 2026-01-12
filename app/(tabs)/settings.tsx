import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BorderRadius, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';

const MENU_ITEMS = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'translate', label: 'Language' },
  { icon: 'widgets', label: 'Widgets' },
  { icon: 'palette', label: 'Themes' },
  { icon: 'rate-review', label: 'Help and Feedback' },
  { icon: 'verified-user', label: 'Data Privacy' },
  { icon: 'info', label: 'About Vye' },
] as const;

const GOALS = ['Track cycle', 'Track pregnancy', 'Get pregnant'];

export default function SettingsScreen() {
  const { colors, isDark, accent } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInUp.springify()} style={styles.header}>
          <MaterialIcons name="settings" size={28} color={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        </Animated.View>

        {/* Profile Section */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <TouchableOpacity style={styles.profileSection} activeOpacity={0.7}>
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
                style={styles.profileImage}
              />
              <View style={styles.profileText}>
                <Text style={[styles.profileName, { color: colors.text }]} numberOfLines={1}>
                  Rahaf Saad 
                </Text>
                <Text style={[styles.profileSubtext, { color: colors.textSub }]} numberOfLines={1}>
                  view personal information
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
          </TouchableOpacity>
        </Animated.View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Goals Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.goalsSection}>
          <View style={styles.goalsHeader}>
            <MaterialIcons name="calendar-month" size={20} color={colors.text} />
            <Text style={[styles.goalsLabel, { color: colors.text }]}>My Goal:</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.goalsContainer}
          >
            {GOALS.map((goal, index) => (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.goalPill,
                  index === 0
                    ? { backgroundColor: accent.primary }
                    : { backgroundColor: colors.surface },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.goalText,
                    { color: index === 0 ? '#FFFFFF' : colors.textSub },
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.label} 
              entering={FadeInDown.delay(300 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={() => {
                  if (item.label === 'Notifications') {
                    router.push('/notification-settings');
                  } else if (item.label === 'Language') {
                    router.push('/language');
                  } else if (item.label === 'Themes') {
                    router.push('/themes');
                  } else if (item.label === 'Help and Feedback') {
                    router.push('/help-feedback');
                  } else if (item.label === 'Data Privacy') {
                    router.push('/data-privacy');
                  } else if (item.label === 'About Vye') {
                    router.push('/about');
                  }
                }}
                activeOpacity={0.6}
              >
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name={item.icon as any} size={24} color={accent.primary} />
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
              </TouchableOpacity>
            </Animated.View>
          ))}
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
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: typography.size.h2,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  profileText: {
    gap: 2,
    flex: 1,
  },
  profileName: {
    fontSize: typography.size.body + 2,
    fontWeight: '600',
  },
  profileSubtext: {
    fontSize: typography.size.small,
  },
  divider: {
    height: 1,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  goalsSection: {
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  goalsLabel: {
    fontSize: typography.size.caption,
    fontWeight: '600',
  },
  goalsContainer: {
    gap: 12,
  },
  goalPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    marginRight: 12,
  },
  goalText: {
    fontSize: typography.size.small,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  menuLabel: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
});
