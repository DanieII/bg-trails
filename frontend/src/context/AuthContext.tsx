import { createContext, useState, useEffect, ReactNode } from "react";

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
  logout: () => {},
});

export function AuthProvider({ children }: AuthProvider) {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
    } else {
      localStorage.removeItem("token");
    }
  }, [authToken]);

  function logout() {
    setAuthToken("");
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
