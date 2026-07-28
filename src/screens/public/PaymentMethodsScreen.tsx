import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function PaymentMethodsScreen({ navigation }: any) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [savedCards, setSavedCards] = useState([
    { id: '1', type: 'Visa', bank: 'HDFC Bank', number: '**** **** **** 4242', isDefault: true },
    { id: '2', type: 'Mastercard', bank: 'ICICI Bank', number: '**** **** **** 8899', isDefault: false },
  ]);

  const handleAddCard = () => {
    if (!cardNumber || !expiry || !cvv || !cardName) {
      Alert.alert('Error', 'Please fill in all card details.');
      return;
    }

    // Simulate determining card type based on number
    const isVisa = cardNumber.startsWith('4');
    const last4 = cardNumber.slice(-4).padEnd(4, 'X');

    const newCard = {
      id: Math.random().toString(),
      type: isVisa ? 'Visa' : 'Mastercard',
      bank: 'New Bank',
      number: `**** **** **** ${last4}`,
      isDefault: false
    };

    setSavedCards(prev => [...prev, newCard]);

    Alert.alert('Success', 'Your card has been securely added to your wallet.');
    setShowAddCard(false);
    // Clear form
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setCardName('');
  };

  const handleModeSelect = (mode: string) => {
    Alert.alert('Payment Mode Selected', `You have selected ${mode} as your default payment method.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

          {showAddCard ? (
            <View style={styles.addCardSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Add New Card</Text>
                <TouchableOpacity onPress={() => setShowAddCard(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name on Card</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rahul Sharma"
                    value={cardName}
                    onChangeText={setCardName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="XXXX XXXX XXXX XXXX"
                    keyboardType="number-pad"
                    maxLength={19}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 16 }]}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      keyboardType="number-pad"
                      maxLength={5}
                      value={expiry}
                      onChangeText={setExpiry}
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="XXX"
                      keyboardType="number-pad"
                      secureTextEntry
                      maxLength={4}
                      value={cvv}
                      onChangeText={setCvv}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleAddCard}>
                  <Text style={styles.saveBtnText}>Save Card securely</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {/* Saved Cards */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Saved Cards</Text>

                {savedCards.map(card => (
                  <TouchableOpacity
                    key={card.id}
                    style={[styles.savedCardItem, card.isDefault && { borderColor: '#1E3B20', backgroundColor: '#F8FCF8' }]}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSavedCards(prev => prev.map(c => ({
                        ...c,
                        isDefault: c.id === card.id
                      })));
                    }}
                  >
                    <View style={styles.cardIconBox}>
                      {card.type === 'Visa' ? (
                        <FontAwesome5 name="cc-visa" size={24} color="#1A1F71" />
                      ) : (
                        <FontAwesome5 name="cc-mastercard" size={24} color="#EB001B" />
                      )}
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{card.bank} {card.type}</Text>
                      <Text style={styles.cardNumber}>{card.number}</Text>
                    </View>
                    {card.isDefault && <Feather name="check-circle" size={20} color="#1E3B20" />}
                  </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.addMethodBtn} onPress={() => setShowAddCard(true)}>
                  <Feather name="plus" size={20} color="#D29948" />
                  <Text style={styles.addMethodText}>Add new card</Text>
                </TouchableOpacity>
              </View>

              {/* Other Payment Modes */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other Payment Modes</Text>

                <TouchableOpacity style={styles.modeItem} onPress={() => handleModeSelect('UPI')}>
                  <View style={[styles.cardIconBox, { backgroundColor: '#F0F4F8' }]}>
                    <Ionicons name="qr-code-outline" size={24} color="#333" />
                  </View>
                  <Text style={styles.modeText}>UPI (GPay, PhonePe, Paytm)</Text>
                  <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.modeItem} onPress={() => handleModeSelect('Net Banking')}>
                  <View style={[styles.cardIconBox, { backgroundColor: '#F0F4F8' }]}>
                    <Ionicons name="business-outline" size={24} color="#333" />
                  </View>
                  <Text style={styles.modeText}>Net Banking</Text>
                  <Feather name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>

              </View>
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  section: {
    marginBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
    marginBottom: 16,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
  },
  savedCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },
  addMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8ED',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FBE8CE',
  },
  addMethodText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D29948',
    marginLeft: 8,
  },
  modeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  modeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addCardSection: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardForm: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9FAFB',
  },
  saveBtn: {
    backgroundColor: '#1E3B20',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
