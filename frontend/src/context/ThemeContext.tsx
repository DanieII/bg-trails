import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeProvider {
  children: ReactNode;
}

export const ThemeContext = createContext({ prefersDark: false });

export function ThemeProvider({ children }: ThemeProvider) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ThemeContext.Provider value={{ prefersDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
