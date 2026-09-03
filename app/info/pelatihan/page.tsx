"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";
import { useToast } from "../../../context/ToastContext";
import { createTrainingRegistration } from "../../../lib/db";

export default function PelatihanPage() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();

  const [selectedProgram, setSelectedProgram] = useState<string>("haccp-awareness");
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    participantCount: 1,
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const programs = t.trainingPage.programs;

  const handleSelectProgramAndScroll = (progId: string) => {
    setSelectedProgram(progId);
    const formElem = document.getElementById("form-pendaftaran");
    if (formElem) {
      formElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone) {
      showToast({
        title: lang === "en" ? "Incomplete Form" : "Data Belum Lengkap",
        message: lang === "en" ? "Please fill in all mandatory fields (*)." : "Mohon lengkapi seluruh kolom wajib bertanda (*).",
        type: "warning"
      });
      return;
    }

    setSubmitting(true);
    try {
      const currentProg = programs.find((p) => p.id === selectedProgram) || programs[0];
      const result = await createTrainingRegistration({
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        programId: selectedProgram,
        programTitle: currentProg.title,
        participantCount: Number(formData.participantCount) || 1,
        notes: formData.notes
      });

      setSubmittedTicket(result.ticketNumber);
      showToast({
        title: lang === "en" ? "Registration Received" : "Pendaftaran Berhasil Terkirim",
        message: lang === "en" 
          ? `Training registration saved with ticket ${result.ticketNumber}.` 
          : `Pendaftaran pelatihan tercatat dengan tiket ${result.ticketNumber}. Tim kami akan segera menghubungi Anda.`,
        type: "success"
      });
    } catch (err) {
      console.error("Training registration error:", err);
      showToast({
        title: "Gagal Mengirim",
        message: "Terjadi kendala teknis saat memproses pendaftaran.",
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      <main className="pt-24 md:pt-36 pb-24">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
          <div className="space-y-4">
            <span className="inline-block bg-brand-navy/10 text-brand-navy border border-brand-navy/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest rounded-full">
              {t.trainingPage.tagline}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
              {t.trainingPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              {t.trainingPage.subtitle}
            </p>
          </div>

          {/* Quick Highlight Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-2xl mb-1 block">📜</span>
              <p className="font-extrabold text-slate-900 text-sm">{lang === "en" ? "Official Certificate" : "Sertifikat Resmi"}</p>
              <p className="text-xs text-slate-500 font-normal">{lang === "en" ? "Barcoded & Verifiable" : "Berbarcode & Terverifikasi"}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-2xl mb-1 block">👨‍🏫</span>
              <p className="font-extrabold text-slate-900 text-sm">{lang === "en" ? "Certified Lead Auditors" : "Instruktur Lead Auditor"}</p>
              <p className="text-xs text-slate-500 font-normal">{lang === "en" ? "Experienced Practitioners" : "Praktisi Industri Pangan"}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-2xl mb-1 block">💻</span>
              <p className="font-extrabold text-slate-900 text-sm">{lang === "en" ? "Hybrid Methods" : "Metode Fleksibel"}</p>
              <p className="text-xs text-slate-500 font-normal">{lang === "en" ? "Online & In-House Training" : "Webinar & In-House Offline"}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-2xl mb-1 block">📁</span>
              <p className="font-extrabold text-slate-900 text-sm">{lang === "en" ? "Document Templates" : "Modul & Template"}</p>
              <p className="text-xs text-slate-500 font-normal">{lang === "en" ? "Ready-to-use HACCP Forms" : "Formulir Standar Siap Pakai"}</p>
            </div>
          </div>
        </section>

        {/* Training Programs Catalog */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 mt-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {t.trainingPage.catalogTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t.trainingPage.catalogSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-blue-50 text-brand-navy border border-blue-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {prog.code}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      ⏱ {prog.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wide block mb-1">
                      {prog.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading leading-snug">
                      {prog.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  {/* Syllabus / Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      {lang === "en" ? "Key Learning Topics:" : "Materi & Silabus Utama:"}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {prog.syllabus.map((topic, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="text-brand-blue font-bold">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                      {lang === "en" ? "Participant Benefits:" : "Fasilitas Peserta:"}
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {prog.benefits.map((b, bIdx) => (
                        <span key={bIdx} className="bg-white border border-slate-200/80 text-[11px] text-slate-600 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                          🎁 {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    🌐 {prog.method}
                  </span>
                  <button
                    onClick={() => handleSelectProgramAndScroll(prog.id)}
                    className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer border-none shadow-sm active:scale-95"
                  >
                    {lang === "en" ? "Enroll in Program →" : "Daftar Program Ini →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="form-pendaftaran" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-20 scroll-mt-28">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6 text-center space-y-2">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {lang === "en" ? "ONLINE REGISTRATION" : "PENDAFTARAN ONLINE"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {t.trainingPage.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
                {t.trainingPage.formSubtitle}
              </p>
            </div>

            {submittedTicket ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950 font-heading">
                  {lang === "en" ? "Registration Submitted!" : "Pendaftaran Berhasil Dikirim!"}
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  {lang === "en" 
                    ? "Thank you for registering. Our training division will contact your PIC within 1x24 business hours to finalize schedule & confirmation." 
                    : "Terima kasih atas pendaftaran Anda. Divisi pelatihan kami akan segera menghubungi kontak PIC Anda dalam 1x24 jam kerja untuk konfirmasi jadwal dan administrasi."}
                </p>
                <div className="bg-white border border-emerald-200 inline-block px-6 py-3 rounded-2xl shadow-xs">
                  <span className="text-xs text-slate-400 font-bold block uppercase">{lang === "en" ? "REGISTRATION TICKET" : "NOMOR TIKET PENDAFTARAN"}</span>
                  <span className="text-lg font-black text-brand-navy tracking-wider">{submittedTicket}</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        fullName: "",
                        companyName: "",
                        email: "",
                        phone: "",
                        participantCount: 1,
                        notes: ""
                      });
                    }}
                    className="px-6 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-brand-navy-dark transition-all border-none"
                  >
                    {lang === "en" ? "Register Another Participant" : "Daftarkan Peserta Lain"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Select Training Program *" : "Pilih Program Pelatihan *"}
                  </label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-brand-blue"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.title} ({p.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Full Name of Participant / PIC *" : "Nama Lengkap Peserta / PIC *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={lang === "en" ? "e.g. John Doe, S.T." : "Contoh: Budi Santoso, S.TP."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Company / Institution Name *" : "Nama Perusahaan / Instansi *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={lang === "en" ? "e.g. PT Food Delight Indonesia" : "Contoh: PT Sumber Pangan Sejahtera"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "WhatsApp / Phone Number *" : "Nomor WhatsApp / HP *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={lang === "en" ? "e.g. +62 812-3456-7890" : "Contoh: 0812-3456-7890"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Official Email Address *" : "Alamat Email Resmi *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={lang === "en" ? "e.g. quality@company.com" : "Contoh: budi@sumberpangan.co.id"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Estimated Number of Participants *" : "Perkiraan Jumlah Peserta *"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={formData.participantCount}
                    onChange={(e) => setFormData({ ...formData, participantCount: parseInt(e.target.value, 10) || 1 })}
                    className="w-full sm:w-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Additional Notes / Request (Optional)" : "Catatan Khusus / Preferensi Jadwal (Opsional)"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={lang === "en" ? "e.g. Prefer in-house training for 10 QA staff in October..." : "Contoh: Mohon info jadwal online webinar bulan depan untuk 3 staf QC..."}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{lang === "en" ? "Submitting Registration..." : "Mengirim Pendaftaran..."}</span>
                    </>
                  ) : (
                    <span>{lang === "en" ? "Submit Training Registration →" : "Kirim Formulir Pendaftaran Pelatihan →"}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
