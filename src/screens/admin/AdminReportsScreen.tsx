import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 59000 },
  { month: 'Jun', revenue: 75000 },
];

const MOCK_TOP_PROPERTIES = [
  { id: '1', name: 'Taj Mahua Kothi', bookings: 142, revenue: '₹4,25,000' },
  { id: '2', name: 'The Serai Bandipur', bookings: 98, revenue: '₹2,84,000' },
  { id: '3', name: 'Evolve Back Kabini', bookings: 86, revenue: '₹1,95,000' },
];

export default function AdminReportsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Revenue');

  const maxRevenue = Math.max(...MOCK_REVENUE_DATA.map(d => d.revenue));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financial Reports</Text>
        <TouchableOpacity style={styles.exportBtn}>
          <Feather name="download" size={20} color="#1E3B20" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {['Revenue', 'Bookings', 'Users'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <Feather name="dollar-sign" size={20} color="#2563EB" />
            </View>
            <Text style={styles.summaryTitle}>Total Revenue</Text>
            <Text style={styles.summaryValue}>₹34.5L</Text>
            <Text style={styles.summaryTrend}>+12.5% from last month</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Feather name="trending-up" size={20} color="#16A34A" />
            </View>
            <Text style={styles.summaryTitle}>Avg. Order Value</Text>
            <Text style={styles.summaryValue}>₹18.2K</Text>
            <Text style={styles.summaryTrend}>+4.2% from last month</Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue Overview (6 Months)</Text>
          </View>
          
          <View style={styles.chartContainer}>
            {MOCK_REVENUE_DATA.map((data, index) => {
              const barHeight = (data.revenue / maxRevenue) * 150;
              return (
                <View key={index} style={styles.barCol}>
                  <Text style={styles.barValue}>{(data.revenue / 1000)}k</Text>
                  <View style={[styles.bar, { height: barHeight }]} />
                  <Text style={styles.barLabel}>{data.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Top Performers Section */}
        <View style={styles.performersSection}>
          <Text style={styles.sectionTitle}>Top Performing Properties</Text>
          <View style={styles.performersCard}>
            {MOCK_TOP_PROPERTIES.map((prop, index) => (
              <View key={prop.id}>
                <View style={styles.performerRow}>
                  <View style={styles.performerRank}>
                    <Text style={styles.performerRankText}>#{index + 1}</Text>
                  </View>
                  <View style={styles.performerDetails}>
                    <Text style={styles.performerName}>{prop.name}</Text>
                    <Text style={styles.performerStats}>{prop.bookings} Bookings</Text>
                  </View>
                  <Text style={styles.performerRevenue}>{prop.revenue}</Text>
                </View>
                {index < MOCK_TOP_PROPERTIES.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
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
    fontSize: 24,
    fontWeight: '800',
    color: '#1E3B20',
  },
  exportBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#1E3B20',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeTabText: {
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    width: (width - 56) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  summaryTrend: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
  chartSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  barCol: {
    alignItems: 'center',
    width: 32,
  },
  barValue: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  bar: {
    width: 24,
    backgroundColor: '#D29948',
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  barLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '500',
  },
  performersSection: {
    marginBottom: 24,
  },
  performersCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  performerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  performerRankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D29948',
  },
  performerDetails: {
    flex: 1,
  },
  performerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  performerStats: {
    fontSize: 13,
    color: '#6B7280',
  },
  performerRevenue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3B20',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});
