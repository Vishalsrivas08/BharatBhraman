import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/WishlistContext';

export default function CollectionPropertiesScreen({ route, navigation }: any) {
  const { title } = route.params || { title: 'Collection' };
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const itemsPerPage = 10;
  const { isSaved, toggleStay } = useWishlist();

  // Helper to generate 30 dummy properties based on the collection title
  const generateProperties = (collectionTitle: string) => {
    const isSafari = collectionTitle.toLowerCase().includes('safari');
    const isTent = collectionTitle.toLowerCase().includes('tent') || collectionTitle.toLowerCase().includes('glamp');
    const isPalace = collectionTitle.toLowerCase().includes('palace') || collectionTitle.toLowerCase().includes('heritage');

    let baseNames = [];
    let baseLocations = [];
    let images = [];
    let basePrice = 5000;

    if (isSafari) {
      baseNames = ['Tiger Camp', 'Jungle Lodge', 'Wilderness Retreat', 'Safari Oasis', 'Elephant Corridor Lodge', 'Leopard Spot Resort'];
      baseLocations = ['Ranthambore, Rajasthan', 'Bandhavgarh, MP', 'Kanha, MP', 'Jim Corbett, Uttarakhand', 'Kaziranga, Assam', 'Bandipur, Karnataka'];
      images = [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1590274797072-a1b7e6ef22e8?auto=format&fit=crop&q=80&w=800'
      ];
      basePrice = 12000;
    } else if (isTent) {
      baseNames = ['Desert Glamping', 'Nomad Tents', 'Oasis Camp', 'Luxury Canopy', 'Sand Dune Resort', 'Starry Night Camp'];
      baseLocations = ['Jaisalmer, Rajasthan', 'Pushkar, Rajasthan', 'Ladakh, J&K', 'Rann of Kutch, Gujarat', 'Spiti Valley, HP'];
      images = [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800'
      ];
      basePrice = 8000;
    } else if (isPalace) {
      baseNames = ['Royal Palace', 'Heritage Fort', 'Maharaja Suite', 'Rajputana Heritage', 'Imperial Castle', 'Crown Palace'];
      baseLocations = ['Jaipur, Rajasthan', 'Udaipur, Rajasthan', 'Jodhpur, Rajasthan', 'Mysore, Karnataka', 'Gwalior, MP'];
      images = [
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?auto=format&fit=crop&q=80&w=800'
      ];
      basePrice = 25000;
    } else {
      // Default to Mountain Resorts / others
      baseNames = ['Snow View Resort', 'Pine Valley Retreat', 'Himalayan Lodge', 'Peak Summit Hotel', 'Cloud Nine Resort', 'Valley View Chalet'];
      baseLocations = ['Manali, HP', 'Shimla, HP', 'Darjeeling, WB', 'Munnar, Kerala', 'Gulmarg, J&K', 'Nainital, Uttarakhand'];
      images = [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
      ];
      basePrice = 6000;
    }

    const properties = [];
    for (let i = 1; i <= 30; i++) {
      const namePrefix = ['The Grand', 'Majestic', 'Hidden', 'Serene', 'Royal', 'Wild'][i % 6];
      const baseName = baseNames[i % baseNames.length];
      const location = baseLocations[i % baseLocations.length];
      const image = images[i % images.length];
      const price = basePrice + (i * 500); // varying prices
      const rating = (4.0 + (i % 10) / 10).toFixed(1); // varying ratings 4.0 - 4.9

      properties.push({
        id: i.toString(),
        title: `${namePrefix} ${baseName}`,
        rating,
        location,
        fullAddress: `Plot No. ${i * 42}, Near Main Road, ${location}`,
        phone: `+91 ${9000000000 + i * 12345}`,
        price: `₹${price.toLocaleString()}`,
        image,
        rooms: [
          { name: 'Deluxe Room', features: '1 King Bed • City View', price: `₹${price.toLocaleString()}` },
          { name: 'Executive Suite', features: '1 King Bed • Living Area • Balcony', price: `₹${(price * 1.5).toLocaleString()}` },
          { name: 'Presidential Suite', features: '2 Bedrooms • Panoramic View • Private Pool', price: `₹${(price * 3).toLocaleString()}` }
        ]
      });
    }

    return properties;
  };

  const PROPERTIES = useMemo(() => generateProperties(title), [title]);

  const totalPages = Math.ceil(PROPERTIES.length / itemsPerPage);
  const displayedProperties = PROPERTIES.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.content}>
        {displayedProperties.map((property) => (
          <TouchableOpacity
            key={property.id}
            style={styles.stayCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PropertyDetails', { property })}
          >
            <ImageBackground
              source={{ uri: property.image }}
              style={styles.stayImage}
              imageStyle={{ borderRadius: 16 }}
            >
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => toggleStay(property)}
              >
                <Ionicons
                  name={isSaved(property.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={isSaved(property.id) ? "#FF3B30" : "#fff"}
                />
              </TouchableOpacity>
            </ImageBackground>
            <View style={styles.stayInfo}>
              <View style={styles.stayTitleRow}>
                <Text style={styles.stayTitle}>{property.title}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#D29948" />
                  <Text style={styles.ratingText}>{property.rating}</Text>
                </View>
              </View>
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={14} color="#666" />
                <Text style={styles.locationText}>{property.location}</Text>
              </View>
              <View style={styles.priceBookingRow}>
                <Text style={styles.priceText}>{property.price} <Text style={styles.pricePeriod}>/ night</Text></Text>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => navigation.navigate('PropertyDetails', { property })}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            disabled={currentPage === 1}
            onPress={() => {
              setCurrentPage(prev => prev - 1);
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <Feather name="chevron-left" size={20} color={currentPage === 1 ? '#999' : '#1E3B20'} />
            <Text style={[styles.pageButtonText, currentPage === 1 && { color: '#999' }]}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfoText}>Page {currentPage} of {totalPages}</Text>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            disabled={currentPage === totalPages}
            onPress={() => {
              setCurrentPage(prev => prev + 1);
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            }}
          >
            <Text style={[styles.pageButtonText, currentPage === totalPages && { color: '#999' }]}>Next</Text>
            <Feather name="chevron-right" size={20} color={currentPage === totalPages ? '#999' : '#1E3B20'} />
          </TouchableOpacity>
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
  stayCard: {
    marginBottom: 24,
  },
  stayImage: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 12,
  },
  heartButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stayInfo: {
    paddingTop: 12,
  },
  stayTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF3E7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  pricePeriod: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  priceBookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  bookButton: {
    backgroundColor: '#1E3B20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pageButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3B20',
    marginHorizontal: 4,
  },
  pageInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});
