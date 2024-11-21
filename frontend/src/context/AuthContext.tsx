import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthProvider {
  children: ReactNode;
}

interface AuthContext {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: AuthProvider) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (authToken) {
      const decodedToken: { exp: number } = jwtDecode(authToken);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

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
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
