"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import {
  Accessibility,
  X,
  RotateCcw,
  Type,
  SunMoon,
  BookOpen,
  Eye,
  Activity,
  Compass,
  Check,
  ChevronDown,
  Info,
  ExternalLink,
} from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useLanguage } from "@/context/LanguageContext";
import clsx from "clsx";

interface AccessibilityMenuProps {
  placement?: "desktop" | "mobile";
  className?: string;
}

// Query focusable interactive elements within a container
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );

  return elements.filter((el) => {
    return (
      (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0) &&
      window.getComputedStyle(el).visibility !== "hidden" &&
      el.getAttribute("aria-hidden") !== "true"
    );
  });
};

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  placement = "desktop",
  className,
}) => {
  const { language } = useLanguage();
  const {
    settings,
    isCustomized,
    statusMessage,
    increaseTextSize,
    decreaseTextSize,
    resetTextSize,
    toggleHighContrast,
    toggleGrayscale,
    toggleHighlightLinks,
    toggleReduceTransparency,
    setLineHeight,
    setLetterSpacing,
    toggleUnderlineLinks,
    toggleReduceMotion,
    toggleHighlightFocus,
    resetCategory,
    resetAllSettings,
  } = useAccessibility();

  const rawId = useId();
  const panelId = `accessibility-panel-${placement}-${rawId.replace(/:/g, "")}`;
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [panelPosition, setPanelPosition] = useState<React.CSSProperties>({});

  // Dynamically position the panel relative to trigger while strictly bounding to viewport
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const isDesktop = placement === "desktop" && window.innerWidth >= 1024;
    if (isDesktop) {
      setPanelPosition({});
      return;
    }

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const safeMargin = 12;
    const panelWidth = Math.min(400, viewportWidth - safeMargin * 2);

    // Calculate vertical position (below trigger + 8px, clamped within viewport)
    const top = Math.min(rect.bottom + 8, Math.max(safeMargin, viewportHeight - 240));
    const maxHeight = Math.max(200, viewportHeight - top - safeMargin);

    // Calculate horizontal right position
    // If aligning to the trigger right edge would push left edge past safeMargin, clamp right to safeMargin
    let right = viewportWidth - rect.right;
    if (rect.right - panelWidth < safeMargin || right < safeMargin) {
      right = safeMargin;
    }

    setPanelPosition({
      top: `${Math.round(top)}px`,
      right: `${Math.round(right)}px`,
      maxHeight: `${Math.round(maxHeight)}px`,
    });
  }, [placement]);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();
    window.addEventListener("resize", updatePosition, { passive: true });
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Close menu and restore focus to trigger or the element that opened it
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    const returnTarget =
      previouslyFocusedElementRef.current &&
      previouslyFocusedElementRef.current !== document.body &&
      document.body.contains(previouslyFocusedElementRef.current)
        ? previouslyFocusedElementRef.current
        : triggerRef.current;
    requestAnimationFrame(() => {
      if (returnTarget && typeof returnTarget.focus === "function") {
        returnTarget.focus();
      }
    });
  }, []);

  // Handle click outside to close dropdown without false triggers on internal unmounts
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const isInsidePanel =
        Boolean(panelRef.current && (panelRef.current.contains(target) || path.includes(panelRef.current)));
      const isInsideTrigger =
        Boolean(triggerRef.current && (triggerRef.current.contains(target) || path.includes(triggerRef.current)));

      if (!isInsidePanel && !isInsideTrigger) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // Manage focus when dropdown opens
  useEffect(() => {
    if (!isOpen) return;

    // Track active element before opening so focus can be accurately restored
    if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
    ) {
      previouslyFocusedElementRef.current = document.activeElement;
    } else {
      previouslyFocusedElementRef.current = triggerRef.current;
    }

    // Move keyboard focus into the first focusable element inside the dropdown
    const focusFrame = requestAnimationFrame(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (panelRef.current) {
        const focusables = getFocusableElements(panelRef.current);
        if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    });

    return () => {
      cancelAnimationFrame(focusFrame);
    };
  }, [isOpen]);

  // Keyboard focus trap & Escape handling while dropdown is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes the dropdown and returns focus
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
        return;
      }

      // Tab & Shift+Tab focus trap
      if (e.key === "Tab") {
        if (!panelRef.current) return;

        const focusables = getFocusableElements(panelRef.current);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          // Backward navigation (Shift + Tab)
          if (
            !activeElement ||
            activeElement === firstElement ||
            !panelRef.current.contains(activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Forward navigation (Tab)
          if (
            !activeElement ||
            activeElement === lastElement ||
            !panelRef.current.contains(activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Global Alt+A shortcut to toggle accessibility settings
  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        // Prevent action if this instance's trigger is currently invisible
        if (triggerRef.current) {
          const isVisible =
            triggerRef.current.offsetWidth > 0 ||
            triggerRef.current.offsetHeight > 0 ||
            triggerRef.current.getClientRects().length > 0;
          if (!isVisible) return;
        }

        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            if (document.activeElement instanceof HTMLElement) {
              previouslyFocusedElementRef.current = document.activeElement;
            } else {
              previouslyFocusedElementRef.current = triggerRef.current;
            }
            return true;
          } else {
            closeMenu();
            return false;
          }
        });
      }
    };

    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, [closeMenu]);

  // Toggle handler for mouse/keyboard trigger clicks
  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        if (
          document.activeElement instanceof HTMLElement &&
          document.activeElement !== document.body
        ) {
          previouslyFocusedElementRef.current = document.activeElement;
        } else {
          previouslyFocusedElementRef.current = triggerRef.current;
        }
      } else {
        const returnTarget =
          previouslyFocusedElementRef.current &&
          previouslyFocusedElementRef.current !== document.body &&
          document.body.contains(previouslyFocusedElementRef.current)
            ? previouslyFocusedElementRef.current
            : triggerRef.current;
        requestAnimationFrame(() => returnTarget?.focus());
      }
      return next;
    });
  };

  return (
    <div className={clsx("relative inline-block", className)}>
      {/* Accessibility Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        title={
          language === "ml"
            ? "പ്രവേശനക്ഷമതാ ക്രമീകരണങ്ങൾ (Alt+A)"
            : "Accessibility settings (Alt+A)"
        }
        aria-label={
          language === "ml"
            ? "പ്രവേശനക്ഷമതാ ക്രമീകരണങ്ങൾ"
            : "Accessibility settings"
        }
        className={clsx(
          "relative inline-flex items-center justify-center rounded-sm border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
          placement === "mobile"
            ? "min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] p-2 sm:p-2.5"
            : "min-h-[44px] min-w-[44px] p-2.5",
          isOpen
            ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] border-charcoal dark:border-[#F4F1E9]"
            : "bg-white/70 dark:bg-[#2C2D29]/70 text-charcoal dark:text-[#F4F1E9] border-warm-grey dark:border-[#41413B] hover:border-charcoal/40 dark:hover:border-[#C6C5BD]/40 hover:bg-stone/50 dark:hover:bg-[#2C2D29]"
        )}
      >
        <Accessibility className="w-4 h-4" />
        {/* Visual indicator badge when settings are customized */}
        {isCustomized && (
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-copper dark:bg-[#D29A78] ring-2 ring-white dark:ring-[#191A18]"
            title="Custom accessibility settings active"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Screen Reader Live Region for Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>

      {/* Accessibility Dropdown Dialog Panel with Focus Trap */}
      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={
            language === "ml"
              ? "പ്രവേശനക്ഷമതാ ക്രമീകരണ പാനൽ"
              : "Accessibility Settings Panel"
          }
          className={clsx(
            "z-50 bg-ivory dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] shadow-2xl rounded-sm text-charcoal dark:text-[#F4F1E9] font-sans animate-in fade-in zoom-in-95 duration-150 overflow-y-auto",
            "fixed right-3 top-16 w-[min(400px,calc(100vw-24px))] max-w-[calc(100vw-24px)] max-h-[82vh]",
            placement === "desktop" &&
              "lg:absolute lg:right-0 lg:left-auto lg:top-full lg:mt-2 lg:w-[400px] lg:max-w-none lg:max-h-[82vh]"
          )}
          style={panelPosition}
        >
          {/* Panel Header */}
          <div className="sticky top-0 z-10 bg-ivory/95 dark:bg-[#222320]/95 backdrop-blur-md px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-warm-grey dark:border-[#41413B] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xs bg-copper/10 dark:bg-[#D29A78]/15 text-copper dark:text-[#D29A78]">
                <Accessibility className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-charcoal dark:text-[#F4F1E9]">
                  {language === "ml"
                    ? "പ്രവേശനക്ഷമത ക്രമീകരണങ്ങൾ"
                    : "Accessibility Settings"}
                </h2>
                <p className="text-[11px] text-slate dark:text-[#A09F97]">
                  {language === "ml"
                    ? "ഡിസ്‌പ്ലേയും വായനാ സൗകര്യങ്ങളും മാറ്റുക"
                    : "Customize display, reading, and navigation"}
                </p>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              onClick={closeMenu}
              type="button"
              aria-label={
                language === "ml"
                  ? "പാനൽ അടയ്ക്കുക"
                  : "Close accessibility settings"
              }
              className="p-2 rounded-xs text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9] hover:bg-stone/60 dark:hover:bg-[#2C2D29] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status Banner when updated */}
          {statusMessage && (
            <div className="mx-4 mt-3 px-3 py-2 rounded-xs bg-stone/70 dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] text-[11px] font-medium text-charcoal dark:text-[#F4F1E9] flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-copper dark:text-[#D29A78] shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="p-3 sm:p-4 space-y-4 sm:space-y-5 text-xs">
            {/* 1. TEXT SIZE CONTROLS */}
            <section
              aria-labelledby="a11y-text-heading"
              className="space-y-2.5 pb-4 border-b border-warm-grey/80 dark:border-[#41413B]/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-slate dark:text-[#C6C5BD]">
                  <Type className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                  <span id="a11y-text-heading">
                    {language === "ml" ? "അക്ഷര വലിപ്പം" : "Text Size"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-xs bg-stone dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9]">
                    {Math.round(settings.fontScale * 100)}%
                  </span>
                  {settings.fontScale !== 1.0 && (
                    <button
                      onClick={resetTextSize}
                      type="button"
                      className="text-[10px] text-copper dark:text-[#D29A78] hover:underline"
                    >
                      {language === "ml" ? "റീസെറ്റ്" : "Reset"}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  onClick={decreaseTextSize}
                  type="button"
                  disabled={settings.fontScale <= 0.8}
                  aria-label="Decrease text size by 10%"
                  className="py-2.5 px-1.5 sm:px-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] hover:bg-stone/50 dark:hover:bg-[#353631] font-semibold text-charcoal dark:text-[#F4F1E9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  <span className="text-sm font-bold">A -</span>
                  <span className="block text-[10px] font-normal text-slate dark:text-[#A09F97]">
                    Smaller
                  </span>
                </button>

                <button
                  onClick={resetTextSize}
                  type="button"
                  aria-label="Reset text size to default 100%"
                  className="py-2.5 px-1.5 sm:px-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] hover:bg-stone/50 dark:hover:bg-[#353631] font-semibold text-charcoal dark:text-[#F4F1E9] transition-colors text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  <span className="text-sm font-bold">100%</span>
                  <span className="block text-[10px] font-normal text-slate dark:text-[#A09F97]">
                    Default
                  </span>
                </button>

                <button
                  onClick={increaseTextSize}
                  type="button"
                  disabled={settings.fontScale >= 1.5}
                  aria-label="Increase text size by 10%"
                  className="py-2.5 px-1.5 sm:px-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] hover:bg-stone/50 dark:hover:bg-[#353631] font-semibold text-charcoal dark:text-[#F4F1E9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  <span className="text-sm font-bold">A +</span>
                  <span className="block text-[10px] font-normal text-slate dark:text-[#A09F97]">
                    Larger
                  </span>
                </button>
              </div>
            </section>

            {/* 2. DISPLAY ADJUSTMENTS */}
            <section
              aria-labelledby="a11y-display-heading"
              className="space-y-2.5 pb-4 border-b border-warm-grey/80 dark:border-[#41413B]/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-slate dark:text-[#C6C5BD]">
                  <SunMoon className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                  <span id="a11y-display-heading">
                    {language === "ml" ? "ഡിസ്‌പ്ലേ ക്രമീകരണം" : "Display"}
                  </span>
                </div>
                {(settings.highContrast ||
                  settings.grayscale ||
                  settings.highlightLinks ||
                  settings.reduceTransparency) && (
                  <button
                    onClick={() => resetCategory("display")}
                    type="button"
                    className="text-[10px] text-copper dark:text-[#D29A78] hover:underline"
                  >
                    {language === "ml" ? "റീസെറ്റ്" : "Reset"}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {/* High Contrast Toggle */}
                <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                      {language === "ml" ? "ഉയർന്ന കോൺട്രാസ്റ്റ്" : "High Contrast"}
                    </span>
                    <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                      {language === "ml"
                        ? "ടെക്സ്റ്റും അതിരുകളും വ്യക്തമാക്കുക"
                        : "Enhance borders & text distinction"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.highContrast}
                    onClick={toggleHighContrast}
                    aria-label="Toggle high contrast mode"
                    className={clsx(
                      "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                      settings.highContrast
                        ? "bg-charcoal dark:bg-[#F4F1E9]"
                        : "bg-warm-grey dark:bg-[#41413B]"
                    )}
                  >
                    <span
                      className={clsx(
                        "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                        settings.highContrast ? "translate-x-5.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>

                {/* Grayscale Toggle */}
                <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                      {language === "ml" ? "ഗ്രേസ്‌കെയിൽ" : "Grayscale"}
                    </span>
                    <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                      {language === "ml"
                        ? "നിറങ്ങൾ ഒഴിവാക്കി മോണോക്രോം ആക്കുക"
                        : "Monochrome view without decorative color"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.grayscale}
                    onClick={toggleGrayscale}
                    aria-label="Toggle grayscale display"
                    className={clsx(
                      "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                      settings.grayscale
                        ? "bg-charcoal dark:bg-[#F4F1E9]"
                        : "bg-warm-grey dark:bg-[#41413B]"
                    )}
                  >
                    <span
                      className={clsx(
                        "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                        settings.grayscale ? "translate-x-5.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>

                {/* Highlight Links Toggle */}
                <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                      {language === "ml" ? "ലിങ്കുകൾ ഹൈലൈറ്റ് ചെയ്യുക" : "Highlight Links"}
                    </span>
                    <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                      {language === "ml"
                        ? "ലിങ്കുകൾ എളുപ്പം തിരിച്ചറിയുക"
                        : "Add prominent background to links"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.highlightLinks}
                    onClick={toggleHighlightLinks}
                    aria-label="Toggle highlight links"
                    className={clsx(
                      "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                      settings.highlightLinks
                        ? "bg-charcoal dark:bg-[#F4F1E9]"
                        : "bg-warm-grey dark:bg-[#41413B]"
                    )}
                  >
                    <span
                      className={clsx(
                        "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                        settings.highlightLinks ? "translate-x-5.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>

                {/* Reduce Transparency Toggle */}
                <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                      {language === "ml" ? "സുതാര്യത കുറയ്ക്കുക" : "Reduce Transparency"}
                    </span>
                    <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                      {language === "ml"
                        ? "ഗ്ലാസ്സ് പ്രതലങ്ങൾക്ക് പകരം സോളിഡ് പ്രതലം"
                        : "Opaque surfaces instead of blur"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.reduceTransparency}
                    onClick={toggleReduceTransparency}
                    aria-label="Toggle reduce transparency"
                    className={clsx(
                      "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                      settings.reduceTransparency
                        ? "bg-charcoal dark:bg-[#F4F1E9]"
                        : "bg-warm-grey dark:bg-[#41413B]"
                    )}
                  >
                    <span
                      className={clsx(
                        "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                        settings.reduceTransparency ? "translate-x-5.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* 3. READING AIDS (Line Spacing, Letter Spacing, Underline Links) */}
            <section
              aria-labelledby="a11y-reading-heading"
              className="space-y-3 pb-4 border-b border-warm-grey/80 dark:border-[#41413B]/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-slate dark:text-[#C6C5BD]">
                  <BookOpen className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                  <span id="a11y-reading-heading">
                    {language === "ml" ? "വായനാ ക്രമീകരണം" : "Reading Aids"}
                  </span>
                </div>
                {(settings.lineHeight !== "default" ||
                  settings.letterSpacing !== "default" ||
                  settings.underlineLinks) && (
                  <button
                    onClick={() => resetCategory("reading")}
                    type="button"
                    className="text-[10px] text-copper dark:text-[#D29A78] hover:underline"
                  >
                    {language === "ml" ? "റീസെറ്റ്" : "Reset"}
                  </button>
                )}
              </div>

                {/* Line Spacing */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                    {language === "ml" ? "വരികൾ തമ്മിലുള്ള അകലം" : "Line Spacing"}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xs bg-stone/70 dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                    {(["default", "increased", "extra"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLineHeight(opt)}
                        type="button"
                        aria-pressed={settings.lineHeight === opt}
                        aria-label={`Line spacing ${opt === "default" ? "1.5x Normal" : opt === "increased" ? "1.75x" : "2.0x Wide"}`}
                        className={clsx(
                          "py-1.5 px-1 sm:px-2 rounded-xs text-[10px] sm:text-[11px] font-semibold transition-all text-center",
                          settings.lineHeight === opt
                            ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                            : "text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9]"
                        )}
                      >
                        {opt === "default" && "1.5x (Normal)"}
                        {opt === "increased" && "1.75x"}
                        {opt === "extra" && "2.0x (Wide)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Letter Spacing */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                    {language === "ml" ? "അക്ഷരങ്ങൾ തമ്മിലുള്ള അകലം" : "Letter Spacing"}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xs bg-stone/70 dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                    {(["default", "slight", "moderate"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setLetterSpacing(opt)}
                        type="button"
                        aria-pressed={settings.letterSpacing === opt}
                        aria-label={`Letter spacing ${opt === "default" ? "Normal" : opt === "slight" ? "Slight +0.05em" : "Moderate +0.1em"}`}
                        className={clsx(
                          "py-1.5 px-1 sm:px-2 rounded-xs text-[10px] sm:text-[11px] font-semibold transition-all text-center",
                          settings.letterSpacing === opt
                            ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                            : "text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9]"
                        )}
                      >
                        {opt === "default" && "Normal"}
                        {opt === "slight" && "+0.05em"}
                        {opt === "moderate" && "+0.1em"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Underline Links Toggle */}
                <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                  <div className="min-w-0 flex-1 pr-1">
                    <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                      {language === "ml" ? "ലിങ്കുകൾക്ക് അടിവരയിടുക" : "Underline Links"}
                    </span>
                    <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                      {language === "ml"
                        ? "എല്ലാ ഹൈപ്പർലിങ്കുകൾക്കും സ്ഥിരമായ അടിവര"
                        : "Add underline to all text links"}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.underlineLinks}
                    onClick={toggleUnderlineLinks}
                    aria-label="Toggle underline links"
                    className={clsx(
                      "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                      settings.underlineLinks
                        ? "bg-charcoal dark:bg-[#F4F1E9]"
                        : "bg-warm-grey dark:bg-[#41413B]"
                    )}
                  >
                    <span
                      className={clsx(
                        "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                        settings.underlineLinks ? "translate-x-5.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
            </section>

            {/* 4. MOTION CONTROLS */}
            <section
              aria-labelledby="a11y-motion-heading"
              className="space-y-2.5 pb-4 border-b border-warm-grey/80 dark:border-[#41413B]/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-slate dark:text-[#C6C5BD]">
                  <Activity className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                  <span id="a11y-motion-heading">
                    {language === "ml" ? "ആനിമേഷൻ നിയന്ത്രണം" : "Motion"}
                  </span>
                </div>
                {settings.reduceMotion && (
                  <button
                    onClick={() => resetCategory("motion")}
                    type="button"
                    className="text-[10px] text-copper dark:text-[#D29A78] hover:underline"
                  >
                    {language === "ml" ? "റീസെറ്റ്" : "Reset"}
                  </button>
                )}
              </div>

              {/* Reduce Animations Toggle */}
              <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                <div className="min-w-0 flex-1 pr-1">
                  <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                    {language === "ml" ? "ആനിമേഷനുകൾ കുറയ്ക്കുക" : "Reduce Animations"}
                  </span>
                  <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                    {language === "ml"
                      ? "പശ്ചാത്തല ചലനങ്ങളും ട്രാൻസിഷനുകളും നിർത്തുക"
                      : "Disable background motion & transitions"}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.reduceMotion}
                  onClick={toggleReduceMotion}
                  aria-label="Toggle reduce animations"
                  className={clsx(
                    "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                    settings.reduceMotion
                      ? "bg-charcoal dark:bg-[#F4F1E9]"
                      : "bg-warm-grey dark:bg-[#41413B]"
                  )}
                >
                  <span
                    className={clsx(
                      "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                      settings.reduceMotion ? "translate-x-5.5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </section>

            {/* 5. NAVIGATION & KEYBOARD FOCUS */}
            <section
              aria-labelledby="a11y-navigation-heading"
              className="space-y-2.5 pb-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-slate dark:text-[#C6C5BD]">
                  <Compass className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                  <span id="a11y-navigation-heading">
                    {language === "ml" ? "കീബോർഡ് നാവിഗേഷൻ" : "Keyboard Navigation"}
                  </span>
                </div>
                {settings.highlightFocus && (
                  <button
                    onClick={() => resetCategory("navigation")}
                    type="button"
                    className="text-[10px] text-copper dark:text-[#D29A78] hover:underline"
                  >
                    {language === "ml" ? "റീസെറ്റ്" : "Reset"}
                  </button>
                )}
              </div>

              {/* Highlight Focus Ring */}
              <div className="flex items-center justify-between gap-2.5 p-2.5 rounded-xs bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B]">
                <div className="min-w-0 flex-1 pr-1">
                  <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block leading-tight">
                    {language === "ml" ? "കീബോർഡ് ഫോക്കസ് വ്യക്തമാക്കുക" : "Highlight Keyboard Focus"}
                  </span>
                  <span className="text-[11px] text-slate dark:text-[#A09F97] block leading-normal mt-0.5">
                    {language === "ml"
                      ? "ഫോക്കസ് ഉള്ള ഘടകങ്ങൾക്ക് കട്ടിയുള്ള ബോർഡർ"
                      : "Prominent focus rings around active controls"}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.highlightFocus}
                  onClick={toggleHighlightFocus}
                  aria-label="Toggle highlight keyboard focus"
                  className={clsx(
                    "w-11 h-6 rounded-full transition-colors relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                    settings.highlightFocus
                      ? "bg-charcoal dark:bg-[#F4F1E9]"
                      : "bg-warm-grey dark:bg-[#41413B]"
                  )}
                >
                  <span
                    className={clsx(
                      "w-5 h-5 rounded-full bg-white dark:bg-[#191A18] block absolute top-0.5 transition-transform",
                      settings.highlightFocus ? "translate-x-5.5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Collapsible Keyboard Shortcut Guide */}
              <div className="rounded-xs border border-warm-grey/80 dark:border-[#41413B]/80 overflow-hidden bg-stone/40 dark:bg-[#2C2D29]/50">
                <button
                  type="button"
                  onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
                  aria-expanded={showKeyboardGuide}
                  className="w-full px-3 py-2 text-[11px] font-semibold text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9] flex items-center justify-between text-left transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
                    {language === "ml"
                      ? "കീബോർഡ് കുറുക്കുവഴികൾ കാണുക"
                      : "View Keyboard Shortcuts"}
                  </span>
                  <ChevronDown
                    className={clsx(
                      "w-3.5 h-3.5 transition-transform",
                      showKeyboardGuide && "rotate-180"
                    )}
                  />
                </button>

                {showKeyboardGuide && (
                  <div className="px-3 pb-3 pt-1 space-y-1.5 text-[11px] border-t border-warm-grey/60 dark:border-[#41413B]/60 text-slate dark:text-[#C6C5BD]">
                    <div className="flex justify-between items-center">
                      <span>Navigate forward</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-[10px]">
                        Tab
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Navigate backward</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-[10px]">
                        Shift + Tab
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Activate / Toggle</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-[10px]">
                        Enter / Space
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Close panel</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-[10px]">
                        Esc
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Toggle Accessibility Menu</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-[10px]">
                        Alt + A
                      </kbd>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Panel Footer: Reset All & Statement Link */}
          <div className="p-3.5 sm:p-4 bg-stone/60 dark:bg-[#191A18] border-t border-warm-grey dark:border-[#41413B] space-y-2.5">
            <button
              onClick={resetAllSettings}
              type="button"
              className="w-full py-2.5 px-3 rounded-xs border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] hover:bg-stone/80 dark:hover:bg-[#353631] text-charcoal dark:text-[#F4F1E9] font-bold text-xs flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
              <span>
                {language === "ml"
                  ? "എല്ലാ ക്രമീകരണങ്ങളും റീസെറ്റ് ചെയ്യുക"
                  : "Reset All Accessibility Settings"}
              </span>
            </button>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <Link
                href="/accessibility"
                onClick={closeMenu}
                className="text-copper dark:text-[#D29A78] hover:underline font-semibold flex items-center gap-1"
              >
                <span>
                  {language === "ml"
                    ? "പ്രവേശനക്ഷമതാ പ്രസ്താവന"
                    : "Accessibility Statement"}
                </span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <span className="text-slate/70 dark:text-[#A09F97]">
                WCAG 2.2 AA Aid
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
