import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Booking } from '../../context/BookingContext';

export default function BookingDetailsScreen({ route, navigation }: any) {
  const { booking } = route.params || {};

  if (!booking) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1E3B20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Booking details missing.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const typedBooking = booking as Booking;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <View style={styles.statusContainer}>
          <Feather name="check-circle" size={48} color="#2E7D32" style={{ marginBottom: 16 }} />
          <Text style={styles.statusTitle}>Booking Confirmed</Text>
          <Text style={styles.bookingId}>Booking ID: {typedBooking.id.toUpperCase()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Information</Text>
          <View style={styles.propertyCard}>
            <Image source={{ uri: typedBooking.propertyImage }} style={styles.propertyImage} />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle} numberOfLines={2}>{typedBooking.propertyTitle}</Text>
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={12} color="#666" />
                <Text style={styles.locationText} numberOfLines={2}>{typedBooking.propertyLocation}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reservation Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Guest Name</Text>
            <Text style={styles.detailValue}>{typedBooking.customerName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Check-in Date</Text>
            {/* Using the booking date as check-in for simplicity */}
            <Text style={styles.detailValue}>{new Date(typedBooking.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{typedBooking.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Base Price</Text>
            <Text style={styles.detailValue}>{typedBooking.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Taxes & Fees</Text>
            <Text style={styles.detailValue}>₹2,500</Text>
          </View>

          <View style={[styles.detailRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>
              ₹{((parseInt((typedBooking.price || '15000').replace(/[^0-9]/g, '')) || 15000) + 2500).toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Download Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Contact Support</Text>
        </TouchableOpacity>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  statusContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 8,
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 16,
  },
  propertyCard: {
    flexDirection: 'row',
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  propertyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
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
  totalRow: {
    marginTop: 8,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D29948',
  },
  actionButton: {
    backgroundColor: '#1E3B20',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1E3B20',
    fontSize: 16,
    fontWeight: '700',
  }
});
