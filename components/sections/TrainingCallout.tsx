"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TrainingCallout() {
  const { t } = useLanguage();

  return (
    <section id="pelatihan" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20">
      <div className="bg-[#021526] relative overflow-hidden py-16 md:py-20 px-8 sm:px-16 border border-white/10 shadow-2xl rounded-3xl">
        {/* Topographic Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 z-0 pointer-events-none"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 800,50 C 820,60 850,50 860,30 C 870,10 830,-20 800,0 C 770,20 780,40 800,50 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 770,60 C 810,80 870,60 890,20 C 910,-20 840,-60 790,-20 C 740,20 730,40 770,60 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 740,70 C 800,100 890,70 920,10 C 950,-50 850,-100 780,-40 C 710,20 680,40 740,70 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 710,80 C 790,120 910,80 950,0 C 990,-80 860,-140 770,-60 C 680,20 630,40 710,80 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 680,90 C 780,140 930,90 980,-10 C 1030,-110 870,-180 760,-80 C 650,20 580,40 680,90 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 150,300 C 170,310 200,300 210,280 C 220,260 180,230 150,250 C 120,270 130,290 150,300 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 120,320 C 160,340 220,320 240,280 C 260,240 190,200 140,240 C 90,280 80,300 120,320 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 90,340 C 150,370 240,340 270,280 C 300,220 200,170 130,230 C 60,290 30,310 90,340 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 60,360 C 140,400 260,360 300,280 C 340,200 210,140 120,220 C 30,300 -20,320 60,360 Z" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M -50,150 Q 150,50 350,150 T 750,150 T 1150,150" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M -50,200 Q 150,100 350,200 T 750,200 T 1150,200" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M -50,250 Q 150,150 350,250 T 750,250 T 1150,250" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M -50,100 Q 150,0 350,100 T 750,100 T 1150,100" fill="none" stroke="#00bdcc" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* Grid Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 order-2 lg:order-1">
            <span className="text-brand-cyan text-xs font-black uppercase tracking-widest bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1 rounded-full">
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
                <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-slate-200">
                  <span className="text-brand-cyan font-bold">•</span>
                  <span className="font-medium truncate">{topic}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="/info/pelatihan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-blue-dark text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
              >
                {t.trainingCallout.ctaButton}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-center order-1 lg:order-2 flex flex-col items-center justify-center bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xs">
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
              <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-3.5 py-1.5 rounded-full">
                {t.trainingCallout.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
