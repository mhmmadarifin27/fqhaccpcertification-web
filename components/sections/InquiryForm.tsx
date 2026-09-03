"use client";

import React, { useState } from "react";
import { createInquiry } from "../../lib/db";
import { useLanguage } from "../../context/LanguageContext";
import { useToast } from "../../context/ToastContext";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { ShieldCheck } from "lucide-react";

export default function InquiryForm() {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    picName: "",
    phone: "",
    email: "",
    industry: "Produk Bakeri",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
        ticketNumber: ticket,
      });

      setFormLoading(false);
      setFormSubmitted(true);

      showToast({
        title: "Terima Kasih!",
        message: "Permohonan Anda telah kami terima. Tim kami akan segera menghubungi Anda dalam 1x24 jam kerja.",
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
      industry: "Produk Bakeri",
      message: "",
    });
    setFormSubmitted(false);
  };

  return (
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
            // Simple Clean Thank You Screen
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
                ✓
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {lang === "en" ? "Thank You!" : "Terima Kasih!"}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  {lang === "en"
                    ? "Your application has been received. Our team will contact you within 24 business hours."
                    : "Permohonan Anda telah kami terima. Tim kami akan segera menghubungi Anda dalam 1x24 jam kerja."}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-3.5 px-8 transition-all duration-200 cursor-pointer rounded-full shadow-md hover:shadow-lg active:scale-98"
                >
                  {lang === "en" ? "Submit Another Application" : "Kirim Permohonan Baru"}
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
                  <label htmlFor="companyName" className="text-xs font-bold text-slate-700">
                    {t.form.companyName}
                  </label>
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
                  <label htmlFor="picName" className="text-xs font-bold text-slate-700">
                    {t.form.picName}
                  </label>
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
                <label htmlFor="companyAddress" className="text-xs font-bold text-slate-700">
                  {t.form.companyAddress}
                </label>
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
                  <label htmlFor="phone" className="text-xs font-bold text-slate-700">
                    {t.form.picPhone}
                  </label>
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
                  <label htmlFor="email" className="text-xs font-bold text-slate-700">
                    {t.form.picEmail}
                  </label>
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
                <label htmlFor="industry" className="text-xs font-bold text-slate-700">
                  {t.form.industrySector}
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer rounded-lg"
                >
                  <option>{t.form.industryOptions.bakery}</option>
                  <option>{t.form.industryOptions.meat}</option>
                  <option>{t.form.industryOptions.specialDietary}</option>
                  <option>{t.form.industryOptions.foodService}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-700">
                  {t.form.messageLabel}
                </label>
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
  );
}
