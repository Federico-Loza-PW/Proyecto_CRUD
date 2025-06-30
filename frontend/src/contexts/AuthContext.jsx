import { createContext, useContext, useState } from 'react';
import { login as loginService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    if (stored && typeof stored === 'string') {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.warn("Error al leer usuario del localStorage:", error);
        localStorage.removeItem('user');
        return null;
      }
    } else {
      return null;
    }
  });

  const login = async (credentials) => {
  try {
    const { data } = await loginService(credentials);
    if (data && data.token) {
      setUser({ email: credentials.email });
      localStorage.setItem('user', JSON.stringify({ email: credentials.email }));
      localStorage.setItem('token', data.token);
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error; // rethrow error to handle it in the calling function
  }
};
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };