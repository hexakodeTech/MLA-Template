"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface AccessibilitySettings {
  // Text Scaling (0.8 to 1.5, default 1.0)
  fontScale: number;

  // Display Settings
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  reduceTransparency: boolean;

  // Reading Settings
  lineHeight: "default" | "increased" | "extra";
  letterSpacing: "default" | "slight" | "moderate";
  underlineLinks: boolean;

  // Motion Settings
  reduceMotion: boolean;

  // Navigation Settings
  highlightFocus: boolean;
}

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  fontScale: 1.0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  reduceTransparency: false,
  lineHeight: "default",
  letterSpacing: "default",
  underlineLinks: false,
  reduceMotion: false,
  highlightFocus: false,
};

export const A11Y_STORAGE_KEY = "pisharady_portal_a11y";

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  isCustomized: boolean;
  statusMessage: string;
  setFontScale: (scale: number) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleHighlightLinks: () => void;
  toggleReduceTransparency: () => void;
  setLineHeight: (val: "default" | "increased" | "extra") => void;
  setLetterSpacing: (val: "default" | "slight" | "moderate") => void;
  toggleUnderlineLinks: () => void;
  toggleReduceMotion: () => void;
  toggleHighlightFocus: () => void;
  resetCategory: (category: "text" | "display" | "reading" | "motion" | "navigation") => void;
  resetAllSettings: () => void;
  clearStatusMessage: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_A11Y_SETTINGS);
  const [statusMessage, setStatusMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  // Announce status to screen readers and auto-clear after 4s
  const announce = useCallback((msg: string) => {
    setStatusMessage(msg);
    const timer = setTimeout(() => {
      setStatusMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const clearStatusMessage = useCallback(() => {
    setStatusMessage("");
  }, []);

  // Synchronize settings with DOM attributes and CSS variables
  const applySettingsToDOM = useCallback((s: AccessibilitySettings) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // 1. Text scaling
    root.style.setProperty("--a11y-font-scale", s.fontScale.toString());
    root.setAttribute("data-a11y-font-scale", s.fontScale.toString());

    // 2. High contrast
    if (s.highContrast) {
      root.setAttribute("data-a11y-contrast", "high");
    } else {
      root.removeAttribute("data-a11y-contrast");
    }

    // 3. Grayscale
    if (s.grayscale) {
      root.setAttribute("data-a11y-grayscale", "true");
    } else {
      root.removeAttribute("data-a11y-grayscale");
    }

    // 4. Highlight links
    if (s.highlightLinks) {
      root.setAttribute("data-a11y-highlight-links", "true");
    } else {
      root.removeAttribute("data-a11y-highlight-links");
    }

    // 5. Reduce transparency
    if (s.reduceTransparency) {
      root.setAttribute("data-a11y-reduce-transparency", "true");
    } else {
      root.removeAttribute("data-a11y-reduce-transparency");
    }

    // 6. Line height
    if (s.lineHeight !== "default") {
      root.setAttribute("data-a11y-line-height", s.lineHeight);
    } else {
      root.removeAttribute("data-a11y-line-height");
    }

    // 7. Letter spacing
    if (s.letterSpacing !== "default") {
      root.setAttribute("data-a11y-letter-spacing", s.letterSpacing);
    } else {
      root.removeAttribute("data-a11y-letter-spacing");
    }

    // 8. Underline links
    if (s.underlineLinks) {
      root.setAttribute("data-a11y-underline-links", "true");
    } else {
      root.removeAttribute("data-a11y-underline-links");
    }

    // 9. Reduce motion
    if (s.reduceMotion) {
      root.setAttribute("data-a11y-reduce-motion", "true");
    } else {
      root.removeAttribute("data-a11y-reduce-motion");
    }

    // 10. Highlight focus
    if (s.highlightFocus) {
      root.setAttribute("data-a11y-highlight-focus", "true");
    } else {
      root.removeAttribute("data-a11y-highlight-focus");
    }
  }, []);

  // Save to localStorage
  const persistSettings = useCallback((newSettings: AccessibilitySettings) => {
    try {
      localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore storage quota/security errors
    }
  }, []);

  // Update state, apply to DOM, and persist
  const updateSettings = useCallback(
    (updater: (prev: AccessibilitySettings) => AccessibilitySettings, announcement?: string) => {
      setSettings((prev) => {
        const next = updater(prev);
        applySettingsToDOM(next);
        persistSettings(next);
        return next;
      });
      if (announcement) {
        announce(announcement);
      }
    },
    [applySettingsToDOM, persistSettings, announce]
  );

  // Initialize from localStorage or OS defaults on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(A11Y_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged: AccessibilitySettings = {
          ...DEFAULT_A11Y_SETTINGS,
          ...parsed,
        };
        setSettings(merged);
        applySettingsToDOM(merged);
      } else {
        // Detect OS prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) {
          const initial: AccessibilitySettings = {
            ...DEFAULT_A11Y_SETTINGS,
            reduceMotion: true,
          };
          setSettings(initial);
          applySettingsToDOM(initial);
        } else {
          applySettingsToDOM(DEFAULT_A11Y_SETTINGS);
        }
      }
    } catch {
      applySettingsToDOM(DEFAULT_A11Y_SETTINGS);
    }
    setMounted(true);
  }, [applySettingsToDOM]);

  // Check if any setting differs from default
  const isCustomized =
    settings.fontScale !== DEFAULT_A11Y_SETTINGS.fontScale ||
    settings.highContrast !== DEFAULT_A11Y_SETTINGS.highContrast ||
    settings.grayscale !== DEFAULT_A11Y_SETTINGS.grayscale ||
    settings.highlightLinks !== DEFAULT_A11Y_SETTINGS.highlightLinks ||
    settings.reduceTransparency !== DEFAULT_A11Y_SETTINGS.reduceTransparency ||
    settings.lineHeight !== DEFAULT_A11Y_SETTINGS.lineHeight ||
    settings.letterSpacing !== DEFAULT_A11Y_SETTINGS.letterSpacing ||
    settings.underlineLinks !== DEFAULT_A11Y_SETTINGS.underlineLinks ||
    settings.reduceMotion !== DEFAULT_A11Y_SETTINGS.reduceMotion ||
    settings.highlightFocus !== DEFAULT_A11Y_SETTINGS.highlightFocus;

  // Granular Actions
  const setFontScale = useCallback(
    (scale: number) => {
      const clamped = Math.min(1.5, Math.max(0.8, Math.round(scale * 10) / 10));
      updateSettings(
        (prev) => ({ ...prev, fontScale: clamped }),
        `Text size set to ${Math.round(clamped * 100)}%`
      );
    },
    [updateSettings]
  );

  const increaseTextSize = useCallback(() => {
    updateSettings(
      (prev) => {
        const next = Math.min(1.5, Math.round((prev.fontScale + 0.1) * 10) / 10);
        return { ...prev, fontScale: next };
      },
      `Text size increased to ${Math.round(Math.min(1.5, settings.fontScale + 0.1) * 100)}%`
    );
  }, [updateSettings, settings.fontScale]);

  const decreaseTextSize = useCallback(() => {
    updateSettings(
      (prev) => {
        const next = Math.max(0.8, Math.round((prev.fontScale - 0.1) * 10) / 10);
        return { ...prev, fontScale: next };
      },
      `Text size decreased to ${Math.round(Math.max(0.8, settings.fontScale - 0.1) * 100)}%`
    );
  }, [updateSettings, settings.fontScale]);

  const resetTextSize = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, fontScale: 1.0 }),
      "Text size reset to default 100%"
    );
  }, [updateSettings]);

  const toggleHighContrast = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, highContrast: !prev.highContrast }),
      settings.highContrast
        ? "High contrast mode disabled"
        : "High contrast mode enabled"
    );
  }, [updateSettings, settings.highContrast]);

  const toggleGrayscale = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, grayscale: !prev.grayscale }),
      settings.grayscale ? "Grayscale mode disabled" : "Grayscale mode enabled"
    );
  }, [updateSettings, settings.grayscale]);

  const toggleHighlightLinks = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, highlightLinks: !prev.highlightLinks }),
      settings.highlightLinks
        ? "Highlight links disabled"
        : "Highlight links enabled"
    );
  }, [updateSettings, settings.highlightLinks]);

  const toggleReduceTransparency = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, reduceTransparency: !prev.reduceTransparency }),
      settings.reduceTransparency
        ? "Reduce transparency disabled"
        : "Reduce transparency enabled"
    );
  }, [updateSettings, settings.reduceTransparency]);

  const setLineHeight = useCallback(
    (val: "default" | "increased" | "extra") => {
      updateSettings(
        (prev) => ({ ...prev, lineHeight: val }),
        `Line spacing set to ${val}`
      );
    },
    [updateSettings]
  );

  const setLetterSpacing = useCallback(
    (val: "default" | "slight" | "moderate") => {
      updateSettings(
        (prev) => ({ ...prev, letterSpacing: val }),
        `Letter spacing set to ${val}`
      );
    },
    [updateSettings]
  );

  const toggleUnderlineLinks = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, underlineLinks: !prev.underlineLinks }),
      settings.underlineLinks
        ? "Underline links disabled"
        : "Underline links enabled"
    );
  }, [updateSettings, settings.underlineLinks]);

  const toggleReduceMotion = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }),
      settings.reduceMotion
        ? "Animations and transitions enabled"
        : "Animations and transitions reduced"
    );
  }, [updateSettings, settings.reduceMotion]);

  const toggleHighlightFocus = useCallback(() => {
    updateSettings(
      (prev) => ({ ...prev, highlightFocus: !prev.highlightFocus }),
      settings.highlightFocus
        ? "Highlight keyboard focus disabled"
        : "Highlight keyboard focus enabled"
    );
  }, [updateSettings, settings.highlightFocus]);

  // Reset category
  const resetCategory = useCallback(
    (category: "text" | "display" | "reading" | "motion" | "navigation") => {
      updateSettings((prev) => {
        switch (category) {
          case "text":
            return { ...prev, fontScale: DEFAULT_A11Y_SETTINGS.fontScale };
          case "display":
            return {
              ...prev,
              highContrast: DEFAULT_A11Y_SETTINGS.highContrast,
              grayscale: DEFAULT_A11Y_SETTINGS.grayscale,
              highlightLinks: DEFAULT_A11Y_SETTINGS.highlightLinks,
              reduceTransparency: DEFAULT_A11Y_SETTINGS.reduceTransparency,
            };
          case "reading":
            return {
              ...prev,
              lineHeight: DEFAULT_A11Y_SETTINGS.lineHeight,
              letterSpacing: DEFAULT_A11Y_SETTINGS.letterSpacing,
              underlineLinks: DEFAULT_A11Y_SETTINGS.underlineLinks,
            };
          case "motion":
            return {
              ...prev,
              reduceMotion: DEFAULT_A11Y_SETTINGS.reduceMotion,
            };
          case "navigation":
            return {
              ...prev,
              highlightFocus: DEFAULT_A11Y_SETTINGS.highlightFocus,
            };
          default:
            return prev;
        }
      }, `${category.charAt(0).toUpperCase() + category.slice(1)} accessibility settings reset`);
    },
    [updateSettings]
  );

  // Reset ALL settings (does not touch selected light/dark theme)
  const resetAllSettings = useCallback(() => {
    setSettings(DEFAULT_A11Y_SETTINGS);
    applySettingsToDOM(DEFAULT_A11Y_SETTINGS);
    try {
      localStorage.removeItem(A11Y_STORAGE_KEY);
    } catch {
      // ignore
    }
    announce("Accessibility settings have been reset.");
  }, [applySettingsToDOM, announce]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        isCustomized,
        statusMessage,
        setFontScale,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
        toggleHighContrast,
        toggleGrayscale,
        toggleHighlightLinks,
        toggleReduceTransparency,
        setLineHeight,
        setLetterSpacing,
        toggleUnderlineLinks,
        toggleReduceMotion,
        toggleHighlightFocus,
        resetCategory,
        resetAllSettings,
        clearStatusMessage,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
};
