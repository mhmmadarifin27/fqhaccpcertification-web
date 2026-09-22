"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

interface DesktopNavProps {
  showSolid: boolean;
}

export default function DesktopNav({ showSolid }: DesktopNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
      <a
        href="/"
        className={`transition-colors duration-200 ${
          showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
        }`}
      >
        {t.nav.home}
      </a>

      {/* Hover Profile Dropdown for Desktop */}
      <div className="relative group">
        <button
          className={`flex items-center gap-1 transition-colors duration-200 font-semibold text-sm cursor-pointer py-2 focus:outline-none ${
            showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
          }`}
        >
          {t.nav.profile}
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Box */}
        <div
          className={`absolute left-0 mt-0.5 w-56 border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-1 ${
            showSolid
              ? "bg-white text-slate-800 border-slate-200"
              : "bg-brand-navy-dark text-white border-white/10"
          }`}
        >
          <a
            href="/profile/tentang-kami"
            className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
            }`}
          >
            {t.nav.aboutUs}
          </a>
          <a
            href="/profile/visi-misi"
            className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
            }`}
          >
            {t.nav.visionMission}
          </a>
          <a
            href="/profile/independensi"
            className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
            }`}
          >
            {t.nav.independence}
          </a>
          <a
            href="/profile/struktur"
            className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
            }`}
          >
            {t.nav.structure}
          </a>
          <a
            href="/profile/tim"
            className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white"
            }`}
          >
            {t.nav.team}
          </a>
        </div>
      </div>

      {/* Hover Info Pengunjung Dropdown for Desktop */}
      <div className="relative group">
        <button
          className={`flex items-center gap-1 transition-colors duration-200 font-semibold text-sm cursor-pointer py-2 focus:outline-none ${
            showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
          }`}
        >
          {t.nav.visitorInfo}
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Box */}
        <div
          className={`absolute left-0 mt-0.5 w-60 border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-1.5 rounded-2xl overflow-hidden ${
            showSolid
              ? "bg-white text-slate-800 border-slate-200"
              : "bg-brand-navy-dark text-white border-white/10"
          }`}
        >
          <a
            href="/info/pelatihan"
            className={`px-4 py-2.5 text-xs font-semibold border-b transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue border-slate-100"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white border-white/5"
            }`}
          >
            {t.nav.trainingList}
          </a>
          <a
            href="/info/berkas-haccp"
            className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
              showSolid
                ? "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                : "text-slate-300 hover:bg-brand-blue/30 hover:text-white"
            }`}
          >
            {t.nav.haccpDocs}
          </a>
        </div>
      </div>

      <a
        href="/alur-sertifikasi"
        className={`transition-colors duration-200 ${
          showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
        }`}
      >
        {t.nav.timeline}
      </a>
      <a
        href="/info/pelatihan"
        className={`transition-colors duration-200 ${
          showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
        }`}
      >
        {t.nav.projects}
      </a>
      <a
        href="/#faq"
        className={`transition-colors duration-200 ${
          showSolid ? "text-slate-700 hover:text-brand-blue" : "text-slate-200 hover:text-white"
        }`}
      >
        {t.nav.faq}
      </a>
    </nav>
  );
}
