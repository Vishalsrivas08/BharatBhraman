import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Modal, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const INITIAL_PROPERTIES = [
  { id: '1', title: 'Taj Mahua Kothi', location: 'Bandhavgarh, MP', price: '₹25,000', status: 'Active', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=400&q=80' },
  { id: '2', title: 'Ranthambore Tiger Camp', location: 'Rajasthan', price: '₹15,000', status: 'Active', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80' },
  { id: '3', title: 'The Serai Bandipur', location: 'Karnataka', price: '₹18,000', status: 'Inactive', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80' },
];

export default function ManagePropertiesScreen() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newStatus, setNewStatus] = useState('Active');

  const openAddModal = () => {
    setEditingPropertyId(null);
    setNewTitle('');
    setNewLocation('');
    setNewPrice('');
    setNewImage('');
    setNewStatus('Active');
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingPropertyId(null);
    setNewTitle('');
    setNewLocation('');
    setNewPrice('');
    setNewImage('');
    setNewStatus('Active');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Property',
      'Are you sure you want to remove this property?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setProperties(prev => prev.filter(p => p.id !== id))
        }
      ]
    );
  };

  const handleEdit = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setEditingPropertyId(id);
      setNewTitle(property.title);
      setNewLocation(property.location);
      setNewPrice(property.price.replace(/[^0-9,₹]/g, '')); // Optional clean up, but keeping as string is fine
      setNewImage(property.image);
      setNewStatus(property.status);
      setIsModalVisible(true);
    }
  };

  const handleSubmitProperty = () => {
    if (!newTitle || !newLocation || !newPrice) {
      Alert.alert('Required Fields', 'Please fill in the title, location, and price.');
      return;
    }

    if (editingPropertyId) {
      // Update existing
      setProperties(prev => prev.map(p => {
        if (p.id === editingPropertyId) {
          return {
            ...p,
            title: newTitle,
            location: newLocation,
            price: newPrice.includes('₹') ? newPrice : `₹${newPrice}`,
            status: newStatus,
            image: newImage || p.image,
          };
        }
        return p;
      }));
    } else {
      // Create new
      const newProperty = {
        id: Math.random().toString(),
        title: newTitle,
        location: newLocation,
        price: newPrice.includes('₹') ? newPrice : `₹${newPrice}`,
        status: newStatus,
        image: newImage || 'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=400&q=80'
      };
      setProperties([newProperty, ...properties]);
    }
    
    closeModal();
  };

  const renderPropertyItem = ({ item }: { item: any }) => (
    <View style={styles.propertyCard}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.propertyTitle} numberOfLines={1}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? '#E8F5E9' : '#F3F4F6' }]}>
            <Text style={[styles.statusText, { color: item.status === 'Active' ? '#2E7D32' : '#6B7280' }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={styles.propertyLocation}><Feather name="map-pin" size={12} /> {item.location}</Text>
        <Text style={styles.propertyPrice}>{item.price} <Text style={styles.nightText}>/ night</Text></Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(item.id)}>
            <Feather name="edit-2" size={14} color="#2563EB" />
            <Text style={[styles.actionBtnText, { color: '#2563EB' }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(item.id)}>
            <Feather name="trash-2" size={14} color="#DC2626" />
            <Text style={[styles.actionBtnText, { color: '#DC2626' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Properties</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Feather name="plus" size={16} color="#fff" />
          <Text style={styles.addBtnText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={renderPropertyItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Property Modal */}
      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafeArea}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.modalCloseBtn}>
                <Feather name="x" size={24} color="#1E3B20" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{editingPropertyId ? 'Edit Property' : 'Add New Property'}</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalForm}>
              <Text style={styles.inputLabel}>Property Title</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Royal Palace Hotel"
                value={newTitle}
                onChangeText={setNewTitle}
              />

              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Jaipur, Rajasthan"
                value={newLocation}
                onChangeText={setNewLocation}
              />

              <Text style={styles.inputLabel}>Price per Night</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. ₹12,000"
                keyboardType="numeric"
                value={newPrice}
                onChangeText={setNewPrice}
              />

              <Text style={styles.inputLabel}>Image URL (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="https://..."
                autoCapitalize="none"
                value={newImage}
                onChangeText={setNewImage}
              />

              <Text style={styles.inputLabel}>Property Status</Text>
              <View style={styles.statusToggleContainer}>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newStatus === 'Active' && styles.statusToggleActive]}
                  onPress={() => setNewStatus('Active')}
                >
                  <Text style={[styles.statusToggleText, newStatus === 'Active' && styles.statusToggleTextActive]}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newStatus === 'Inactive' && styles.statusToggleInactive]}
                  onPress={() => setNewStatus('Inactive')}
                >
                  <Text style={[styles.statusToggleText, newStatus === 'Inactive' && styles.statusToggleTextActive]}>Inactive</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitProperty}>
                <Text style={styles.submitBtnText}>{editingPropertyId ? 'Update Property' : 'Save Property'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3B20',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3B20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  propertyImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#eee',
  },
  propertyDetails: {
    flex: 1,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3B20',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  propertyLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D29948',
    marginBottom: 12,
  },
  nightText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  deleteBtn: {
    marginRight: 0,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },

  /* Modal Styles */
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  modalForm: {
    padding: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 24,
    color: '#111',
  },
  submitBtn: {
    backgroundColor: '#D29948',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  statusToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  statusToggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  statusToggleActive: {
    backgroundColor: '#1E3B20',
  },
  statusToggleInactive: {
    backgroundColor: '#6B7280',
  },
  statusToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusToggleTextActive: {
    color: '#fff',
  },
});
