"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function ServicesCallout() {
  const { t } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 md:pb-28">
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
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-cyan leading-tight font-heading">
              {t.mainServices.slogan2}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
