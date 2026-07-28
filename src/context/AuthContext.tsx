import React, { createContext, useState, useContext } from 'react';

type Role = 'public' | 'admin' | null;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profilePicture: any;
}

interface AuthContextType {
  role: Role;
  user: UserProfile;
  login: (role: Role) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  name: 'Vishal Srivastava',
  email: 'vishalsrivastava@example.com',
  phone: '+91 8418007563',
  profilePicture: require('../../assets/images/profile.jpg')
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const logout = () => {
    setRole(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
