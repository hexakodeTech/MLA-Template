"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumbs" className="py-3 text-xs text-charcoal/60 dark:text-[#99A99D]">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-forest dark:hover:text-[#8CB99B] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t("navHome")}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-charcoal/30 dark:text-[#53675A] shrink-0" />
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-forest dark:hover:text-[#8CB99B] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-charcoal dark:text-[#F5F2E9] line-clamp-1" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
