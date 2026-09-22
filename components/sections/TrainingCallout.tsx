"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TrainingCallout() {
  const { t } = useLanguage();

  return (
    <section id="pelatihan" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20">
      <div className="bg-slate-900 relative overflow-hidden py-16 md:py-20 px-8 sm:px-16 border border-slate-800 shadow-xl rounded-3xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {t.trainingCallout.tagline}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading leading-tight">
              {t.trainingCallout.title}
            </h3>
            <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <p>{t.trainingCallout.description1}</p>
              <p>{t.trainingCallout.description2}</p>
            </div>

            {/* Topics Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-1">
              {t.trainingCallout.topics.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-slate-200">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="font-medium truncate">{topic}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="/info/pelatihan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
              >
                {t.trainingCallout.ctaButton}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-center order-1 lg:order-2 flex flex-col items-center justify-center bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center mb-2 shadow-inner overflow-hidden">
              <img
                src="/logo-haccp.jpg"
                alt="Logo HACCP"
                className="w-full h-full object-contain filter drop-shadow-sm rounded-xl"
              />
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Kompetensi & Mutu SDM Pangan
            </h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Tingkatkan kesiapan fasilitas dan kepatuhan sistem audit melalui bimbingan Lead Auditor bersertifikat resmi.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full">
                {t.trainingCallout.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
