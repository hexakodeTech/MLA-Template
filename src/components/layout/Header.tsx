"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Landmark, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
        "sticky top-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md border-b",
        isScrolled
          ? "border-slate-300 shadow-sm py-2.5"
          : "border-slate-200 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 rounded-md p-1"
          >
            <div className="w-10 h-10 rounded-md bg-navy-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-navy-800 shrink-0 group-hover:bg-navy-800 transition-colors">
              <Landmark className="w-5 h-5 text-gold-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg sm:text-xl text-navy-950 tracking-tight leading-tight">
                  Ramesh Pisharady
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  Concept
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                {language === "ml"
                  ? "ജനപ്രതിനിധി ഔദ്യോഗിക പോർട്ടൽ"
                  : "Official Representative Portal"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900",
                  isActive(link.href)
                    ? "text-navy-900 bg-navy-50 font-semibold border border-navy-200/60"
                    : "text-slate-700 hover:text-navy-900 hover:bg-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Language Toggle & Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
              title="Switch language between English and Malayalam"
              aria-label={`Switch to ${language === "en" ? "Malayalam" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-navy-800" />
              <span className={language === "en" ? "font-bold text-navy-900" : "text-slate-500"}>
                EN
              </span>
              <span className="text-slate-300">/</span>
              <span className={language === "ml" ? "font-bold text-navy-900" : "text-slate-500"}>
                മലയാളം
              </span>
            </button>

            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<PhoneCall className="w-3.5 h-3.5 text-gold-400" />}
              iconPosition="left"
              className="hidden md:inline-flex"
            >
              {language === "ml" ? "ഓഫീസ് ബന്ധപ്പെടുക" : "Contact Office"}
            </Button>
          </div>

          {/* Mobile Menu & Language Toggle for small screens */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded border border-slate-300 text-slate-800"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-navy-800" />
              {language === "en" ? "മലയാളം" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-md border border-slate-300 text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-navy-900"
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

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ മെനു" : "Prototype Navigation"}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Palakkad Constituency</span>
          </div>
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between",
                  isActive(link.href)
                    ? "bg-navy-900 text-white font-semibold"
                    : "text-slate-800 hover:bg-slate-100"
                )}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center"
              icon={<PhoneCall className="w-4 h-4 text-gold-400" />}
              iconPosition="left"
            >
              {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Office"}
            </Button>
            <p className="text-[11px] text-slate-500 text-center mt-1">
              {language === "ml"
                ? "നിവേദനങ്ങൾക്കും അറിയിപ്പുകൾക്കും ഓഫീസ് ഡെസ്ക് സന്ദർശിക്കുക"
                : "For public queries and petitions, contact the constituency desk"}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
