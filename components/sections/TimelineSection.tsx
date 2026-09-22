"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function TimelineSection() {
  const { lang, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="tahapan" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
            {t.timeline.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {t.timeline.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.timeline.description}
          </p>
        </div>

        {/* Stepper Progress UI */}
        <div className="space-y-12">
          <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
            {/* Dotted Horizontal Connecting Line */}
            <div className="absolute top-[20px] left-[6%] right-[6%] border-b-2 border-dotted border-slate-300 hidden lg:block z-0" />

            {/* Steps Stepper Grid: 7 Steps Responsive */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5 sm:gap-4 lg:gap-2">
              {t.timeline.steps.map((step, idx) => {
                const isCompleted = idx < activeStep;
                const isActive = idx === activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center cursor-pointer border-none bg-transparent p-0 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 ${
                        isCompleted
                          ? "bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-100"
                          : isActive
                          ? "bg-brand-blue text-white shadow-md ring-4 ring-blue-100 scale-110"
                          : "bg-white border border-slate-300 text-slate-500 group-hover:border-brand-blue group-hover:text-brand-blue"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Labels */}
                    <div className="mt-3 space-y-0.5 max-w-[140px]">
                      <h4
                        className={`text-xs sm:text-sm font-extrabold font-heading leading-tight transition-colors line-clamp-2 ${
                          isActive ? "text-brand-blue font-black" : isCompleted ? "text-slate-800" : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-normal leading-tight hidden md:block">
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Step Detail Box */}
          <div className="bg-slate-50/80 p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden transition-all duration-300 max-w-4xl mx-auto rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {t.timeline.steps[activeStep]?.badge || t.timeline.steps[0].badge}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {lang === "en" ? `Step ${activeStep + 1} of ${t.timeline.steps.length}` : `Tahap ${activeStep + 1} dari ${t.timeline.steps.length}`}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">
              {t.timeline.steps[activeStep]?.title}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.timeline.steps[activeStep]?.description}
            </p>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200/60">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => prev - 1)}
                className="px-4 py-2 text-xs font-bold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer rounded-full"
              >
                &larr; {lang === "en" ? "Previous Step" : "Tahap Sebelumnya"}
              </button>
              <button
                disabled={activeStep === t.timeline.steps.length - 1}
                onClick={() => setActiveStep((prev) => prev + 1)}
                className="px-5 py-2 text-xs font-bold bg-brand-navy hover:bg-brand-navy-dark text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer rounded-full shadow-sm"
              >
                {lang === "en" ? "Next Step" : "Tahap Selanjutnya"} &rarr;
              </button>
            </div>
          </div>

          {/* Button Selengkapnya Menuju Halaman Alur Sertifikasi */}
          <div className="text-center pt-2">
            <a
              href="/alur-sertifikasi"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95 border-none cursor-pointer"
            >
              <span>{lang === "en" ? "View Full Certification Flowchart →" : "Lihat Alur Sertifikasi Lengkap →"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
