"use client";

import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";

export default function VisiMisiPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      {/* Main Content Container */}
      <main className="pt-24 md:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Image / Logo Frame with preserved natural aspect ratio */}
          <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-8 bg-white border border-slate-200 shadow-sm min-h-[350px] lg:min-h-[480px] relative overflow-hidden rounded-2xl">
            <img
              src="/hccp1.jpg"
              alt="Visi Misi PT Food Quality Certification"
              className="w-auto h-auto max-h-[420px] max-w-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-105 rounded-xl"
            />
          </div>

          {/* Right Column: Copywriting content in Accura editorial style */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-6">
              {/* Large serif-display elegant heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
                {t.profilePages.visiMisi.title}
              </h1>

              {/* Visi and Misi details */}
              <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{t.profilePages.visiMisi.visionTitle}</h3>
                  <p className="italic text-brand-blue font-medium text-lg leading-relaxed">
                    &ldquo;{t.profilePages.visiMisi.visionDesc}&rdquo;
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{t.profilePages.visiMisi.missionTitle}</h3>
                  <ul className="space-y-3.5">
                    {t.profilePages.visiMisi.missions.map((misi, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 rounded-full">
                          {idx + 1}
                        </span>
                        <span>{misi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom adjacent sharp buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
              <a
                href="/#form-inquiry"
                className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full shadow-md"
              >
                {t.nav.applyCertification}
              </a>
              <a
                href="/profile/independensi"
                className="border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full"
              >
                {t.nav.independence} &rarr;
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
