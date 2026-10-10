"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export default function NewsNotFound() {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      aria-live="polite"
      className="py-24 text-center max-w-xl mx-auto px-4 bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]"
    >
      <Bell className="w-10 h-10 text-copper dark:text-[#D29A78] mx-auto mb-4" aria-hidden="true" />
      <h1 className="font-display text-3xl text-charcoal dark:text-[#F4F1E9]">
        {t("announcementNotFoundTitle")}
      </h1>
      <p className="text-slate dark:text-[#C6C5BD] text-sm mt-2">
        {t("announcementNotFoundDesc")}
      </p>
      <div className="mt-6">
        <Button href="/news" variant="primary" size="md">
          {t("returnToAnnouncements")}
        </Button>
      </div>
    </div>
  );
}
