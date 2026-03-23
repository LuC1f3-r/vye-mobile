import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ScreenShell} from '../components/ScreenShell';
import {useTheme} from '../theme/ThemeContext';
import {BorderRadius, Spacing, typography} from '../theme/theme';

const sampleCards = [
  {title: 'Understanding your cycle', type: 'Article', premium: false},
  {title: 'Hormones and energy patterns', type: 'Video', premium: true},
];

export function ContentScreen() {
  const {colors, accent} = useTheme();

  return (
    <ScreenShell
      title="Content"
      subtitle="This tab will consume backend content metadata and request protected media URLs for premium playback.">
      {sampleCards.map(card => (
        <View key={card.title} style={[styles.card, {backgroundColor: colors.background, borderColor: colors.border}]}> 
          <Text style={[styles.type, {color: accent.primary}]}>{card.type}</Text>
          <Text style={[styles.title, {color: colors.text}]}>{card.title}</Text>
          <Text style={[styles.access, {color: colors.textSub}]}>
            {card.premium ? 'Premium locked' : 'Free to read'}
          </Text>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  type: {
    fontSize: typography.size.small,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: typography.size.body,
    fontWeight: '700',
  },
  access: {
    fontSize: typography.size.caption,
  },
});
