import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/constants/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 4;

type TabIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  label: string;
};

function TabIcon({ name, color, focused, label }: TabIconProps) {
  return (
    <View style={styles.tabIconContainer}>
      <MaterialIcons name={name} size={26} color={color} />
      <Text 
        style={[styles.tabLabel, { color }]} 
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const { colors, accent } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accent.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 15,
          paddingTop: 12,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: TAB_WIDTH,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="groups" color={color} focused={focused} label="Community" />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="shopping-bag" color={color} focused={focused} label="Store" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="settings" color={color} focused={focused} label="Settings" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TAB_WIDTH - 10,
    gap: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
