"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [mobileVisitorInfoOpen, setMobileVisitorInfoOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-slate-200 bg-white py-4 px-6 space-y-4 shadow-inner max-h-[calc(100vh-120px)] overflow-y-auto text-slate-800 animate-fade-in">
      <a
        href="/"
        onClick={onClose}
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
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              mobileProfileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileProfileOpen && (
          <div className="pl-3 mt-1.5 space-y-2 border-l border-brand-blue/30 animate-fade-in">
            <a
              href="/profile/tentang-kami"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.aboutUs}
            </a>
            <a
              href="/profile/visi-misi"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.visionMission}
            </a>
            <a
              href="/profile/independensi"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.independence}
            </a>
            <a
              href="/profile/struktur"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.structure}
            </a>
            <a
              href="/profile/tim"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.team}
            </a>
          </div>
        )}
      </div>

      {/* Mobile Accordion for Info Pengunjung */}
      <div className="border-b border-slate-100 pb-2">
        <button
          onClick={() => setMobileVisitorInfoOpen(!mobileVisitorInfoOpen)}
          className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-800 hover:text-brand-blue cursor-pointer text-left focus:outline-none"
        >
          <span>{t.nav.visitorInfo}</span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              mobileVisitorInfoOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileVisitorInfoOpen && (
          <div className="pl-3 mt-1.5 space-y-2 border-l border-brand-navy/30 animate-fade-in">
            <a
              href="/info/pelatihan"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.trainingList}
            </a>
            <a
              href="/info/berkas-haccp"
              onClick={onClose}
              className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors"
            >
              {t.nav.haccpDocs}
            </a>
          </div>
        )}
      </div>

      <a
        href="/alur-sertifikasi"
        onClick={onClose}
        className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
      >
        {t.nav.timeline}
      </a>
      <a
        href="/info/pelatihan"
        onClick={onClose}
        className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
      >
        {t.nav.projects}
      </a>
      <a
        href="/#faq"
        onClick={onClose}
        className="block py-2.5 text-sm font-bold text-slate-800 border-b border-slate-100 hover:text-brand-blue transition-colors"
      >
        {t.nav.faq}
      </a>
      <a
        href="/#form-inquiry"
        onClick={onClose}
        className="block w-full text-center bg-brand-blue hover:bg-brand-navy py-3 text-xs font-extrabold text-white transition-colors mt-4 rounded-full uppercase tracking-wider"
      >
        {t.nav.applyCertification}
      </a>
    </div>
  );
}
