import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AVATARS = [
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
];

const PROPERTIES = [
  'Taj Mahua Kothi',
  'The Serai Bandipur',
  'Evolve Back Kabini',
  'Oberoi Vanyavilas',
  'Aman-i-Khas'
];

const STATUSES = ['Confirmed', 'Pending', 'Cancelled'];

const MOCK_BOOKINGS = Array.from({ length: 42 }).map((_, i) => ({
  id: `BKG-${1000 + i}`,
  user: `User ${i + 1}`,
  property: PROPERTIES[i % PROPERTIES.length],
  date: `Aug ${10 + (i % 20)}, 2024`,
  amount: `₹${(15 + (i % 10)) * 1000}`,
  status: STATUSES[i % 3],
  image: AVATARS[i % AVATARS.length]
}));

export default function AdminAllBookingsScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredBookings = MOCK_BOOKINGS.filter(b => {
    const matchesSearch = b.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const renderBookingCard = ({ item }: any) => (
    <View style={styles.bookingCard}>
      <Image source={{ uri: item.image }} style={styles.userImage} />
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingUser}>{item.user}</Text>
        <Text style={styles.bookingProperty} numberOfLines={1}>{item.property}</Text>
        <Text style={styles.bookingDate}>{item.date} • {item.id}</Text>
      </View>
      <View style={styles.bookingRight}>
        <Text style={styles.bookingAmount}>{item.amount}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, property, or ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBookings}
        keyExtractor={item => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or filters.</Text>
          </View>
        }
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
    paddingVertical: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3B20',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#1E3B20',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bookingCard: {
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
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingUser: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  bookingProperty: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bookingRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bookingAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
