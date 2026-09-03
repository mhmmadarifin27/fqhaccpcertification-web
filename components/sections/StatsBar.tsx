"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="md:hidden relative z-20 bg-white text-slate-900 border-y border-slate-200 grid grid-cols-2 p-6 divide-y divide-slate-200 divide-x-0">
      <div className="p-4 space-y-1 text-center flex flex-col items-center justify-center border-r border-slate-200">
        <div className="text-2xl font-extrabold font-heading text-brand-navy">100%</div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-600">{t.trust.activeClients}</div>
      </div>
      <div className="p-4 space-y-1 text-center flex flex-col items-center justify-center">
        <img
          src="/kan-logo.png"
          alt="KAN - Komite Akreditasi Nasional"
          className="h-8 w-auto object-contain mb-1"
        />
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-600">{t.trust.kanStatus}</div>
      </div>
      <div className="p-4 space-y-1 text-center border-r border-slate-200 border-t border-slate-200 pt-4">
        <div className="text-2xl font-extrabold font-heading text-brand-navy">{t.trust.leadAuditors}</div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-600">{t.trust.leadAuditorsDesc}</div>
      </div>
      <div className="p-4 space-y-1 text-center border-t border-slate-200 pt-4">
        <div className="text-2xl font-extrabold font-heading text-brand-navy">{t.trust.satisfaction}</div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-600">{t.trust.satisfactionDesc}</div>
      </div>
    </section>
  );
}
