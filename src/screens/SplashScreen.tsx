import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type SplashScreenProps = {
  onFinish: () => void;
};

export default function SplashScreen({onFinish}: SplashScreenProps) {
  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.8);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    // Phase 1: Fade-in + scale text (0–600ms)
    textOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    textScale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });

    // Phase 2: Hold for 800ms, then fade out text (400ms)
    textOpacity.value = withSequence(
      withTiming(1, {duration: 600, easing: Easing.out(Easing.cubic)}),
      withDelay(800, withTiming(0, {duration: 400, easing: Easing.in(Easing.cubic)})),
    );

    // Phase 3: Fade out entire screen after text fades (600 + 800 + 200 = 1600ms delay)
    screenOpacity.value = withDelay(
      1600,
      withTiming(0, {duration: 500, easing: Easing.in(Easing.cubic)}, finished => {
        if (finished) {
          runOnJS(onFinish)();
        }
      }),
    );
  }, [onFinish, screenOpacity, textOpacity, textScale]);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{scale: textScale.value}],
  }));

  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.content, textAnimatedStyle]}>
        <Text style={styles.title}>Vye</Text>
        <View style={styles.subtitleContainer}>
          <View style={styles.line} />
          <Text style={styles.subtitle}>welcome</Text>
          <View style={styles.line} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '200',
    color: '#FFFFFF',
    letterSpacing: 12,
    textTransform: 'uppercase',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  line: {
    width: 24,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 6,
    textTransform: 'lowercase',
  },
});
