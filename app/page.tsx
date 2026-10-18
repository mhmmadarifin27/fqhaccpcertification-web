"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/sections/HeroSection";
import StatsBar from "../components/sections/StatsBar";
import AboutSection from "../components/sections/AboutSection";
import ServicesCallout from "../components/sections/ServicesCallout";
import WhyUsSection from "../components/sections/WhyUsSection";
import TimelineSection from "../components/sections/TimelineSection";

const GallerySection = dynamic(() => import("../components/sections/GallerySection"));
const FaqSection = dynamic(() => import("../components/sections/FaqSection"));
const InquiryForm = dynamic(() => import("../components/sections/InquiryForm"));
const OfficeLocation = dynamic(() => import("../components/sections/OfficeLocation"));

export default function Home() {
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

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
      <Header />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesCallout />
      <WhyUsSection />
      <TimelineSection />
      <GallerySection />
      <FaqSection />
      <InquiryForm />
      <OfficeLocation />
      <Footer />
    </div>
  );
}
