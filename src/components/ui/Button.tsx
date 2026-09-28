"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"       // Forest Green with Ivory text
    | "secondary"     // Muted Sage with Charcoal text
    | "terracotta"    // Terracotta accent button
    | "outline"       // Clean outline on Ivory background
    | "outline-light" // Clean outline on Dark background
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
      "bg-forest text-ivory hover:bg-forest-dark dark:bg-[#8CB99B] dark:text-[#10231A] dark:hover:bg-[#9dc4ab] dark:border-[#8CB99B]/30 focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B] border border-forest-dark/20 shadow-xs",
    secondary:
      "bg-sage text-charcoal hover:bg-sage-dark/30 dark:bg-[#21342A] dark:text-[#F5F2E9] dark:hover:bg-[#2c4437] dark:border-[#53675A] focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B] border border-sage-border",
    terracotta:
      "bg-terracotta text-white hover:bg-terracotta-dark dark:bg-[#E19A76] dark:text-[#10231A] dark:hover:bg-[#e8aa8c] focus-visible:ring-terracotta shadow-xs",
    outline:
      "bg-transparent text-charcoal border border-charcoal/30 hover:border-forest hover:text-forest hover:bg-forest/5 dark:text-[#F5F2E9] dark:border-[#53675A] dark:hover:bg-[#21342A] dark:hover:border-[#8CB99B] dark:hover:text-[#8CB99B] focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B]",
    "outline-light":
      "bg-transparent text-ivory border border-ivory/40 hover:bg-ivory/10 hover:border-ivory dark:border-[#53675A] dark:text-[#F5F2E9] dark:hover:bg-[#21342A] focus-visible:ring-ivory dark:focus-visible:ring-[#8CB99B]",
    ghost:
      "bg-transparent text-charcoal hover:text-forest hover:bg-forest/5 dark:text-[#F5F2E9] dark:hover:text-[#8CB99B] dark:hover:bg-[#21342A] focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B]",
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
