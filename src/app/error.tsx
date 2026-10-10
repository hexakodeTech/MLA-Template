"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-ivory dark:bg-[#191A18]">
      <ErrorState error={error} onRetry={reset} />
    </div>
  );
}
