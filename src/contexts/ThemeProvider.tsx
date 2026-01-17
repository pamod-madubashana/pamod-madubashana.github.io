import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSettings } from './SettingsContext';

interface ThemeContextType {
  refreshTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (!loading && settings) {
      const root = document.documentElement;
      
      // Convert hex colors to HSL for CSS variables
      const primaryHsl = hexToHsl(settings.themeOptions.primaryColor);
      const secondaryHsl = hexToHsl(settings.themeOptions.secondaryColor);
      
      // Update CSS variables
      root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--primary-foreground', getForegroundColor(primaryHsl));
      root.style.setProperty('--secondary', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--secondary-foreground', getForegroundColor(secondaryHsl));
      root.style.setProperty('--ring', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--accent', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--accent-foreground', getForegroundColor(secondaryHsl));
      
      // Update neon colors too
      root.style.setProperty('--neon-cyan', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--neon-purple', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--chart-1', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--chart-2', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      
      // Apply font family
      root.style.setProperty('--font-family', settings.themeOptions.fontFamily);
    }
  }, [settings, loading]);

  const refreshTheme = () => {
    // Re-trigger the theme update effect
    if (settings) {
      const root = document.documentElement;
      
      // Convert hex colors to HSL for CSS variables
      const primaryHsl = hexToHsl(settings.themeOptions.primaryColor);
      const secondaryHsl = hexToHsl(settings.themeOptions.secondaryColor);
      
      // Update CSS variables
      root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--primary-foreground', getForegroundColor(primaryHsl));
      root.style.setProperty('--secondary', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--secondary-foreground', getForegroundColor(secondaryHsl));
      root.style.setProperty('--ring', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--accent', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--accent-foreground', getForegroundColor(secondaryHsl));
      
      // Update neon colors too
      root.style.setProperty('--neon-cyan', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--neon-purple', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      root.style.setProperty('--chart-1', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
      root.style.setProperty('--chart-2', `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`);
      
      // Apply font family
      root.style.setProperty('--font-family', settings.themeOptions.fontFamily);
    }
  };

  return (
    <ThemeContext.Provider value={{ refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return { h, s, l };
}

// Helper function to determine foreground color based on background luminance
function getForegroundColor(hsl: { h: number; s: number; l: number }): string {
  // If lightness is above 50%, use dark foreground, otherwise light foreground
  return hsl.l > 50 ? '220 30% 5%' : '0 0% 100%'; // Represents dark or light color in HSL
}