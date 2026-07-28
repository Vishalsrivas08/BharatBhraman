import React, { createContext, useState, useContext, ReactNode, useRef, useCallback } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type Property = any; // You can refine this type based on your property structure

interface WishlistContextData {
  savedStays: Property[];
  addStay: (property: Property) => void;
  removeStay: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  toggleStay: (property: Property) => void;
}

const WishlistContext = createContext<WishlistContextData>({
  savedStays: [],
  addStay: () => {},
  removeStay: () => {},
  isSaved: () => false,
  toggleStay: () => {},
});

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [savedStays, setSavedStays] = useState<Property[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setToastMessage(null));
  }, [fadeAnim]);

  const addStay = (property: Property) => {
    setSavedStays((prev) => {
      if (!prev.find((stay) => stay.id === property.id)) {
        return [property, ...prev];
      }
      return prev;
    });
  };

  const removeStay = (propertyId: string) => {
    setSavedStays((prev) => prev.filter((stay) => stay.id !== propertyId));
  };

  const isSaved = (propertyId: string) => {
    return savedStays.some((stay) => stay.id === propertyId);
  };

  const toggleStay = (property: Property) => {
    if (isSaved(property.id)) {
      removeStay(property.id);
      showToast('Removed from Wishlist');
    } else {
      addStay(property);
      showToast('Added to Wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ savedStays, addStay, removeStay, isSaved, toggleStay }}>
      {children}
      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 100, // Positioned slightly above the bottom tab bar
    alignSelf: 'center',
    backgroundColor: 'rgba(30, 59, 32, 0.95)', // Dark green premium color
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9999,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});
