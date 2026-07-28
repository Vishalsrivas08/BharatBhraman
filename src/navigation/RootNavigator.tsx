import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import ExploreScreen from '../screens/public/ExploreScreen';
import AllCollectionsScreen from '../screens/public/AllCollectionsScreen';
import CollectionPropertiesScreen from '../screens/public/CollectionPropertiesScreen';
import PropertyDetailsScreen from '../screens/public/PropertyDetailsScreen';
import BookingsScreen from '../screens/public/BookingsScreen';
import BookingDetailsScreen from '../screens/public/BookingDetailsScreen';
import ProfileScreen from '../screens/public/ProfileScreen';
import SavedStaysScreen from '../screens/public/SavedStaysScreen';
import PaymentMethodsScreen from '../screens/public/PaymentMethodsScreen';
import RewardsScreen from '../screens/public/RewardsScreen';
import EditProfileScreen from '../screens/public/EditProfileScreen';
import TravelPreferencesScreen from '../screens/public/TravelPreferencesScreen';
import CheckoutScreen from '../screens/public/CheckoutScreen';
import PaymentScreen from '../screens/public/PaymentScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import ManagePropertiesScreen from '../screens/admin/ManagePropertiesScreen';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
import AdminAllBookingsScreen from '../screens/admin/AdminAllBookingsScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';
import SecurityScreen from '../screens/admin/SecurityScreen';
import AdminNotificationsScreen from '../screens/admin/AdminNotificationsScreen';
import AuditLogsScreen from '../screens/admin/AuditLogsScreen';
import AdminSupportScreen from '../screens/admin/AdminSupportScreen';
import NotificationsScreen from '../screens/public/NotificationsScreen';
import SettingsScreen from '../screens/public/SettingsScreen';
import ContentScreen from '../screens/public/ContentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ExploreStack = createNativeStackNavigator();
const BookingsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AdminDashboardStack = createNativeStackNavigator();

function BookingsStackNavigator() {
  return (
    <BookingsStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingsStack.Screen name="BookingsMain" component={BookingsScreen} />
      <BookingsStack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    </BookingsStack.Navigator>
  );
}

function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="ExploreMain" component={ExploreScreen} />
      <ExploreStack.Screen name="AllCollections" component={AllCollectionsScreen} />
      <ExploreStack.Screen name="CollectionProperties" component={CollectionPropertiesScreen} />
      <ExploreStack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <ExploreStack.Screen name="Checkout" component={CheckoutScreen} />
      <ExploreStack.Screen name="Payment" component={PaymentScreen} />
    </ExploreStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="TravelPreferences" component={TravelPreferencesScreen} />
      <ProfileStack.Screen name="SavedStays" component={SavedStaysScreen} />
      <ProfileStack.Screen name="Payments" component={PaymentMethodsScreen} />
      <ProfileStack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <ProfileStack.Screen name="Checkout" component={CheckoutScreen} />
      <ProfileStack.Screen name="Payment" component={PaymentScreen} />
      <ProfileStack.Screen name="Notifications" component={NotificationsScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Content" component={ContentScreen} />
      <ProfileStack.Screen name="Rewards" component={RewardsScreen} />
    </ProfileStack.Navigator>
  );
}

function AdminProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="AdminProfileMain" component={AdminProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Content" component={ContentScreen} />
      <ProfileStack.Screen name="Security" component={SecurityScreen} />
      <ProfileStack.Screen name="AdminNotifications" component={AdminNotificationsScreen} />
      <ProfileStack.Screen name="AuditLogs" component={AuditLogsScreen} />
      <ProfileStack.Screen name="AdminSupport" component={AdminSupportScreen} />
    </ProfileStack.Navigator>
  );
}

function AdminDashboardStackNavigator() {
  return (
    <AdminDashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminDashboardStack.Screen name="AdminDashboardMain" component={AdminDashboardScreen} />
      <AdminDashboardStack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <AdminDashboardStack.Screen name="AdminReports" component={AdminReportsScreen} />
      <AdminDashboardStack.Screen name="AdminAllBookings" component={AdminAllBookingsScreen} />
      <AdminDashboardStack.Screen name="Notifications" component={NotificationsScreen} />
    </AdminDashboardStack.Navigator>
  );
}

function PublicTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1E3B20',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          paddingBottom: 18,
          paddingTop: 8,
          height: 65,
        }
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="compass" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="calendar" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="pie-chart" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManagePropertiesScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { role } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === null ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : role === 'public' ? (
        <Stack.Screen name="PublicApp" component={PublicTabs} />
      ) : (
        <Stack.Screen name="AdminApp" component={AdminTabs} />
      )}
    </Stack.Navigator>
  );
}
