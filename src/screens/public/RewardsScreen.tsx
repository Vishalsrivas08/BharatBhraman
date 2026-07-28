import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const MOCK_REWARDS = [
  { id: '1', title: 'Free Jungle Safari', description: 'Redeem for a complimentary 3-hour morning jeep safari at any participating national park.', cost: 5000, icon: 'map' },
  { id: '2', title: 'Spa & Wellness Package', description: 'Enjoy a 60-minute Ayurvedic massage at select luxury properties.', cost: 3500, icon: 'wind' },
  { id: '3', title: 'Room Upgrade (1 Tier)', description: 'Upgrade your confirmed booking to the next tier of room or tent.', cost: 8000, icon: 'home' },
  { id: '4', title: 'Private Dining Experience', description: 'Exclusive candlelit dinner setup in the wilderness.', cost: 4500, icon: 'coffee' },
];

export default function RewardsScreen({ navigation }: any) {
  const [credits, setCredits] = useState(12500);

  const handleRedeem = (rewardName: string, cost: number) => {
    if (credits >= cost) {
      Alert.alert(
        'Confirm Redemption',
        `Are you sure you want to spend ${cost} credits for "${rewardName}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Redeem', 
            onPress: () => {
              setCredits(prev => prev - cost);
              Alert.alert('Success!', `You have successfully redeemed "${rewardName}". A confirmation email has been sent.`);
            }
          }
        ]
      );
    } else {
      Alert.alert('Insufficient Credits', 'You do not have enough credits for this reward.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards Catalog</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        {/* Credits Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceIconBg}>
            <Ionicons name="star" size={28} color="#D29948" />
          </View>
          <Text style={styles.balanceTitle}>Available Credits</Text>
          <Text style={styles.balanceAmount}>₹ {credits.toLocaleString('en-IN')}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((credits / 20000) * 100, 100)}%` }]} />
            </View>
            <Text style={styles.progressText}>{20000 - credits > 0 ? `₹${(20000 - credits).toLocaleString('en-IN')} more to reach Platinum tier` : 'You reached Platinum!'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Redeem Rewards</Text>

        {MOCK_REWARDS.map((reward) => (
          <View key={reward.id} style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
              <View style={styles.rewardIconContainer}>
                <Feather name={reward.icon as any} size={24} color="#1E3B20" />
              </View>
              <View style={styles.rewardDetails}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDesc}>{reward.description}</Text>
              </View>
            </View>
            
            <View style={styles.rewardFooter}>
              <Text style={styles.rewardCost}>{reward.cost.toLocaleString('en-IN')} Credits</Text>
              <TouchableOpacity 
                style={[styles.redeemBtn, credits < reward.cost && styles.redeemBtnDisabled]} 
                onPress={() => handleRedeem(reward.title, reward.cost)}
                disabled={credits < reward.cost}
              >
                <Text style={[styles.redeemBtnText, credits < reward.cost && styles.redeemBtnTextDisabled]}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 48,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3B20',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  balanceCard: {
    backgroundColor: '#1E3B20',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(210, 153, 72, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D29948',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  rewardCost: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D29948',
  },
  redeemBtn: {
    backgroundColor: '#1E3B20',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  redeemBtnDisabled: {
    backgroundColor: '#F3F4F6',
  },
  redeemBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  redeemBtnTextDisabled: {
    color: '#9CA3AF',
  },
});
