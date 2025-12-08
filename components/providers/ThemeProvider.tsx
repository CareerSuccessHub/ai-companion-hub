"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, themes } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes['pixel-rpg']);

  const setTheme = (themeId: string) => {
    if (themes[themeId]) {
      setCurrentTheme(themes[themeId]);
    }
  };

  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
