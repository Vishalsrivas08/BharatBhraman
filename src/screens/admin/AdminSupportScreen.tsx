import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AdminSupportScreen({ navigation }: any) {

  const faqs = [
    { q: 'How do I issue a full refund?', a: 'Refunds can be processed from the Booking Details page. Tap on the specific booking and select "Issue Refund". The funds will return to the customer in 3-5 business days.' },
    { q: 'What happens during System Maintenance Mode?', a: 'When Maintenance Mode is active, the public app will display a downtime screen. No new bookings can be made, but users can still view their past trips.' },
    { q: 'How can I add another Administrator?', a: 'Currently, new administrative accounts must be provisioned directly by the Engineering team. Please use the Contact Engineering button below.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Feather name="help-circle" size={32} color="#D29948" />
          </View>
          <Text style={styles.heroTitle}>Need Technical Help?</Text>
          <Text style={styles.heroSubtitle}>Get direct support from the platform engineering team for critical issues.</Text>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Alert.alert('Contact Engineering', 'An engineering ticket has been drafted. We will reach out via your admin email.')}
          >
            <Feather name="mail" size={20} color="#fff" />
            <Text style={styles.contactBtnText}>Contact Engineering</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.faqSectionTitle}>Frequently Asked Questions</Text>

          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Text style={styles.faqAnswer}>{faq.a}</Text>
            </View>
          ))}
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
    paddingVertical: 40,
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
  heroSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3B20',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  faqSection: {
    marginBottom: 16,
  },
  faqSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  faqCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#D29948',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
});
