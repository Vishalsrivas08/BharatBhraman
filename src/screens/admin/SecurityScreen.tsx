import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SecurityScreen({ navigation }: any) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const activeSessions = [
    { id: '1', device: 'MacBook Pro 16"', location: 'Mumbai, India', time: 'Active now', isCurrent: true, icon: 'monitor' },
    { id: '2', device: 'iPhone 13 Pro', location: 'Delhi, India', time: 'Last active: 2 hours ago', isCurrent: false, icon: 'smartphone' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security & Access</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Login Security</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => Alert.alert('Change Password', 'An email with reset instructions has been sent to your registered address.')}
          >
            <View style={styles.actionIcon}>
              <Feather name="lock" size={20} color="#1E3B20" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Change Password</Text>
              <Text style={styles.actionSubtitle}>Last changed 3 months ago</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Feather name="shield" size={20} color="#1E3B20" />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Two-Factor Authentication</Text>
              <Text style={styles.actionSubtitle}>Secure your account with 2FA</Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: '#D1D5DB', true: '#1E3B20' }}
              thumbColor={'#fff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Sessions</Text>
          <Text style={styles.sectionSubtitle}>Devices currently logged into your admin account.</Text>

          {activeSessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionIconContainer}>
                <Feather name={session.icon as any} size={20} color="#6B7280" />
              </View>
              <View style={styles.sessionDetails}>
                <Text style={styles.sessionDevice}>{session.device}</Text>
                <Text style={styles.sessionLocation}>{session.location} • {session.time}</Text>
              </View>
              {session.isCurrent ? (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>This Device</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={() => Alert.alert('Log Out Device', `Are you sure you want to log out ${session.device}?`)}>
                  <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
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
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sessionDetails: {
    flex: 1,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sessionLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  currentBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
});
