import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest } from '../api/client';

const AuthContext = createContext(null);

function readSession() {
  try {
    const token = localStorage.getItem('hospital-token');
    const user = JSON.parse(localStorage.getItem('hospital-user') || 'null');
    return token && user ? { token, user } : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = async (email, password, roleSelection = 'user') => {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role: roleSelection }),
    });
    localStorage.setItem('hospital-token', result.token);
    localStorage.setItem('hospital-user', JSON.stringify(result.user));
    setSession({ token: result.token, user: result.user });
    return result.user;
  };

  const signup = async (form) => {
    const result = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    localStorage.setItem('hospital-token', result.token);
    localStorage.setItem('hospital-user', JSON.stringify(result.user));
    setSession({ token: result.token, user: result.user });
    return result.user;
  };

  const logout = () => {
    localStorage.removeItem('hospital-token');
    localStorage.removeItem('hospital-user');
    setSession({ token: null, user: null });
  };

  const value = useMemo(() => ({ ...session, login, signup, logout }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
