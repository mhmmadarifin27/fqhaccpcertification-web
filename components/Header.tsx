"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    if (!isHomepage) return;
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const showSolid = !isHomepage || isScrolled || mobileMenuOpen;
  const isUtilityNavy = !isHomepage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${showSolid
        ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm text-slate-800"
        : "bg-transparent border-transparent text-white"
        }`}
    >
      {/* Top Utility Bar */}
      <div
        className={`hidden md:flex justify-between items-center px-6 lg:px-12 py-2 text-xs border-b font-medium tracking-wide transition-all duration-300 ${isUtilityNavy
          ? "bg-brand-navy-dark border-white/5 text-white"
          : "bg-white border-slate-200 text-brand-navy"
          }`}
      >
        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/6282247936392"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand-cyan transition-colors"
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors duration-300 ${isUtilityNavy ? "text-brand-cyan" : "text-brand-blue"
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +62 822-4793-6392
          </a>
          <a
            href="mailto:fqhaccpconsulting@gmail.com"
            className="flex items-center gap-2 hover:text-brand-cyan transition-colors"
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors duration-300 ${isUtilityNavy ? "text-brand-cyan" : "text-brand-blue"
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            fqhaccpconsulting@gmail.com
          </a>
        </div>
        <span
          className={`border px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${isUtilityNavy
            ? "bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30"
            : "bg-brand-navy/10 text-brand-navy border-brand-navy/20"
            }`}
        >
          {t.nav.accreditationTag}
        </span>
      </div>

      {/* Main Nav Bar */}
      <div className="flex justify-between items-center px-4 lg:px-12 py-3 md:py-4 transition-all duration-350">
        {/* Logo & Brand Title */}
        <a href="/admin" className="flex items-center gap-3 group">
          <div className="h-10 sm:h-12 w-auto flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <img
              src="/logo2.png"
              alt="Logo PT Food Quality Certification"
              className="h-full w-auto object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm lg:text-base font-extrabold tracking-tight leading-none font-heading transition-colors ${showSolid ? "text-slate-900" : "text-white"
                }`}
            >
              PT FOOD QUALITY
            </span>
            <span
              className={`text-[10px] lg:text-[11px] font-medium tracking-wider mt-0.5 transition-colors ${showSolid ? "text-slate-500" : "text-slate-300"
                }`}
            >
              CERTIFICATION
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <a
            href="/"
            className={`transition-colors duration-200 ${showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
              }`}
          >
            {t.nav.home}
          </a>

          {/* Hover Profile Dropdown for Desktop */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 transition-colors duration-200 font-semibold text-sm cursor-pointer py-2 focus:outline-none ${showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
                }`}
            >
              {t.nav.profile}
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Box */}
            <div
              className={`absolute left-0 mt-0.5 w-56 border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-1 ${showSolid
                ? "bg-white text-slate-800 border-slate-200"
                : "bg-brand-navy-dark text-white border-white/10"
                }`}
            >
              <a
                href="/profile/tentang-kami"
                className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${showSolid
                  ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                  : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
                  }`}
              >
                {t.nav.aboutUs}
              </a>
              <a
                href="/profile/visi-misi"
                className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${showSolid
                  ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                  : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
                  }`}
              >
                {t.nav.visionMission}
              </a>
              <a
                href="/profile/independensi"
                className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${showSolid
                  ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                  : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
                  }`}
              >
                {t.nav.independence}
              </a>
              <a
                href="/profile/struktur"
                className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${showSolid
                  ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                  : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
                  }`}
              >
                {t.nav.structure}
              </a>
              <a
                href="/profile/tim"
                className={`px-4 py-2.5 text-xs font-semibold transition-colors ${showSolid
                  ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                  : "text-slate-300 hover:bg-brand-blue/30 hover:text-white"
                  }`}
              >
                {t.nav.team}
              </a>
            </div>
          </div>

          <a
            href="/#tahapan"
            className={`transition-colors duration-200 ${showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
              }`}
          >
            {t.nav.timeline}
          </a>
          <a
            href="/#experience"
            className={`transition-colors duration-200 ${showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
              }`}
          >
            {t.nav.projects}
          </a>
          <a
            href="/#faq"
            className={`transition-colors duration-200 ${showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
              }`}
          >
            {t.nav.faq}
          </a>
        </nav>

        {/* Right Header Buttons & Language Pill */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Main Nav Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80 text-xs font-bold shadow-xs">
            <button
              onClick={() => setLang("id")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none flex items-center gap-1.5 ${
                lang === "id"
                  ? "bg-brand-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none flex items-center gap-1.5 ${
                lang === "en"
                  ? "bg-brand-navy text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <a
            href="/#form-inquiry"
            className="bg-brand-blue hover:bg-brand-navy text-white text-xs font-extrabold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-center uppercase tracking-wider"
          >
            {t.nav.applyCertification}
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Language Toggle Pill */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-[10px] font-extrabold">
            <button
              onClick={() => setLang("id")}
              className={`px-2 py-0.5 rounded-full transition-all border-none ${
                lang === "id" ? "bg-brand-navy text-white" : "text-slate-600 bg-transparent"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full transition-all border-none ${
                lang === "en" ? "bg-brand-navy text-white" : "text-slate-600 bg-transparent"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors focus:outline-none ${showSolid ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
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
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white py-4 px-6 space-y-4 shadow-inner max-h-[calc(100vh-120px)] overflow-y-auto text-slate-800 animate-fade-in">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
          >
            {t.nav.home}
          </a>

          {/* Collapsible Profile Sub-menu for Mobile */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-800 hover:text-brand-blue cursor-pointer text-left focus:outline-none"
            >
              <span>{t.nav.profile}</span>
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileProfileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileProfileOpen && (
              <div className="pl-3 mt-1.5 space-y-2 border-l border-brand-blue/30 animate-fade-in">
                <a
                  href="/profile/tentang-kami"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  {t.nav.aboutUs}
                </a>
                <a
                  href="/profile/visi-misi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  {t.nav.visionMission}
                </a>
                <a
                  href="/profile/independensi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  {t.nav.independence}
                </a>
                <a
                  href="/profile/struktur"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  {t.nav.structure}
                </a>
                <a
                  href="/profile/tim"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  {t.nav.team}
                </a>
              </div>
            )}
          </div>

          <a
            href="/#tahapan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
          >
            {t.nav.timeline}
          </a>
          <a
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
          >
            {t.nav.projects}
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
          >
            {t.nav.faq}
          </a>
          <a
            href="/#form-inquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center bg-brand-blue hover:bg-brand-navy py-3 text-xs font-extrabold text-white transition-colors mt-4 rounded-full uppercase tracking-wider"
          >
            {t.nav.applyCertification}
          </a>
        </div>
      )}
    </header>
  );
}
