import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useBooking } from '../../context/BookingContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaymentScreen({ route, navigation }: any) {
  const { property, customerName } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'netbanking'
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const { addBooking } = useBooking();

  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(20)).current;

  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1E3B20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Details missing.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePayment = () => {
    if (paymentMethod === 'card' && (!cardNumber.trim() || !expiry.trim() || !cvv.trim())) {
      alert("Please enter complete card details.");
      return;
    }
    if (paymentMethod === 'upi' && !upiId.trim()) {
      alert("Please enter a valid UPI ID.");
      return;
    }
    if (paymentMethod === 'netbanking' && !selectedBank) {
      alert("Please select a bank to proceed.");
      return;
    }

    addBooking({
      propertyTitle: property.title,
      propertyImage: property.image,
      propertyLocation: property.location,
      price: property.price || '₹15,000',
      customerName: customerName || 'Guest',
    });

    setShowToast(true);
    Animated.parallel([
      Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(toastTranslateY, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(toastTranslateY, { toValue: 20, duration: 300, useNativeDriver: true })
      ]).start(() => {
        setShowToast(false);
        navigation.navigate('ExploreMain');
      });
    }, 2000);
  };

  const renderCardForm = () => (
    <Animated.View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 0 }]}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={19}
          />
          <Feather name="credit-card" size={20} color="#999" style={{ marginRight: 12 }} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              maxLength={5}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="123"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderUpiForm = () => (
    <Animated.View style={styles.formContainer}>
      <Text style={styles.upiSubtitle}>Pay using popular UPI apps</Text>
      <View style={styles.upiAppsContainer}>
        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
          <TouchableOpacity key={app} style={styles.upiAppCircle}>
            <Text style={styles.upiAppText}>{app[0]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Enter UPI ID</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 0 }]}
            placeholder="username@bank"
            value={upiId}
            onChangeText={setUpiId}
            autoCapitalize="none"
          />
          <Ionicons name="at-outline" size={20} color="#999" style={{ marginRight: 12 }} />
        </View>
      </View>
    </Animated.View>
  );

  const renderNetBankingForm = () => (
    <Animated.View style={styles.formContainer}>
      <Text style={styles.upiSubtitle}>Select your bank</Text>
      <View style={styles.banksGrid}>
        {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Yes Bank'].map((bank, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.bankCard, selectedBank === bank && styles.selectedBankCard]}
            onPress={() => setSelectedBank(bank)}
          >
            <View style={[styles.bankIconPlaceholder, selectedBank === bank && { backgroundColor: '#D29948' }]}>
              <Feather name="briefcase" size={16} color={selectedBank === bank ? '#fff' : '#D29948'} />
            </View>
            <Text style={[styles.bankName, selectedBank === bank && { color: '#1E3B20', fontWeight: '700' }]}>{bank}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1E3B20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Secure Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

          <LinearGradient colors={['#1E3B20', '#2E5031']} style={styles.amountCard}>
            <View style={styles.amountCardTop}>
              <Text style={styles.amountLabel}>Total Amount to Pay</Text>
              <Feather name="shield" size={18} color="#D29948" />
            </View>
            <Text style={styles.amountValue}>
              ₹{((parseInt((property.price || '15000').replace(/[^0-9]/g, '')) || 15000) + 2500).toLocaleString('en-IN')}
            </Text>
            <View style={styles.propertyMiniInfo}>
              <Feather name="map-pin" size={12} color="#D29948" />
              <Text style={styles.propertyMiniText} numberOfLines={1}>{property.title}</Text>
            </View>
          </LinearGradient>

          <Text style={styles.sectionTitle}>Payment Method</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.methodsScroll}
          >
            <TouchableOpacity
              style={[styles.methodTab, paymentMethod === 'card' && styles.activeMethodTab]}
              onPress={() => setPaymentMethod('card')}
            >
              <Feather name="credit-card" size={20} color={paymentMethod === 'card' ? '#fff' : '#666'} />
              <Text style={[styles.methodTabText, paymentMethod === 'card' && styles.activeMethodTabText]}>Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodTab, paymentMethod === 'upi' && styles.activeMethodTab]}
              onPress={() => setPaymentMethod('upi')}
            >
              <Ionicons name="phone-portrait-outline" size={20} color={paymentMethod === 'upi' ? '#fff' : '#666'} />
              <Text style={[styles.methodTabText, paymentMethod === 'upi' && styles.activeMethodTabText]}>UPI Apps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodTab, paymentMethod === 'netbanking' && styles.activeMethodTab]}
              onPress={() => setPaymentMethod('netbanking')}
            >
              <Feather name="monitor" size={20} color={paymentMethod === 'netbanking' ? '#fff' : '#666'} />
              <Text style={[styles.methodTabText, paymentMethod === 'netbanking' && styles.activeMethodTabText]}>Net Banking</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.formArea}>
            {paymentMethod === 'card' && renderCardForm()}
            {paymentMethod === 'upi' && renderUpiForm()}
            {paymentMethod === 'netbanking' && renderNetBankingForm()}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <Text style={styles.secureText}>
            <Feather name="lock" size={12} color="#666" /> Payments are 100% secure & encrypted
          </Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <LinearGradient colors={['#D29948', '#C18A39']} style={styles.payButtonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.payButtonText}>Proceed to Pay</Text>
              <Feather name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>

      {showToast && (
        <Animated.View style={[styles.toastContainer, { opacity: toastOpacity, transform: [{ translateY: toastTranslateY }] }]}>
          <Feather name="check-circle" size={24} color="#fff" />
          <Text style={styles.toastText}>Payment Successful! Booking Confirmed.</Text>
        </Animated.View>
      )}
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
    backgroundColor: '#FAF9F6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3B20',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  amountCard: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#1E3B20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  amountCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#D29948',
    marginBottom: 16,
  },
  propertyMiniInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  propertyMiniText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 16,
  },
  methodsScroll: {
    marginBottom: 24,
    paddingRight: 20,
  },
  methodTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeMethodTab: {
    backgroundColor: '#1E3B20',
    borderColor: '#1E3B20',
  },
  methodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  activeMethodTabText: {
    color: '#fff',
  },
  formArea: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  upiSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  upiAppsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  upiAppCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  upiAppText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3B20',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  banksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bankCard: {
    width: '48%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedBankCard: {
    backgroundColor: '#FFF8ED',
    borderColor: '#FBE8CE',
  },
  bankIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bankName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  secureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  payButton: {
    shadowColor: '#D29948',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  payButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  toastContainer: {
    position: 'absolute',
    top: 60, // Changed to top for better visibility over keyboard
    alignSelf: 'center',
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  }
});
