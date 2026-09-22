"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ServicesCallout() {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-28">
      <div className="bg-slate-900 relative overflow-hidden py-16 md:py-20 px-8 sm:px-16 border border-slate-800 shadow-xl rounded-3xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {t.mainServices.title}
            </h3>
            <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <p>{t.mainServices.p1}</p>
              <p>{t.mainServices.p2}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3 text-center order-1 lg:order-2 flex flex-col items-center justify-center">
            <img
              src="/kan-logo.png"
              alt="Komite Akreditasi Nasional (KAN)"
              className="h-16 sm:h-20 w-auto object-contain bg-transparent mb-2 mx-auto"
            />
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {t.mainServices.slogan1}
            </h3>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-300 leading-tight font-heading">
              {t.mainServices.slogan2}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
