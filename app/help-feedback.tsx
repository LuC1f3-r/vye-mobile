import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing, typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const TOP_QUESTIONS = [
  { icon: '📅', label: 'How do I log my period?', color: Colors.primary },
  { icon: '🔄', label: 'Syncing across devices', color: Colors.secondary },
  { icon: '🔒', label: 'Privacy & Data backup', color: '#F59E0B' },
];

export default function HelpFeedbackScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Feedback</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={[styles.greeting, { color: Colors.primary }]}>Hello, Rahaf!</Text>
          <Text style={[styles.greetingSub, { color: colors.textSub }]}>
            We're here to support you on your journey. How can we help today?
          </Text>
        </Animated.View>

        {/* Top Questions */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Questions</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.viewAll, { color: Colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {TOP_QUESTIONS.map((question, index) => (
            <Animated.View
              key={question.label}
              entering={FadeInDown.delay(250 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.questionCard, { backgroundColor: colors.surface }]}
                activeOpacity={0.7}
              >
                <View style={[styles.questionIcon, { backgroundColor: `${question.color}15` }]}>
                  <Text style={styles.questionEmoji}>{question.icon}</Text>
                </View>
                <Text style={[styles.questionLabel, { color: colors.text }]}>{question.label}</Text>
                <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Send Message Form */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Send us a message</Text>

          <Text style={[styles.inputLabel, { color: colors.textSub }]}>Topic</Text>
          <TouchableOpacity 
            style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.dropdownText, { color: colors.text }]}>{topic}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.textSub} />
          </TouchableOpacity>

          <Text style={[styles.inputLabel, { color: colors.textSub }]}>Message</Text>
          <TextInput
            style={[
              styles.messageInput,
              { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
            ]}
            placeholder="Describe your issue or suggestion..."
            placeholderTextColor={colors.textSub}
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
        </Animated.View>
      </ScrollView>
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
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: typography.size.h2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  greetingSub: {
    fontSize: typography.size.caption,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: typography.size.caption,
    fontWeight: '600',
  },
  questionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.lg,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  questionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  questionEmoji: {
    fontSize: 18,
  },
  questionLabel: {
    flex: 1,
    fontSize: typography.size.caption,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  inputLabel: {
    fontSize: typography.size.small,
    marginBottom: 8,
    marginTop: 12,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: typography.size.caption,
  },
  messageInput: {
    padding: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    fontSize: typography.size.caption,
    minHeight: 100,
  },
});
