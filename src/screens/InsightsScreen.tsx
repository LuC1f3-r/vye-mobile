import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ScreenShell} from '../components/ScreenShell';
import {useTheme} from '../theme/ThemeContext';
import {BorderRadius, Spacing, typography} from '../theme/theme';

export function InsightsScreen() {
  const {colors, accent} = useTheme();

  return (
    <ScreenShell
      title="Insights"
      subtitle="Free users get summary text first. Premium users will unlock deeper charts and trends through RevenueCat.">
      <View style={[styles.block, {backgroundColor: colors.background, borderColor: colors.border}]}> 
        <Text style={[styles.label, {color: accent.primary}]}>Free insight</Text>
        <Text style={[styles.value, {color: colors.text}]}>Your average cycle is usually 28 days.</Text>
      </View>
      <View style={[styles.block, {backgroundColor: colors.background, borderColor: colors.border}]}> 
        <Text style={[styles.label, {color: accent.primary}]}>Premium chart</Text>
        <Text style={[styles.value, {color: colors.text}]}>Cycle history and symptom trends will live here.</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  block: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  label: {
    fontSize: typography.size.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: typography.size.body,
    lineHeight: typography.lineHeight.body,
  },
});
