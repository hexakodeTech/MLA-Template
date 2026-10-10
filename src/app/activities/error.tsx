"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { ErrorState } from "@/components/ui/ErrorState";
import { useLanguage } from "@/context/LanguageContext";

export default function ActivitiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="py-12 sm:py-16">
      <ErrorState
        error={error}
        onRetry={reset}
        title={t("errorActivitiesTitle")}
        description={t("errorActivitiesDesc")}
        icon={Calendar}
        secondaryHref="/"
        secondaryLabel={t("errorReturnHome")}
      />
    </div>
  );
}
