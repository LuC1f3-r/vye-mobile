import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  const handleSkip = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Back Button and Skip */}
          <Animated.View entering={FadeInUp.springify()} style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}
            >
              <Text style={[styles.skipText, { color: accent.primary }]}>Skip</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Star Icon */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.iconContainer}>
            <View style={[styles.starIconWrapper, { backgroundColor: Colors.primaryLight }]}>
              <MaterialIcons name="star" size={32} color={accent.primary} />
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Would you like to Sign Up?
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSub }]}>
              We recommend you sign up for an account so that all your data will be synced and accessible from any other device.
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.formContainer}>
            {/* Name Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Name"
                placeholderTextColor={colors.textSub}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* Email Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.textSub}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textSub}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color={colors.textSub}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm Password"
                placeholderTextColor={colors.textSub}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color={colors.textSub}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Sign Up Button */}
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.signUpButton, { backgroundColor: accent.primary }]}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSub }]}>or Sign Up with</Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </Animated.View>

          {/* Social Buttons */}
          <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.socialIcon, { color: colors.textSub }]}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-apple" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  skipButton: {
    padding: 8,
    marginRight: -8,
  },
  skipText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  starIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
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
  formContainer: {
    width: '100%',
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
    height: 56,
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.size.body,
    height: '100%',
  },
  eyeButton: {
    padding: 8,
    marginRight: -8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  signUpButton: {
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
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: typography.size.caption,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  socialButton: {
    width: 64,
    height: 56,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
});
