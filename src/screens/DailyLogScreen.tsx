import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {ScreenShell} from '../components/ScreenShell';
import {useTheme} from '../theme/ThemeContext';
import {BorderRadius, Spacing, typography} from '../theme/theme';

const sampleFields = ['Flow', 'Mood', 'Symptoms', 'Temperature', 'Weight', 'Notes'];

export function DailyLogScreen() {
  const {colors, accent} = useTheme();

  return (
    <ScreenShell
      title="Daily Log"
      subtitle="This modal is the first local-first write surface that will persist to WatermelonDB and sync in the background.">
      <View style={styles.grid}>
        {sampleFields.map(field => (
          <View key={field} style={[styles.pill, {backgroundColor: colors.background, borderColor: colors.border}]}> 
            <Text style={[styles.pillText, {color: colors.text}]}>{field}</Text>
          </View>
        ))}
      </View>
      <Pressable style={[styles.button, {backgroundColor: accent.primary}]}> 
        <Text style={styles.buttonText}>Local save flow coming next</Text>
      </Pressable>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  pillText: {
    fontSize: typography.size.caption,
    fontWeight: '600',
  },
  button: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '700',
  },
});
