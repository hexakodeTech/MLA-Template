import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "terracotta" | "sage" | "ivory" | "dark" | "sample" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "forest",
  size = "sm",
  className,
}) => {
  const variantStyles = {
    forest: "bg-forest/10 text-forest border-forest/20 font-medium dark:bg-[#8CB99B]/15 dark:text-[#8CB99B] dark:border-[#8CB99B]/30",
    terracotta: "bg-terracotta/10 text-terracotta-dark border-terracotta/25 font-semibold dark:bg-[#E19A76]/15 dark:text-[#E19A76] dark:border-[#E19A76]/30",
    sage: "bg-sage text-charcoal border-sage-dark/30 font-medium dark:bg-[#21342A] dark:text-[#C3CDC4] dark:border-[#35463C]",
    ivory: "bg-ivory text-charcoal border-sage-dark/40 font-medium dark:bg-[#182720] dark:text-[#F5F2E9] dark:border-[#35463C]",
    dark: "bg-forest-dark text-ivory border-forest/40 font-medium dark:bg-[#182720] dark:text-[#F5F2E9] dark:border-[#35463C]",
    neutral: "bg-sage-light text-charcoal border-sage-border font-medium dark:bg-[#182720] dark:text-[#C3CDC4] dark:border-[#35463C]",
    sample: "bg-terracotta-soft text-terracotta-dark border-terracotta/30 font-medium tracking-wide dark:bg-[#E19A76]/15 dark:text-[#E19A76] dark:border-[#E19A76]/30",
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
