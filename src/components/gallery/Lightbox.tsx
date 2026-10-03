"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Info } from "lucide-react";
import { GalleryItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { getFocusableElements } from "@/utils/focusTrap";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { getLocalized, language } = useLanguage();
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      previouslyFocusedElementRef.current?.focus();
    });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
    ) {
      previouslyFocusedElementRef.current = document.activeElement;
    }

    const frameId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();

      if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusables = getFocusableElements(dialogRef.current);
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first || !focusables.includes(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last || !focusables.includes(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#191A18]/95 backdrop-blur-md p-4 sm:p-6"
      onClick={handleClose}
    >
      {/* Lightbox Container */}
      <div
        ref={dialogRef}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#242522] rounded-sm overflow-hidden shadow-2xl border border-[#41413B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1C1D1A] border-b border-[#41413B] text-[#F4F1E9] text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-[#D29A78]">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-[#41413B]">•</span>
            <span className="font-display text-sm tracking-wide text-[#F4F1E9] truncate max-w-md">
              {getLocalized(currentItem.title)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#D29A78] uppercase tracking-wider font-semibold bg-[#D29A78]/10 px-2 py-0.5 rounded-xs border border-[#D29A78]/30">
              <Info className="w-3 h-3" />
              {language === "ml" ? "മാതൃകാ ചിത്രം" : "Sample Asset"}
            </span>
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="p-1.5 rounded-xs hover:bg-[#2C2D29] text-[#C6C5BD] hover:text-[#F4F1E9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="relative flex-1 bg-black/40 flex items-center justify-center min-h-[300px] sm:min-h-[460px] overflow-hidden">
          <button
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-4 z-10 p-3 rounded-full bg-[#191A18]/80 hover:bg-[#2C2D29] text-[#F4F1E9] border border-[#41413B] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative w-full h-full max-h-[60vh] flex items-center justify-center p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.imageUrl}
              alt={getLocalized(currentItem.altText)}
              className="max-h-[58vh] max-w-full object-contain rounded-xs select-none shadow-md"
            />
          </div>

          <button
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-4 z-10 p-3 rounded-full bg-[#191A18]/80 hover:bg-[#2C2D29] text-[#F4F1E9] border border-[#41413B] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info bar */}
        <div className="p-5 bg-[#1C1D1A] border-t border-[#41413B] text-[#F4F1E9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-display text-base text-[#F4F1E9]">
              {currentItem.caption
                ? getLocalized(currentItem.caption)
                : getLocalized(currentItem.title)}
            </p>
            <p className="text-[11px] text-[#C6C5BD] mt-0.5">
              {getLocalized(currentItem.altText)}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[#C6C5BD] shrink-0 text-[11px] font-mono">
            {currentItem.location && (
              <span className="flex items-center gap-1 text-[#F4F1E9]">
                <MapPin className="w-3.5 h-3.5 text-[#D29A78]" />
                {getLocalized(currentItem.location)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D29A78]" />
              {currentItem.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
