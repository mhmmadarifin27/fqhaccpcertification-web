"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-brand-navy-dark text-slate-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-mesh-footer opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/admin" className="flex items-center gap-3">
              <div className="h-10 w-auto flex items-center justify-center">
                <img
                  src="/logo2.png"
                  alt="Logo PT Food Quality Certification"
                  className="h-full w-auto object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight leading-none text-white font-heading">
                  PT FOOD QUALITY
                </span>
                <span className="text-[9px] font-medium tracking-wider text-slate-400">
                  CERTIFICATION
                </span>
              </div>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              {t.footer.companyDesc}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 text-[9px] px-2.5 py-0.5 font-extrabold tracking-wide uppercase">
                KAN LSHACCP-009-IDN
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                ISO/IEC 17021
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 text-sm">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs font-heading">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-2.5 text-xs text-slate-400">
              <a href="/" className="hover:text-white transition-colors">{t.nav.home}</a>
              <a href="/profile/tentang-kami" className="hover:text-white transition-colors">{t.nav.profile}</a>
              <a href="/#lingkup" className="hover:text-white transition-colors">{t.nav.scope}</a>
              <a href="/#tahapan" className="hover:text-white transition-colors">{t.nav.timeline}</a>
              <a href="/#experience" className="hover:text-white transition-colors">{t.nav.projects}</a>
              <a href="/#galeri" className="hover:text-white transition-colors">{t.nav.gallery}</a>
              <a href="/#faq" className="hover:text-white transition-colors">{t.nav.faq}</a>
            </nav>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4 text-sm lg:col-span-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs font-heading">{t.footer.contactInfo}</h4>
            <div className="flex flex-col gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  <strong className="text-slate-200 block mb-0.5">{t.footer.addressLabel}</strong>
                  Kantor PT FOOD QUALITY CERTIFICATION<br />
                  TAJEM RT 004 RW 031, Maguwoharjo, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55282
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-brand-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="https://wa.me/6282247936392"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 822-4793-6392 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-brand-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:fqhaccpconsulting@gmail.com" className="hover:text-white transition-colors">
                  fqhaccpconsulting@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex gap-4">
            <a href="/profile/independensi" className="hover:text-white transition-colors">{t.nav.independence}</a>
            <a href="/profile/tentang-kami" className="hover:text-white transition-colors">{t.nav.aboutUs}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
