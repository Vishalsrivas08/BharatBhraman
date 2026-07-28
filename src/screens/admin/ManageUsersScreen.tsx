import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, Alert, Image, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const MOCK_USERS = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'Explorer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80', joinDate: 'Aug 12, 2023' },
  { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', role: 'Explorer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', joinDate: 'Sep 05, 2023' },
  { id: '3', name: 'Amit Kumar', email: 'amit.k@example.com', role: 'Explorer', status: 'Suspended', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', joinDate: 'Oct 20, 2023' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha.g@example.com', role: 'Explorer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', joinDate: 'Nov 01, 2023' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.s@admin.com', role: 'Admin', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', joinDate: 'Jan 15, 2023' },
];

const firstNames = ['Aarav', 'Neha', 'Rohan', 'Kriti', 'Arjun', 'Meera', 'Karan', 'Pooja', 'Anil', 'Sonia'];
const lastNames = ['Sharma', 'Verma', 'Singh', 'Gupta', 'Patel', 'Kumar', 'Jain', 'Das', 'Reddy', 'Nair'];
const AVATARS = [
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
];

for (let i = 6; i <= 60; i++) {
  const fName = firstNames[i % 10];
  const lName = lastNames[(i * 3) % 10];
  MOCK_USERS.push({
    id: i.toString(),
    name: `${fName} ${lName}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@example.com`,
    role: 'Explorer',
    status: Math.random() > 0.85 ? 'Suspended' : 'Active',
    avatar: AVATARS[i % AVATARS.length],
    joinDate: 'Feb 10, 2024'
  });
}

export default function ManageUsersScreen({ navigation }: any) {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const flatListRef = useRef<FlatList>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Explorer');
  const [newStatus, setNewStatus] = useState('Active');

  const openAddModal = () => {
    setNewName('');
    setNewEmail('');
    setNewRole('Explorer');
    setNewStatus('Active');
    setIsModalVisible(true);
  };

  const handleAddUser = () => {
    if (!newName || !newEmail) {
      Alert.alert('Required Fields', 'Please enter a name and email.');
      return;
    }
    const newUser = {
      id: Math.random().toString(),
      name: newName,
      email: newEmail,
      role: newRole,
      status: newStatus,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      joinDate: 'Today',
    };
    setUsers([newUser, ...users]);
    setIsModalVisible(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSuspend = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    const actionText = currentStatus === 'Active' ? 'suspend' : 'reactivate';
    
    Alert.alert(
      `Confirm Action`,
      `Are you sure you want to ${actionText} this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: currentStatus === 'Active' ? 'Suspend' : 'Reactivate', 
          style: currentStatus === 'Active' ? 'destructive' : 'default',
          onPress: () => {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
          }
        }
      ]
    );
  };

  const handleDelete = (userId: string) => {
    Alert.alert(
      'Delete User',
      'This action is irreversible. The user and all their data will be permanently removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Permanently', 
          style: 'destructive',
          onPress: () => {
            setUsers(prev => prev.filter(u => u.id !== userId));
          }
        }
      ]
    );
  };

  const renderUserCard = ({ item }: { item: typeof MOCK_USERS[0] }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfoRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: item.role === 'Admin' ? '#EFF6FF' : '#F3F4F6' }]}>
              <Text style={[styles.badgeText, { color: item.role === 'Admin' ? '#2563EB' : '#4B5563' }]}>{item.role}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.status === 'Active' ? '#E8F5E9' : '#FEF2F2' }]}>
              <Text style={[styles.badgeText, { color: item.status === 'Active' ? '#2E7D32' : '#DC2626' }]}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.joinDate}>Joined {item.joinDate}</Text>
        <View style={styles.actionRow}>
          {item.role !== 'Admin' && (
            <TouchableOpacity 
              style={[styles.actionBtn, { backgroundColor: item.status === 'Active' ? '#FEF2F2' : '#E8F5E9' }]}
              onPress={() => handleSuspend(item.id, item.status)}
            >
              <Feather name={item.status === 'Active' ? 'pause-circle' : 'play-circle'} size={14} color={item.status === 'Active' ? '#DC2626' : '#2E7D32'} />
              <Text style={[styles.actionBtnText, { color: item.status === 'Active' ? '#DC2626' : '#2E7D32' }]}>
                {item.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Feather name="trash-2" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1E3B20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Users</Text>
        <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
          <Feather name="plus" size={20} color="#1E3B20" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Feather name="x-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={paginatedUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="users" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No users found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search query.</Text>
          </View>
        }
        ListFooterComponent={
          filteredUsers.length > itemsPerPage ? (
            <View style={styles.paginationContainer}>
              <TouchableOpacity 
                style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]} 
                disabled={currentPage === 1}
                onPress={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
                }}
              >
                <Feather name="chevron-left" size={20} color={currentPage === 1 ? '#9CA3AF' : '#1E3B20'} />
              </TouchableOpacity>
              
              <Text style={styles.pageText}>
                Page {currentPage} of {totalPages}
              </Text>
              
              <TouchableOpacity 
                style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]} 
                disabled={currentPage === totalPages}
                onPress={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
                }}
              >
                <Feather name="chevron-right" size={20} color={currentPage === totalPages ? '#9CA3AF' : '#1E3B20'} />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />

      {/* Add User Modal */}
      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafeArea}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalCloseBtn}>
                <Feather name="x" size={24} color="#1E3B20" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New User</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalForm}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. John Doe"
                value={newName}
                onChangeText={setNewName}
              />

              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. john@example.com"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>User Role</Text>
              <View style={styles.statusToggleContainer}>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newRole === 'Explorer' && styles.statusToggleActive]}
                  onPress={() => setNewRole('Explorer')}
                >
                  <Text style={[styles.statusToggleText, newRole === 'Explorer' && styles.statusToggleTextActive]}>Explorer</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newRole === 'Admin' && styles.statusToggleActive]}
                  onPress={() => setNewRole('Admin')}
                >
                  <Text style={[styles.statusToggleText, newRole === 'Admin' && styles.statusToggleTextActive]}>Admin</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Account Status</Text>
              <View style={styles.statusToggleContainer}>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newStatus === 'Active' && styles.statusToggleActive]}
                  onPress={() => setNewStatus('Active')}
                >
                  <Text style={[styles.statusToggleText, newStatus === 'Active' && styles.statusToggleTextActive]}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.statusToggleBtn, newStatus === 'Suspended' && styles.statusToggleInactive]}
                  onPress={() => setNewStatus('Suspended')}
                >
                  <Text style={[styles.statusToggleText, newStatus === 'Suspended' && styles.statusToggleTextActive]}>Suspended</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleAddUser}>
                <Text style={styles.submitBtnText}>Create User</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#111827',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  userInfoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  joinDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  iconBtn: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  pageBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pageBtnDisabled: {
    backgroundColor: '#F3F4F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 16,
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#fff',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3B20',
  },
  modalForm: {
    padding: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 24,
    color: '#111827',
  },
  submitBtn: {
    backgroundColor: '#1E3B20',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  statusToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  statusToggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  statusToggleActive: {
    backgroundColor: '#1E3B20',
  },
  statusToggleInactive: {
    backgroundColor: '#6B7280',
  },
  statusToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusToggleTextActive: {
    color: '#fff',
  },
});
