import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing, typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LANGUAGES = [
  { code: 'EN', name: 'English', color: '#3B82F6' },
  { code: 'AR', name: 'العربية', color: '#3B9A9C' },
  { code: 'ES', name: 'Español', color: '#EF4444' },
  { code: 'FR', name: 'Français', color: '#8B5CF6' },
  { code: 'DE', name: 'Deutsch', color: '#F59E0B' },
  { code: 'IT', name: 'Italiano', color: '#10B981' },
  { code: 'PT', name: 'Português', color: '#EC4899' },
];

export default function LanguageScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';

  const [selectedLanguage, setSelectedLanguage] = useState('EN');

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Language</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Animated.Text 
          entering={FadeInDown.delay(100).springify()}
          style={[styles.subtitle, { color: colors.textSub }]}
        >
          Select your preferred language for the app interface.
        </Animated.Text>

        <View style={styles.languageList}>
          {LANGUAGES.map((language, index) => (
            <Animated.View
              key={language.code}
              entering={FadeInDown.delay(150 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.languageRow, { borderBottomColor: colors.border }]}
                onPress={() => setSelectedLanguage(language.code)}
                activeOpacity={0.7}
              >
                <View style={[styles.languageCode, { backgroundColor: `${language.color}20` }]}>
                  <Text style={[styles.codeText, { color: language.color }]}>{language.code}</Text>
                </View>
                <Text style={[styles.languageName, { color: colors.text }]}>{language.name}</Text>
                <View 
                  style={[
                    styles.radio,
                    { borderColor: selectedLanguage === language.code ? Colors.primary : colors.border },
                  ]}
                >
                  {selectedLanguage === language.code && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
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
  subtitle: {
    fontSize: typography.size.caption,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  languageList: {},
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  languageCode: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  codeText: {
    fontSize: typography.size.small,
    fontWeight: 'bold',
  },
  languageName: {
    flex: 1,
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});
