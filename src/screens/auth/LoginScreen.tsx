import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'public' | 'admin' | null>(null);
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');

  const [mobile, setMobile] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOtp = () => {
    if (!mobile.trim()) {
      Alert.alert('Mobile Number Required', 'Please enter your mobile number to receive an OTP.');
      return;
    }
    setIsOtpSent(true);
  };

  const handleLogin = () => {
    if (loginMethod === 'mobile') {
      if (!otp.trim()) {
        Alert.alert('OTP Required', 'Please enter the 6-digit OTP sent to your mobile.');
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        Alert.alert('Required Fields', 'Please enter both your email address and password.');
        return;
      }
    }

    if (selectedRole) {
      login(selectedRole);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1400' }}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlay}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoMain}>BHARAT</Text>
              <Text style={styles.logoSub}>BHRAMAN</Text>
            </View>

            <View style={styles.card}>
              {!selectedRole ? (
                // ROLE SELECTION
                <>
                  <Text style={styles.cardTitle}>Welcome</Text>
                  <Text style={styles.cardSubtitle}>Sign in to continue your journey</Text>

                  <TouchableOpacity
                    style={[styles.button, styles.publicButton]}
                    onPress={() => setSelectedRole('public')}
                    activeOpacity={0.8}
                  >
                    <Feather name="user" size={20} color="#fff" style={styles.btnIcon} />
                    <Text style={styles.publicButtonText}>Login as Explorer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.adminButton]}
                    onPress={() => setSelectedRole('admin')}
                    activeOpacity={0.8}
                  >
                    <Feather name="shield" size={20} color="#fff" style={styles.btnIcon} />
                    <Text style={styles.adminButtonText}>Login as Admin</Text>
                  </TouchableOpacity>
                </>
              ) : (
                // LOGIN FORM
                <>
                  <View style={styles.formHeader}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedRole(null);
                        setIsOtpSent(false);
                      }}
                      style={styles.backBtn}
                    >
                      <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.formTitle}>
                      {selectedRole === 'public' ? 'Explorer Login' : 'Admin Login'}
                    </Text>
                    <View style={{ width: 24 }} />
                  </View>

                  <View style={styles.tabContainer}>
                    <TouchableOpacity
                      style={[styles.tab, loginMethod === 'mobile' && styles.activeTab]}
                      onPress={() => {
                        setLoginMethod('mobile');
                        setIsOtpSent(false);
                      }}
                    >
                      <Text style={[styles.tabText, loginMethod === 'mobile' && styles.activeTabText]}>Mobile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.tab, loginMethod === 'email' && styles.activeTab]}
                      onPress={() => {
                        setLoginMethod('email');
                        setIsOtpSent(false);
                      }}
                    >
                      <Text style={[styles.tabText, loginMethod === 'email' && styles.activeTabText]}>Email</Text>
                    </TouchableOpacity>
                  </View>

                  {loginMethod === 'mobile' ? (
                    <>
                      {!isOtpSent ? (
                        <>
                          <View style={styles.inputContainer}>
                            <Feather name="smartphone" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                            <TextInput
                              style={styles.input}
                              placeholder="Mobile Number"
                              placeholderTextColor="rgba(255,255,255,0.5)"
                              keyboardType="phone-pad"
                              value={mobile}
                              onChangeText={setMobile}
                            />
                          </View>
                          <TouchableOpacity
                            style={[styles.button, styles.publicButton, { marginTop: 16 }]}
                            onPress={handleSendOtp}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.publicButtonText}>Send OTP</Text>
                            <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={styles.otpSentText}>OTP sent to {mobile}</Text>
                          <View style={styles.inputContainer}>
                            <Feather name="key" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                            <TextInput
                              style={styles.input}
                              placeholder="Enter 6-digit OTP"
                              placeholderTextColor="rgba(255,255,255,0.5)"
                              keyboardType="number-pad"
                              maxLength={6}
                              value={otp}
                              onChangeText={setOtp}
                            />
                          </View>

                          <TouchableOpacity
                            style={[styles.button, styles.publicButton, { marginTop: 8 }]}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.publicButtonText}>Verify & Sign In</Text>
                            <Feather name="check-circle" size={20} color="#fff" style={{ marginLeft: 8 }} />
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => setIsOtpSent(false)} style={styles.changeNumberBtn}>
                            <Text style={styles.changeNumberText}>Change Mobile Number</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <View style={styles.inputContainer}>
                        <Feather name="mail" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Email Address"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={email}
                          onChangeText={setEmail}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <Feather name="lock" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          secureTextEntry
                          value={password}
                          onChangeText={setPassword}
                        />
                      </View>

                      <TouchableOpacity
                        style={[styles.button, styles.publicButton, { marginTop: 16 }]}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.publicButtonText}>Sign In</Text>
                        <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 25, 15, 0.65)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoMain: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  logoSub: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
    color: '#D29948',
    letterSpacing: 12,
    textTransform: 'uppercase',
    marginTop: 6,
    marginLeft: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  btnIcon: {
    marginRight: 12,
  },
  publicButton: {
    backgroundColor: '#D29948',
    shadowColor: '#D29948',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  publicButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  adminButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backBtn: {
    padding: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabText: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 16,
    fontSize: 16,
  },
  otpSentText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  changeNumberBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  changeNumberText: {
    color: '#D29948',
    fontSize: 14,
    fontWeight: '600',
  },
});
