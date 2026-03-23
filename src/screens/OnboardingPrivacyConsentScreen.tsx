import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ConsentItem {
  id: string;
  text: string;
  linkText?: string;
  optional?: boolean;
}

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: 'terms',
    text: "I agree to Vye's",
    linkText: 'Terms of Service',
  },
  {
    id: 'privacy',
    text: "I have read Vye's",
    linkText: 'Privacy Policy',
  },
  {
    id: 'data',
    text: 'I agree to Vye processing the health data I choose to share with the app, so they can provide their services.',
    optional: true,
  },
];

export default function OnboardingPrivacyConsentScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [consents, setConsents] = useState<Record<string, boolean>>({
    terms: true,
    privacy: true,
    data: false,
  });

  const toggleConsent = (id: string) => {
    setConsents(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allConsented = CONSENT_ITEMS
    .filter(item => !item.optional)
    .every(item => consents[item.id]);

  const handleNext = () => {
    navigation.navigate('OnboardingReminders');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
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
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Illustration */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.illustrationContainer}>
          <View style={[styles.illustrationWrapper, { backgroundColor: '#4A9D9A' }]}>
            <View style={styles.shieldContainer}>
              <View style={[styles.documentIcon, { backgroundColor: '#FFFFFF' }]}>
                <View style={[styles.documentLine, { backgroundColor: '#E5E7EB' }]} />
                <View style={[styles.documentLine, styles.shortLine, { backgroundColor: '#E5E7EB' }]} />
                <View style={[styles.documentLine, { backgroundColor: '#E5E7EB' }]} />
              </View>
              <View style={[styles.shieldIcon, { backgroundColor: '#3D8785' }]}>
                <MaterialIcons name="verified-user" size={24} color="#4A9D9A" />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            It stays between You{'\n'}and Vye!
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            We promise to keep your data safe, secure, and private. Please take a moment to get to know our policies.
          </Text>
        </Animated.View>

        {/* Consent Items */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.consentContainer}>
          {CONSENT_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.consentItem}
              onPress={() => toggleConsent(item.id)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.checkbox,
                {
                  backgroundColor: consents[item.id] ? accent.primary : 'transparent',
                  borderColor: consents[item.id] ? accent.primary : colors.border,
                }
              ]}>
                {consents[item.id] && (
                  <MaterialIcons name="check" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={[styles.consentText, { color: colors.text }]}>
                {item.text}
                {item.linkText && (
                  <Text style={[styles.linkText, { color: accent.primary }]}> {item.linkText}</Text>
                )}
                {item.id !== 'data' && '.'}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Next Button */}
      <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: accent.primary },
            !allConsented && { opacity: 0.6 }
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={!allConsented}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  illustrationWrapper: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.4,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shieldContainer: {
    position: 'relative',
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIcon: {
    width: 60,
    height: 80,
    borderRadius: BorderRadius.sm,
    padding: 12,
    justifyContent: 'center',
    gap: 8,
  },
  documentLine: {
    height: 4,
    borderRadius: 2,
    width: '100%',
  },
  shortLine: {
    width: '60%',
  },
  shieldIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.caption,
    textAlign: 'center',
    lineHeight: 20,
  },
  consentContainer: {
    flex: 1,
    gap: Spacing.md,
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  consentText: {
    flex: 1,
    fontSize: typography.size.caption,
    lineHeight: 22,
  },
  linkText: {
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  nextButton: {
    width: '100%',
    height: 56,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
