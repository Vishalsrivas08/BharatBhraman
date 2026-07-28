import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MOCK_LOGS = [
  { id: '1', action: 'Updated Property Price', target: 'Taj Mahua Kothi', time: '10:42 AM Today', user: 'Admin User', type: 'edit' },
  { id: '2', action: 'Deleted Property', target: 'The Serai Bandipur', time: '09:15 AM Today', user: 'Admin User', type: 'delete' },
  { id: '3', action: 'Created New User', target: 'Rahul Sharma', time: 'Yesterday, 4:30 PM', user: 'Super Admin', type: 'create' },
  { id: '4', action: 'Changed System Setting', target: 'Maintenance Mode', time: 'Aug 24, 2:00 PM', user: 'Admin User', type: 'setting' },
  { id: '5', action: 'Issued Refund', target: 'Booking #BB-8492', time: 'Aug 23, 11:20 AM', user: 'Billing Admin', type: 'financial' },
];

export default function AuditLogsScreen({ navigation }: any) {

  const getIconForType = (type: string) => {
    switch (type) {
      case 'edit': return { name: 'edit-2', color: '#2563EB', bg: '#EFF6FF' };
      case 'delete': return { name: 'trash-2', color: '#DC2626', bg: '#FEF2F2' };
      case 'create': return { name: 'plus-circle', color: '#16A34A', bg: '#F0FDF4' };
      case 'setting': return { name: 'settings', color: '#4B5563', bg: '#F3F4F6' };
      case 'financial': return { name: 'dollar-sign', color: '#D29948', bg: '#FFF8ED' };
      default: return { name: 'activity', color: '#1E3B20', bg: '#F3F9F1' };
    }
  };

  const renderLogItem = ({ item }: any) => {
    const iconConfig = getIconForType(item.type);

    return (
      <View style={styles.logCard}>
        <View style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}>
          <Feather name={iconConfig.name as any} size={18} color={iconConfig.color} />
        </View>
        <View style={styles.logDetails}>
          <Text style={styles.logAction}>{item.action}</Text>
          <Text style={styles.logTarget}>{item.target}</Text>
          <View style={styles.logMeta}>
            <Text style={styles.logTime}>{item.time}</Text>
            <Text style={styles.logUser}> • by {item.user}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Audit Logs</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={MOCK_LOGS}
        keyExtractor={item => item.id}
        renderItem={renderLogItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logCard: {
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
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logDetails: {
    flex: 1,
  },
  logAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  logTarget: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  logMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  logUser: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
