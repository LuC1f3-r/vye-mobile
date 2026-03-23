import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleGetStarted = () => {
    navigation.navigate('OnboardingBirthday');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#2D1F3D', '#1A1A2E', '#16213E'] : ['#FDF6F9', '#F8EDF3', '#F5E6EE']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        {/* Logo & Illustration */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.illustrationContainer}>
          <View style={[styles.logoWrapper, { backgroundColor: isDark ? colors.surface : '#FFFFFF' }]}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Welcome to Vye</Text>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            Your personal cycle tracking companion. Understand your body, predict your cycle, and take control of your health.
          </Text>
        </Animated.View>

        {/* Buttons */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: accent.primary }]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: accent.primary }]}
            onPress={handleSignIn}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryButtonText, { color: accent.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoWrapper: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl * 2,
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: typography.size.h1,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: typography.size.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: Spacing.md,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
