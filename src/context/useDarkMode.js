import { createContext, useContext } from "react";

export const DarkModeContext = createContext();

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext used outside of DarkModeProvider");

  return context;
}
