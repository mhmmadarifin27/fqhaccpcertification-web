"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="tentang-kami" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-10">
      {/* Header Title */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
          {t.profilePages.tentangKami.title}
        </h2>
      </div>

      {/* Centered Image Frame */}
      <div className="max-w-3xl mx-auto flex items-center justify-center p-4 sm:p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden rounded-2xl">
        <img
          src="/hero1.jpg"
          alt="Food Quality team working together"
          className="w-full h-auto max-h-[440px] object-cover filter drop-shadow-sm transition-transform duration-300 hover:scale-102 rounded-xl"
        />
      </div>

      {/* Body copywriting */}
      <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-left sm:text-justify">
        <p>{t.profilePages.tentangKami.legalDesc}</p>
        <p>{t.profilePages.tentangKami.commitmentDesc}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <a
          href="#form-inquiry"
          className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full shadow-md"
        >
          {t.nav.applyCertification}
        </a>
        <a
          href="/profile/tentang-kami"
          className="border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full"
        >
          {t.nav.aboutUs} &rarr;
        </a>
      </div>
    </section>
  );
}
