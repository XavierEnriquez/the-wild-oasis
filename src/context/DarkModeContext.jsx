/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { DarkModeContext } from "./useDarkMode";

export function DarkModeProvider({ children }) {
  // Checking if user's settings set to dark mode. Return boolean.
  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Initial value of isDarkMode is user's system settings (true or false)
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    systemDarkMode,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
