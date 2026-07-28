import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/WishlistContext';

export default function SavedStaysScreen({ navigation }: any) {
  const { savedStays, toggleStay } = useWishlist();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Stays</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {savedStays.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={64} color="#ccc" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>No saved stays yet</Text>
            <Text style={styles.emptySubtitle}>Properties you heart will appear here so you can easily find them later.</Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.exploreBtnText}>Start Exploring</Text>
            </TouchableOpacity>
          </View>
        ) : (
          savedStays.map((stay: any) => (
            <TouchableOpacity
              key={stay.id}
              activeOpacity={0.9}
              style={styles.stayCard}
              onPress={() => navigation.navigate('PropertyDetails', { property: stay })}
            >
              <ImageBackground
                source={{ uri: stay.image || (stay.images && stay.images[0]) }}
                style={styles.stayImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <View style={styles.stayImageOverlay} />
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => toggleStay(stay)}
                >
                  <Ionicons name="heart" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </ImageBackground>
              <View style={styles.stayInfo}>
                <View style={styles.stayTitleRow}>
                  <Text style={styles.stayTitle}>{stay.title}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#D29948" />
                    <Text style={styles.ratingText}>{stay.rating}</Text>
                  </View>
                </View>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={14} color="#666" />
                  <Text style={styles.locationText}>{stay.location}</Text>
                </View>
                <Text style={styles.priceText}>{stay.price} <Text style={styles.pricePeriod}>/ night</Text></Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  exploreBtn: {
    backgroundColor: '#1E3B20',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  stayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  stayImage: {
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
  },
  stayImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 16,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  stayInfo: {
    padding: 16,
  },
  stayTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF3E7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D29948',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3B20',
  },
  pricePeriod: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
});
