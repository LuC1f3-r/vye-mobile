import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import AboutScreen from '../screens/AboutScreen';
import AddStateScreen from '../screens/AddStateScreen';
import BackupDataScreen from '../screens/BackupDataScreen';
import CommunitySettingsScreen from '../screens/CommunitySettingsScreen';
import DataPrivacyScreen from '../screens/DataPrivacyScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HelpFeedbackScreen from '../screens/HelpFeedbackScreen';
import HomeScreen from '../screens/HomeScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LocationAccessScreen from '../screens/LocationAccessScreen';
import ManageUsersScreen from '../screens/ManageUsersScreen';
import MyActivityScreen from '../screens/MyActivityScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OnboardingBirthdayScreen from '../screens/OnboardingBirthdayScreen';
import OnboardingCycleLengthScreen from '../screens/OnboardingCycleLengthScreen';
import OnboardingLastPeriodScreen from '../screens/OnboardingLastPeriodScreen';
import OnboardingPrivacyConsentScreen from '../screens/OnboardingPrivacyConsentScreen';
import OnboardingRemindersScreen from '../screens/OnboardingRemindersScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PasswordSecurityScreen from '../screens/PasswordSecurityScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import RecordsScreen from '../screens/RecordsScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ThemesScreen from '../screens/ThemesScreen';
import VerificationScreen from '../screens/VerificationScreen';
import {useTheme} from '../theme/ThemeContext';

export type RootStackParamList = {
  Onboarding: undefined;
  OnboardingBirthday: undefined;
  OnboardingLastPeriod: undefined;
  OnboardingCycleLength: undefined;
  OnboardingPrivacyConsent: undefined;
  OnboardingReminders: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: {email?: string};
  ResetPassword: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
  Settings: undefined;
  Notifications: undefined;
  AddState: undefined;
  Records: undefined;
  EditProfile: undefined;
  PersonalInformation: undefined;
  Themes: undefined;
  About: undefined;
  NotificationSettings: undefined;
  Language: undefined;
  HelpFeedback: undefined;
  DataPrivacy: undefined;
  CommunitySettings: undefined;
  BackupData: undefined;
  ManageUsers: undefined;
  PasswordSecurity: undefined;
  LocationAccess: undefined;
  MyActivity: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export function AppNavigator() {
  const {colors, accent, isDark} = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: accent.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false}}>
        {/* Auth / Onboarding */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingBirthday" component={OnboardingBirthdayScreen} />
        <Stack.Screen name="OnboardingLastPeriod" component={OnboardingLastPeriodScreen} />
        <Stack.Screen name="OnboardingCycleLength" component={OnboardingCycleLengthScreen} />
        <Stack.Screen name="OnboardingPrivacyConsent" component={OnboardingPrivacyConsentScreen} />
        <Stack.Screen name="OnboardingReminders" component={OnboardingRemindersScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

        {/* Main App */}
        <Stack.Screen name="MainTabs" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

        {/* Push Screens */}
        <Stack.Screen name="Records" component={RecordsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        <Stack.Screen name="Themes" component={ThemesScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="HelpFeedback" component={HelpFeedbackScreen} />
        <Stack.Screen name="DataPrivacy" component={DataPrivacyScreen} />
        <Stack.Screen name="CommunitySettings" component={CommunitySettingsScreen} />
        <Stack.Screen name="BackupData" component={BackupDataScreen} />
        <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
        <Stack.Screen name="PasswordSecurity" component={PasswordSecurityScreen} />
        <Stack.Screen name="LocationAccess" component={LocationAccessScreen} />
        <Stack.Screen name="MyActivity" component={MyActivityScreen} />

        {/* Modals */}
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen
          name="AddState"
          component={AddStateScreen}
          options={{presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
