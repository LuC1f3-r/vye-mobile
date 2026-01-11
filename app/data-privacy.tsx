import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing, typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DataPrivacyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [anonymousAnalytics, setAnonymousAnalytics] = useState(true);
  const [scientificResearch, setScientificResearch] = useState(false);

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Data Privacy</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shield Icon */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.iconContainer}>
          <View style={styles.shieldIcon}>
            <MaterialIcons name="security" size={36} color="#FFFFFF" />
          </View>
        </Animated.View>

        <Animated.Text 
          entering={FadeInDown.delay(150).springify()}
          style={[styles.description, { color: colors.textSub }]}
        >
          Your health data is sensitive. We are committed to transparency and giving you full control over how your information is used.
        </Animated.Text>

        {/* Sharing Preferences */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={[styles.sectionLabel, { color: colors.textSub }]}>SHARING PREFERENCES</Text>
          
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Anonymous Analytics</Text>
              <Text style={[styles.settingDescription, { color: colors.textSub }]}>
                Share anonymous usage stats to help us improve app features and performance.
              </Text>
            </View>
            <Switch
              value={anonymousAnalytics}
              onValueChange={setAnonymousAnalytics}
              trackColor={{ false: colors.border, true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Scientific Research</Text>
              <Text style={[styles.settingDescription, { color: colors.textSub }]}>
                Contribute de-identified cycle data to global women's health studies.
              </Text>
            </View>
            <Switch
              value={scientificResearch}
              onValueChange={setScientificResearch}
              trackColor={{ false: colors.border, true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Animated.View>

        {/* Manage Data */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Text style={[styles.sectionLabel, { color: colors.textSub }]}>MANAGE DATA</Text>

          <TouchableOpacity 
            style={[styles.actionRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionText, { color: colors.text }]}>Download My Data</Text>
            <MaterialIcons name="file-download" size={24} color={colors.textSub} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.deleteText, { color: Colors.primary }]}>Delete Account & Data</Text>
            <MaterialIcons name="delete-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  shieldIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: typography.size.caption,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: typography.size.small,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  deleteText: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
