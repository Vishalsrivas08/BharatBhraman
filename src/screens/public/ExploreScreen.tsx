import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Platform,
  Alert,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const CURATED_COLLECTIONS = [
  { id: '1', title: 'Safaris', count: '124 PROPERTIES', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' },
  { id: '2', title: 'Glamping', count: '86 PROPERTIES', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600' },
  { id: '3', title: 'Heritage Palaces', count: '45 PROPERTIES', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600' },
  { id: '4', title: 'Mountain Resorts', count: '92 PROPERTIES', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600' },
  { id: '5', title: 'Beachfront', count: '58 PROPERTIES', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=600' },
  { id: '6', title: 'Wellness', count: '34 PROPERTIES', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600' }
];

const FEATURED_STAYS = [
  {
    id: 's1',
    title: 'Ranthambore Tiger Camp',
    location: 'Ranthambore, Rajasthan',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    price: '₹15,000',
    rating: '4.9',
  },
  {
    id: 's2',
    title: 'Taj Mahua Kothi',
    location: 'Bandhavgarh, MP',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
    price: '₹25,000',
    rating: '4.8',
  },
  {
    id: 's3',
    title: 'The Serai Bandipur',
    location: 'Bandipur, Karnataka',
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1590274797072-a1b7e6ef22e8?auto=format&fit=crop&q=80&w=400'
    ],
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400',
    price: '₹18,000',
    rating: '5.0',
    isSplit: false
  }
];

const OFFERS = [
  { id: '1', title: 'Summer Escape', subtitle: 'Get 20% off on all mountain resorts', code: 'SUMMER20', color: '#E8F5E9', icon: 'sun' },
  { id: '2', title: 'First Booking', subtitle: 'Flat ₹2000 off on your first luxury stay', code: 'WELCOME2K', color: '#FFF3E0', icon: 'gift' },
  { id: '3', title: 'Weekend Gateway', subtitle: 'Book 2 nights, get 3rd night at 50% off', code: 'WEEKEND50', color: '#E3F2FD', icon: 'calendar' }
];

export default function ExploreScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isSaved, toggleStay } = useWishlist();

  const handleLocationChange = (text: string) => {
    setLocation(text);
    if (text.length > 0) {
      const filtered = INDIAN_STATES.filter(state =>
        state.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const selectState = (state: string) => {
    setLocation(state);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (!location.trim() || !date) {
      Alert.alert('Missing Details', 'Please select both a destination and dates.');
      return;
    }
    navigation.navigate('CollectionProperties', { title: `Search: ${location}` });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400' }}
          style={styles.header}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.headerLogo}>BHARAT</Text>
            <Text style={styles.headerLogoAccent}>BHRAMAN</Text>
          </View>
          <TouchableOpacity onPress={() => setShowProfileCard(true)}>
            <Image
              source={typeof user?.profilePicture === 'string' ? { uri: user.profilePicture } : user?.profilePicture}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </ImageBackground>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        <View style={styles.heroContainer}>
          <View style={styles.heroGreenTop} />
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1400' }}
            style={styles.heroBackground}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />
            <Text style={styles.heroTitle}>Escape into the{'\n'}<Text style={{ fontStyle: 'italic' }}>Rugged Luxury</Text> of{'\n'}Nature.</Text>

            <View style={styles.searchCard}>
              <View style={[styles.searchInputRow, { zIndex: 10 }]}>
                <Feather name="map-pin" size={20} color="#666" style={styles.searchIcon} />
                <View style={{ flex: 1, zIndex: 10 }}>
                  <Text style={styles.searchLabel}>WHERE TO?</Text>
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder="E.g., Maharashtra, Goa"
                    placeholderTextColor="#999"
                    value={location}
                    onChangeText={handleLocationChange}
                    onFocus={() => {
                      if (location.length > 0) setShowDropdown(true);
                    }}
                  />
                  {showDropdown && filteredStates.length > 0 ? (
                    <View style={styles.dropdownContainer}>
                      <ScrollView style={styles.dropdownScroll} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                        {filteredStates.map((state, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => selectState(state)}
                          >
                            <Text style={styles.dropdownItemText}>{state}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={styles.searchDivider} />
              <TouchableOpacity style={styles.searchInputRow} onPress={() => setShowDatePicker(true)}>
                <Feather name="calendar" size={20} color="#666" style={styles.searchIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.searchLabel}>WHEN?</Text>
                  <Text style={date ? styles.searchValue : styles.searchPlaceholder}>
                    {date ? date.toDateString() : 'Add dates'}
                  </Text>
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}

              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Feather name="search" size={18} color="#fff" />
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>


        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Collections</Text>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => navigation.navigate('AllCollections')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Feather name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.collectionsScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {CURATED_COLLECTIONS.map(collection => (
              <TouchableOpacity
                key={collection.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CollectionProperties', { title: collection.title })}
              >
                <ImageBackground
                  source={{ uri: collection.image }}
                  style={styles.collectionCard}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View style={styles.collectionOverlay} />
                  <View style={styles.collectionTextContainer}>
                    <Text style={styles.collectionCardTitle}>{collection.title}</Text>
                    <Text style={styles.collectionCardSubtitle}>{collection.count}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { marginLeft: 20, marginBottom: 16 }]}>Offers for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {OFFERS.map(offer => (
              <TouchableOpacity
                key={offer.id}
                activeOpacity={0.8}
                style={[styles.offerCard, { backgroundColor: offer.color }]}
                onPress={() => {
                  Alert.alert('Promo Code Copied!', `The code ${offer.code} has been copied to your clipboard.`);
                }}
              >
                <View style={styles.offerIconContainer}>
                  <Feather name={offer.icon as any} size={24} color="#1E3B20" />
                </View>
                <View style={styles.offerTextContainer}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                  <View style={styles.offerCodeContainer}>
                    <Text style={styles.offerCodeText}>{offer.code}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { marginLeft: 20, marginBottom: 16 }]}>Featured Stays</Text>


          {FEATURED_STAYS.map(stay => (
            <TouchableOpacity
              key={stay.id}
              activeOpacity={0.9}
              style={styles.stayCard}
              onPress={() => navigation.navigate('PropertyDetails', { property: stay })}
            >
              {stay.isSplit ? (
                <View style={styles.splitImageContainer}>
                  <Image source={{ uri: stay.images![0] }} style={styles.splitImageLeft} />
                  <Image source={{ uri: stay.images![1] }} style={styles.splitImageRight} />
                  <TouchableOpacity
                    style={[styles.heartButton, { position: 'absolute', top: 12, right: 12 }]}
                    onPress={() => toggleStay(stay)}
                  >
                    <Ionicons
                      name={isSaved(stay.id) ? "heart" : "heart-outline"}
                      size={20}
                      color={isSaved(stay.id) ? "#FF3B30" : "#fff"}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <ImageBackground
                  source={{ uri: stay.image }}
                  style={styles.stayImage}
                  imageStyle={{ borderRadius: 16 }}
                >
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleStay(stay)}
                  >
                    <Ionicons
                      name={isSaved(stay.id) ? "heart" : "heart-outline"}
                      size={20}
                      color={isSaved(stay.id) ? "#FF3B30" : "#fff"}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )}
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
          ))}

        </View>

        <View style={styles.newsletterContainer}>
          <Text style={styles.newsletterTitle}>Get Weekly Inspiration</Text>
          <Text style={styles.newsletterSubtitle}>Join 50,000+ explorers discovering the hidden gems of India.</Text>
          <View style={styles.newsletterInputContainer}>
            <Feather name="mail" size={20} color="#9CA3AF" />
            <TextInput 
              style={styles.newsletterInput} 
              placeholder="Your email address" 
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity 
              style={styles.newsletterBtn}
              onPress={() => Alert.alert('Subscribed!', 'Welcome to the BharatBhraman newsletter.')}
            >
              <Text style={styles.newsletterBtnText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Profile Card Modal */}
      <Modal visible={showProfileCard} transparent={true} animationType="fade">
        <TouchableOpacity style={styles.profileModalOverlay} activeOpacity={1} onPress={() => setShowProfileCard(false)}>
          <View style={styles.profileCardWrapper}>
            <View style={styles.profileCardPointer} />
            <View style={styles.profileCard}>
              <Image source={typeof user?.profilePicture === 'string' ? { uri: user.profilePicture } : user?.profilePicture} style={styles.profileCardImage} />
              <Text style={styles.profileCardName}>{user?.name}</Text>
              <Text style={styles.profileCardEmail}>{user?.email}</Text>
              <Text style={styles.profileCardPhone}>{user?.phone}</Text>

              <TouchableOpacity
                style={styles.profileCardBtn}
                onPress={() => {
                  setShowProfileCard(false);
                  navigation.navigate('Profile');
                }}
              >
                <Text style={styles.profileCardBtnText}>Go to Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileCardLogoutBtn}
                onPress={() => {
                  setShowProfileCard(false);
                  logout();
                }}
              >
                <Feather name="log-out" size={16} color="#FF3B30" style={{ marginRight: 6 }} />
                <Text style={styles.profileCardLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  profileCardWrapper: {
    marginTop: 80, // Adjust this based on header height
    marginRight: 20,
    alignItems: 'flex-end',
  },
  profileCardPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    marginRight: 10, // Align under the profile picture
  },
  profileCard: {
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  profileCardImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F3F9F1',
  },
  profileCardName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3B20',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileCardEmail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    textAlign: 'center',
  },
  profileCardPhone: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileCardBtn: {
    backgroundColor: '#1E3B20',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  profileCardBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  profileCardLogoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 8,
  },
  profileCardLogoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 13,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  headerLogo: {
    fontSize: 28,
    lineHeight: 28,
    paddingTop: 4,
    fontWeight: '900',
    color: '#1E3B20',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  headerLogoAccent: {
    fontSize: 15,
    lineHeight: 14,
    fontWeight: '700',
    color: '#D29948',
    letterSpacing: 5,
    textTransform: 'uppercase',
    marginTop: 3,
    marginLeft: 7,
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
  },
  container: {
    flex: 1,
  },
  heroContainer: {
    marginBottom: 32,
  },
  heroGreenTop: {
    height: 1,
    backgroundColor: '#A3B19B', // The light sage green at the top of the image
  },
  heroBackground: {
    width: '100%',
    height: 480,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  heroImageStyle: {
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    paddingTop: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    lineHeight: 46,
    zIndex: 1,
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 16,
  },
  searchLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  searchTextInput: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    padding: 0,
    margin: 0,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    maxHeight: 150,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownScroll: {
    flexGrow: 0,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  searchValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
  },
  searchDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
  searchButton: {
    backgroundColor: '#1E3B20',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 32,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  newsletterContainer: {
    backgroundColor: '#1E3B20',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  newsletterSubtitle: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  newsletterInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 4,
    width: '100%',
  },
  newsletterInput: {
    flex: 1,
    height: 48,
    marginLeft: 12,
    fontSize: 15,
    color: '#111827',
  },
  newsletterBtn: {
    backgroundColor: '#D29948',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsletterBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3B20',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  collectionsScroll: {
    paddingBottom: 8,
  },
  collectionCard: {
    width: 240,
    height: 160,
    marginRight: 16,
    justifyContent: 'flex-end',
    padding: 16,
  },
  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
  },
  collectionTextContainer: {
    zIndex: 1,
  },
  collectionCardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  collectionCardSubtitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  stayCard: {
    marginHorizontal: 20,
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
  splitImageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 220,
    gap: 4,
  },
  splitImageLeft: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  splitImageRight: {
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sideMenu: {
    width: '75%',
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuHeaderText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3B20',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 16,
  },
  offersScroll: {
    paddingBottom: 8,
  },
  offerCard: {
    width: 280,
    height: 120,
    marginRight: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  offerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  offerCodeContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  offerCodeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E3B20',
    letterSpacing: 1,
  },
});

