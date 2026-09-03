"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function OfficeLocation() {
  const { t } = useLanguage();

  return (
    <section id="lokasi-kantor" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-heading">
            {t.location.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {t.location.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50 border border-slate-200 p-4 sm:p-6 shadow-sm rounded-2xl">
          {/* Left Column: Interactive Google Maps Iframe with Border */}
          <div className="lg:col-span-8 relative min-h-[350px] sm:min-h-[420px] border border-slate-300 overflow-hidden bg-slate-200 shadow-inner rounded-xl">
            <iframe
              title="Lokasi Kantor PT Food Quality Certification - Maguwoharjo Sleman Yogyakarta"
              src="https://maps.google.com/maps?q=Maguwoharjo,+Depok,+Sleman,+Yogyakarta&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right Column: Office Address Details Card */}
          <div className="lg:col-span-4 bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-6 rounded-xl">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900 uppercase font-heading">
                  {t.location.addressTitle}
                </h3>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0">📍</span>
                  <p className="leading-relaxed font-normal">
                    <strong className="font-bold text-slate-900 block mb-0.5">PT FOOD QUALITY CERTIFICATION</strong>
                    TAJEM RT 004 RW 031, Maguwoharjo, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55282
                  </p>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <span className="text-base shrink-0">⏰</span>
                  <div>
                    <strong className="font-bold text-slate-900 block mb-0.5">{t.location.hoursTitle}</strong>
                    <p className="text-slate-600">{t.location.hoursWeekdays}</p>
                    <p className="text-slate-400 text-[11px]">{t.location.hoursWeekend}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <span className="text-base shrink-0">📞</span>
                  <div>
                    <strong className="font-bold text-slate-900 block mb-0.5">{t.location.whatsappTitle}</strong>
                    <a
                      href="https://wa.me/6282247936392"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:underline font-bold"
                    >
                      +62 822-4793-6392
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <span className="text-base shrink-0">✉️</span>
                  <div>
                    <strong className="font-bold text-slate-900 block mb-0.5">{t.location.emailTitle}</strong>
                    <a
                      href="mailto:fqhaccpcertification@gmail.com"
                      className="text-brand-blue hover:underline font-bold"
                    >
                      fqhaccpcertification@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Maguwoharjo+Depok+Sleman+Yogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-full shadow-md"
              >
                <span>🗺️</span>
                <span>{t.location.openMaps}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
