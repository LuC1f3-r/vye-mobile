import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BackupDataScreen() {
  const { colors, isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [automaticBackup, setAutomaticBackup] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Backup Data</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Status Card */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={[styles.statusCard, { backgroundColor: colors.surface }]}
        >
          <View style={[styles.statusIconContainer, { backgroundColor: accent.primaryLight }]}>
            <MaterialIcons name="cloud-done" size={40} color={accent.primary} />
          </View>
          <Text style={[styles.statusTitle, { color: colors.text }]}>Your data is safe</Text>
          <Text style={[styles.statusSubtitle, { color: colors.textSub }]}>
            Last backup: Today at 09:41 AM
          </Text>
          <Text style={[styles.statusSize, { color: colors.textSub }]}>Size: 4.2 MB</Text>

          <TouchableOpacity
            style={[styles.backupButton, { backgroundColor: accent.primary }]}
            activeOpacity={0.8}
          >
            <MaterialIcons name="cloud-upload" size={20} color="#FFFFFF" />
            <Text style={styles.backupButtonText}>Back Up Now</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Automatic Backup Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>AUTOMATIC BACKUP</Text>
        </Animated.View>

        {/* Automatic Backup Toggle */}
        <Animated.View
          entering={FadeInDown.delay(250).springify()}
          style={[styles.settingRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
        >
          <View style={styles.settingLeft}>
            <MaterialIcons name="sync" size={24} color={colors.textSub} />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Automatic Backup</Text>
              <Text style={[styles.settingDescription, { color: colors.textSub }]}>
                Regularly save your data
              </Text>
            </View>
          </View>
          <Switch
            value={automaticBackup}
            onValueChange={setAutomaticBackup}
            trackColor={{ false: colors.border, true: accent.primary }}
            thumbColor="#FFFFFF"
          />
        </Animated.View>

        {/* Frequency */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="schedule" size={24} color={colors.textSub} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Frequency</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.textSub }]}>Daily</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Backup Account */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <TouchableOpacity
            style={[styles.settingRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="cloud" size={24} color={colors.textSub} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Backup Account</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.textSub }]}>iCloud</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Wi-Fi Only Toggle */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={[styles.settingRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
        >
          <View style={styles.settingLeft}>
            <MaterialIcons name="wifi" size={24} color={colors.textSub} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Wi-Fi Only</Text>
          </View>
          <Switch
            value={wifiOnly}
            onValueChange={setWifiOnly}
            trackColor={{ false: colors.border, true: accent.primary }}
            thumbColor="#FFFFFF"
          />
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
  statusCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  statusIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  statusTitle: {
    fontSize: typography.size.body + 2,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: typography.size.small,
  },
  statusSize: {
    fontSize: typography.size.small,
    marginBottom: Spacing.lg,
  },
  backupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.xl * 2,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
  },
  backupButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
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
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: typography.size.body,
  },
});
