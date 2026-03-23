import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme, AccentColorKey } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - 12) / 2; // 2 cards with gap

const ACCENT_COLORS = [
  { id: 'pink' as AccentColorKey, name: 'Default', description: 'Default', color: Colors.primary },
  { id: 'lavender' as AccentColorKey, name: 'Lavender', description: 'Calm', color: '#A78BFA' },
  { id: 'mint' as AccentColorKey, name: 'Mint', description: 'Fresh', color: '#10B981' },
  { id: 'ocean' as AccentColorKey, name: 'Ocean', description: 'Deep', color: '#3B82F6' },
  { id: 'sunset' as AccentColorKey, name: 'Sunset', description: 'Warm', color: '#F97316' },
  { id: 'custom' as AccentColorKey, name: 'Custom', description: 'Pro', color: '#A855F7', isCustom: true },
];

export default function ThemesScreen() {
  const { appearance, setAppearance, accentColor, setAccentColor, isDark, colors } = useTheme();
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Themes</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Appearance Section */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>

          <View style={styles.appearanceRow}>
            {/* Light */}
            <TouchableOpacity
              style={[
                styles.appearanceCard,
                { backgroundColor: colors.surface, borderColor: appearance === 'light' ? Colors.primary : colors.border },
              ]}
              onPress={() => setAppearance('light')}
              activeOpacity={0.7}
            >
              <View style={styles.lightPreview}>
                <View style={[styles.previewBar, { backgroundColor: '#E5E7EB' }]} />
                <View style={[styles.previewBar, styles.previewBarShort, { backgroundColor: '#E5E7EB' }]} />
                <View style={[styles.previewBar, styles.previewBarMedium, { backgroundColor: '#E5E7EB' }]} />
              </View>
              <Text style={[styles.appearanceLabel, { color: appearance === 'light' ? Colors.primary : colors.text }]}>Light</Text>
            </TouchableOpacity>

            {/* Dark */}
            <TouchableOpacity
              style={[
                styles.appearanceCard,
                { backgroundColor: colors.surface, borderColor: appearance === 'dark' ? Colors.primary : colors.border },
              ]}
              onPress={() => setAppearance('dark')}
              activeOpacity={0.7}
            >
              <View style={[styles.darkPreview, { backgroundColor: '#1F2937' }]}>
                <View style={[styles.previewBar, { backgroundColor: '#374151' }]} />
                <View style={[styles.previewBar, styles.previewBarShort, { backgroundColor: '#374151' }]} />
                <View style={[styles.previewBar, styles.previewBarMedium, { backgroundColor: '#374151' }]} />
              </View>
              <Text style={[styles.appearanceLabel, { color: appearance === 'dark' ? Colors.primary : colors.text }]}>Dark</Text>
            </TouchableOpacity>

            {/* System */}
            <TouchableOpacity
              style={[
                styles.appearanceCard,
                { backgroundColor: colors.surface, borderColor: appearance === 'system' ? Colors.primary : colors.border },
              ]}
              onPress={() => setAppearance('system')}
              activeOpacity={0.7}
            >
              <View style={styles.systemPreview}>
                <Text style={[styles.systemText, { color: colors.textSub }]}>A</Text>
              </View>
              <Text style={[styles.appearanceLabel, { color: appearance === 'system' ? Colors.primary : colors.text }]}>System</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Accent Color Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.accentSection}>
          <View style={styles.accentHeader}>
            <Text style={[styles.accentTitle, { color: colors.text }]}>Accent Color</Text>
            <Text style={[styles.accentSubtitle, { color: colors.textSub }]}>Customize app feel</Text>
          </View>

          <View style={styles.accentGrid}>
            {ACCENT_COLORS.map((accent, index) => (
              <Animated.View
                key={accent.id}
                entering={FadeInDown.delay(250 + index * 50).springify()}
              >
                <TouchableOpacity
                  style={[
                    styles.accentCard,
                    accent.isCustom ? [
                      styles.customAccentCard,
                      { borderColor: colors.textSub }
                    ] : {
                      backgroundColor: accentColor === accent.id ? `${accent.color}15` : colors.surface,
                      borderColor: accentColor === accent.id ? accent.color : colors.border
                    },
                  ]}
                  onPress={() => setAccentColor(accent.id)}
                  activeOpacity={0.7}
                >
                  {accent.isCustom ? (
                    <LinearGradient
                      colors={['#EC4899', '#A855F7', '#3B82F6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientCircle}
                    >
                      <MaterialIcons name="add" size={24} color="#FFFFFF" />
                    </LinearGradient>
                  ) : (
                    <View style={[styles.accentCircle, { backgroundColor: accent.color }]}>
                      {accent.id === 'pink' ? (
                        <MaterialIcons name="palette" size={20} color="#FFFFFF" />
                      ) : null}
                    </View>
                  )}
                  <View style={styles.accentInfo}>
                    <Text style={[styles.accentName, { color: accentColor === accent.id ? accent.color : colors.text }]}>{accent.name}</Text>
                    <Text style={[styles.accentDescription, { color: colors.textSub }]}>{accent.description}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* App Icon Section */}
        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.appIconSection}>
          <View style={styles.appIconHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>App Icon</Text>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PREMIUM</Text>
            </View>
          </View>
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
  sectionTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    marginBottom: 16,
  },
  appearanceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.xl,
  },
  appearanceCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  lightPreview: {
    width: '100%',
    height: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  darkPreview: {
    width: '100%',
    height: 80,
    borderRadius: BorderRadius.md,
    padding: 12,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  systemPreview: {
    width: '100%',
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: BorderRadius.md,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemText: {
    fontSize: 32,
    fontWeight: '300',
  },
  previewBar: {
    height: 10,
    borderRadius: 5,
    width: '100%',
  },
  previewBarShort: {
    width: '60%',
  },
  previewBarMedium: {
    width: '80%',
  },
  appearanceLabel: {
    fontSize: typography.size.caption,
    fontWeight: '500',
  },
  accentSection: {
    marginBottom: Spacing.xl,
  },
  accentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  accentTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  accentSubtitle: {
    fontSize: typography.size.small,
  },
  accentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  accentCard: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
  },
  customAccentCard: {
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1.5,
  },
  gradientCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accentCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accentInfo: {
    flex: 1,
  },
  accentName: {
    fontSize: typography.size.caption,
    fontWeight: '600',
  },
  accentDescription: {
    fontSize: typography.size.small,
    marginTop: 2,
  },
  appIconSection: {},
  appIconHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
