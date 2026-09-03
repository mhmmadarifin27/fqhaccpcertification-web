"use client";

import React, { useState, useEffect, useRef } from "react";
import { getGallery, GalleryItem } from "../../lib/db";
import { useLanguage } from "../../context/LanguageContext";
import { autoTranslateText } from "../../lib/autoTranslator";

export default function GallerySection() {
  const { lang, t } = useLanguage();
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [displayGallery, setDisplayGallery] = useState<GalleryItem[]>([]);
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const loadGallery = async () => {
      const data = await getGallery();
      setGalleryList(data);
      setDisplayGallery(data);
    };
    loadGallery();
  }, []);

  // Automatic translation for gallery content when language changes
  useEffect(() => {
    let isMounted = true;
    const syncDynamicTranslations = async () => {
      if (lang === "id" || galleryList.length === 0) {
        setDisplayGallery(galleryList);
        return;
      }

      const translatedGal = await Promise.all(
        galleryList.map(async (item) => ({
          ...item,
          title: await autoTranslateText(item.title, "en"),
          description: await autoTranslateText(item.description, "en"),
        }))
      );

      if (isMounted) {
        setDisplayGallery(translatedGal);
      }
    };

    syncDynamicTranslations();
    return () => {
      isMounted = false;
    };
  }, [lang, galleryList]);

  const filteredGallery = displayGallery.filter((item) =>
    galleryCategory === "all" ? true : item.category.toLowerCase().includes(galleryCategory.toLowerCase())
  );

  return (
    <section id="galeri" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle mesh background grid */}
      <div className="absolute inset-0 bg-mesh-footer opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
              {t.gallery.title}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
              {t.gallery.description}
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: t.gallery.filterAll },
              { id: "Audit", label: t.gallery.filterAudit },
              { id: "Event", label: t.gallery.filterCertificate },
              { id: "Pelatihan", label: t.gallery.filterTraining },
              { id: "Penghargaan", label: t.gallery.filterKan },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryCategory(tab.id)}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none rounded-full ${
                  galleryCategory === tab.id
                    ? "bg-brand-cyan text-brand-navy-dark shadow-lg shadow-brand-cyan/20"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC ASYMMETRIC MASONRY SHOWCASE GRID */}
        {filteredGallery.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-medium bg-white/5 border border-white/10 rounded-2xl">
            {t.gallery.noPhotos}
          </div>
        ) : (
          <>
            {/* MOBILE CAROUSEL HORIZONTAL SCROLL (VISIBLE ON MOBILE ONLY: < md) */}
            <div className="relative md:hidden group">
              {/* Left Arrow Navigation Button */}
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/90 text-brand-cyan border border-white/20 shadow-xl flex items-center justify-center font-black text-sm cursor-pointer transition-all active:scale-90 hover:bg-brand-cyan hover:text-brand-navy"
                aria-label="Scroll Gallery Left"
              >
                ❮
              </button>

              {/* Right Arrow Navigation Button */}
              <button
                type="button"
                onClick={() => scrollGallery("right")}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/90 text-brand-cyan border border-white/20 shadow-xl flex items-center justify-center font-black text-sm cursor-pointer transition-all active:scale-90 hover:bg-brand-cyan hover:text-brand-navy"
                aria-label="Scroll Gallery Right"
              >
                ❯
              </button>

              <div
                ref={galleryScrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4"
              >
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGalleryItem(item)}
                    className="w-[82vw] max-w-[320px] shrink-0 snap-start relative min-h-[360px] bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer flex flex-col justify-between"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="bg-brand-cyan text-brand-navy-dark text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          {item.category}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-xs font-bold">
                          🔍
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-brand-cyan font-bold tracking-wider block">
                          📅 {item.date}
                        </span>
                        <h3 className="text-base font-extrabold text-white font-heading leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP ASYMMETRIC MASONRY SHOWCASE GRID (VISIBLE ON DESKTOP ONLY: >= md) */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 items-stretch">
              {/* Feature Spotlight Card (Large 7 Cols) */}
              {filteredGallery[0] && (
                <div
                  onClick={() => setSelectedGalleryItem(filteredGallery[0])}
                  className="md:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-slate-800 border border-white/10 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                >
                  <img
                    src={filteredGallery[0].imageUrl}
                    alt={filteredGallery[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="bg-brand-cyan text-brand-navy-dark text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {filteredGallery[0].category}
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-sm font-bold group-hover:bg-brand-cyan group-hover:text-brand-navy transition-all">
                        🔍
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-brand-cyan font-bold tracking-wider block">
                        📅 {filteredGallery[0].date}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-tight">
                        {filteredGallery[0].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
                        {filteredGallery[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Side Stacked Cards (5 Cols) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                {filteredGallery.slice(1, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGalleryItem(item)}
                    className="relative flex-1 min-h-[180px] bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-5 flex flex-col justify-between">
                      <span className="self-start bg-brand-cyan text-brand-navy-dark text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">📅 {item.date}</span>
                        <h4 className="text-sm font-bold text-white leading-snug group-hover:text-brand-cyan transition-colors line-clamp-2 font-heading">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lower Grid Row (Remaining items) */}
              {filteredGallery.slice(3, 7).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="md:col-span-4 relative aspect-video bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-between">
                    <span className="self-start bg-black/60 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug group-hover:text-brand-cyan transition-colors line-clamp-1 font-heading">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR GALLERY PREVIEW */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative bg-slate-900 border border-white/20 shadow-2xl max-w-4xl w-full overflow-hidden text-white my-8 rounded-3xl">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white text-slate-900 hover:text-black flex items-center justify-center font-bold text-lg transition-all cursor-pointer border-none rounded-full"
              aria-label={t.gallery.closePhoto}
            >
              ✕
            </button>

            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedGalleryItem.imageUrl}
                alt={selectedGalleryItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-slate-900 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="bg-brand-cyan text-brand-navy-dark text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  {selectedGalleryItem.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">📅 {selectedGalleryItem.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-snug">
                {selectedGalleryItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {selectedGalleryItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
