import React, { createContext, useState, useContext } from 'react';

export interface Booking {
  id: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  price: string;
  customerName: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'date' | 'status'>) => void;
  cancelBooking: (id: string, reason: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'date' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'Confirmed',
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const cancelBooking = (id: string, reason: string) => {
    setBookings((prev) => 
      prev.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b)
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
