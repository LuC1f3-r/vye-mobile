import { typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileSetupScreen() {
  const { isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Start rotation animation for logo
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1, // infinite
      false
    );

    // Auto-navigate after a delay (simulating profile setup)
    const timer = setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        colors={isDark
          ? ['#2D1F3D', '#1A1A2E', '#16213E']
          : ['#FDF6F9', '#F8EDF3', '#E8F4FD', '#F5E6EE']
        }
        style={StyleSheet.absoluteFill}
        locations={[0, 0.3, 0.7, 1]}
      />

      {/* Main Illustration */}
      <Animated.View
        entering={FadeIn.delay(200).duration(800)}
        style={styles.illustrationContainer}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeInDown.delay(500).springify()}
          style={[styles.title, { color: isDark ? '#FFFFFF' : '#1A1A2E' }]}
        >
          Please wait for a moment!
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(700).springify()}
          style={[styles.subtitle, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,46,0.6)' }]}
        >
          We are setting up your profile.
        </Animated.Text>
      </View>

      {/* Animated Logo at Bottom */}
      <Animated.View
        entering={FadeIn.delay(900).duration(600)}
        style={styles.bottomLogoContainer}
      >
        <Animated.View style={[styles.rotatingLogoWrapper, animatedLogoStyle]}>
          <View style={[styles.logoGlow, { backgroundColor: accent.primary }]} />
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.bottomLogo}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingTop: SCREEN_HEIGHT * 0.1,
  },
  illustration: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: typography.size.h3,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.size.body,
    textAlign: 'center',
  },
  bottomLogoContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.1,
    alignItems: 'center',
  },
  rotatingLogoWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.3,
  },
  bottomLogo: {
    width: 50,
    height: 50,
  },
});
