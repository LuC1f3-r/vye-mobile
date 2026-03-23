import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ACTIVE_USERS = [
  {
    id: '1',
    name: 'Sreelakshmi S Raj',
    role: 'Admin (Owner)',
    avatar: 'https://i.pravatar.cc/100?img=5',
    isOwner: true,
  },
  {
    id: '2',
    name: 'Arjun Jaydeep',
    role: 'Partner',
    access: 'Full Access',
    initials: 'AJ',
    bgColor: '#FFF3E0',
    textColor: '#E65100',
  },
  {
    id: '3',
    name: 'Dr. Riya',
    role: 'Doctor',
    access: 'View Only',
    initials: 'DR',
    bgColor: '#FCE4EC',
    textColor: '#C2185B',
  },
];

const PENDING_INVITES = [
  {
    id: '1',
    email: 'mom.care@example.com',
    status: 'Invitation sent',
  },
];

export default function ManageUsersScreen() {
  const { colors, isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Manage Users</Text>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Info Banner */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={[styles.infoBanner, { backgroundColor: '#E3F2FD' }]}
        >
          <View style={styles.infoBannerIcon}>
            <MaterialIcons name="info" size={20} color="#1976D2" />
          </View>
          <View style={styles.infoBannerContent}>
            <Text style={[styles.infoBannerTitle, { color: '#1565C0' }]}>Shared Access</Text>
            <Text style={[styles.infoBannerText, { color: '#1976D2' }]}>
              Added users can view your calendar and health insights. You can manage their permissions or remove access at any time.
            </Text>
          </View>
        </Animated.View>

        {/* Active Users Section */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>ACTIVE USERS</Text>
        </Animated.View>

        {ACTIVE_USERS.map((user, index) => (
          <Animated.View
            key={user.id}
            entering={FadeInDown.delay(200 + index * 50).springify()}
          >
            <TouchableOpacity
              style={[styles.userCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.6}
            >
              <View style={styles.userCardLeft}>
                {user.avatar ? (
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                    {user.isOwner && (
                      <View style={[styles.ownerBadge, { backgroundColor: accent.primary }]}>
                        <Text style={styles.ownerBadgeText}>YOU</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={[styles.initialsAvatar, { backgroundColor: (user as any).bgColor }]}>
                    <Text style={[styles.initialsText, { color: (user as any).textColor }]}>{(user as any).initials}</Text>
                  </View>
                )}
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
                  <Text style={[styles.userRole, { color: colors.textSub }]}>
                    {user.role}{(user as any).access ? ` • ${(user as any).access}` : ''}
                  </Text>
                </View>
              </View>
              {!user.isOwner && (
                <TouchableOpacity style={styles.moreButton} activeOpacity={0.6}>
                  <MaterialIcons name="more-vert" size={24} color={colors.textSub} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Pending Invites Section */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.textSub }]}>PENDING INVITES</Text>
        </Animated.View>

        {PENDING_INVITES.map((invite, index) => (
          <Animated.View
            key={invite.id}
            entering={FadeInDown.delay(450 + index * 50).springify()}
          >
            <View style={[styles.inviteCard, { backgroundColor: colors.surface }]}>
              <View style={[styles.inviteIconContainer, { backgroundColor: colors.border }]}>
                <MaterialIcons name="mail-outline" size={20} color={colors.textSub} />
              </View>
              <View style={styles.inviteInfo}>
                <Text style={[styles.inviteEmail, { color: colors.text }]}>{invite.email}</Text>
                <Text style={[styles.inviteStatus, { color: colors.textSub }]}>{invite.status}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={[styles.revokeText, { color: accent.primary }]}>Revoke</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
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
    paddingBottom: 100,
  },
  infoBanner: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: 12,
  },
  infoBannerIcon: {
    marginTop: 2,
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: typography.size.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoBannerText: {
    fontSize: typography.size.small,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.size.small,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  userCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  ownerBadge: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: [{ translateX: -16 }],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ownerBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  initialsAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  userRole: {
    fontSize: typography.size.small,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  inviteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: 14,
  },
  inviteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteInfo: {
    flex: 1,
  },
  inviteEmail: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  inviteStatus: {
    fontSize: typography.size.small,
    marginTop: 2,
  },
  revokeText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
});
