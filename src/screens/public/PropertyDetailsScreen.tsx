import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/WishlistContext';

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen({ route, navigation }: any) {
  const { property } = route.params || {};
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const { isSaved, toggleStay } = useWishlist();

  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1E3B20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Property details not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rooms = property.rooms && property.rooms.length > 0 ? property.rooms : [
    { name: 'Standard Room', features: '1 Queen Bed • Free Wi-Fi', price: '₹5,000' },
    { name: 'Deluxe Room', features: '1 King Bed • Balcony • Free Breakfast', price: '₹8,500' },
    { name: 'Luxury Suite', features: '1 King Bed • Jacuzzi • Free Breakfast', price: '₹15,000' },
  ];

  const currentPrice = rooms[selectedRoomIndex]?.price || property.price;

  const handleBookNow = () => {
    navigation.navigate('Checkout', {
      property: {
        ...property,
        price: currentPrice
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* HERO IMAGE */}
        <ImageBackground source={{ uri: property.image }} style={styles.heroImage}>
          <SafeAreaView style={styles.heroSafeArea}>
            <View style={styles.heroHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <Feather name="arrow-left" size={24} color="#1E3B20" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => toggleStay(property)}>
                <Ionicons
                  name={isSaved(property.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={isSaved(property.id) ? "#FF3B30" : "#1E3B20"}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        {/* DETAILS SECTION */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.propertyTitle} numberOfLines={2}>{property.title}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#D29948" />
              <Text style={styles.ratingText}>{property.rating}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Feather name="map-pin" size={16} color="#666" style={{ marginTop: 2 }} />
            <Text style={styles.infoText}>{property.fullAddress || property.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="phone" size={16} color="#666" style={{ marginTop: 2 }} />
            <Text style={styles.infoText}>{property.phone || '+91 98765 43210'}</Text>
          </View>

          {/* ROOM OPTIONS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Options</Text>

            {rooms.map((room: any, index: number) => {
              const isSelected = selectedRoomIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedRoomIndex(index)}
                  style={[
                    styles.roomCard,
                    isSelected && styles.roomCardSelected
                  ]}
                >
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    <Text style={styles.roomFeatures}>{room.features}</Text>
                  </View>
                  <View style={styles.roomPriceContainer}>
                    <Text style={[styles.roomPrice, isSelected && styles.roomPriceSelected]}>{room.price}</Text>
                    <Text style={styles.roomPeriod}>/ night</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ABOUT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              Experience luxury and comfort at {property.title}. Located in the heart of {property.location}, this property offers unparalleled service and world-class amenities to make your stay unforgettable.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPrice}>{currentPrice}</Text>
          <Text style={styles.bottomPeriod}>Total price / night</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  heroImage: {
    width: width,
    height: 350,
  },
  heroSafeArea: {
    flex: 1,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsContainer: {
    backgroundColor: '#FAF9F6',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  propertyTitle: {
    flex: 1,
    fontSize: 26,
    fontWeight: '800',
    color: '#1E3B20',
    marginRight: 16,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF3E7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D29948',
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 16,
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  roomCardSelected: {
    borderColor: '#1E3B20',
    backgroundColor: '#F3F9F1',
  },
  roomInfo: {
    flex: 1,
    marginRight: 16,
  },
  roomName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 4,
  },
  roomFeatures: {
    fontSize: 13,
    color: '#666',
  },
  roomPriceContainer: {
    alignItems: 'flex-end',
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
  },
  roomPriceSelected: {
    color: '#D29948',
  },
  roomPeriod: {
    fontSize: 12,
    color: '#999',
  },
  noRoomsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  aboutText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E3B20',
  },
  bottomPeriod: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: '#1E3B20',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
