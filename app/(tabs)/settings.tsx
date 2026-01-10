import React from 'react';
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

const MENU_ITEMS = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'translate', label: 'Language' },
  { icon: 'widgets', label: 'Widgets' },
  { icon: 'palette', label: 'Themes' },
  { icon: 'rate-review', label: 'Help and Feedback' },
  { icon: 'verified-user', label: 'Data Privacy' },
  { icon: 'info', label: 'About Lily' },
] as const;

const GOALS = ['Track cycle', 'Track pregnancy', 'Get pregnant'];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="settings" size={28} color={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={[styles.profileName, { color: colors.text }]}>Sreelekshmi S Raj</Text>
              <Text style={[styles.profileSubtext, { color: colors.textSub }]}>
                view personal information
              </Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Goals Section */}
        <View style={styles.goalsSection}>
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
                    ? { backgroundColor: Colors.primary }
                    : { backgroundColor: colors.surface },
                ]}
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
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => {
                if (item.label === 'Notifications') {
                  router.push('/notifications');
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <MaterialIcons name={item.icon as any} size={24} color={colors.text} />
                <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    fontSize: 24,
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
    gap: 16,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileText: {
    gap: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileSubtext: {
    fontSize: 12,
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
    fontSize: 14,
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
    fontSize: 12,
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
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
