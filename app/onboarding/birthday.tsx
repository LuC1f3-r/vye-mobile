import { BorderRadius, Colors, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - 12 - i);

interface WheelPickerProps {
  data: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  colors: any;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ data, selectedIndex, onSelect, colors }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < data.length && index !== selectedIndex) {
      onSelect(index);
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < data.length) {
      onSelect(index);
      scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
    }, 100);
  }, []);

  return (
    <View style={styles.wheelContainer}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT,
        }}
      >
        {data.map((item, index) => {
          const isSelected = index === selectedIndex;
          const distance = Math.abs(index - selectedIndex);
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.25;
          
          return (
            <TouchableOpacity
              key={index}
              style={styles.wheelItem}
              onPress={() => {
                onSelect(index);
                scrollViewRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.wheelItemText,
                  { 
                    color: colors.text,
                    opacity,
                    fontWeight: isSelected ? '600' : '400',
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function BirthdayScreen() {
  const { isDark, colors, accent } = useTheme();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);

  const handleNext = () => {
    // Save birthday data and navigate to next screen
    router.push('/onboarding/last-period');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#2D1F3D', '#1A1A2E', '#16213E'] : ['#FDF6F9', '#F8EDF3', '#F5E6EE']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        {/* Header */}
        <Animated.View entering={FadeInUp.springify()} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            When is your birthday?
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.subtitleContainer}>
          <Text style={[styles.subtitle, { color: colors.textSub }]}>
            This allows us to tailor the app to your specific needs, as cycles can evolve over time.
          </Text>
        </Animated.View>

        {/* Illustration */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.illustrationContainer}>
          <View style={[styles.illustrationWrapper, { backgroundColor: isDark ? colors.surface : '#FBF5F3' }]}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Date Picker */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.pickerContainer}>
          <View style={[styles.selectionHighlight, { backgroundColor: `${accent.primary}15`, borderColor: `${accent.primary}40` }]} />
          <View style={styles.pickersRow}>
            <WheelPicker
              data={DAYS}
              selectedIndex={selectedDay}
              onSelect={setSelectedDay}
              colors={colors}
            />
            <WheelPicker
              data={MONTHS}
              selectedIndex={selectedMonth}
              onSelect={setSelectedMonth}
              colors={colors}
            />
            <WheelPicker
              data={YEARS}
              selectedIndex={selectedYear}
              onSelect={setSelectedYear}
              colors={colors}
            />
          </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: typography.size.h3,
    fontWeight: '700',
    flex: 1,
  },
  subtitleContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: typography.size.caption,
    lineHeight: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  illustrationWrapper: {
    width: SCREEN_WIDTH * 0.65,
    height: SCREEN_WIDTH * 0.55,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  illustration: {
    width: '70%',
    height: '70%',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    position: 'relative',
  },
  selectionHighlight: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    height: ITEM_HEIGHT,
    top: '50%',
    marginTop: -ITEM_HEIGHT / 2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  pickersRow: {
    flexDirection: 'row',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  wheelContainer: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
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
