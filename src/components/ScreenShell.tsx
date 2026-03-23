import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useTheme} from '../theme/ThemeContext';
import {BorderRadius, Spacing, typography} from '../theme/theme';

type ScreenShellProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

export function ScreenShell({title, subtitle, children}: ScreenShellProps) {
  const {colors, accent} = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}> 
      <View style={styles.header}>
        <Text style={[styles.eyebrow, {color: accent.primary}]}>Vye MVP</Text>
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.subtitle, {color: colors.textSub}]}>{subtitle}</Text>
      </View>
      <View style={[styles.card, {backgroundColor: colors.surface, borderColor: colors.border}]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  eyebrow: {
    fontSize: typography.size.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: typography.size.h1,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: typography.size.body,
    lineHeight: typography.lineHeight.body,
  },
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
});
