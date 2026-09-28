"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import clsx from "clsx";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ? "bg-ivory/95 dark:bg-[#111C18]/95 backdrop-blur-md border-b border-sage-border/80 dark:border-[#35463C]/80 shadow-xs py-3"
          : "bg-ivory/90 dark:bg-[#111C18]/90 backdrop-blur-xs border-b border-transparent py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 xl:gap-6">
          {/* Editorial Wordmark */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B] py-0.5 shrink-0"
          >
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl sm:text-2xl text-charcoal dark:text-[#F5F2E9] tracking-tight group-hover:text-forest dark:group-hover:text-[#8CB99B] transition-colors">
                RAMESH
              </span>
              <span className="font-display text-xl sm:text-2xl text-forest dark:text-[#8CB99B] tracking-tight -mt-0.5 group-hover:text-forest-dark dark:group-hover:text-[#9dc4ab] transition-colors">
                PISHARADY
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-charcoal-light dark:text-[#99A99D] uppercase mt-1">
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
                  "text-xs xl:text-[13px] uppercase tracking-wider font-semibold transition-all relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B]",
                  isActive(link.href)
                    ? "text-forest dark:text-[#8CB99B]"
                    : "text-charcoal-muted dark:text-[#C3CDC4] hover:text-charcoal dark:hover:text-[#F5F2E9]"
                )}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest dark:bg-[#8CB99B] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Theme Switcher, Language Switcher & Contact Office CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Switcher Button */}
            <ThemeSwitcher />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-2 rounded-lg border border-sage-border/80 dark:border-[#35463C] hover:border-forest/40 dark:hover:border-[#8CB99B]/40 text-charcoal dark:text-[#F5F2E9] bg-ivory/60 dark:bg-[#182720]/60 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest dark:focus-visible:ring-[#8CB99B] min-h-[44px]"
              title="Switch language between English and Malayalam"
              aria-label={`Switch to ${language === "en" ? "Malayalam" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-forest dark:text-[#8CB99B]" />
              <span className={language === "en" ? "font-bold text-forest dark:text-[#8CB99B]" : "text-charcoal-light dark:text-[#99A99D]"}>
                EN
              </span>
              <span className="text-sage-border dark:text-[#35463C]">/</span>
              <span className={language === "ml" ? "font-bold text-forest dark:text-[#8CB99B]" : "text-charcoal-light dark:text-[#99A99D]"}>
                മലയാളം
              </span>
            </button>

            {/* Contact Office CTA */}
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5 text-ivory dark:text-[#10231A] group-hover:translate-x-0.5 transition-transform" />}
              iconPosition="right"
              className="hidden md:inline-flex shadow-xs"
            >
              {language === "ml" ? "ഓഫീസ് ബന്ധപ്പെടുക" : "Contact Office"}
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />

            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-2 rounded-lg border border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9] min-h-[44px] min-w-[44px] justify-center"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-forest dark:text-[#8CB99B]" />
              {language === "en" ? "മലയാളം" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 rounded-lg border border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9] hover:text-forest dark:hover:text-[#8CB99B] hover:bg-sage/40 dark:hover:bg-[#21342A] transition-colors focus:outline-none focus:ring-1 focus:ring-forest dark:focus:ring-[#8CB99B] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Refined Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-sage-border dark:border-[#35463C] bg-ivory-light dark:bg-[#182720] px-5 pt-4 pb-8 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="mb-4 pb-3 border-b border-sage-border dark:border-[#35463C] flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-terracotta dark:text-[#E19A76]">
              Palakkad Constituency
            </span>
            <span className="text-[11px] text-charcoal-light dark:text-[#99A99D]">
              Public Representative Office
            </span>
          </div>

          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "px-3 py-2.5 rounded-lg text-sm uppercase tracking-wider font-semibold transition-colors flex items-center justify-between min-h-[44px]",
                  isActive(link.href)
                    ? "bg-forest text-ivory dark:bg-[#8CB99B] dark:text-[#10231A] font-bold"
                    : "text-charcoal dark:text-[#F5F2E9] hover:bg-sage/40 dark:hover:bg-[#21342A]"
                )}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-ivory dark:bg-[#10231A]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Theme & Language Controls Row */}
          <div className="mt-5 pt-4 border-t border-sage-border dark:border-[#35463C] flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-charcoal-muted dark:text-[#C3CDC4]">
              {language === "ml" ? "തീം മാറ്റുക:" : "Appearance Theme:"}
            </span>
            <ThemeSwitcher showLabel />
          </div>

          <div className="mt-4 pt-4 border-t border-sage-border dark:border-[#35463C] flex flex-col gap-2">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center"
              icon={<ArrowRight className="w-4 h-4 text-ivory dark:text-[#10231A]" />}
              iconPosition="right"
            >
              {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Office"}
            </Button>
            <p className="text-[11px] text-charcoal-light dark:text-[#99A99D] text-center mt-1">
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
