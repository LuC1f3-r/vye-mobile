import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <MaterialIcons name="settings" size={28} color={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Profile Section */}
        <TouchableOpacity
          style={styles.profileSection}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('PersonalInformation')}
        >
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={[styles.profileName, { color: colors.text }]} numberOfLines={1}>
                Sreelakshmi S Raj
              </Text>
              <Text style={[styles.profileSubtext, { color: colors.textSub }]} numberOfLines={1}>
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
            <MaterialIcons name="calendar-today" size={20} color={colors.text} />
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
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => {
                if (item.label === 'Notifications') {
                  navigation.navigate('NotificationSettings');
                } else if (item.label === 'Language') {
                  navigation.navigate('Language');
                } else if (item.label === 'Themes') {
                  navigation.navigate('Themes');
                } else if (item.label === 'Help and Feedback') {
                  navigation.navigate('HelpFeedback');
                } else if (item.label === 'Data Privacy') {
                  navigation.navigate('DataPrivacy');
                } else if (item.label === 'About Vye') {
                  navigation.navigate('About');
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
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: 4,
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

