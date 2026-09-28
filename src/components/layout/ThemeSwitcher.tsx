"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import clsx from "clsx";

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className,
  showLabel = false,
}) => {
  const { theme, toggleTheme, mounted } = useTheme();
  const { language } = useLanguage();

  const isDark = mounted ? theme === "dark" : false;

  const label = isDark
    ? language === "ml"
      ? "ലൈറ്റ് മോഡിലേക്ക് മാറ്റുക"
      : "Switch to light mode"
    : language === "ml"
    ? "ഡാർക്ക് മോഡിലേക്ക് മാറ്റുക"
    : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={clsx(
        "relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg transition-all duration-200 cursor-pointer select-none",
        "border border-sage-border/80 dark:border-[#35463C]",
        "bg-ivory/80 hover:bg-white dark:bg-[#182720]/80 dark:hover:bg-[#21342A]",
        "text-charcoal hover:text-forest dark:text-[#F5F2E9] dark:hover:text-[#8CB99B]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B]",
        className
      )}
    >
      <span className="sr-only">{label}</span>

      {/* Icon rendering with smooth rotation and scale */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        {mounted ? (
          isDark ? (
            <Sun className="w-4 h-4 text-[#8CB99B] transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Moon className="w-4 h-4 text-forest transition-transform duration-300 rotate-0 scale-100" />
          )
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-sage-dark/30 animate-pulse" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold tracking-wider uppercase">
          {isDark
            ? language === "ml"
              ? "ലൈറ്റ് മോഡ്"
              : "Light Mode"
            : language === "ml"
            ? "ഡാർക്ക് മോഡ്"
            : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
