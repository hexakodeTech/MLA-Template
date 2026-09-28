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
    // Prevent body scrolling while modal is open
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Lightbox Container */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-navy-950 rounded-xl overflow-hidden shadow-2xl border border-navy-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-navy-900 border-b border-navy-800 text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gold-400">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-medium">
              {getLocalized(currentItem.title)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              <Info className="w-3 h-3" />
              {language === "ml" ? "മാതൃകാ ചിത്രം" : "Sample Prototype Asset"}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-navy-800 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[460px] overflow-hidden">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-3 z-10 p-2.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white border border-navy-700/60 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-h-[60vh] flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.imageUrl}
              alt={getLocalized(currentItem.altText)}
              className="max-h-[58vh] max-w-full object-contain rounded select-none"
            />
          </div>

          <button
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-3 z-10 p-2.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white border border-navy-700/60 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-navy-900/95 border-t border-navy-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-medium text-slate-200">
              {currentItem.caption
                ? getLocalized(currentItem.caption)
                : getLocalized(currentItem.title)}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {getLocalized(currentItem.altText)}
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-400 shrink-0 text-[11px]">
            {currentItem.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                {getLocalized(currentItem.location)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              {currentItem.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
