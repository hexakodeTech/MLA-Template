"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { mockActivities } from "@/data/mockData";
import { ActivityItem } from "@/types";

export const LAST_ACTIVITY_STORAGE_KEY = "last_loading_activity_id";

// Category translations adhering to official editorial terminology
export const activityCategoryLabels: Record<string, { en: string; ml: string }> = {
  "Public Inspections": {
    en: "Public Inspection",
    ml: "പൊതു പരിശോധന",
  },
  "Community Engagements": {
    en: "Community Engagement",
    ml: "ജനസമ്പർക്ക പരിപാടി",
  },
  "Cultural & Educational": {
    en: "Cultural & Educational",
    ml: "സാംസ്കാരിക പരിപാടി",
  },
  "Official Delegations": {
    en: "Official Delegation",
    ml: "ഔദ്യോഗിക ഏകോപനം",
  },
};

// Safe fallback activity if data is unavailable or corrupt
const FALLBACK_ACTIVITY: ActivityItem = {
  id: "fallback-activity",
  slug: "constituency-information",
  title: {
    en: "Activities in the Constituency",
    ml: "മണ്ഡലത്തിലെ പ്രവർത്തനങ്ങൾ",
  },
  category: "Community Engagements",
  date: "2026-09",
  location: {
    en: "Palakkad Constituency",
    ml: "പാലക്കാട് മണ്ഡലം",
  },
  description: {
    en: "Loading updates, public activities and constituency information.",
    ml: "വികസന അറിയിപ്പുകളും പൊതുപ്രവർത്തനങ്ങളും ലഭ്യമാക്കുന്നു.",
  },
  isSample: true,
};

export function InitialLoadingScreen() {
  const { language } = useLanguage();
  const { settings } = useAccessibility();

  const [progress, setProgress] = useState(12);
  const [isComplete, setIsComplete] = useState(false);
  const [isExited, setIsExited] = useState(false);

  // Filter valid activities that have required multilingual fields
  const validActivities = useMemo(() => {
    const valid = mockActivities.filter(
      (act) =>
        act &&
        act.id &&
        act.title?.en &&
        act.title?.ml &&
        act.description?.en &&
        act.description?.ml
    );
    return valid.length > 0 ? valid : [FALLBACK_ACTIVITY];
  }, []);

  // Deterministic initial state for hydration safety (matches server render)
  const [activeActivityId, setActiveActivityId] = useState<string>(
    validActivities[0]?.id || "act-1"
  );

  // Select random verified activity after client hydration (avoiding previous activity)
  useEffect(() => {
    try {
      const lastId = localStorage.getItem(LAST_ACTIVITY_STORAGE_KEY);
      const pool = validActivities.filter((a) => a.id !== lastId);
      const candidates = pool.length > 0 ? pool : validActivities;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      if (chosen) {
        setActiveActivityId(chosen.id);
        localStorage.setItem(LAST_ACTIVITY_STORAGE_KEY, chosen.id);
        document.documentElement.setAttribute("data-loading-activity", chosen.id);
      }
    } catch {
      // ignore
    }
  }, [validActivities]);

  // Long-load rotation: if loading screen remains visible > 8.5 seconds, change activity once
  useEffect(() => {
    if (isComplete || isExited || validActivities.length <= 1) return;

    const longLoadTimer = setTimeout(() => {
      setActiveActivityId((prevId) => {
        const remaining = validActivities.filter((a) => a.id !== prevId);
        if (remaining.length === 0) return prevId;
        const nextActivity = remaining[Math.floor(Math.random() * remaining.length)];
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(LAST_ACTIVITY_STORAGE_KEY, nextActivity.id);
            document.documentElement.setAttribute("data-loading-activity", nextActivity.id);
          } catch {
            // ignore
          }
        }
        return nextActivity.id;
      });
    }, 8500);

    return () => clearTimeout(longLoadTimer);
  }, [isComplete, isExited, validActivities]);

  // Main progress bar and completion lifecycle
  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        settings.reduceMotion);

    if (prefersReducedMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsComplete(true);
        setIsExited(true);
      }, 150);
      return () => clearTimeout(timer);
    }

    // 2. Monotonic progress simulation representing application initialization
    let currentProgress = 15;
    setProgress(currentProgress);

    const progressInterval = setInterval(() => {
      if (currentProgress < 65) {
        currentProgress += Math.floor(Math.random() * 12) + 8;
      } else if (currentProgress < 88) {
        currentProgress += Math.floor(Math.random() * 6) + 3;
      } else if (currentProgress < 96) {
        currentProgress += 1.5;
      }
      currentProgress = Math.min(currentProgress, 96);
      setProgress(currentProgress);
    }, 110);

    // 3. Readiness completion handler
    const handleReady = () => {
      clearInterval(progressInterval);
      setProgress(100);

      // Brief hold at 100% for visual polish, then start fade exit
      const completeTimer = setTimeout(() => {
        setIsComplete(true);

        // Allow smooth 400ms fade-out before completely unmounting from DOM
        const exitTimer = setTimeout(() => {
          setIsExited(true);
        }, 420);

        return () => clearTimeout(exitTimer);
      }, 180);

      return () => clearTimeout(completeTimer);
    };

    // If page is already loaded (fast reload/cached), complete after a short display duration
    if (typeof document !== "undefined" && document.readyState === "complete") {
      const minDisplayTimer = setTimeout(handleReady, 650);
      return () => {
        clearInterval(progressInterval);
        clearTimeout(minDisplayTimer);
      };
    } else {
      window.addEventListener("load", handleReady, { once: true });
      // Safety fallback: maximum time the loader can stay active is 2.2s
      const fallbackTimer = setTimeout(handleReady, 2200);

      return () => {
        clearInterval(progressInterval);
        window.removeEventListener("load", handleReady);
        clearTimeout(fallbackTimer);
      };
    }
  }, [settings.reduceMotion]);

  // Completely remove from DOM and accessibility tree once exit animation finishes
  if (isExited) {
    return null;
  }

  // Active activity for screen reader text
  const currentActiveActivity =
    validActivities.find((a) => a.id === activeActivityId) || validActivities[0];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 sm:p-6 bg-ivory text-charcoal dark:bg-[#191A18] dark:text-[#F4F1E9] transition-opacity duration-400 ease-in-out select-none ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Screen Reader Only Live Announcement */}
      <span className="sr-only">
        {language === "ml"
          ? `ശ്രീ രമേഷ് പിഷാരടിയുടെ ഔദ്യോഗിക പോർട്ടൽ വിവരങ്ങൾ ലഭ്യമാക്കുന്നു. മണ്ഡലത്തിലെ പ്രവർത്തനം: ${currentActiveActivity.title.ml}. ${currentActiveActivity.description.ml}`
          : `Loading the official representative portal of Shri Ramesh Pisharady. Constituency activity: ${currentActiveActivity.title.en}. ${currentActiveActivity.description.en}`}
      </span>

      <div className="flex flex-col items-center text-center max-w-sm sm:max-w-xl w-full">
        {/* 1. Representative's Approved Photograph (Preserved and stationary) */}
        <div className="relative p-1 sm:p-1.5 bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] rounded-sm shadow-md mb-4 sm:mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-xs overflow-hidden bg-stone dark:bg-[#222320]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
              alt="Shri Ramesh Pisharady — Official Portrait"
              className="w-full h-full object-cover filter contrast-105"
              fetchPriority="high"
            />
          </div>
          {/* Subtle architectural accent indicator */}
          <div
            aria-hidden="true"
            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-copper dark:bg-[#D29A78] rounded-full ring-2 ring-white dark:ring-[#2C2D29]"
          />
        </div>

        {/* 2, 3, 4. Activity Cards: rendered with zero-flash bilingual visibility */}
        <div className="w-full min-h-[140px] sm:min-h-[155px] flex items-center justify-center">
          {validActivities.map((act) => {
            const categoryMeta =
              activityCategoryLabels[act.category] || {
                en: act.category || "From the Constituency",
                ml: "മണ്ഡലത്തിലെ പ്രവർത്തനം",
              };

            return (
              <div
                key={act.id}
                data-activity-id={act.id}
                className={`loading-activity-card flex-col items-center text-center w-full animate-loading-enter ${
                  act.id === activeActivityId ? "flex" : "hidden"
                }`}
              >
                {/* 2. Activity Category / Label */}
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block font-sans">
                  <span className="loading-lang-en">{categoryMeta.en}</span>
                  <span className="loading-lang-ml">{categoryMeta.ml}</span>
                </span>

                {/* 3. Random Activity Title */}
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-charcoal dark:text-[#F4F1E9] tracking-tight leading-snug sm:leading-tight mt-1.5 px-2 max-w-lg">
                  <span className="loading-lang-en">{act.title.en}</span>
                  <span className="loading-lang-ml">{act.title.ml}</span>
                </h2>

                {/* 4. Activity Description */}
                <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] leading-relaxed font-light mt-2 max-w-sm sm:max-w-md px-2">
                  <span className="loading-lang-en">{act.description.en}</span>
                  <span className="loading-lang-ml">{act.description.ml}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* 5. Smooth Animated Progress Bar */}
        <div className="w-48 sm:w-60 mt-6 flex flex-col items-center">
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={
              language === "ml"
                ? "ലോഡിംഗ് പുരോഗതി"
                : "Loading progress"
            }
            className="w-full h-1.5 bg-stone/80 dark:bg-[#2C2D29] rounded-full overflow-hidden border border-warm-grey/60 dark:border-[#41413B]/60 p-[1px]"
          >
            <div
              className="h-full bg-copper dark:bg-[#D29A78] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Numerical Percentage */}
          <span className="text-[10px] font-mono text-slate/70 dark:text-[#A09F97]/70 mt-2 tracking-wider">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
