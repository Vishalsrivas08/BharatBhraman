import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AdminNotificationsScreen({ navigation }: any) {
  const [alerts, setAlerts] = useState({
    newBookings: true,
    cancellations: true,
    paymentFailures: true,
    newUsers: false,
    systemDowntime: true,
    weeklyReports: false,
  });

  const toggleAlert = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const NotificationItem = ({ title, description, stateKey }: { title: string, description: string, stateKey: keyof typeof alerts }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDesc}>{description}</Text>
      </View>
      <Switch
        value={alerts[stateKey]}
        onValueChange={() => toggleAlert(stateKey)}
        trackColor={{ false: '#D1D5DB', true: '#1E3B20' }}
        thumbColor={'#fff'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking & Transactions</Text>
          <View style={styles.card}>
            <NotificationItem
              title="New Bookings"
              description="Get notified instantly when a new booking is confirmed."
              stateKey="newBookings"
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Cancellations"
              description="Alerts for customer-initiated cancellations."
              stateKey="cancellations"
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Payment Failures"
              description="Alerts when a high-value transaction fails."
              stateKey="paymentFailures"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System & Administrative</Text>
          <View style={styles.card}>
            <NotificationItem
              title="New User Registrations"
              description="Daily summary of new user sign-ups."
              stateKey="newUsers"
            />
            <View style={styles.divider} />
            <NotificationItem
              title="System Downtime"
              description="Critical alerts for server or database issues."
              stateKey="systemDowntime"
            />
            <View style={styles.divider} />
            <NotificationItem
              title="Weekly Reports"
              description="Receive weekly analytics reports via push notification."
              stateKey="weeklyReports"
            />
          </View>
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
    paddingVertical: 40,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  notificationTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
});
