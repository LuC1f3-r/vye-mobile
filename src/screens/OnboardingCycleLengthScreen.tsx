import { BorderRadius, Colors, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 56;
const VISIBLE_ITEMS = 4;

const CYCLE_LENGTHS = Array.from({ length: 21 }, (_, i) => i + 20); // 20-40 days

export default function OnboardingCycleLengthScreen() {
  const { isDark, colors, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedIndex, setSelectedIndex] = useState(8); // Default to 28 days (index 8)
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < CYCLE_LENGTHS.length && index !== selectedIndex) {
      setSelectedIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < CYCLE_LENGTHS.length) {
      setSelectedIndex(index);
      scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
    }, 100);
  }, []);

  const handleNext = () => {
    navigation.navigate('OnboardingPrivacyConsent');
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

      {/* Illustration */}
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.illustrationContainer}>
        <View style={[styles.illustrationWrapper, { backgroundColor: isDark ? colors.surface : '#FBF5F3' }]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          How long is your cycle?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSub }]}>
          A cycle usually lasts 24 to 34 days
        </Text>
      </Animated.View>

      {/* Cycle Length Picker */}
      <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.pickerContainer}>
        <View style={[styles.selectionHighlight, { backgroundColor: Colors.primaryLight, borderColor: colors.border }]} />
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingVertical: ITEM_HEIGHT * ((VISIBLE_ITEMS - 1) / 2),
          }}
        >
          {CYCLE_LENGTHS.map((days, index) => {
            const isSelected = index === selectedIndex;
            const distance = Math.abs(index - selectedIndex);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.25;

            return (
              <TouchableOpacity
                key={days}
                style={styles.cycleItem}
                onPress={() => {
                  setSelectedIndex(index);
                  scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.cycleItemText,
                    {
                      color: colors.text,
                      opacity,
                      fontWeight: isSelected ? '600' : '400',
                    },
                  ]}
                >
                  {days} days
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Next Button */}
      <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: accent.primary }]}
          onPress={handleNext}
          activeOpacity={0.8}
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
  illustrationContainer: {
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  illustrationWrapper: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.4,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  illustration: {
    width: '70%',
    height: '70%',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: typography.size.caption,
    textAlign: 'center',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: Spacing.xl,
  },
  selectionHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: -(ITEM_HEIGHT / 2),
    height: ITEM_HEIGHT,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  cycleItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cycleItemText: {
    fontSize: typography.size.body,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
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
