"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STORAGE_KEY = "pisharady_portal_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const applyThemeToDOM = useCallback((newTheme: Theme, withTransition = true) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (withTransition) {
      root.classList.add("theme-transition");
    }

    if (newTheme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    if (withTransition) {
      window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 250);
    }
  }, []);

  // Initialize theme on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === "dark" || stored === "light") {
        setThemeState(stored);
        applyThemeToDOM(stored, false);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const systemTheme: Theme = prefersDark ? "dark" : "light";
        setThemeState(systemTheme);
        applyThemeToDOM(systemTheme, false);
      }
    } catch {
      setThemeState("light");
    }
    setMounted(true);
  }, [applyThemeToDOM]);

  // Listen to system preference changes if no user preference is explicitly saved
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (!stored) {
          const sysTheme: Theme = e.matches ? "dark" : "light";
          setThemeState(sysTheme);
          applyThemeToDOM(sysTheme, true);
        }
      } catch {
        // ignore
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyThemeToDOM]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      applyThemeToDOM(newTheme, true);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // ignore storage errors
      }
    },
    [applyThemeToDOM]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme: theme,
        toggleTheme,
        setTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
