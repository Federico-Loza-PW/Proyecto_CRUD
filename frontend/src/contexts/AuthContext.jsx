import { createContext, useContext, useState } from 'react';
import { login as loginService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Error al leer usuario:", error);
      localStorage.removeItem('user');
      return null;
    }
  });
  

  const login = async (credentials) => {
    const { data } = await loginService(credentials);
    console.log('Login exitoso:', data);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.user.role);
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