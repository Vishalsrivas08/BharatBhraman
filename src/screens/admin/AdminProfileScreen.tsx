import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function AdminProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'settings', label: 'System Settings', route: 'SystemSettings' },
    { icon: 'shield', label: 'Security & Access', route: 'Security' },
    { icon: 'bell', label: 'Notification Preferences', route: 'AdminNotifications' },
    { icon: 'activity', label: 'Audit Logs', route: 'AuditLogs' },
    { icon: 'help-circle', label: 'Admin Support', route: 'AdminSupport' },
  ];

  const handleFeatureUnavailable = (featureName: string) => {
    Alert.alert('Coming Soon', `${featureName} will be available in the next administrative update.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit-2" size={20} color="#1E3B20" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={typeof user.profilePicture === 'string' ? { uri: user.profilePicture } : user.profilePicture}
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.tierBadge}>
              <Feather name="shield" size={12} color="#2563EB" />
              <Text style={styles.tierText}>Super Admin</Text>
            </View>
          </View>
        </View>

        {/* System Health Card */}
        <View style={styles.systemCard}>
          <View>
            <Text style={styles.systemTitle}>System Status</Text>
            <Text style={styles.systemStatus}>All Systems Operational</Text>
          </View>
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.route === 'SystemSettings') {
                  navigation.navigate('Settings');
                } else if (item.route === 'Security') {
                  navigation.navigate('Security');
                } else if (item.route === 'AdminNotifications') {
                  navigation.navigate('AdminNotifications');
                } else if (item.route === 'AuditLogs') {
                  navigation.navigate('AuditLogs');
                } else if (item.route === 'AdminSupport') {
                  navigation.navigate('AdminSupport');
                } else {
                  handleFeatureUnavailable(item.label);
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                <Feather name={item.icon as any} size={20} color="#1E3B20" />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Feather name="log-out" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3B20',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userDetails: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    marginLeft: 6,
  },
  systemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3B20',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#1E3B20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  systemTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  systemStatus: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statusIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ADE80', // bright green
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
