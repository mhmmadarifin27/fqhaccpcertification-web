"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";
import { useToast } from "../../../context/ToastContext";
import {
  ComplaintAppealItem,
  ComplaintAppealType,
  createComplaintAppeal,
} from "../../../lib/db";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export default function KeluhanBandingPage() {
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<ComplaintAppealType>("keluhan");
  const [reporterName, setReporterName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relatedTicketOrCert, setRelatedTicketOrCert] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [attachmentData, setAttachmentData] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<ComplaintAppealItem | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAttachmentName(undefined);
      setAttachmentData(undefined);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast({
        title: lang === "en" ? "File Too Large" : "Ukuran Berkas Terlalu Besar",
        message:
          lang === "en"
            ? "Maximum supporting attachment size is 10 MB."
            : "Ukuran maksimal lampiran pendukung adalah 10 MB.",
        type: "warning",
      });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachmentName(file.name);
      setAttachmentData(typeof reader.result === "string" ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setType("keluhan");
    setReporterName("");
    setCompanyName("");
    setEmail("");
    setPhone("");
    setRelatedTicketOrCert("");
    setSubject("");
    setDescription("");
    setAttachmentName(undefined);
    setAttachmentData(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSubmittedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName.trim() || !companyName.trim() || !email.trim() || !phone.trim() || !subject.trim() || !description.trim()) {
      showToast({
        title: lang === "en" ? "Incomplete Fields" : "Data Belum Lengkap",
        message:
          lang === "en"
            ? "Please fill in all required fields before submitting."
            : "Harap lengkapi seluruh kolom bertanda wajib diisi.",
        type: "warning",
      });
      return;
    }

    setSubmitting(true);
    try {
      const created = await createComplaintAppeal({
        type,
        reporterName: reporterName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        relatedTicketOrCert: relatedTicketOrCert.trim() || undefined,
        subject: subject.trim(),
        description: description.trim(),
        attachmentName,
        attachmentData,
      });

      setSubmittedItem(created);
      showToast({
        title: lang === "en" ? "Submission Received" : "Pengajuan Diterima",
        message:
          lang === "en"
            ? `Your ${type === "banding" ? "appeal" : "complaint"} ticket ${created.ticketNumber} has been logged.`
            : `Laporan ${type === "banding" ? "banding" : "keluhan"} berhasil tercatat dengan nomor tiket ${created.ticketNumber}.`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to submit complaint/appeal:", err);
      showToast({
        title: lang === "en" ? "Submission Failed" : "Gagal Mengirim Laporan",
        message:
          lang === "en"
            ? "An unexpected error occurred. Please try again."
            : "Terjadi kendala saat menyimpan laporan Anda. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      <main className="pt-28 md:pt-36 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brand-navy text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
            <span>⚖️</span>
            <span>
              {lang === "en"
                ? "Impartiality & Quality Assurance Channel"
                : "Kanal Resmi Transparansi & Imparsialitas LSHACCP"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
            {lang === "en" ? "Complaints & Appeals" : "Keluhan dan Banding"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === "en"
              ? "PT Food Quality Certification guarantees a transparent, objective, and non-discriminatory mechanism for handling all client complaints and certification appeals based on the official SNI CXC 1:1969 standard."
              : "PT Food Quality Certification menyediakan saluran resmi yang objektif, rahasia, dan bebas diskriminasi untuk menangani keluhan layanan maupun pengajuan banding atas keputusan sertifikasi HACCP sesuai standar resmi SNI CXC 1:1969."}
          </p>
        </section>

        {/* Scope Explanation Cards: Keluhan vs Banding */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center text-xl">
                💬
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-brand-navy font-heading">
                  {lang === "en" ? "Complaint (Keluhan)" : "Pengajuan Keluhan"}
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  {lang === "en" ? "Service & Operational Conduct" : "Layanan & Pelaksanaan Audit"}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === "en"
                ? "Formal expression of dissatisfaction regarding administrative service, audit scheduling, auditor professionalism, communication, or portal usage."
                : "Pernyataan ketidakpuasan resmi terkait kinerja pelayanan administrasi, ketepatan jadwal audit, sikap profesionalisme personel/auditor, maupun kendala proses sertifikasi."}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xl">
                📜
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-brand-navy font-heading">
                  {lang === "en" ? "Appeal (Banding)" : "Pengajuan Banding"}
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                  {lang === "en" ? "Certification Decision Review" : "Peninjauan Keputusan Sertifikasi"}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === "en"
                ? "Formal request by an applicant or certified client for reconsideration of an adverse certification decision (denial, suspension, withdrawal, or audit finding classification)."
                : "Permohonan resmi dari organisasi pemohon atau klien tersertifikasi untuk meninjau ulang keputusan penetapan hasil audit, penolakan, pembekuan, atau pencabutan sertifikat HACCP."}
            </p>
          </div>
        </section>

        {/* Submission Form or Confirmation View */}
        <section
          id="form-keluhan-banding"
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm"
        >
          {submittedItem ? (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
                ✅
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-brand-navy border border-blue-200 text-xs font-black tracking-wider">
                  {submittedItem.ticketNumber}
                </span>
                <h2 className="text-2xl font-extrabold text-brand-navy font-heading">
                  {lang === "en"
                    ? "Your Submission Has Been Logged"
                    : "Laporan Anda Telah Resmi Tercatat"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === "en"
                    ? "Keep your ticket number for reference. Our Quality Assurance / Impartiality Team will contact you via email or WhatsApp."
                    : "Simpan nomor tiket di atas sebagai referensi resmi. Tim Penjaminan Mutu / Komite Imparsialitas akan menghubungi Anda melalui email atau WhatsApp."}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5">
                <p>
                  <span className="font-bold text-slate-500">Kategori:</span>{" "}
                  <span className="font-extrabold text-brand-navy uppercase">
                    {submittedItem.type === "banding" ? "Banding" : "Keluhan"}
                  </span>
                </p>
                <p>
                  <span className="font-bold text-slate-500">Perusahaan:</span>{" "}
                  <span className="font-bold text-slate-800">{submittedItem.companyName}</span>
                </p>
                <p>
                  <span className="font-bold text-slate-500">Subjek:</span>{" "}
                  <span className="font-semibold text-slate-800">{submittedItem.subject}</span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-colors border-none"
                >
                  {lang === "en" ? "Submit Another Report" : "Buat Laporan Baru"}
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors no-underline"
                >
                  {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading">
                  {lang === "en"
                    ? "Online Complaint & Appeal Form"
                    : "Formulir Pengajuan Keluhan / Banding Online"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === "en"
                    ? "Please describe the issue objectively and attach supporting documentation if available."
                    : "Sampaikan pengajuan Anda secara objektif beserta nomor referensi atau dokumen pendukung jika tersedia."}
                </p>
              </div>

              {/* Type Selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {lang === "en" ? "Submission Category *" : "Jenis Pengajuan *"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("keluhan")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      type === "keluhan"
                        ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-brand-navy">
                        {lang === "en" ? "Complaint (Keluhan)" : "Keluhan Layanan / Audit"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {lang === "en"
                          ? "Service, schedule, or conduct feedback"
                          : "Ketidaksesuaian layanan, jadwal, atau sikap personel"}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("banding")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      type === "banding"
                        ? "bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-400/20"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-brand-navy">
                        {lang === "en" ? "Appeal (Banding)" : "Banding Keputusan Sertifikasi"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {lang === "en"
                          ? "Review of certification/audit outcome"
                          : "Keberatan atas penetapan keputusan atau temuan audit"}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Reporter & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "Reporter Full Name *" : "Nama Lengkap Pelapor / PIC *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder={lang === "en" ? "e.g., Budi Santoso" : "Contoh: Budi Santoso"}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "Company / Organization *" : "Nama Perusahaan / Instansi *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={
                      lang === "en" ? "e.g., PT Rempah Nusantara" : "Contoh: PT Rempah Nusantara Sejahtera"
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "Active Email *" : "Alamat Email Resmi *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="quality@perusahaan.co.id"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "WhatsApp / Phone Number *" : "Nomor WhatsApp / Telepon Aktif *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-3456-7890"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>
              </div>

              {/* Reference & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "Ticket / Cert No. (Optional)" : "No. Tiket / Sertifikat (Opsional)"}
                  </label>
                  <input
                    type="text"
                    value={relatedTicketOrCert}
                    onChange={(e) => setRelatedTicketOrCert(e.target.value)}
                    placeholder="DOC-2026-1042"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    {lang === "en" ? "Subject / Summary *" : "Pokok Permasalahan / Subjek *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={
                      lang === "en"
                        ? "Brief summary of your complaint or appeal"
                        : "Ringkasan singkat materi keluhan atau banding Anda"
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {lang === "en" ? "Detailed Chronology & Basis *" : "Uraian Kronologi & Dasar Pengajuan *"}
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Explain the chronology, dates, and objective basis for this submission..."
                      : "Jelaskan kronologi kejadian, tanggal terkait, serta dasar alasan keluhan atau banding Anda secara jelas..."
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue resize-y"
                />
              </div>

              {/* Optional Attachment */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {lang === "en"
                    ? "Supporting Evidence (Optional, Max 10 MB)"
                    : "Lampiran Bukti Pendukung (Opsional, Maks. 10 MB)"}
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark cursor-pointer"
                  />
                  {attachmentName && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      📎 {attachmentName}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  {lang === "en"
                    ? "Every submission is logged and reviewed independently without prejudice."
                    : "Seluruh pengajuan dicatat secara resmi dan tidak memengaruhi objektivitas penilaian sertifikasi Anda."}
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl cursor-pointer transition-all border-none shadow-sm disabled:opacity-50 shrink-0"
                >
                  {submitting
                    ? lang === "en"
                      ? "Submitting..."
                      : "Mengirim Laporan..."
                    : lang === "en"
                    ? "Submit Report →"
                    : "Kirim Pengajuan →"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
