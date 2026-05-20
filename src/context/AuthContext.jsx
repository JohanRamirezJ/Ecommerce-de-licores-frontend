import { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const sessionUser = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (sessionUser && token) {
      setUser(JSON.parse(sessionUser));
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const login = (userData, token, rememberMe) => {
    setUser(userData);
    setAuthToken(token);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('userSession', JSON.stringify(userData));
    if (token) storage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
