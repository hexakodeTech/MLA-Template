import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padded?: boolean;
  surface?: "white" | "ivory" | "stone" | "sage" | "dark";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  padded = true,
  surface = "white",
}) => {
  const surfaceStyles = {
    white: "bg-white dark:bg-[#2C2D29] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9]",
    ivory: "bg-ivory dark:bg-[#222320] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9]",
    stone: "bg-stone/60 dark:bg-[#222320] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9]",
    sage: "bg-stone/60 dark:bg-[#222320] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9]",
    dark: "bg-charcoal dark:bg-[#191A18] border-warm-grey/30 dark:border-[#41413B] text-[#F4F1E9]",
  };

  return (
    <div
      className={clsx(
        "rounded-sm border transition-all duration-300 overflow-hidden",
        surfaceStyles[surface],
        hoverEffect && "hover:border-copper/40 dark:hover:border-[#D29A78]/50 hover:-translate-y-0.5",
        padded && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};
