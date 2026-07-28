import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useBooking, Booking } from '../../context/BookingContext';
import { Feather } from '@expo/vector-icons';

export default function BookingsScreen({ navigation }: any) {
  const { bookings } = useBooking();

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { booking: item })}
    >
      <Image source={{ uri: item.propertyImage }} style={styles.propertyImage} />
      <View style={styles.bookingInfo}>
        <Text style={styles.propertyTitle} numberOfLines={1}>{item.propertyTitle}</Text>
        <Text style={styles.locationText} numberOfLines={1}>
          <Feather name="map-pin" size={12} color="#666" /> {item.propertyLocation}
        </Text>

        <View style={styles.detailsRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.dateText}>
          Booked on: {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyContent}>
          <Feather name="calendar" size={48} color="#ccc" style={{ marginBottom: 16 }} />
          <Text style={styles.subtitle}>You have no upcoming trips.</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3B20',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 20,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  propertyImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  bookingInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3B20',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 10,
    color: '#999',
  },
});
