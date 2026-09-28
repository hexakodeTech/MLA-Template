import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padded?: boolean;
  surface?: "white" | "ivory" | "sage" | "dark";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  padded = true,
  surface = "white",
}) => {
  const surfaceStyles = {
    white: "bg-white dark:bg-[#21342A] border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9]",
    ivory: "bg-ivory dark:bg-[#182720] border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9]",
    sage: "bg-sage/50 dark:bg-[#182720]/80 border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9]",
    dark: "bg-forest-dark dark:bg-[#111C18] border-forest/30 dark:border-[#35463C] text-ivory dark:text-[#F5F2E9]",
  };

  return (
    <div
      className={clsx(
        "rounded-sm border transition-all duration-300 overflow-hidden",
        surfaceStyles[surface],
        hoverEffect && "hover:border-forest/40 hover:-translate-y-0.5",
        padded && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};
