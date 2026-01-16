import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/lib/apiConfig';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null | undefined;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider mounting...');
    // Check if user is logged in on component mount and validate token
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    console.log('Stored token:', storedToken ? 'exists' : 'none');
    console.log('Stored user:', storedUser ? 'exists' : 'none');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      console.log('Setting user from localStorage');
      
      // Validate token with backend
      validateToken(storedToken);
    } else {
      // No stored credentials, set user to null
      console.log('No stored credentials, setting user to null');
      setUser(null);
    }
  }, []);

  const validateToken = async (token: string) => {
    console.log('Validating token...');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Token validation response status:', response.status);
      
      if (!response.ok) {
        // Token is invalid, clear auth state
        console.log('Token invalid, logging out');
        logout();
      } else {
        console.log('Token valid, keeping user authenticated');
      }
      // If response is ok, token is valid and we keep the current state
      // User state is already set from localStorage
    } catch (error) {
      // Network error or other issues, clear auth state
      console.error('Token validation failed:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { token, user } = data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/admin');
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { token, user } = data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/admin');
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};