import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [customColor, setCustomColor] = useState(() => localStorage.getItem("customColor") || "#004BA8"); // Default blue color

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
    
    // Set the custom color as a CSS variable
    document.documentElement.style.setProperty('--custom-color', customColor);
    localStorage.setItem("customColor", customColor);
  }, [darkMode, customColor]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, customColor, setCustomColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 