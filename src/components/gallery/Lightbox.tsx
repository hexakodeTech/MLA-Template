"use client";

import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Info } from "lucide-react";
import { GalleryItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

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

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-dark/95 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Lightbox Container */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-forest-dark rounded-sm overflow-hidden shadow-2xl border border-forest/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-forest-surface border-b border-forest/40 text-ivory text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-terracotta">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-forest/60">•</span>
            <span className="font-display text-sm tracking-wide text-ivory truncate max-w-md">
              {getLocalized(currentItem.title)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-terracotta uppercase tracking-wider font-semibold bg-terracotta-soft/20 px-2 py-0.5 rounded-xs border border-terracotta/40">
              <Info className="w-3 h-3" />
              {language === "ml" ? "മാതൃകാ ചിത്രം" : "Sample Asset"}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xs hover:bg-forest text-ivory/80 hover:text-ivory transition-colors focus:outline-none focus:ring-1 focus:ring-ivory"
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
            className="absolute left-4 z-10 p-3 rounded-full bg-forest-dark/80 hover:bg-forest text-ivory border border-forest/60 transition-all hover:scale-105 focus:outline-none focus:ring-1 focus:ring-ivory"
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
            className="absolute right-4 z-10 p-3 rounded-full bg-forest-dark/80 hover:bg-forest text-ivory border border-forest/60 transition-all hover:scale-105 focus:outline-none focus:ring-1 focus:ring-ivory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer info bar */}
        <div className="p-5 bg-forest-surface border-t border-forest/40 text-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-display text-base text-ivory">
              {currentItem.caption
                ? getLocalized(currentItem.caption)
                : getLocalized(currentItem.title)}
            </p>
            <p className="text-[11px] text-ivory/70 mt-0.5">
              {getLocalized(currentItem.altText)}
            </p>
          </div>

          <div className="flex items-center gap-4 text-ivory/70 shrink-0 text-[11px] font-mono">
            {currentItem.location && (
              <span className="flex items-center gap-1 text-sage">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                {getLocalized(currentItem.location)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-terracotta" />
              {currentItem.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
