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

interface PasswordRequirement {
  label: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    validator: (password) => password.length >= 8,
  },
  {
    label: 'One uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'One number or special character',
    validator: (password) => /[\d!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export default function ResetPasswordScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getRequirementStatus = (requirement: PasswordRequirement): boolean => {
    return requirement.validator(newPassword);
  };

  const allRequirementsMet = passwordRequirements.every(req => getRequirementStatus(req));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canResetPassword = allRequirementsMet && passwordsMatch;

  const handleResetPassword = () => {
    if (canResetPassword) {
      console.log('Resetting password...');
      navigation.navigate('ProfileSetup');
    }
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
          {/* Header with Back Button */}
          <Animated.View entering={FadeInUp.springify()} style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          </Animated.View>

          {/* Title and Description */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Set New Password
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSub }]}>
              Your new password must be different from previously used passwords.
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.formContainer}>
            {/* New Password Label */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>New Password</Text>

            {/* New Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter new password"
                placeholderTextColor={colors.textSub}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showNewPassword ? 'eye' : 'eye-off'}
                  size={22}
                  color={colors.textSub}
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Label */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>Confirm Password</Text>

            {/* Confirm Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm new password"
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

          {/* Password Requirements */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            style={[styles.requirementsContainer, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.requirementsTitle, { color: colors.text }]}>
              Password must contain:
            </Text>
            {passwordRequirements.map((requirement, index) => {
              const isMet = getRequirementStatus(requirement);
              return (
                <View key={index} style={styles.requirementRow}>
                  <View
                    style={[
                      styles.requirementIcon,
                      {
                        backgroundColor: isMet ? '#E8F5E9' : 'transparent',
                        borderColor: isMet ? '#4CAF50' : colors.border,
                      },
                    ]}
                  >
                    {isMet && (
                      <Ionicons name="checkmark" size={12} color="#4CAF50" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.requirementText,
                      { color: isMet ? '#4CAF50' : colors.textSub }
                    ]}
                  >
                    {requirement.label}
                  </Text>
                </View>
              );
            })}
          </Animated.View>

          {/* Reset Password Button */}
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.resetButton,
                { backgroundColor: accent.primary },
                !canResetPassword && styles.buttonDisabled,
              ]}
              onPress={handleResetPassword}
              activeOpacity={0.8}
              disabled={!canResetPassword}
            >
              <Text style={styles.resetButtonText}>Reset Password</Text>
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
    paddingVertical: Spacing.sm,
    marginLeft: -8,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
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
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: typography.size.caption,
    fontWeight: '500',
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
    height: 56,
    marginBottom: Spacing.lg,
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
  requirementsContainer: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  requirementsTitle: {
    fontSize: typography.size.caption,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  requirementIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  requirementText: {
    fontSize: typography.size.caption,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: Spacing.lg,
  },
  resetButton: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
});
