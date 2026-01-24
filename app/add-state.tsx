import { BorderRadius, Colors, Spacing, typography } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EMOTIONS = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😡', label: 'Angry' },
  { id: 'anxious', emoji: '😟', label: 'Anxious' },
  { id: 'stressed', emoji: '😫', label: 'Stressed' },
];

const SYMPTOMS = [
  { id: 'headache', label: 'Headache' },
  { id: 'backaches', label: 'Backaches' },
  { id: 'cramps', label: 'Cramps' },
  { id: 'fever', label: 'Fever' },
  { id: 'tender_breasts', label: 'Tender Breasts' },
  { id: 'dizziness', label: 'Dizziness' },
];

const ENERGY_LEVELS = [
  { id: 'energetic', emoji: '⚡', label: 'Energetic' },
  { id: 'high', emoji: '🔥', label: 'High' },
  { id: 'low', emoji: '🔋', label: 'Low' },
  { id: 'exhausted', emoji: '💤', label: 'Exhausted' },
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATES = [
  { day: 31, past: true },
  { day: 1, past: false },
  { day: 2, past: false },
  { day: 3, today: true },
  { day: 4, future: true },
  { day: 5, future: true },
  { day: 6, future: true },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ChipProps = {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  colors: typeof Colors.light;
};

function Chip({ label, emoji, selected, onPress, colors }: ChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[
        styles.chip,
        { backgroundColor: selected ? Colors.primary : colors.background },
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {emoji && <Text style={styles.chipEmoji}>{emoji}</Text>}
      <Text
        style={[
          styles.chipLabel,
          { color: selected ? '#FFFFFF' : colors.text },
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export default function AddStateScreen() {
  const { colors, isDark, accent } = useTheme();

  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['headache']);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>('low');
  const [notes, setNotes] = useState('');

  const toggleEmotion = (id: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add State</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        {/* Mini Date Picker */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={[styles.datePicker, { backgroundColor: colors.surface }]}
        >
          <View style={styles.weekDaysRow}>
            {WEEK_DAYS.map((day) => (
              <View key={day} style={styles.weekDayCell}>
                <Text style={[styles.weekDayText, { color: colors.textSub }]}>{day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.datesRow}>
            {DATES.map((item, index) => (
              <View key={index} style={styles.dateCell}>
                <View
                  style={[
                    styles.dateCircle,
                    item.today && { backgroundColor: Colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      { color: item.today ? '#FFFFFF' : item.past || item.future ? colors.textSub : colors.text },
                      item.today && styles.dateTextBold,
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Emotions Section */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={[styles.section, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Emotions</Text>
          <View style={styles.chipsContainer}>
            {EMOTIONS.map((emotion) => (
              <Chip
                key={emotion.id}
                label={emotion.label}
                emoji={emotion.emoji}
                selected={selectedEmotions.includes(emotion.id)}
                onPress={() => toggleEmotion(emotion.id)}
                colors={colors}
              />
            ))}
          </View>
        </Animated.View>

        {/* Symptoms Section */}
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          style={[styles.section, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Symptoms</Text>
          <View style={styles.chipsContainer}>
            {SYMPTOMS.map((symptom) => (
              <Chip
                key={symptom.id}
                label={symptom.label}
                selected={selectedSymptoms.includes(symptom.id)}
                onPress={() => toggleSymptom(symptom.id)}
                colors={colors}
              />
            ))}
          </View>
        </Animated.View>

        {/* Energy Section */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
          style={[styles.section, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Energy</Text>
          <View style={styles.chipsContainer}>
            {ENERGY_LEVELS.map((level) => (
              <Chip
                key={level.id}
                label={level.label}
                emoji={level.emoji}
                selected={selectedEnergy === level.id}
                onPress={() => setSelectedEnergy(level.id)}
                colors={colors}
              />
            ))}
          </View>
        </Animated.View>

        {/* Notes Section */}
        <Animated.View 
          entering={FadeInDown.delay(500).springify()}
          style={[styles.section, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notes</Text>
          <TextInput
            style={[
              styles.notesInput,
              {
                backgroundColor: colors.background,
                color: colors.text,
              },
            ]}
            placeholder="Add a note for today..."
            placeholderTextColor={colors.textSub}
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </Animated.View>
        </ScrollView>

        {/* Fixed Save Button at Bottom - always visible */}
        <Animated.View 
          entering={FadeInDown.delay(600).springify()}
          style={[styles.saveContainer, { backgroundColor: colors.background }]}
        >
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: accent.primary }]}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[styles.saveLabel, { color: colors.textSub }]}>Save</Text>
        </Animated.View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: typography.size.body + 2,
    fontWeight: 'bold',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  keyboardView: {
    flex: 1,
  },
  datePicker: {
    borderRadius: BorderRadius.lg,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: typography.size.small,
    fontWeight: '500',
  },
  datesRow: {
    flexDirection: 'row',
  },
  dateCell: {
    flex: 1,
    alignItems: 'center',
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: typography.size.caption,
  },
  dateTextBold: {
    fontWeight: 'bold',
  },
  section: {
    borderRadius: BorderRadius.lg,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
  },
  chipEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: typography.size.caption,
    fontWeight: '500',
  },
  notesInput: {
    borderRadius: BorderRadius.md,
    padding: 12,
    fontSize: typography.size.caption,
    minHeight: 80,
  },
  saveContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  saveButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveLabel: {
    fontSize: typography.size.small,
    marginTop: 6,
    fontWeight: '500',
  },
});
