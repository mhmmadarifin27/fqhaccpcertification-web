"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createInquiry, getGallery, getProjects, GalleryItem, ProjectItem } from "../lib/db";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import { autoTranslateText } from "../lib/autoTranslator";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { CheckCircle2, ShieldCheck, Info } from "lucide-react";

// Image URLs for hero slides (Local optimized web assets)
const HERO_IMAGES = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hccp1.jpg",
  "/hccp2.jpg",
  "/hccp3.jpg",
  "/hccp4.jpg",
];

export default function Home() {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPlaying, setCarouselPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Scope slider states
  const [scopeSlide, setScopeSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Form states
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    picName: "",
    phone: "",
    email: "",
    industry: "Jasa Boga / Katering / Restoran / SPPG",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  // Dynamic gallery & projects state from database/admin
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [displayGallery, setDisplayGallery] = useState<GalleryItem[]>([]);
  const [displayProjects, setDisplayProjects] = useState<ProjectItem[]>([]);
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Dynamic carousel scroll refs & helpers
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: "left" | "right") => {
    if (projectsScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      projectsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const loadDynamicData = async () => {
      const galleryData = await getGallery();
      const projectData = await getProjects();
      setGalleryList(galleryData);
      setProjectList(projectData);
      setDisplayGallery(galleryData);
      setDisplayProjects(projectData);
    };
    loadDynamicData();
  }, []);

  // Automatic translation for dynamic gallery and project content
  useEffect(() => {
    let isMounted = true;
    const syncDynamicTranslations = async () => {
      if (lang === "id" || (galleryList.length === 0 && projectList.length === 0)) {
        setDisplayGallery(galleryList);
        setDisplayProjects(projectList);
        return;
      }

      // Translate Gallery dynamically
      const translatedGal = await Promise.all(
        galleryList.map(async (item) => ({
          ...item,
          title: await autoTranslateText(item.title, "en"),
          description: await autoTranslateText(item.description, "en"),
        }))
      );

      // Translate Projects dynamically
      const translatedProj = await Promise.all(
        projectList.map(async (item) => ({
          ...item,
          category: await autoTranslateText(item.category, "en"),
          desc: await autoTranslateText(item.desc, "en"),
        }))
      );

      if (isMounted) {
        setDisplayGallery(translatedGal);
        setDisplayProjects(translatedProj);
      }
    };

    syncDynamicTranslations();
    return () => {
      isMounted = false;
    };
  }, [lang, galleryList, projectList]);

  // Ensure page always starts at the top (0,0) on refresh if no hash target is specified
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // Handle responsive visible cards for scope slider
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto play carousel
  useEffect(() => {
    if (!carouselPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselPlaying]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.companyAddress || !formData.picName || !formData.phone || !formData.email) {
      showToast({
        title: "Data Belum Lengkap",
        message: "Harap lengkapi semua bidang wajib bertanda bintang (*)",
        type: "warning",
      });
      return;
    }
    setFormLoading(true);

    try {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const ticket = `HACCP-2026-${randomId}`;
      setTicketNumber(ticket);

      // Save to database (localStorage/Supabase fallback)
      await createInquiry({
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        picName: formData.picName,
        phone: formData.phone,
        email: formData.email,
        industry: formData.industry,
        haccpStatus: "Permohonan Baru",
        message: formData.message,
        ticketNumber: ticket
      });

      setFormLoading(false);
      setFormSubmitted(true);

      showToast({
        title: "Permohonan Berhasil Dikirim!",
        message: `Nomor Tiket: ${ticket}. Tim auditor kami akan menghubungi Anda dalam 1x24 jam kerja.`,
        type: "success",
        duration: 6000,
      });
    } catch (err) {
      console.error("Form submission error:", err);
      showToast({
        title: "Gagal Mengirim",
        message: "Gagal mengirim pengajuan. Silakan periksa koneksi internet Anda.",
        type: "error",
      });
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      companyAddress: "",
      picName: "",
      phone: "",
      email: "",
      industry: "Jasa Boga / Katering / Restoran / SPPG",
      message: "",
    });
    setFormSubmitted(false);
  };

  const handleScopePrev = () => {
    if (scopeSlide > 0) {
      setScopeSlide((prev) => prev - 1);
    }
  };

  const handleScopeNext = () => {
    if (scopeSlide < t.scope.items.length - visibleCards) {
      setScopeSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy-dark">
        {/* Background Slide Images */}
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === idx ? "opacity-35 scale-105" : "opacity-0 pointer-events-none scale-100"
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
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 z-10 pt-20">
          <div className="max-w-2xl min-h-[390px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[380px] flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-heading">
                {t.hero.slides[currentSlide]?.title || t.hero.slides[0].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal">
                {t.hero.slides[currentSlide]?.description || t.hero.slides[0].description}
              </p>
            </div>
            <div className="pt-4">
              <a
                href="#form-inquiry"
                className="inline-block bg-white hover:bg-slate-100 text-brand-navy font-bold py-3.5 px-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-95 text-sm sm:text-base tracking-wide rounded-full"
              >
                {t.hero.slides[currentSlide]?.ctaText || t.hero.slides[0].ctaText}
              </a>
            </div>
          </div>
        </div>

        {/* Hero Right Side Controls */}
        <div className="absolute right-6 bottom-40 md:bottom-auto md:top-1/3 md:-translate-y-1/2 flex md:flex-col items-center gap-6 z-20">
          <div className="flex md:flex-col gap-3">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-6 h-1 transition-all duration-300 relative cursor-pointer ${currentSlide === idx ? "bg-white w-10" : "bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Highlight Bar (Desktop) */}
        <div className="hidden md:flex absolute bottom-0 right-0 z-20 bg-white text-slate-900 divide-x divide-slate-200 border-t border-l border-slate-200 max-w-4xl shadow-2xl overflow-hidden animate-slide-in-right">
          <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
            <div className="text-3xl font-extrabold font-heading text-brand-navy">100%</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
              {t.trust.activeClients}<br />{t.trust.activeClientsDesc}
            </div>
          </div>
          <div className="p-6 lg:p-8 space-y-1 min-w-[170px] text-center flex flex-col items-center justify-center">
            <img
              src="/kan-logo.png"
              alt="KAN - Komite Akreditasi Nasional"
              className="h-10 lg:h-12 w-auto object-contain mb-1"
            />
            <div className="text-[10px] font-extrabold uppercase tracking-wider leading-tight text-slate-600">
              {t.trust.kanStatus}<br />{t.trust.kanStatusDesc}
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

      {/* Mobile Stats Highlight Bar */}
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

      {/* Tentang Kami Section */}
      <section id="tentang-kami" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
            {t.profilePages.tentangKami.title}
          </h2>
        </div>

        {/* Centered Image Frame */}
        <div className="max-w-3xl mx-auto flex items-center justify-center p-4 sm:p-6 bg-white border border-slate-200 shadow-sm relative overflow-hidden rounded-2xl">
          <img
            src="/hero1.jpg"
            alt="Food Quality team working together"
            className="w-full h-auto max-h-[440px] object-cover filter drop-shadow-sm transition-transform duration-300 hover:scale-102 rounded-xl"
          />
        </div>

        {/* Body copywriting */}
        <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-left sm:text-justify">
          <p>{t.profilePages.tentangKami.legalDesc}</p>
          <p>{t.profilePages.tentangKami.commitmentDesc}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#form-inquiry"
            className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full shadow-md"
          >
            {t.nav.applyCertification}
          </a>
          <a
            href="/profile/tentang-kami"
            className="border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-widest py-4 px-8 transition-colors duration-200 active:scale-98 rounded-full"
          >
            {t.nav.aboutUs} &rarr;
          </a>
        </div>

      </section>

      {/* Main Services Callout Container */}
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

      {/* Alasan Memilih PT FOOD QUALITY CERTIFICATION */}
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

      {/* Tahapan Sertifikasi (Progress Tracker) */}
      <section id="tahapan" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              {t.timeline.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.timeline.description}
            </p>
          </div>

          {/* Stepper Steps UI */}
          <div className="space-y-10">
            {/* Step progress line */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
              <div
                className="absolute top-1/2 left-4 h-1 bg-brand-blue -translate-y-1/2 hidden md:block z-0 transition-all duration-500"
                style={{ width: `${(activeStep / (t.timeline.steps.length - 1)) * 90}%` }}
              />

              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {t.timeline.steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center text-center p-3 bg-white border border-slate-100 hover:border-brand-blue/40 md:bg-transparent md:border-transparent transition-all duration-300 group cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-all duration-300 ${activeStep === idx
                        ? "bg-brand-blue text-white ring-4 ring-brand-blue/20 scale-110"
                        : activeStep > idx
                          ? "bg-brand-blue/20 text-brand-blue border border-brand-blue/30"
                          : "bg-slate-100 text-slate-400 border border-slate-200 group-hover:bg-slate-200"
                        }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-3 transition-colors ${activeStep === idx ? "text-brand-blue" : "text-slate-500"
                        }`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Step Detail Panel */}
            <div className="bg-white p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-brand-blue" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider px-3 py-1">
                  {t.timeline.steps[activeStep]?.badge || t.timeline.steps[0].badge}
                </div>
                <div className="text-xs font-semibold text-slate-400">
                  Step {activeStep + 1} of {t.timeline.steps.length}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.timeline.steps[activeStep]?.title || t.timeline.steps[0].title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                {t.timeline.steps[activeStep]?.description || t.timeline.steps[0].description}
              </p>

              {/* Prev / Next trigger buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  &larr;
                </button>
                <button
                  disabled={activeStep === t.timeline.steps.length - 1}
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-5 py-2 text-xs font-bold bg-brand-blue text-white hover:bg-brand-blue-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section: Our Latest Projects */}
      <section id="experience" className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              {t.projects.title}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              {t.projects.description}
            </p>
            <span className="sm:hidden text-[11px] font-extrabold text-brand-blue uppercase tracking-wider block pt-1">
              {t.projects.swipeHint}
            </span>
          </div>

          {/* Project Cards: Horizontal Scroll on Mobile (< sm), Grid on Desktop (>= sm) */}
          <div className="relative group">
            {/* Left Arrow Navigation Button */}
            <button
              type="button"
              onClick={() => scrollProjects("left")}
              className="sm:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-slate-800 border border-slate-300 shadow-xl flex items-center justify-center font-black text-sm cursor-pointer transition-all active:scale-90 hover:bg-brand-blue hover:text-white"
              aria-label="Scroll Projects Left"
            >
              ❮
            </button>

            {/* Right Arrow Navigation Button */}
            <button
              type="button"
              onClick={() => scrollProjects("right")}
              className="sm:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 text-slate-800 border border-slate-300 shadow-xl flex items-center justify-center font-black text-sm cursor-pointer transition-all active:scale-90 hover:bg-brand-blue hover:text-white"
              aria-label="Scroll Projects Right"
            >
              ❯
            </button>

            <div
              ref={projectsScrollRef}
              className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x sm:snap-none gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 scrollbar-none"
            >
              {displayProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="w-[82vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-brand-blue/40 transition-all shadow-xs"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-200">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy text-white text-[9px] font-extrabold px-2.5 py-1 tracking-wider uppercase rounded-full">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block leading-none">
                        {proj.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-800 leading-snug group-hover:text-brand-blue transition-colors font-heading">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                        {proj.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-extrabold tracking-wider uppercase text-emerald-600">
                      <span>{t.projects.statusCertified}</span>
                      <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] text-emerald-800">✓</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              {t.faq.title}
            </h2>
            <p className="text-slate-500 text-sm">
              {t.faq.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((faqItem, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 rounded-xl"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-brand-blue transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faqItem.q}</span>
                  <span className="ml-4 shrink-0 bg-slate-50 w-7 h-7 border border-slate-100 flex items-center justify-center rounded-full transition-transform duration-350">
                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${faqOpen === idx ? "rotate-180 text-brand-blue" : "rotate-0"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${faqOpen === idx ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                    }`}
                >
                  <p className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 font-normal">
                    {faqItem.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Non-Monotonous Interactive Gallery Showcase (Connected to Admin Portal) */}
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
                { id: "Penghargaan", label: t.gallery.filterKan }
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
          {(() => {
            const filteredGallery = displayGallery.filter((item) =>
              galleryCategory === "all" ? true : item.category.toLowerCase().includes(galleryCategory.toLowerCase())
            );

            if (filteredGallery.length === 0) {
              return (
                <div className="py-16 text-center text-slate-400 font-medium bg-white/5 border border-white/10 rounded-2xl">
                  {t.gallery.noPhotos}
                </div>
              );
            }

            return (
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
            );
          })()}

        </div>
      </section>

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

      {/* Inquiry Form Section (Call to Action) */}
      <section id="form-inquiry" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Block: CTA Text */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              {t.form.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              {t.form.description}
            </p>

            <div className="space-y-4 pt-4">
              {[
                t.whyUs.card1Title,
                t.whyUs.card2Title,
                t.trust.satisfactionDesc,
                t.whyUs.card4Title,
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                  <span className="w-5 h-5 text-brand-blue flex items-center justify-center text-xs shrink-0 font-bold">
                    ✔
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Interactive Submission Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-blue animate-pulse" />

            {formSubmitted ? (
              // Success Screen after Simulated Submit with Shadcn Alert
              <div className="text-center py-8 space-y-6">
                <Alert variant="success" className="text-left bg-emerald-50/80 border-emerald-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <AlertTitle className="text-emerald-900 font-bold">
                    {t.form.successTitle}
                  </AlertTitle>
                  <AlertDescription className="text-emerald-700 text-xs">
                    {t.form.successDesc}
                  </AlertDescription>
                </Alert>

                {/* Generated Voucher Card */}
                <div className="max-w-md mx-auto bg-slate-50 p-5 border border-slate-100 space-y-3.5 text-left rounded-xl">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                    <span>{t.form.ticketNumberLabel}</span>
                    <span className="text-brand-blue font-bold">PT FQHC</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-800 select-all border border-dashed border-slate-200 bg-white px-3.5 py-2 text-center tracking-wider rounded-lg">
                    {ticketNumber}
                  </div>
                </div>

                <Alert variant="info" className="text-left bg-blue-50/70 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900 font-bold">Konfirmasi Tim Auditor</AlertTitle>
                  <AlertDescription className="text-blue-700 text-xs">
                    Silakan simpan nomor tiket voucher di atas. Tim kami akan menghubungi kontak PIC yang didaftarkan dalam 1x24 jam kerja.
                  </AlertDescription>
                </Alert>

                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-3.5 px-8 transition-all duration-200 cursor-pointer rounded-full shadow-md hover:shadow-lg"
                  >
                    {t.form.newSubmissionButton}
                  </button>
                </div>
              </div>
            ) : (
              // Inquiry Form
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <Alert variant="default" className="bg-slate-50/80 border-slate-200">
                  <ShieldCheck className="h-4 w-4 text-brand-blue" />
                  <AlertTitle className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                    {lang === "en" ? "Official Application Portal" : "Portal Pendaftaran Resmi"}
                  </AlertTitle>
                  <AlertDescription className="text-slate-500 text-[11px]">
                    {lang === "en" 
                      ? "Direct application to KAN-accredited certification body LSHACCP-009-IDN."
                      : "Pendaftaran langsung ke Lembaga Sertifikasi terakreditasi KAN No. LSHACCP-009-IDN."}
                  </AlertDescription>
                </Alert>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">{t.form.title}</h3>
                  <p className="text-slate-400 text-xs font-normal">{t.form.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="companyName" className="text-xs font-bold text-slate-700">{t.form.companyName}</label>
                    <input
                      required
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder={t.form.companyNamePlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="picName" className="text-xs font-bold text-slate-700">{t.form.picName}</label>
                    <input
                      required
                      type="text"
                      id="picName"
                      name="picName"
                      value={formData.picName}
                      onChange={handleInputChange}
                      placeholder={t.form.picNamePlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="companyAddress" className="text-xs font-bold text-slate-700">{t.form.companyAddress}</label>
                  <input
                    required
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    placeholder={t.form.companyAddressPlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700">{t.form.picPhone}</label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.form.picPhonePlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700">{t.form.picEmail}</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.form.picEmailPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="industry" className="text-xs font-bold text-slate-700">{t.form.industrySector}</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer rounded-lg"
                  >
                    <option>{t.form.industryOptions.catering}</option>
                    <option>{t.form.industryOptions.processing}</option>
                    <option>{t.form.industryOptions.beverage}</option>
                    <option>{t.form.industryOptions.slaughterhouse}</option>
                    <option>{t.form.industryOptions.storage}</option>
                    <option>{t.form.industryOptions.other}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700">{t.form.messageLabel}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 p-4 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold uppercase tracking-wider text-xs py-4 px-6 transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 cursor-pointer disabled:opacity-50 rounded-full"
                >
                  {formLoading ? t.form.submitting : t.form.submitButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section: Google Maps & Operational Office Location */}
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
                      <a href="https://wa.me/6282247936392" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-bold">
                        +62 822-4793-6392
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                    <span className="text-base shrink-0">✉️</span>
                    <div>
                      <strong className="font-bold text-slate-900 block mb-0.5">{t.location.emailTitle}</strong>
                      <a href="mailto:fqhaccpconsulting@gmail.com" className="text-brand-blue hover:underline font-bold">
                        fqhaccpconsulting@gmail.com
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

      <Footer />
    </div>
  );
}
