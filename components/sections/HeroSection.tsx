"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const HERO_IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hccp1.jpg",
  "/hccp2.jpg",
  "/hccp3.jpg",
  "/hccp4.jpg",
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPlaying] = useState(true);

  // Auto play carousel
  useEffect(() => {
    if (!carouselPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselPlaying]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy-dark">
      {/* Background Slide Images */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            currentSlide === idx ? "opacity-35 scale-105" : "opacity-0 pointer-events-none scale-100"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Linear Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy-dark/60 to-transparent pointer-events-none" />

      {/* Hero Text Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 z-10 pt-20 pb-16 md:pb-20">
        <div className="max-w-2xl min-h-[390px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[380px] flex flex-col justify-between">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-heading">
              {t.hero.slides[currentSlide]?.title || t.hero.slides[0].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal">
              {t.hero.slides[currentSlide]?.description || t.hero.slides[0].description}
            </p>
          </div>
          <div className="pt-6 space-y-4">
            <div>
              <a
                href="#form-inquiry"
                className="inline-block bg-white hover:bg-slate-100 text-brand-navy font-bold py-3.5 px-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-95 text-sm sm:text-base tracking-wide rounded-full text-center shadow-lg"
              >
                {t.hero.slides[currentSlide]?.ctaText || t.hero.slides[0].ctaText}
              </a>
            </div>

            {/* Mobile Slide Indicators (Clearly separated below button) */}
            <div className="flex md:hidden items-center gap-2 pt-1">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer border-none ${
                    currentSlide === idx ? "bg-white w-8" : "bg-white/40 w-4 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Right Side Controls (Desktop only) */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`w-6 h-1 transition-all duration-300 relative cursor-pointer border-none ${
              currentSlide === idx ? "bg-white w-10" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Stats Highlight Bar (Desktop) */}
      <div className="hidden md:flex absolute bottom-0 right-0 z-20 bg-white text-slate-900 divide-x divide-slate-200 border-t border-l border-slate-200 max-w-4xl shadow-2xl overflow-hidden animate-slide-in-right">
        <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold font-heading text-brand-navy">100%</div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
            {t.trust.activeClients}
            <br />
            {t.trust.activeClientsDesc}
          </div>
        </div>
        <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
          <img
            src="/kan-logo.png"
            alt="KAN - Komite Akreditasi Nasional"
            className="h-10 lg:h-12 w-auto object-contain mb-1"
          />
          <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
            {t.trust.kanStatus}
            <br />
            {t.trust.kanStatusDesc}
          </div>
        </div>
        <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold font-heading text-brand-navy">{t.trust.leadAuditors}</div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
            {t.trust.leadAuditorsDesc}
          </div>
        </div>
        <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold font-heading text-brand-navy">{t.trust.satisfaction}</div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
            {t.trust.satisfactionDesc}
          </div>
        </div>
      </div>
    </section>
  );
}
