import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsScreen({ navigation }: any) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: 'Booking Confirmed!',
      message: 'Your stay at Taj Lake Palace is confirmed for Oct 15-18.',
      time: '2 hours ago',
      icon: 'check-circle',
      iconColor: '#4CAF50',
      bgColor: '#E8F5E9',
      unread: true,
      route: 'Bookings', // Where to navigate on press
    },
    {
      id: 2,
      title: 'Exclusive Offer 🌟',
      message: 'Get 20% off on luxury heritage stays in Rajasthan this weekend.',
      time: '1 day ago',
      icon: 'gift',
      iconColor: '#D29948',
      bgColor: '#FFF8ED',
      unread: true,
      route: 'Explore',
    },
    {
      id: 3,
      title: 'Upcoming Trip Reminder',
      message: 'Pack your bags! Your trip to Goa is just 3 days away.',
      time: '2 days ago',
      icon: 'calendar',
      iconColor: '#2196F3',
      bgColor: '#E3F2FD',
      unread: false,
      route: 'Bookings',
    },
    {
      id: 4,
      title: 'Review Requested',
      message: 'How was your stay at The Oberoi Amarvilas? Leave a review and earn 500 credits.',
      time: '1 week ago',
      icon: 'star',
      iconColor: '#FFC107',
      bgColor: '#FFFDE7',
      unread: false,
      route: 'Profile',
    }
  ]);

  const handleTogglePreference = (type: string, currentValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(!currentValue);
    Alert.alert('Preferences Updated', `${type} notifications have been ${!currentValue ? 'enabled' : 'disabled'}.`);
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => prev.map(notif => ({ ...notif, unread: false })));
    Alert.alert('Success', 'All notifications marked as read.');
  };

  const handleNotificationPress = (notif: any) => {
    // Mark as read
    setNotificationsList(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));

    // Show alert or navigate
    Alert.alert(notif.title, notif.message, [
      { text: 'Close', style: 'cancel' },
      {
        text: 'View', onPress: () => {
          if (notif.route) {
            navigation.navigate(notif.route);
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FDFCFB', '#F3F9F1']}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.markReadButton} onPress={handleMarkAllAsRead}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Notification Preferences */}
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Push Notifications</Text>
                <Text style={styles.preferenceDesc}>Receive alerts on your device</Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={() => handleTogglePreference('Push', pushEnabled, setPushEnabled)}
                trackColor={{ false: '#ddd', true: '#4CAF50' }}
                thumbColor={'#fff'}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Email Notifications</Text>
                <Text style={styles.preferenceDesc}>Receive booking updates via email</Text>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={() => handleTogglePreference('Email', emailEnabled, setEmailEnabled)}
                trackColor={{ false: '#ddd', true: '#4CAF50' }}
                thumbColor={'#fff'}
              />
            </View>

            <View style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>SMS Alerts</Text>
                <Text style={styles.preferenceDesc}>Receive important alerts via SMS</Text>
              </View>
              <Switch
                value={smsEnabled}
                onValueChange={() => handleTogglePreference('SMS', smsEnabled, setSmsEnabled)}
                trackColor={{ false: '#ddd', true: '#4CAF50' }}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          {/* Recent Notifications */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent</Text>

            {notificationsList.map((notif) => (
              <TouchableOpacity
                key={notif.id}
                style={[styles.notificationCard, notif.unread && styles.unreadCard]}
                onPress={() => handleNotificationPress(notif)}
              >
                <View style={[styles.iconContainer, { backgroundColor: notif.bgColor }]}>
                  <Feather name={notif.icon as any} size={20} color={notif.iconColor} />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={[styles.notificationTitle, notif.unread && styles.unreadText]}>
                      {notif.title}
                    </Text>
                    <Text style={styles.notificationTime}>{notif.time}</Text>
                  </View>
                  <Text style={styles.notificationMessage} numberOfLines={2}>
                    {notif.message}
                  </Text>
                </View>

                {notif.unread && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFCFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
  },
  markReadButton: {
    padding: 8,
  },
  markReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D29948',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 16,
  },
  preferencesSection: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  preferenceInfo: {
    flex: 1,
    paddingRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  preferenceDesc: {
    fontSize: 13,
    color: '#666',
  },
  recentSection: {
    marginBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  unreadCard: {
    backgroundColor: '#F3F9F1',
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadText: {
    color: '#1E3B20',
    fontWeight: '700',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginLeft: 12,
  },
});
