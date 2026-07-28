import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const COLLECTIONS = [
  { id: '1', title: 'Jungle Safaris', count: '124 PROPERTIES', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' },
  { id: '2', title: 'Luxury Tents', count: '86 PROPERTIES', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600' },
  { id: '3', title: 'Heritage Palaces', count: '45 PROPERTIES', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600' },
  { id: '4', title: 'Mountain Resorts', count: '92 PROPERTIES', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600' },
  { id: '5', title: 'Beachfront Villas', count: '58 PROPERTIES', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=600' },
  { id: '6', title: 'Wellness Retreats', count: '34 PROPERTIES', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600' },
  { id: '7', title: 'Desert Camps', count: '27 PROPERTIES', image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=600' },
  { id: '8', title: 'Treehouses', count: '18 PROPERTIES', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600' },
  { id: '9', title: 'Houseboats', count: '42 PROPERTIES', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600' },
  { id: '10', title: 'Farm Stays', count: '76 PROPERTIES', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600' },
  { id: '11', title: 'City Penthouses', count: '115 PROPERTIES', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=600' },
  { id: '12', title: 'Riverside Cabins', count: '63 PROPERTIES', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600' },
  { id: '13', title: 'Boutique Hotels', count: '89 PROPERTIES', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
  { id: '14', title: 'Eco Lodges', count: '51 PROPERTIES', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600' },
  { id: '15', title: 'Ski Chalets', count: '24 PROPERTIES', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
  { id: '16', title: 'Historic Mansions', count: '31 PROPERTIES', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600' },
  { id: '17', title: 'Private Islands', count: '8 PROPERTIES', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=600' },
  { id: '18', title: 'Vineyard Estates', count: '14 PROPERTIES', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=600' },
  { id: '19', title: 'Tiny Homes', count: '105 PROPERTIES', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=600' },
];

export default function AllCollectionsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Curated Collections</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {COLLECTIONS.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.collectionCard}
            onPress={() => navigation.navigate('CollectionProperties', { title: item.title })}
          >
            <Image
              source={{ uri: item.image }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            <View style={styles.collectionOverlay} />
            <View style={styles.collectionTextContainer}>
              <Text style={styles.collectionCardTitle}>{item.title}</Text>
              <Text style={styles.collectionCardSubtitle}>{item.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    gap: 16,
  },
  collectionCard: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  collectionTextContainer: {
    zIndex: 1,
  },
  collectionCardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  collectionCardSubtitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
