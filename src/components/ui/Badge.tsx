import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "copper" | "charcoal" | "stone" | "blue" | "ivory" | "sample" | "forest" | "terracotta" | "sage" | "dark" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "copper",
  size = "sm",
  className,
}) => {
  const variantStyles = {
    copper: "bg-copper/10 text-copper-dark border-copper/25 font-semibold dark:bg-[#D29A78]/15 dark:text-[#D29A78] dark:border-[#D29A78]/30",
    charcoal: "bg-charcoal text-white border-charcoal font-medium dark:bg-[#F4F1E9] dark:text-[#191A18] dark:border-[#F4F1E9]",
    stone: "bg-stone text-charcoal border-warm-grey font-medium dark:bg-[#2C2D29] dark:text-[#C6C5BD] dark:border-[#41413B]",
    blue: "bg-muted-blue/10 text-muted-blue border-muted-blue/25 font-medium dark:bg-[#91A7B8]/15 dark:text-[#91A7B8] dark:border-[#91A7B8]/30",
    ivory: "bg-ivory text-charcoal border-warm-grey font-medium dark:bg-[#222320] dark:text-[#F4F1E9] dark:border-[#41413B]",
    sample: "bg-copper/10 text-copper-dark border-copper/25 font-medium tracking-wide dark:bg-[#D29A78]/15 dark:text-[#D29A78] dark:border-[#D29A78]/30",
    // Backward compatibility aliases
    forest: "bg-copper/10 text-copper-dark border-copper/25 font-semibold dark:bg-[#D29A78]/15 dark:text-[#D29A78] dark:border-[#D29A78]/30",
    terracotta: "bg-copper/10 text-copper-dark border-copper/25 font-semibold dark:bg-[#D29A78]/15 dark:text-[#D29A78] dark:border-[#D29A78]/30",
    sage: "bg-stone text-charcoal border-warm-grey font-medium dark:bg-[#2C2D29] dark:text-[#C6C5BD] dark:border-[#41413B]",
    dark: "bg-charcoal text-white border-charcoal font-medium dark:bg-[#F4F1E9] dark:text-[#191A18] dark:border-[#F4F1E9]",
    neutral: "bg-stone text-charcoal border-warm-grey font-medium dark:bg-[#2C2D29] dark:text-[#C6C5BD] dark:border-[#41413B]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 rounded-sm tracking-wider uppercase",
    md: "text-xs px-3 py-1 rounded-sm tracking-wide uppercase",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
