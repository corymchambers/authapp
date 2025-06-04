import { loginUser, registerUser } from '@/utils/api';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const JWT_KEY = 'user-token';

type AuthProps = {
  token: string | null;
  userId: number | null;
  onRegister: (email: string, password: string, name?: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
  initialized: boolean;
};

// Add interface for decoded token
interface DecodedToken {
  id: number;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Add function to handle token processing
  const processToken = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.id);
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error processing token:', error);
      handleLogout();
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(JWT_KEY);
      if (storedToken) {
        processToken(storedToken);
      }
      setInitialized(true);
    };
    loadToken();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<any> => {
    const result = await loginUser(email, password);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    processToken(result.data);
    await SecureStore.setItemAsync(JWT_KEY, result.data);
    return result;
  };

  const handleRegister = async (email: string, password: string, name?: string) => {
    const result = await registerUser(email, password, name);
    if (result.error) {
      return { error: true, msg: result.error };
    }
    return result;
  };

  const handleLogout = async () => {
    setToken(null);
    setUserId(null);
    await SecureStore.deleteItemAsync(JWT_KEY);
    axios.defaults.headers.common['Authorization'] = '';
  };

  const value = {
    initialized,
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
    token,
    userId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};