import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
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

export default function PasswordSecurityScreen() {
  const { colors, isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Password & Security</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Security Hero */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.heroSection}
        >
          <View style={[styles.heroIconContainer, { backgroundColor: accent.primaryLight }]}>
            <MaterialIcons name="shield" size={48} color={accent.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>Protect your account</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSub }]}>
            Manage your security settings and{'\n'}connected devices.
          </Text>
        </Animated.View>

        {/* Change Password */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                <MaterialIcons name="lock-outline" size={22} color={colors.textSub} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Change password</Text>
                <Text style={[styles.settingDescription, { color: colors.textSub }]}>
                  Last changed 3 months ago
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
          </TouchableOpacity>
        </Animated.View>

        {/* Two-Factor Authentication */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                <MaterialIcons name="smartphone" size={22} color={colors.textSub} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Two-Factor Authentication</Text>
                <Text style={[styles.recommendedText, { color: accent.primary }]}>Recommended</Text>
              </View>
            </View>
            <View style={styles.settingRight}>
              <View style={[styles.statusBadge, { backgroundColor: colors.surface }]}>
                <Text style={[styles.statusBadgeText, { color: colors.textSub }]}>Off</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Activity & Devices Section */}
        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>ACTIVITY & DEVICES</Text>
        </Animated.View>

        {/* Recent Login Activity */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                <MaterialIcons name="history" size={22} color={colors.textSub} />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Recent login activity</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
          </TouchableOpacity>
        </Animated.View>

        {/* Connected Devices */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                <MaterialIcons name="devices" size={22} color={colors.textSub} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Connected devices</Text>
                <Text style={[styles.settingDescription, { color: colors.textSub }]}>
                  iPhone 13, MacBook Pro
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
          </TouchableOpacity>
        </Animated.View>

        {/* App Access Section */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>APP ACCESS</Text>
        </Animated.View>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  heroIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: typography.size.h3,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: typography.size.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: typography.size.small,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: typography.size.small,
    marginTop: 2,
  },
  recommendedText: {
    fontSize: typography.size.small,
    marginTop: 2,
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusBadgeText: {
    fontSize: typography.size.small,
    fontWeight: '500',
  },
});
