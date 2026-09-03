"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function OfficeLocation() {
  const { t } = useLanguage();

  return (
    <section id="lokasi-kantor" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {t.location.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {t.location.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50 border border-slate-200 p-4 sm:p-6 shadow-sm rounded-2xl">
          {/* Left Column: Interactive Google Maps Iframe */}
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

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="leading-relaxed font-normal">
                    <strong className="font-bold text-slate-900 block mb-0.5">PT FOOD QUALITY CERTIFICATION</strong>
                    TAJEM RT 004 RW 031, Maguwoharjo, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55282
                  </p>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <svg className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong className="font-bold text-slate-900 block mb-0.5">{t.location.hoursTitle}</strong>
                    <p className="text-slate-600">{t.location.hoursWeekdays}</p>
                    <p className="text-slate-400 text-[11px]">{t.location.hoursWeekend}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <svg className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
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
                  <svg className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-full shadow-md"
              >
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>{t.location.openMaps}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
