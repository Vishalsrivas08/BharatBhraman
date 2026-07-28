import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'heart', label: 'Saved Stays', route: 'SavedStays' },
    { icon: 'credit-card', label: 'Payment Methods', route: 'Payments' },
    { icon: 'sliders', label: 'Travel Preferences', route: 'Preferences' },
    { icon: 'bell', label: 'Notifications', route: 'Notifications' },
    { icon: 'settings', label: 'Settings', route: 'Settings' },
  ];

  const handleFeatureUnavailable = (featureName: string) => {
    Alert.alert('Coming Soon', `${featureName} will be available in the next update!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit-2" size={20} color="#1E3B20" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={typeof user.profilePicture === 'string' ? { uri: user.profilePicture } : user.profilePicture}
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.tierBadge}>
              <Ionicons name="star" size={12} color="#D29948" />
              <Text style={styles.tierText}>Gold Member</Text>
            </View>
          </View>
        </View>

        {/* Rewards Card */}
        <View style={styles.rewardsCard}>
          <View>
            <Text style={styles.rewardsTitle}>BharatBhraman Credits</Text>
            <Text style={styles.rewardsAmount}>₹ 12,500</Text>
          </View>
          <TouchableOpacity style={styles.redeemBtn} onPress={() => navigation.navigate('Rewards')}>
            <Text style={styles.redeemText}>Redeem</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.route === 'SavedStays') {
                  navigation.navigate('SavedStays');
                } else if (item.route === 'Payments') {
                  navigation.navigate('Payments');
                } else if (item.route === 'Preferences') {
                  navigation.navigate('TravelPreferences');
                } else if (item.route === 'Notifications') {
                  navigation.navigate('Notifications');
                } else if (item.route === 'Settings') {
                  navigation.navigate('Settings');
                } else {
                  handleFeatureUnavailable(item.label);
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                <Feather name={item.icon as any} size={20} color="#1E3B20" />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Premium Support */}
        <TouchableOpacity style={styles.supportCard} onPress={() => Alert.alert('Concierge Service', 'Connecting you to our premium support agents...')}>
          <View style={styles.supportIcon}>
            <Feather name="headphones" size={24} color="#D29948" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.supportTitle}>24/7 Concierge Service</Text>
            <Text style={styles.supportSubtitle}>Exclusive assistance for Elite members</Text>
          </View>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E3B20',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userDetails: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D29948',
    marginLeft: 6,
  },
  rewardsCard: {
    marginHorizontal: 20,
    backgroundColor: '#1E3B20',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  rewardsTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  rewardsAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D29948',
  },
  redeemBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  redeemText: {
    fontWeight: '700',
    color: '#1E3B20',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  supportCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFF8ED',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#FBE8CE',
  },
  supportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D29948',
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FFEBEB',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF3B30',
    marginLeft: 8,
  },
});
