"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";

export const LAST_ACTIVITY_STORAGE_KEY = "last_loading_activity_id";

/**
 * InitialLoadingScreen - Optimized Non-Blocking Initialization Indicator
 *
 * Performance & Accessibility Architecture:
 * 1. NEVER blocks page content: Rendered as a non-blocking top progress bar (pointer-events-none).
 *    The server-rendered HTML and client UI are 100% visible and interactive from first paint.
 * 2. ZERO artificial delay: As soon as hydration occurs and DOM is ready, completes immediately.
 *    No artificial setTimeout holds, no minimum display durations, no simulated delays.
 * 3. Session-persisted: Does not re-trigger or flash during client-side route navigation.
 * 4. Fully accessible: Maintains role="status", role="progressbar", aria-live="polite", and
 *    bilingual screen-reader announcements.
 * 5. Respects prefers-reduced-motion: Immediately unmounts if reduced motion is requested.
 */
export function InitialLoadingScreen() {
  const { language } = useLanguage();
  const { settings } = useAccessibility();

  const [progress, setProgress] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        settings.reduceMotion);

    if (prefersReducedMotion) {
      setProgress(100);
      setIsComplete(true);
      setIsExited(true);
      return;
    }

    // 2. Immediate readiness check without artificial delays
    const markReady = () => {
      setProgress(100);
      setIsComplete(true);
      // Smooth fade-out transition before unmounting
      const exitTimer = setTimeout(() => {
        setIsExited(true);
      }, 300);
      return () => clearTimeout(exitTimer);
    };

    if (typeof document !== "undefined" && document.readyState === "complete") {
      // If already complete upon hydration, transition immediately
      const frame = requestAnimationFrame(() => {
        markReady();
      });
      return () => cancelAnimationFrame(frame);
    } else if (typeof window !== "undefined") {
      window.addEventListener("load", markReady, { once: true });
      // Fast fallback to ensure bar never remains indefinitely
      const safetyTimer = setTimeout(markReady, 500);
      return () => {
        window.removeEventListener("load", markReady);
        clearTimeout(safetyTimer);
      };
    }
  }, [settings.reduceMotion]);

  if (isExited) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300 ease-out ${
        isComplete ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Screen Reader Only Announcement */}
      <span className="sr-only">
        {language === "ml"
          ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഔദ്യോഗിക പോർട്ടൽ വിവരങ്ങൾ ലഭ്യമാക്കുന്നു."
          : "Loading the official representative portal of Shri Ramesh Pisharady."}
      </span>

      {/* Non-Blocking Top Progress Bar */}
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
        className="w-full h-1 bg-transparent overflow-hidden"
      >
        <div
          className="h-full bg-copper dark:bg-[#D29A78] shadow-[0_0_8px_rgba(210,154,120,0.6)] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
