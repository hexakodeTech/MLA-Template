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
        "relative inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2 sm:p-2.5 rounded-sm transition-all duration-200 cursor-pointer select-none",
        "border border-warm-grey dark:border-[#41413B]",
        "bg-white/80 hover:bg-stone/60 dark:bg-[#2C2D29] dark:hover:bg-[#343530]",
        "text-charcoal hover:text-copper dark:text-[#F4F1E9] dark:hover:text-[#D29A78]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
        className
      )}
    >
      <span className="sr-only">{label}</span>

      {/* Icon rendering with smooth rotation and scale */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        {mounted ? (
          isDark ? (
            <Sun className="w-4 h-4 text-[#D29A78] transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Moon className="w-4 h-4 text-charcoal transition-transform duration-300 rotate-0 scale-100" />
          )
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-warm-grey animate-pulse" />
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
