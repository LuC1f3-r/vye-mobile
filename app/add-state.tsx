import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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

type ChipProps = {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  colors: typeof Colors.light;
};

function Chip({ label, emoji, selected, onPress, colors }: ChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: selected ? Colors.primary : colors.background },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
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
    </TouchableOpacity>
  );
}

export default function AddStateScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
    // TODO: Save state data
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add State</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Mini Date Picker */}
        <View style={[styles.datePicker, { backgroundColor: colors.surface }]}>
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
        </View>

        {/* Emotions Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
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
        </View>

        {/* Symptoms Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
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
        </View>

        {/* Energy Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
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
        </View>

        {/* Notes Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
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
        </View>
      </ScrollView>

      {/* Floating Save Button */}
      <View style={[styles.saveContainer, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <MaterialIcons name="check" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.saveLabel, { color: colors.textSub }]}>Save</Text>
      </View>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 120,
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
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDayCell: {
    width: 32,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCell: {
    width: 32,
    alignItems: 'center',
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
  },
  chipEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  notesInput: {
    borderRadius: BorderRadius.md,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
  },
  saveContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -28 }],
    alignItems: 'center',
  },
  saveButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
