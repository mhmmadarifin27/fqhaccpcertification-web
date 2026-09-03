"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function WhyUsSection() {
  const { t } = useLanguage();

  return (
    <section id="keunggulan" className="bg-brand-navy text-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-mesh opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Layout Grid representing Reasons */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-2 h-auto">
          {/* Big Card on Left */}
          <div className="md:col-span-7 relative group min-h-[380px] flex flex-col justify-end p-6 border border-white/10 overflow-hidden bg-slate-900 rounded-2xl">
            <img
              src="/hccp1.jpg"
              alt="Terakreditasi KAN"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/40 to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">{t.whyUs.card1Tag}</span>
              <h4 className="text-xl font-extrabold font-heading text-white">{t.whyUs.card1Title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {t.whyUs.card1Desc}
              </p>
            </div>
          </div>

          {/* Stack of 3 Small Cards on Right */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {/* Small Card 1 */}
            <div className="relative group min-h-[130px] flex flex-col justify-end p-4 border border-white/10 overflow-hidden bg-slate-900 rounded-xl">
              <img
                src="/hccp2.jpg"
                alt="Auditor Kompeten"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/60 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest block leading-none mb-1">{t.whyUs.card2Tag}</span>
                <h4 className="text-sm sm:text-base font-extrabold text-white">{t.whyUs.card2Title}</h4>
                <p className="text-[11px] text-slate-300 leading-normal hidden group-hover:block transition-all duration-300 mt-1">
                  {t.whyUs.card2Desc}
                </p>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="relative group min-h-[130px] flex flex-col justify-end p-4 border border-white/10 overflow-hidden bg-slate-900 rounded-xl">
              <img
                src="/hccp3.jpg"
                alt="Independensi"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/60 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest block leading-none mb-1">{t.whyUs.card3Tag}</span>
                <h4 className="text-sm sm:text-base font-extrabold text-white">{t.whyUs.card3Title}</h4>
                <p className="text-[11px] text-slate-300 leading-normal hidden group-hover:block transition-all duration-300 mt-1">
                  {t.whyUs.card3Desc}
                </p>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="relative group min-h-[130px] flex flex-col justify-end p-4 border border-white/10 overflow-hidden bg-slate-900 rounded-xl">
              <img
                src="/hccp4.jpg"
                alt="Pelayanan Profesional"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/60 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest block leading-none mb-1">{t.whyUs.card4Tag}</span>
                <h4 className="text-sm sm:text-base font-extrabold text-white">{t.whyUs.card4Title}</h4>
                <p className="text-[11px] text-slate-300 leading-normal hidden group-hover:block transition-all duration-300 mt-1">
                  {t.whyUs.card4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title and description */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 lg:pl-8 py-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading leading-[1.15]">
            {t.whyUs.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-normal">
            {t.whyUs.subtitle}
          </p>
          <div className="pt-2">
            <a
              href="#form-inquiry"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-brand-navy font-bold py-3.5 px-8 transition-all duration-300 text-xs sm:text-sm tracking-wider rounded-full shadow-md"
            >
              {t.whyUs.ctaButton}
            </a>
          </div>
        </div>
      </div>

      {/* Manfaat & Target Industri Segment */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 mt-16 border-t border-white/10">
        {/* Manfaat */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            {t.whyUs.benefitsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            {t.whyUs.benefitsSubtitle}
          </p>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
            {t.whyUs.benefitsList.map((manfaat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <svg className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{manfaat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Who needs HACCP */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            {t.whyUs.targetTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {t.whyUs.targetSubtitle}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {t.whyUs.targetList.map((target, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 px-3.5 py-1.5 transition-colors cursor-default text-slate-200 rounded-full"
              >
                ✔ {target}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
