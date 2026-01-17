import { Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

export default function CommunitySettingsScreen() {
  const { colors, isDark, accent } = useTheme();
  const [anonymousMode, setAnonymousMode] = useState(false);

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Community</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Anonymous Mode */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={[styles.settingRow, { borderBottomColor: colors.border }]}
        >
          <View style={styles.settingLeft}>
            <MaterialIcons name="visibility-off" size={24} color={colors.textSub} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Anonymous mode</Text>
          </View>
          <Switch
            value={anonymousMode}
            onValueChange={setAnonymousMode}
            trackColor={{ false: colors.border, true: accent.primary }}
            thumbColor="#FFFFFF"
          />
        </Animated.View>

        {/* Following */}
        <Animated.View 
          entering={FadeInDown.delay(150).springify()}
        >
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: colors.border }]}
            activeOpacity={0.6}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="people-outline" size={24} color={colors.textSub} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Following</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
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
    paddingBottom: 40,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  settingLabel: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
});
