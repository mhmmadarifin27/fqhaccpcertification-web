"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function FaqSection() {
  const { lang, t } = useLanguage();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block bg-brand-navy/10 text-brand-navy border border-brand-navy/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest rounded-full">
            {t.faq.tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            {t.faq.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {t.faq.description}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div
                key={idx}
                className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen
                    ? "bg-slate-50/80 border-brand-blue/40 shadow-sm"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer border-none bg-transparent transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    {item.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-300 ${
                      isOpen
                        ? "bg-brand-blue text-white rotate-180"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200 border-t border-slate-100 mt-1">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Contact Helper */}
        <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            {lang === "en" ? "Have further questions?" : "Punya Pertanyaan Lain Seputar HACCP?"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {lang === "en"
              ? "Our auditor and technical staff are ready to provide detailed explanations regarding the certification process."
              : "Tim auditor dan staf teknis kami siap membantu memberikan penjelasan detail mengenai alur dan persiapan sertifikasi."}
          </p>
          <div className="pt-2">
            <a
              href="#form-inquiry"
              className="inline-block bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-wider py-3 px-7 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              {lang === "en" ? "Consult with Auditor" : "Konsultasi Sekarang"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
