import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  padded = true,
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-slate-200 shadow-sm transition-all duration-200 overflow-hidden",
        hoverEffect && "hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5",
        padded && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
};
