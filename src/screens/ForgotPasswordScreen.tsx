import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    console.log('Sending code to:', email);
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
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

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title and Description */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Forgot password?
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSub }]}>
              Don't worry! It occurs. Please enter the email address linked with your account
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.formContainer}>
            {/* Email Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSub}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </Animated.View>

          {/* Send Code Button */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: accent.primary }]}
              onPress={handleSendCode}
              activeOpacity={0.8}
            >
              <Text style={styles.sendButtonText}>Send code</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Spacer for proper layout */}
          <View style={styles.spacer} />
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl + Spacing.md,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: typography.size.body,
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.md,
  },
  sendButton: {
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
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
});
