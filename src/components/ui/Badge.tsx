import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "green" | "gold" | "neutral" | "danger" | "sample";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "navy",
  size = "sm",
  className,
}) => {
  const variantStyles = {
    navy: "bg-navy-50 text-navy-800 border-navy-200",
    green: "bg-forest-50 text-forest-800 border-forest-200",
    gold: "bg-amber-50 text-amber-900 border-amber-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
    sample: "bg-amber-50 text-amber-800 border-amber-300 font-medium italic",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-2.5 py-1 font-medium",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
