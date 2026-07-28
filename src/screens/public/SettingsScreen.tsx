import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function SettingsScreen({ navigation }: any) {
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.', [
              { text: 'OK', onPress: () => logout() }
            ]);
          } 
        },
      ]
    );
  };

  const handleLanguage = () => {
    Alert.alert('Language', 'Currently, English (US) is the only supported language. More languages coming soon!');
  };

  const navigateToContent = (title: string, content: string) => {
    navigation.navigate('Content', { title, content });
  };

  const renderSettingItem = (icon: any, title: string, subtitle?: string, rightComponent?: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIconContainer}>
        <Feather name={icon} size={20} color="#1E3B20" />
      </View>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.settingRightContainer}>
        {rightComponent || (onPress && <Feather name="chevron-right" size={20} color="#ccc" />)}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.sectionContainer}>
          {renderSettingItem('bell', 'Push Notifications', 'Receive updates on bookings', 
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d1d1', true: '#2E7D32' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingItem('map-pin', 'Location Services', 'Better recommendations based on location', 
            <Switch 
              value={locationEnabled} 
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#d1d1d1', true: '#2E7D32' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingItem('moon', 'Dark Theme', 'Switch between light and dark mode', 
            <Switch 
              value={darkTheme} 
              onValueChange={setDarkTheme}
              trackColor={{ false: '#d1d1d1', true: '#2E7D32' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingItem('globe', 'Language', 'English (US)', undefined, handleLanguage)}
        </View>

        <Text style={styles.sectionTitle}>Support & About</Text>
        <View style={styles.sectionContainer}>
          {renderSettingItem('help-circle', 'Help Center', 'FAQs and Support', undefined, () => navigateToContent('Help Center', 'Welcome to the BharatBhraman Help Center.\n\n**1. Booking Information**\nHow to book a stay?\nSimply browse our curated collections, select a property, choose your dates, and proceed to checkout. You will receive an instant confirmation via email.\n\nWhat is the cancellation policy?\nMost properties offer free cancellation up to 48 hours before check-in. For exact details, please refer to the specific property\'s policy on the booking page.\n\n**2. Payments & Refunds**\nWhat payment methods are accepted?\nWe accept all major Credit Cards, Debit Cards, Net Banking, and popular UPI wallets.\n\nWhen will I receive my refund?\nRefunds for cancelled bookings are typically processed within 5-7 business days, depending on your bank\'s processing time.\n\n**3. Account Management**\nHow do I update my profile?\nNavigate to the Profile tab and tap the edit icon in the top right corner to update your personal details and profile picture.\n\n**4. 24/7 Concierge**\nFor immediate assistance during your trip, please utilize the 24/7 Concierge Service button on your profile screen to speak directly with our support team.'))}
          {renderSettingItem('shield', 'Privacy Policy', 'Data usage and protection', undefined, () => navigateToContent('Privacy Policy', '**Privacy Policy**\n\nLast Updated: August 28, 2024\n\n**1. Information We Collect**\nWe collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include your name, email, phone number, postal address, profile picture, and payment method.\n\n**2. How We Use Information**\nWe use the information we collect about you to:\n- Provide, maintain, and improve our services.\n- Process and facilitate transactions and payments.\n- Send you related information, including confirmations and receipts.\n- Provide customer support.\n- Send you promotional messages, marketing, and other information that may be of interest to you.\n\n**3. Sharing of Information**\nWe may share the information we collect about you as described in this Statement, including as follows:\n- With third-party property owners to facilitate your bookings.\n- With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.\n- In response to a request for information by a competent authority if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process.\n\n**4. Security**\nWe take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All payment data is encrypted and handled by Stripe.'))}
          {renderSettingItem('file-text', 'Terms of Service', 'Rules and guidelines', undefined, () => navigateToContent('Terms of Service', '**Terms of Service**\n\nLast Updated: August 28, 2024\n\n**1. Acceptance of Terms**\nBy accessing and using the BharatBhraman application, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.\n\n**2. User Accounts**\n- You must be at least 18 years old to create an account and book properties.\n- You are responsible for maintaining the confidentiality of your account credentials.\n- You agree to provide accurate, current, and complete information during the registration process.\n\n**3. Booking and Cancellations**\n- A booking is only confirmed once full payment is received.\n- Users are subject to the specific cancellation policies of the individual properties they book.\n- BharatBhraman reserves the right to cancel bookings in cases of suspected fraud or system errors.\n\n**4. User Conduct**\nYou agree not to:\n- Use the platform for any illegal or unauthorized purpose.\n- Violate any laws in your jurisdiction.\n- Interfere with or disrupt the security, integrity, or performance of the app.\n- Provide false information or impersonate another person.\n\n**5. Limitation of Liability**\nBharatBhraman acts solely as an intermediary between users and property hosts. We are not liable for any injuries, losses, or damages incurred during your stay at a booked property.\n\n**6. Changes to Terms**\nWe reserve the right to modify these terms at any time. We will notify users of any significant changes via email or app notifications.'))}
          {renderSettingItem('info', 'App Version', 'v1.0.4', <Text style={styles.versionText}>Up to date</Text>)}
        </View>

        <Text style={styles.sectionTitle}>Account Actions</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.deleteAccountBtn} onPress={handleDeleteAccount}>
            <Feather name="trash-2" size={20} color="#FF3B30" />
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40, // standard header padding
    backgroundColor: '#FAF9F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3B20',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F9F1',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3B20',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  settingRightContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  versionText: {
    fontSize: 13,
    color: '#999',
  },
  deleteAccountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  deleteAccountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
});
