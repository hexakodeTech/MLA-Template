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
    <nav aria-label="Breadcrumbs" className="py-3 text-xs text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-navy-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t("navHome")}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-navy-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-900 line-clamp-1" aria-current="page">
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
