"use client";

import React from "react";
import { Newspaper } from "lucide-react";
import { ErrorState } from "@/components/ui/ErrorState";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsError({
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
        title={t("errorNewsTitle")}
        description={t("errorNewsDesc")}
        icon={Newspaper}
        secondaryHref="/"
        secondaryLabel={t("errorReturnHome")}
      />
    </div>
  );
}
