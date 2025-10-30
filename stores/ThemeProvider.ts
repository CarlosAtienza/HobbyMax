import React, { createContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

type ThemeProviderProps = {
    children: React.ReactNode
}

const THEME_STORAGE_KEY = '@app_theme';

export function ThemeProvider({ children } : ThemeProviderProps) {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = React.useState('light');

    useEffect(() => {
        loadSavedTheme();
    }, []);

    const loadSavedTheme = async () => {
        try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Use system theme as default if no saved theme
        setTheme(systemColorScheme || 'light');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
    }

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
        console.error('Failed to save theme:', error);
        }
  };

  
  return (
    <ThemeContext.Provider value={{ value }}>
      {children}
    </ThemeContext.Provider>
  );
}

