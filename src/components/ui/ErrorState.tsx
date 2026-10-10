"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  badgeLabel?: string;
  icon?: LucideIcon;
  onRetry?: () => void;
  retryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryIcon?: React.ReactNode;
  error?: Error & { digest?: string };
  isPageLevel?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  badgeLabel,
  icon: Icon = AlertTriangle,
  onRetry,
  retryLabel,
  secondaryHref = "/",
  secondaryLabel,
  secondaryIcon,
  error,
  isPageLevel = true,
}) => {
  const { language, t } = useLanguage();

  // Log error safely in console for debugging without exposing stack in UI
  useEffect(() => {
    if (error) {
      console.error("[Portal Error Boundary Caught]", {
        message: error.message,
        digest: error.digest,
      });
    }
  }, [error]);

  const displayBadge = badgeLabel || t("errorGenericBadge");
  const displayTitle = title || t("errorGenericTitle");
  const displayDescription = description || t("errorGenericDesc");
  const displayRetryLabel = retryLabel || t("errorTryAgain");
  const displaySecondaryLabel = secondaryLabel || t("errorReturnHome");

  const headingId = "portal-error-heading";

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-labelledby={headingId}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 font-sans ${
        isPageLevel ? "py-12 sm:py-20 max-w-4xl" : "py-8 max-w-2xl"
      }`}
    >
      <div className="relative bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] rounded-sm p-6 sm:p-10 md:p-12 shadow-xs text-center overflow-hidden">
        {/* Subtle Architectural Corner Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-32 h-32 bg-stone/40 dark:bg-[#222320]/60 rounded-full blur-xl pointer-events-none"
        />

        {/* Card Header Strip */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-warm-grey/60 dark:border-[#41413B]/60 text-xs font-mono text-slate dark:text-[#A09F97]">
          <Badge variant="copper">{displayBadge}</Badge>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal/70 dark:text-[#F4F1E9]/70">
            {language === "ml" ? "ഔദ്യോഗിക പോർട്ടൽ" : "Official Representative Portal"}
          </span>
        </div>

        {/* Icon & Error Information */}
        <div className="mx-auto w-14 h-14 rounded-full bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] flex items-center justify-center text-copper dark:text-[#D29A78] mb-5 shadow-2xs">
          <Icon className="w-7 h-7" aria-hidden="true" />
        </div>

        {isPageLevel ? (
          <h1
            id={headingId}
            className="font-display text-2xl sm:text-3xl md:text-4xl text-charcoal dark:text-[#F4F1E9] tracking-tight leading-tight"
          >
            {displayTitle}
          </h1>
        ) : (
          <h2
            id={headingId}
            className="font-display text-xl sm:text-2xl text-charcoal dark:text-[#F4F1E9] tracking-tight leading-snug"
          >
            {displayTitle}
          </h2>
        )}

        <p className="mt-3 text-xs sm:text-sm text-slate dark:text-[#C6C5BD] max-w-xl mx-auto leading-relaxed font-light">
          {displayDescription}
        </p>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-warm-grey/60 dark:border-[#41413B]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          {onRetry && (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onRetry}
              icon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
              iconPosition="left"
              aria-label={`${displayRetryLabel}: ${displayTitle}`}
            >
              {displayRetryLabel}
            </Button>
          )}

          {secondaryHref && (
            <Button
              href={secondaryHref}
              variant="secondary"
              size="md"
              icon={
                secondaryIcon || (
                  <Home className="w-4 h-4 text-charcoal dark:text-[#F4F1E9]" aria-hidden="true" />
                )
              }
              iconPosition="left"
              aria-label={`${displaySecondaryLabel}: ${secondaryHref}`}
            >
              {displaySecondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
