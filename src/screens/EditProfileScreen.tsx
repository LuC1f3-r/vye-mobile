import { BorderRadius, Spacing, typography } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const { colors, isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [name, setName] = useState('Sreelakshmi S Raj');
  const [email, setEmail] = useState('sreelakshmi2001@gmail.com');
  const [phone, setPhone] = useState('09656660656');
  const [dateOfBirth, setDateOfBirth] = useState('15 Aug 2001');
  const profileImage = 'https://i.pravatar.cc/100?img=5';
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Photo Options Modal */}
      <Modal
        visible={showPhotoModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowPhotoModal(false)}
        >
          <Pressable style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Change Profile Photo</Text>

            <TouchableOpacity
              style={[styles.modalOption, { borderBottomColor: colors.border }]}
              onPress={() => setShowPhotoModal(false)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="camera-alt" size={24} color={accent.primary} />
              <Text style={[styles.modalOptionText, { color: colors.text }]}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { borderBottomColor: colors.border }]}
              onPress={() => setShowPhotoModal(false)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="photo-library" size={24} color={accent.primary} />
              <Text style={[styles.modalOptionText, { color: colors.text }]}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setShowPhotoModal(false)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
              <Text style={[styles.modalOptionText, { color: '#EF4444' }]}>Remove Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: colors.border }]}
              onPress={() => setShowPhotoModal(false)}
              activeOpacity={0.7}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Image Viewer Modal */}
      <Modal
        visible={showImageViewer}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageViewer(false)}
      >
        <Pressable
          style={styles.imageViewerOverlay}
          onPress={() => setShowImageViewer(false)}
        >
          <View style={styles.imageViewerHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowImageViewer(false)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: profileImage }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>

      {/* Header */}
      <Animated.View entering={FadeInUp.springify()} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.7}>
          <Text style={[styles.saveButtonText, { color: accent.primary }]}>Save</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Photo */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.photoSection}
        >
          <View style={styles.photoContainer}>
            <TouchableOpacity
              onPress={() => setShowImageViewer(true)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: profileImage }}
                style={[styles.profileImage, { borderColor: accent.primaryLight }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editPhotoButton, { backgroundColor: accent.primary }]}
              onPress={() => setShowPhotoModal(true)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="camera-alt" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setShowPhotoModal(true)} activeOpacity={0.7}>
            <Text style={[styles.changePhotoText, { color: accent.primary }]}>Change Photo</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <Animated.View
            entering={FadeInDown.delay(150).springify()}
            style={styles.fieldContainer}
          >
            <Text style={[styles.fieldLabel, { color: colors.textSub }]}>Full Name</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MaterialIcons name="person-outline" size={20} color={colors.textSub} />
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.textSub}
              />
            </View>
          </Animated.View>

          {/* Email Field */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.fieldContainer}
          >
            <Text style={[styles.fieldLabel, { color: colors.textSub }]}>Email Address</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MaterialIcons name="mail-outline" size={20} color={colors.textSub} />
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSub}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </Animated.View>

          {/* Phone Field */}
          <Animated.View
            entering={FadeInDown.delay(250).springify()}
            style={styles.fieldContainer}
          >
            <Text style={[styles.fieldLabel, { color: colors.textSub }]}>Phone Number</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MaterialIcons name="phone" size={20} color={colors.textSub} />
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone"
                placeholderTextColor={colors.textSub}
                keyboardType="phone-pad"
              />
            </View>
          </Animated.View>

          {/* Date of Birth Field */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            style={styles.fieldContainer}
          >
            <Text style={[styles.fieldLabel, { color: colors.textSub }]}>Date of Birth</Text>
            <TouchableOpacity
              style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <MaterialIcons name="cake" size={20} color={colors.textSub} />
              <Text style={[styles.dateText, { color: colors.text }]}>{dateOfBirth}</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.textSub} />
            </TouchableOpacity>
          </Animated.View>
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
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  changePhotoText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: Spacing.lg,
  },
  fieldContainer: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: typography.size.small,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: typography.size.body,
    padding: 0,
  },
  dateText: {
    flex: 1,
    fontSize: typography.size.body,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: typography.size.body + 2,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: typography.size.body,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: Spacing.lg,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: typography.size.body,
    fontWeight: '600',
  },
  imageViewerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewerHeader: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    borderRadius: BorderRadius.lg,
  },
});
