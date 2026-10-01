import { useState } from 'react';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : localStorage.getItem('token')
  );

  const loginUser = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
