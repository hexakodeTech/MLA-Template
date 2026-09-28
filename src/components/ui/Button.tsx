"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline-light"
    | "gold"
    | "ghost";
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
    "inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-navy-900 text-white hover:bg-navy-800 focus-visible:ring-navy-900 shadow-sm border border-navy-900/10",
    secondary:
      "bg-forest-800 text-white hover:bg-forest-700 focus-visible:ring-forest-800 shadow-sm border border-forest-800/10",
    outline:
      "bg-white text-navy-900 border border-slate-300 hover:bg-slate-50 hover:border-navy-900/30 focus-visible:ring-navy-900",
    "outline-light":
      "bg-navy-900/80 backdrop-blur-sm text-white border border-slate-600/80 hover:bg-white/10 hover:border-white focus-visible:ring-white shadow-sm",
    gold:
      "bg-gold-500 text-navy-950 font-semibold hover:bg-gold-400 focus-visible:ring-gold-500 shadow-sm",
    ghost:
      "bg-transparent text-navy-900 hover:bg-navy-50/80 focus-visible:ring-navy-900",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
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
