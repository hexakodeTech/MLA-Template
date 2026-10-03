"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { AccessibilityMenu } from "@/components/layout/AccessibilityMenu";
import clsx from "clsx";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu keyboard accessibility & focus management
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Focus first navigation link when mobile menu opens
    const frameId = requestAnimationFrame(() => {
      firstNavLinkRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/about", label: t("navAbout") },
    { href: "/news", label: t("navNews") },
    { href: "/constituency", label: t("navConstituency") },
    { href: "/activities", label: t("navActivities") },
    { href: "/gallery", label: t("navGallery") },
    { href: "/contact", label: t("navContact") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-all duration-300 font-sans",
        isScrolled
          ? "bg-ivory/95 dark:bg-[#191A18]/95 backdrop-blur-md border-b border-warm-grey/80 dark:border-[#41413B]/80 shadow-xs py-3"
          : "bg-ivory/90 dark:bg-[#191A18]/90 backdrop-blur-xs border-b border-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          {/* Editorial Wordmark */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] py-0.5 shrink min-w-0"
          >
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg sm:text-2xl text-charcoal dark:text-[#F4F1E9] tracking-tight group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors truncate">
                RAMESH
              </span>
              <span className="font-display text-lg sm:text-2xl text-charcoal dark:text-[#F4F1E9] tracking-tight -mt-0.5 group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors truncate">
                PISHARADY
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-wider sm:tracking-widest text-slate dark:text-[#A09F97] uppercase mt-0.5 sm:mt-1 truncate">
              {language === "ml" ? "ജനപ്രതിനിധി" : "Public Representative"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-xs xl:text-[13px] uppercase tracking-wider font-semibold transition-all relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]",
                  isActive(link.href)
                    ? "text-charcoal dark:text-[#F4F1E9]"
                    : "text-slate dark:text-[#C6C5BD] hover:text-charcoal dark:hover:text-[#F4F1E9]"
                )}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper dark:bg-[#D29A78] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Accessibility Menu, Theme Switcher, Language Switcher & Contact Office CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Accessibility Settings Menu */}
            <AccessibilityMenu placement="desktop" />

            {/* Theme Switcher Button */}
            <ThemeSwitcher />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-sm border border-warm-grey dark:border-[#41413B] hover:border-charcoal/40 dark:hover:border-[#C6C5BD]/40 text-charcoal dark:text-[#F4F1E9] bg-white/60 dark:bg-[#2C2D29]/60 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] min-h-[44px]"
              title="Switch language between English and Malayalam"
              aria-label={`Switch to ${language === "en" ? "Malayalam" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-slate dark:text-[#C6C5BD]" />
              <span className={language === "en" ? "font-bold text-charcoal dark:text-[#F4F1E9]" : "text-slate dark:text-[#A09F97]"}>
                EN
              </span>
              <span className="text-warm-grey dark:text-[#41413B]">/</span>
              <span className={language === "ml" ? "font-bold text-charcoal dark:text-[#F4F1E9]" : "text-slate dark:text-[#A09F97]"}>
                മലയാളം
              </span>
            </button>

            {/* Contact Office CTA */}
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 text-white dark:text-[#191A18] group-hover:translate-x-0.5 transition-transform" />}
              iconPosition="right"
              className="hidden md:inline-flex shadow-xs"
            >
              {language === "ml" ? "ഓഫീസ് ബന്ധപ്പെടുക" : "Contact Office"}
            </Button>
          </div>

          {/* Mobile Navigation Trigger & Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
            <AccessibilityMenu placement="mobile" />
            <ThemeSwitcher />

            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-sm border border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] justify-center hover:bg-stone/50 dark:hover:bg-[#2C2D29] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
              title="Switch language between English and Malayalam"
              aria-label={`Switch to ${language === "en" ? "Malayalam" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-slate dark:text-[#C6C5BD] shrink-0" />
              <span className="hidden min-[420px]:inline">{language === "en" ? "മലയാളം" : "EN"}</span>
              <span className="min-[420px]:hidden">{language === "en" ? "മല" : "EN"}</span>
            </button>

            <button
              ref={mobileMenuTriggerRef}
              onClick={() => {
                const next = !mobileMenuOpen;
                setMobileMenuOpen(next);
                if (!next) {
                  mobileMenuTriggerRef.current?.focus();
                }
              }}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="p-2 sm:p-2.5 rounded-sm border border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] hover:bg-stone/50 dark:hover:bg-[#2C2D29] transition-colors focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Refined Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-warm-grey dark:border-[#41413B] bg-ivory dark:bg-[#222320] px-5 pt-4 pb-8 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="mb-4 pb-3 border-b border-warm-grey dark:border-[#41413B] flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-copper dark:text-[#D29A78]">
              Palakkad Constituency
            </span>
            <span className="text-[11px] text-slate dark:text-[#A09F97]">
              Public Representative Office
            </span>
          </div>

          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                ref={idx === 0 ? firstNavLinkRef : undefined}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "px-3 py-2.5 rounded-sm text-sm uppercase tracking-wider font-semibold transition-colors flex items-center justify-between min-h-[44px]",
                  isActive(link.href)
                    ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] font-bold"
                    : "text-charcoal dark:text-[#F4F1E9] hover:bg-stone dark:hover:bg-[#2C2D29]"
                )}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Theme & Accessibility Controls Row */}
          <div className="mt-5 pt-4 border-t border-warm-grey dark:border-[#41413B] flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate dark:text-[#C6C5BD]">
              {language === "ml" ? "പ്രവേശനക്ഷമത & തീം:" : "Accessibility & Theme:"}
            </span>
            <div className="flex items-center gap-2">
              <AccessibilityMenu placement="mobile" />
              <ThemeSwitcher showLabel />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-warm-grey dark:border-[#41413B] flex flex-col gap-2">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center"
              icon={<ArrowRight className="w-4 h-4 text-white dark:text-[#191A18]" />}
              iconPosition="right"
            >
              {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Office"}
            </Button>
            <p className="text-[11px] text-slate dark:text-[#A09F97] text-center mt-1">
              {language === "ml"
                ? "നിവേദനങ്ങൾക്കും അറിയിപ്പുകൾക്കും ഓഫീസ് ഡെസ്ക് സന്ദർശിക്കുക"
                : "For official queries and constituency petitions"}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
