import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'rider' | 'admin';
  studentId: string;
  phone: string;
  avatar?: string;
  verified: boolean;
  walletBalance: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('jhotpot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      name: 'Ahmed Rahman',
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('rider') ? 'rider' : 'student',
      studentId: 'CU-2021-001',
      phone: '+880 1700 000000',
      verified: true,
      walletBalance: 250
    };
    
    setUser(mockUser);
    localStorage.setItem('jhotpot_user', JSON.stringify(mockUser));
  };

  const signup = async (userData: Partial<User>, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'student',
      studentId: userData.studentId || '',
      phone: userData.phone || '',
      verified: false,
      walletBalance: 0
    };
    
    setUser(newUser);
    localStorage.setItem('jhotpot_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jhotpot_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('jhotpot_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}