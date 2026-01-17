import { BorderRadius, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { icon: 'groups', label: 'Community', badge: 1, route: '/community-settings' },
  { icon: 'history', label: 'Backup', badge: undefined, route: '/backup-data' },
  { icon: 'person-add', label: 'Manage added users', badge: undefined, route: '/manage-users' },
  { icon: 'lock', label: 'Password and Security', badge: undefined, route: '/password-security' },
  { icon: 'location-on', label: 'Location access', badge: undefined, route: '/location-access' },
  { icon: 'list-alt', label: 'My activity', badge: undefined, route: '/my-activity' },
] as const;

export default function PersonalInformationScreen() {
  const { colors, isDark, accent } = useTheme();

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Personal Information</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <TouchableOpacity 
            style={[styles.profileCard, { backgroundColor: colors.surface }]} 
            activeOpacity={0.7}
            onPress={() => router.push('/edit-profile')}
          >
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
                style={[styles.profileImage, { borderColor: accent.primaryLight }]}
              />
              <View style={styles.profileText}>
                <Text style={[styles.profileName, { color: colors.text }]} numberOfLines={1}>
                  Sreelakshmi S Raj
                </Text>
                <Text style={[styles.profileEmail, { color: colors.textSub }]} numberOfLines={1}>
                  sreelakshmi2001@gmail.com
                </Text>
                <Text style={[styles.profilePhone, { color: colors.textSub }]} numberOfLines={1}>
                  09656660656
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
          </TouchableOpacity>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.label} 
              entering={FadeInDown.delay(150 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={() => item.route && router.push(item.route as any)}
                activeOpacity={0.6}
              >
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name={item.icon as any} size={24} color={colors.textSub} />
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                </View>
                <View style={styles.menuItemRight}>
                  {item.badge && (
                    <View style={[styles.badge, { backgroundColor: accent.primary }]}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
                </View>
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
    paddingBottom: 100,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
  },
  profileText: {
    gap: 2,
    flex: 1,
  },
  profileName: {
    fontSize: typography.size.body + 1,
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: typography.size.small,
  },
  profilePhone: {
    fontSize: typography.size.small,
  },
  menuContainer: {
    marginTop: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuLabel: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
