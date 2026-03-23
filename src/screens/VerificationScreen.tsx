import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
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

const CODE_LENGTH = 4;

export default function VerificationScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];

    // Handle paste
    if (text.length > 1) {
      const pastedCode = text.slice(0, CODE_LENGTH).split('');
      pastedCode.forEach((char, i) => {
        if (i < CODE_LENGTH) {
          newCode[i] = char;
        }
      });
      setCode(newCode);
      // Focus last input or blur
      const focusIndex = Math.min(pastedCode.length, CODE_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    console.log('Verifying code:', verificationCode);
    navigation.navigate('ResetPassword');
  };

  const handleResend = () => {
    console.log('Resending code...');
    // Implement resend logic
  };

  const isCodeComplete = code.every(digit => digit !== '');

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
              Verification
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSub }]}>
              Enter the verification code we just send to your email addres.
            </Text>
          </Animated.View>

          {/* Code Input */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.codeContainer}>
            {code.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.codeInputWrapper,
                  {
                    backgroundColor: colors.surface,
                    borderColor: digit ? accent.primary : colors.border,
                  },
                ]}
              >
                <TextInput
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[styles.codeInput, { color: colors.text }]}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </Animated.View>

          {/* Verify Button */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                { backgroundColor: accent.primary },
                !isCodeComplete && styles.buttonDisabled,
              ]}
              onPress={handleVerify}
              activeOpacity={0.8}
              disabled={!isCodeComplete}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Resend Code */}
          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: colors.textSub }]}>
              Didn't receive code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
              <Text style={[styles.resendLink, { color: colors.text }]}>Resend</Text>
            </TouchableOpacity>
          </Animated.View>
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
    marginBottom: Spacing.xl + Spacing.lg,
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  codeInputWrapper: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.md,
  },
  verifyButton: {
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
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  resendText: {
    fontSize: typography.size.caption,
  },
  resendLink: {
    fontSize: typography.size.caption,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
