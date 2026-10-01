import { createContext, useContext } from 'react';

export type AuthContextType = {
  token: string | null;
  loginUser: (token: string) => void;
  logoutUser: () => void;
};

/**
 * Auth context + consumer hook.
 *
 * Split out of `useAuth.tsx` so that module only exports the
 * `AuthProvider` component (react-refresh / Fast Refresh).
 */
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
