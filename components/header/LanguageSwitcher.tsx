"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  if (isMobile) {
    return (
      <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => setLang("id")}
          className={`px-2 py-1 rounded-full transition-all border-none text-[11px] font-bold flex items-center gap-1 ${
            lang === "id" ? "bg-brand-navy text-white shadow-xs" : "text-slate-600 bg-transparent"
          }`}
        >
          <span className="w-3.5 h-2 rounded-xs overflow-hidden inline-flex flex-col border border-slate-300 shadow-2xs shrink-0">
            <span className="w-full h-1/2 bg-[#e70011]"></span>
            <span className="w-full h-1/2 bg-white"></span>
          </span>
          <span>ID</span>
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`px-2 py-1 rounded-full transition-all border-none text-[11px] font-bold flex items-center gap-1 ${
            lang === "en" ? "bg-brand-navy text-white shadow-xs" : "text-slate-600 bg-transparent"
          }`}
        >
          <svg className="w-3.5 h-2 rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0" viewBox="0 0 60 30">
            <clipPath id="uk-flag-mobile">
              <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="uk-diag-mobile">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#uk-flag-mobile)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag-mobile)" stroke="#C8102E" strokeWidth="4" />
              <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </svg>
          <span>EN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-slate-100/90 backdrop-blur-xs p-1 rounded-full border border-slate-200/80 text-xs font-bold shadow-xs">
      <button
        type="button"
        onClick={() => setLang("id")}
        className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none font-bold flex items-center gap-1.5 ${
          lang === "id"
            ? "bg-brand-navy text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 bg-transparent"
        }`}
      >
        <span className="w-4 h-2.5 rounded-xs overflow-hidden inline-flex flex-col border border-slate-300 shadow-2xs shrink-0">
          <span className="w-full h-1/2 bg-[#e70011]"></span>
          <span className="w-full h-1/2 bg-white"></span>
        </span>
        <span>ID</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition-all cursor-pointer border-none font-bold flex items-center gap-1.5 ${
          lang === "en"
            ? "bg-brand-navy text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 bg-transparent"
        }`}
      >
        <svg className="w-4 h-2.5 rounded-xs overflow-hidden border border-slate-300 shadow-2xs shrink-0" viewBox="0 0 60 30">
          <clipPath id="uk-flag-desktop">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <clipPath id="uk-diag-desktop">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clipPath="url(#uk-flag-desktop)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag-desktop)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
        <span>EN</span>
      </button>
    </div>
  );
}
