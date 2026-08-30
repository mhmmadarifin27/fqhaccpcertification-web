"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";

export default function StrukturPage() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      {/* Main Content Container */}
      <main className="pt-24 md:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header Title Section (Centered) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
            {t.profilePages.struktur.subtitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {t.profilePages.struktur.chartDesc}
          </p>
        </div>

        {/* Centered Organization Chart Showcase */}
        <div className="max-w-5xl mx-auto">
          <div
            onClick={() => setModalOpen(true)}
            className="bg-white border border-slate-200 p-2 sm:p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10 bg-brand-navy/80 hover:bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 transition-all shadow-md">
              <span>🔍</span>
              <span>Perbesar Foto</span>
            </div>

            <div className="flex justify-center items-center overflow-hidden rounded-2xl bg-white">
              <img
                src="/struktur-organisasi.jpeg"
                alt="Struktur Organisasi PT Food Quality Certification"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-101"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Bottom Adjacent Centered Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <a
            href="/#form-inquiry"
            className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full shadow-md"
          >
            {t.nav.applyCertification}
          </a>
          <a
            href="/profile/tim"
            className="border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full"
          >
            {t.nav.team} &rarr;
          </a>
        </div>

      </main>

      {/* Fullscreen Lightbox Modal for Organization Chart */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div className="relative max-w-6xl w-full bg-white p-4 rounded-3xl shadow-2xl overflow-hidden my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900 hover:bg-brand-blue text-white flex items-center justify-center rounded-full font-bold text-lg cursor-pointer transition-all border-none"
              aria-label="Tutup foto"
            >
              ✕
            </button>
            <div className="flex justify-center items-center">
              <img
                src="/struktur-organisasi.jpg"
                alt="Struktur Organisasi PT Food Quality Certification"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
