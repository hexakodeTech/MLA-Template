"use client";

import React from "react";
import { Landmark } from "lucide-react";
import { ErrorState } from "@/components/ui/ErrorState";
import { useLanguage } from "@/context/LanguageContext";

export default function ConstituencyError({
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
        title={t("errorConstituencyTitle")}
        description={t("errorConstituencyDesc")}
        icon={Landmark}
        secondaryHref="/"
        secondaryLabel={t("errorReturnHome")}
      />
    </div>
  );
}
