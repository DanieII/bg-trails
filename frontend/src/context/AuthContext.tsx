import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

type AuthProvider = {
  children: ReactNode;
};

type AuthContext = {
  authToken: string | null;
  userId: string | null;
  setAuthToken: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  authToken: null,
  userId: null,
  setAuthToken: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: AuthProvider) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (authToken) {
      const decodedToken: { id: string; iat: number; exp: number } =
        jwtDecode(authToken);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

      setUserId(decodedToken.id);

      if (isTokenExpired) {
        setAuthToken(null);
      } else {
        localStorage.setItem('token', authToken);
      }
    } else {
      localStorage.removeItem('token');
    }
  }, [authToken]);

  function logout() {
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ authToken, userId, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
