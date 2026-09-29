"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"       // Deep Charcoal with White text (Dark: Ivory with Charcoal text)
    | "secondary"     // Transparent with Charcoal text & Warm Grey border
    | "terracotta"    // Muted Copper accent button
    | "copper"        // Muted Copper accent button
    | "outline"       // Clean outline on neutral background
    | "outline-light" // Clean outline on dark surface
    | "ghost";        // Minimal text button
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-charcoal text-white hover:bg-[#383935] dark:bg-[#F4F1E9] dark:text-[#191A18] dark:hover:bg-[#E5E2DA] focus-visible:ring-charcoal dark:focus-visible:ring-[#F4F1E9] border border-transparent shadow-xs",
    secondary:
      "bg-transparent text-charcoal border border-warm-grey hover:bg-stone/50 hover:border-slate/40 dark:bg-transparent dark:text-[#F4F1E9] dark:border-[#41413B] dark:hover:bg-[#2C2D29] dark:hover:border-[#C6C5BD]/40 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
    terracotta:
      "bg-copper text-white hover:bg-copper-dark dark:bg-[#D29A78] dark:text-[#191A18] dark:hover:bg-[#dfa989] focus-visible:ring-copper shadow-xs",
    copper:
      "bg-copper text-white hover:bg-copper-dark dark:bg-[#D29A78] dark:text-[#191A18] dark:hover:bg-[#dfa989] focus-visible:ring-copper shadow-xs",
    outline:
      "bg-transparent text-charcoal border border-warm-grey hover:border-charcoal hover:bg-stone/40 dark:text-[#F4F1E9] dark:border-[#41413B] dark:hover:bg-[#2C2D29] dark:hover:border-[#C6C5BD] focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
    "outline-light":
      "bg-transparent text-[#F4F1E9] border border-[#F4F1E9]/30 hover:bg-[#F4F1E9]/10 hover:border-[#F4F1E9] dark:border-[#41413B] dark:text-[#F4F1E9] dark:hover:bg-[#2C2D29] focus-visible:ring-[#F4F1E9] dark:focus-visible:ring-[#D29A78]",
    ghost:
      "bg-transparent text-charcoal hover:text-copper hover:bg-stone/40 dark:text-[#F4F1E9] dark:hover:text-[#D29A78] dark:hover:bg-[#2C2D29] focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 font-medium tracking-wide uppercase",
    md: "text-xs px-5 py-2.5 gap-2 font-semibold tracking-wider uppercase",
    lg: "text-sm px-7 py-3.5 gap-2.5 font-semibold tracking-wider uppercase",
  };

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  const combinedClasses = twMerge(
    clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
