"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./header/LanguageSwitcher";
import DesktopNav from "./header/DesktopNav";
import MobileMenu from "./header/MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { t } = useLanguage();

  useEffect(() => {
    if (!isHomepage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const showSolid = !isHomepage || isScrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        showSolid
          ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm text-slate-800"
          : "bg-transparent border-transparent text-white"
      }`}
    >
      {/* Main Nav Bar */}
      <div className="flex justify-between items-center px-4 lg:px-12 py-3 md:py-4 transition-all duration-350">
        {/* Logo & Brand Title */}
        <a href="/admin" className="flex items-center gap-3 group">
          <div className="h-10 sm:h-12 w-auto flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <Image
              src="/logo2.png"
              alt="Logo PT Food Quality Certification"
              width={48}
              height={48}
              priority
              className="h-full w-auto object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm lg:text-base font-extrabold tracking-tight leading-none font-heading transition-colors ${
                showSolid ? "text-slate-900" : "text-white"
              }`}
            >
              PT FOOD QUALITY
            </span>
            <span
              className={`text-[10px] lg:text-[11px] font-medium tracking-wider mt-0.5 transition-colors ${
                showSolid ? "text-slate-500" : "text-slate-300"
              }`}
            >
              CERTIFICATION
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <DesktopNav showSolid={showSolid} />

        {/* Right Header Buttons & Language Pill */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />

          <a
            href="/#form-inquiry"
            className="bg-brand-blue hover:bg-brand-navy text-white text-xs font-extrabold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-center uppercase tracking-wider"
          >
            {t.nav.applyCertification}
          </a>
        </div>

        {/* Mobile Navigation Toggle Button & Switcher */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher isMobile />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors focus:outline-none ${
              showSolid ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
