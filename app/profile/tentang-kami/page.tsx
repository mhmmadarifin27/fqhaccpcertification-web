"use client";

import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";

export default function TentangKamiPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      {/* Main Content Container with spacing for sticky header */}
      <main className="pt-24 md:pt-36 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Section: Centered Editorial Layout */}
        <div className="space-y-10 text-center">
          
          {/* Header Title */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
              {t.profilePages.tentangKami.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">
              {t.profilePages.tentangKami.subtitle}
            </p>
          </div>

          {/* Centered Image Frame */}
          <div className="max-w-3xl mx-auto flex items-center justify-center p-4 sm:p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
              alt="Food Quality team working together"
              className="w-full h-auto max-h-[480px] object-cover filter drop-shadow-sm transition-transform duration-300 hover:scale-102 rounded-xl"
            />
          </div>

          {/* Body copywriting */}
          <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-left sm:text-justify">
            <p>{t.profilePages.tentangKami.legalDesc}</p>
            <p>{t.profilePages.tentangKami.commitmentDesc}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="/#form-inquiry"
              className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full shadow-md"
            >
              {t.nav.applyCertification}
            </a>
            <a
              href="/profile/visi-misi"
              className="border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full"
            >
              {t.nav.visionMission} &rarr;
            </a>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
