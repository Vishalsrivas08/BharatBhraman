import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const accommodationsOptions = [
  { label: 'Hotel', icon: 'business-outline' },
  { label: 'Resort', icon: 'partly-sunny-outline' },
  { label: 'Villa', icon: 'home-outline' },
  { label: 'Homestay', icon: 'bed-outline' },
  { label: 'Tent / Camp', icon: 'bonfire-outline' },
  { label: 'Palace', icon: 'star-outline' },
];

const stylesOptions = [
  { label: 'Adventure', icon: 'bicycle-outline' },
  { label: 'Relaxation', icon: 'water-outline' },
  { label: 'Wildlife', icon: 'paw-outline' },
  { label: 'Heritage', icon: 'library-outline' },
  { label: 'Pilgrimage', icon: 'flower-outline' },
  { label: 'Nature', icon: 'leaf-outline' },
  { label: 'Luxury', icon: 'diamond-outline' },
];

const dietaryOptions = [
  { label: 'Vegetarian', icon: 'leaf-outline' },
  { label: 'Non-Vegetarian', icon: 'restaurant-outline' },
  { label: 'Vegan', icon: 'nutrition-outline' },
  { label: 'Jain', icon: 'rose-outline' },
  { label: 'Halal', icon: 'fast-food-outline' },
  { label: 'Any', icon: 'cafe-outline' },
];

export default function TravelPreferencesScreen({ navigation }: any) {
  const [accommodations, setAccommodations] = useState<string[]>(['Resort', 'Villa']);
  const [dietary, setDietary] = useState<string[]>(['Vegetarian']);
  const [stylesList, setStylesList] = useState<string[]>(['Wildlife', 'Nature']);

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = () => {
    Alert.alert('Preferences Saved', 'Your travel preferences have been successfully updated to personalize your experience.');
    navigation.goBack();
  };

  const renderChips = (options: { label: string, icon: string }[], selected: string[], setSelected: (val: string[]) => void) => {
    return (
      <View style={styles.chipContainer}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.label);
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected
              ]}
              onPress={() => toggleSelection(option.label, selected, setSelected)}
            >
              <Ionicons
                name={option.icon as any}
                size={18}
                color={isSelected ? "#fff" : "#666"}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Personalize Your Journey</Text>
          <Text style={styles.subtitle}>
            Tell us what you love, and we'll curate the perfect stays and bespoke experiences just for you.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="bed" size={20} color="#D29948" />
            </View>
            <Text style={styles.sectionTitle}>Preferred Accommodation</Text>
          </View>
          {renderChips(accommodationsOptions, accommodations, setAccommodations)}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="compass" size={20} color="#D29948" />
            </View>
            <Text style={styles.sectionTitle}>Travel Style</Text>
          </View>
          {renderChips(stylesOptions, stylesList, setStylesList)}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="restaurant" size={20} color="#D29948" />
            </View>
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          </View>
          {renderChips(dietaryOptions, dietary, setDietary)}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Floating Action Button for saving */}
      <View style={styles.floatingFooter}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9} onPress={handleSave}>
          <LinearGradient
            colors={['#1E3B20', '#2C5A30']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            <Text style={styles.saveBtnText}>Save Preferences</Text>
            <Feather name="check" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F7F9F8',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  content: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 32,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3B20',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 10,
  },
  chipUnselected: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#eee',
  },
  chipSelected: {
    backgroundColor: '#1E3B20',
    borderWidth: 1,
    borderColor: '#1E3B20',
    shadowColor: '#1E3B20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  chipTextSelected: {
    color: '#fff',
  },
  floatingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(247, 249, 248, 0.9)',
  },
  saveBtn: {
    shadowColor: '#1E3B20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
});
