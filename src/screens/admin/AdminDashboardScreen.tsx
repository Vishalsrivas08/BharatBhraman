import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const METRICS = [
  { id: '1', title: 'Total Revenue', value: '₹12.4L', trend: '+15%', isPositive: true, icon: 'dollar-sign' },
  { id: '2', title: 'Active Bookings', value: '42', trend: '+5%', isPositive: true, icon: 'calendar' },
  { id: '3', title: 'Total Users', value: '1,284', trend: '+12%', isPositive: true, icon: 'users' },
  { id: '4', title: 'Occupancy Rate', value: '78%', trend: '-2%', isPositive: false, icon: 'home' },
];

const RECENT_BOOKINGS = [
  { id: '1', user: 'Rahul Sharma', property: 'Taj Mahua Kothi', date: 'Aug 12 - Aug 15', status: 'Confirmed', amount: '₹75,000', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' },
  { id: '2', user: 'Priya Patel', property: 'Ranthambore Tiger Camp', date: 'Aug 14 - Aug 16', status: 'Pending', amount: '₹30,000', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { id: '3', user: 'Amit Kumar', property: 'The Serai Bandipur', date: 'Aug 18 - Aug 20', status: 'Confirmed', amount: '₹36,000', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80' },
  { id: '4', user: 'Sneha Gupta', property: 'SUJÁN Sher Bagh', date: 'Aug 22 - Aug 25', status: 'Cancelled', amount: '₹1,20,000', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
];

export default function AdminDashboardScreen({ navigation }: any) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#34C759';
      case 'Pending': return '#FF9500';
      case 'Cancelled': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Feather name="bell" size={20} color="#1E3B20" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {METRICS.map((metric) => (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.metricIconContainer}>
                  <Feather name={metric.icon as any} size={16} color="#1E3B20" />
                </View>
                <View style={[styles.trendBadge, { backgroundColor: metric.isPositive ? '#E8F5E9' : '#FFEBEE' }]}>
                  <Feather
                    name={metric.isPositive ? 'trending-up' : 'trending-down'}
                    size={12}
                    color={metric.isPositive ? '#2E7D32' : '#C62828'}
                  />
                  <Text style={[styles.trendText, { color: metric.isPositive ? '#2E7D32' : '#C62828' }]}>
                    {metric.trend}
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Manage')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Feather name="plus-circle" size={24} color="#16A34A" />
            </View>
            <Text style={styles.actionText}>Add Property</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ManageUsers')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
              <Feather name="users" size={24} color="#2563EB" />
            </View>
            <Text style={styles.actionText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('AdminReports')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEF2F2' }]}>
              <Feather name="file-text" size={24} color="#DC2626" />
            </View>
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Bookings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AdminAllBookings')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingsContainer}>
          {RECENT_BOOKINGS.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Image source={{ uri: booking.image }} style={styles.userImage} />
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingUser}>{booking.user}</Text>
                <Text style={styles.bookingProperty} numberOfLines={1}>{booking.property}</Text>
                <Text style={styles.bookingDate}>{booking.date}</Text>
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingAmount}>{booking.amount}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '15' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>{booking.status}</Text>
                </View>
              </View>
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
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3B20',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D29948',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
  bookingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  bookingDetails: {
    flex: 1,
    marginLeft: 12,
  },
  bookingUser: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3B20',
    marginBottom: 2,
  },
  bookingProperty: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 12,
    color: '#999',
  },
  bookingRight: {
    alignItems: 'flex-end',
  },
  bookingAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
