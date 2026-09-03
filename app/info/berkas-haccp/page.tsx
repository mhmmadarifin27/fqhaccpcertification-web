"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";
import { useToast } from "../../../context/ToastContext";
import { createHaccpDocSubmission, getInquiries, SertifikasiInquiry } from "../../../lib/db";

function BerkasHaccpContent() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [matchedInquiry, setMatchedInquiry] = useState<SertifikasiInquiry | null>(null);
  const [lookupSearched, setLookupSearched] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    companyName: "",
    picName: "",
    picPhone: "",
    picEmail: "",
    productScope: "",
    notes: ""
  });

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    data: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Auto lookup if query parameter is present in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get("email") || params.get("phone") || params.get("ticket") || params.get("key");
      if (queryParam) {
        setLookupQuery(queryParam);
        executeLookup(queryParam);
      }
    }
  }, []);

  const executeLookup = async (queryToSearch: string) => {
    const q = queryToSearch.trim().toLowerCase();
    if (!q) {
      showToast({
        title: lang === "en" ? "Empty Search" : "Kata Kunci Kosong",
        message: lang === "en" 
          ? "Please enter your Company Email, WhatsApp Number, or Company Name." 
          : "Masukkan Email Resmi Perusahaan, Nomor WhatsApp PIC, atau Nama Perusahaan.",
        type: "warning"
      });
      return;
    }

    setLookupLoading(true);
    setLookupSearched(true);

    try {
      const inquiries = await getInquiries();
      const found = inquiries.find((inq) => {
        const eMatch = inq.email && inq.email.toLowerCase().includes(q);
        const pMatch = inq.phone && inq.phone.replace(/\D/g, "").includes(q.replace(/\D/g, ""));
        const cMatch = inq.companyName && inq.companyName.toLowerCase().includes(q);
        const tMatch = inq.ticketNumber && inq.ticketNumber.toLowerCase().includes(q);
        return eMatch || tMatch || (q.length >= 4 && pMatch) || (q.length >= 3 && cMatch);
      });

      if (found) {
        setMatchedInquiry(found);
        setFormData({
          companyName: found.companyName || "",
          picName: found.picName || "",
          picPhone: found.phone || "",
          picEmail: found.email || "",
          productScope: found.industry || "",
          notes: ""
        });

        showToast({
          title: lang === "en" ? "Application Data Found!" : "Data Permohonan Ditemukan!",
          message: lang === "en"
            ? `Loaded details for ${found.companyName}.`
            : `Data perusahaan ${found.companyName} berhasil dimuat otomatis.`,
          type: "success"
        });
      } else {
        setMatchedInquiry(null);
        showToast({
          title: lang === "en" ? "Data Not Found" : "Data Tidak Ditemukan",
          message: lang === "en"
            ? "No matching application found. Please check your registered email/phone."
            : "Data permohonan tidak ditemukan. Pastikan email atau kontak sesuai yang didaftarkan.",
          type: "warning"
        });
      }
    } catch (err) {
      console.error("Lookup error:", err);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLookup(lookupQuery);
  };

  const handleResetLookup = () => {
    setMatchedInquiry(null);
    setLookupSearched(false);
    setLookupQuery("");
    setFormData({
      companyName: "",
      picName: "",
      picPhone: "",
      picEmail: "",
      productScope: "",
      notes: ""
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        showToast({
          title: lang === "en" ? "File Too Large" : "Ukuran File Terlalu Besar",
          message: lang === "en" ? "Maximum file size is 25MB." : "Batas maksimal ukuran file adalah 25MB.",
          type: "warning"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + " MB";
        setSelectedFile({
          name: file.name,
          size: sizeMb,
          data: reader.result as string
        });
        showToast({
          title: lang === "en" ? "File Attached" : "File Terlampir",
          message: `${file.name} (${sizeMb}) ${lang === "en" ? "ready to submit." : "siap diunggah."}`,
          type: "info"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName || !formData.picName || !formData.picPhone || !formData.picEmail) {
      showToast({
        title: lang === "en" ? "Data Required" : "Data Pemohon Diperlukan",
        message: lang === "en" 
          ? "Please search and load your application data above first." 
          : "Mohon muat data permohonan sertifikasi Anda terlebih dahulu melalui pencarian di atas.",
        type: "warning"
      });
      return;
    }

    if (!selectedFile) {
      showToast({
        title: lang === "en" ? "No File Attached" : "File Belum Dilampirkan",
        message: lang === "en" 
          ? "Please attach your SNI CXC 1:1969 (2024) document file (.pdf, .docx, or .zip)." 
          : "Mohon pilih file berkas dokumen SNI CXC 1:1969 (2024) (.pdf, .docx, atau .zip) yang akan diunggah.",
        type: "warning"
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await createHaccpDocSubmission({
        companyName: formData.companyName,
        picName: formData.picName,
        picPhone: formData.picPhone,
        picEmail: formData.picEmail,
        productScope: formData.productScope || "SNI CXC 1:1969 (2024)",
        documentCategory: "sni-cxc-1-2024",
        documentCategoryLabel: "Dokumen SNI CXC 1:1969 (2024)",
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileData: selectedFile.data,
        notes: matchedInquiry?.ticketNumber 
          ? `[Ref Tiket: ${matchedInquiry.ticketNumber}] ${formData.notes}` 
          : formData.notes
      });

      setSubmittedTicket(result.ticketNumber);
      showToast({
        title: lang === "en" ? "Documents Uploaded" : "Berkas Berhasil Diunggah",
        message: lang === "en" 
          ? `SNI CXC 1:1969 document submitted with ticket ${result.ticketNumber}.` 
          : `Dokumen SNI CXC 1:1969 tercatat resmi dengan tiket ${result.ticketNumber}. Tim verifikator akan segera memeriksa dokumen Anda.`,
        type: "success"
      });
    } catch (err) {
      console.error("SNI CXC 1:1969 document upload error:", err);
      showToast({
        title: "Gagal Mengunggah Berkas",
        message: "Terjadi kendala teknis saat memproses berkas.",
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
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-10">
          <div className="space-y-4">
            <span className="inline-block bg-brand-navy/10 text-brand-navy border border-brand-navy/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest rounded-full">
              {t.haccpDocsPage.tagline}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
              {t.haccpDocsPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              {t.haccpDocsPage.subtitle}
            </p>
          </div>
        </section>

        {/* Audit Document Checklist Guide - SNI CXC 1:1969 (2024) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {t.haccpDocsPage.guideTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {t.haccpDocsPage.guideSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: GHP / GMP */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider inline-block">
                    SNI CXC 1:1969 • BAGIAN 1
                  </span>
                  <h3 className="text-brand-navy font-extrabold text-sm leading-snug">
                    {t.haccpDocsPage.section1Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {t.haccpDocsPage.section1Desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  Cakupan: Persyaratan fasilitas, sanitasi, kebersihan personel, pemeliharaan, serta pengendalian operasional rantai pangan.
                </div>
              </div>

              {/* Box 2: HACCP Plan */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider inline-block border border-emerald-200">
                    SNI CXC 1:1969 • BAGIAN 2
                  </span>
                  <h3 className="text-brand-navy font-extrabold text-sm leading-snug">
                    {t.haccpDocsPage.section2Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {t.haccpDocsPage.section2Desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  Cakupan: 7 Prinsip sistem HACCP untuk identifikasi, evaluasi, dan pengendalian bahaya (biologis, kimia, fisik) secara preventif.
                </div>
              </div>

              {/* Box 3: Legalitas & Lab */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider inline-block border border-amber-200">
                    DOKUMEN PENDUKUNG
                  </span>
                  <h3 className="text-brand-navy font-extrabold text-sm leading-snug">
                    {t.haccpDocsPage.section3Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {t.haccpDocsPage.section3Desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  Cakupan: Legalitas Izin Usaha / NIB, SK Tim HACCP, Hasil Pengujian Laboratorium, dan Kalibrasi Alat Ukur.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Submission Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Header Form Without Badge */}
            <div className="border-b border-slate-100 pb-6 text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {t.haccpDocsPage.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
                {t.haccpDocsPage.formSubtitle}
              </p>
            </div>

            {submittedTicket ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-emerald-950 font-heading">
                  {lang === "en" ? "SNI CXC 1:1969 Document Received!" : "Dokumen SNI CXC 1:1969 Berhasil Diterima!"}
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  {lang === "en" 
                    ? "Your pre-audit documentation under SNI CXC 1:1969 (2024) has been saved in our audit repository. Our technical reviewer team will evaluate the completeness within 2 business days." 
                    : "Dokumen persiapan audit Anda sesuai standar SNI CXC 1:1969 (2024) telah tersimpan resmi dalam database audit. Tim verifikator teknis kami akan mengevaluasi kelengkapan berkas dalam 2 hari kerja."}
                </p>
                <div className="bg-white border border-emerald-200 inline-block px-6 py-3 rounded-2xl shadow-xs">
                  <span className="text-xs text-slate-400 font-bold block uppercase">{lang === "en" ? "DOCUMENT TICKET NUMBER" : "NOMOR TIKET DOKUMEN"}</span>
                  <span className="text-lg font-black text-brand-navy tracking-wider">{submittedTicket}</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setSelectedFile(null);
                      handleResetLookup();
                    }}
                    className="px-6 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-brand-navy-dark transition-all border-none"
                  >
                    {lang === "en" ? "Upload Another File" : "Unggah Berkas Lainnya"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">

                {/* PRIMARY KEY LOOKUP BOX */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wide">
                        {t.haccpDocsPage.lookupLabel}
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {lang === "en"
                          ? "Enter your registered company email or PIC phone number to automatically load your details."
                          : "Cukup masukkan Email Perusahaan atau Nomor WhatsApp PIC yang terdaftar saat mengajukan sertifikasi."}
                      </p>
                    </div>

                    {matchedInquiry && (
                      <button
                        type="button"
                        onClick={handleResetLookup}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl cursor-pointer transition-all self-start sm:self-auto"
                      >
                        {t.haccpDocsPage.changeLookup}
                      </button>
                    )}
                  </div>

                  {!matchedInquiry ? (
                    <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="text"
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        placeholder={t.haccpDocsPage.lookupPlaceholder}
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-brand-blue"
                      />
                      <button
                        type="submit"
                        disabled={lookupLoading}
                        className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl cursor-pointer transition-all border-none shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                      >
                        {lookupLoading ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Memuat...</span>
                          </>
                        ) : (
                          <span>{t.haccpDocsPage.lookupButton}</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* VERIFIED DATA CARD */
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between gap-3 border-b border-emerald-200/70 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                            ✓
                          </span>
                          <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wide">
                            {t.haccpDocsPage.lookupFound}
                          </span>
                        </div>
                        {matchedInquiry.ticketNumber && (
                          <span className="bg-white border border-emerald-200 px-3 py-1 rounded-full text-xs font-black text-brand-navy font-mono">
                            {matchedInquiry.ticketNumber}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 font-bold block">Nama Perusahaan:</span>
                          <span className="font-extrabold text-slate-900 text-sm">{matchedInquiry.companyName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Penanggung Jawab (PIC):</span>
                          <span className="font-extrabold text-slate-900">{matchedInquiry.picName} ({matchedInquiry.phone})</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Email Terdaftar:</span>
                          <span className="font-medium text-slate-700">{matchedInquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block">Sektor Ruang Lingkup:</span>
                          <span className="font-extrabold text-brand-navy bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg inline-block mt-0.5">
                            {matchedInquiry.industry}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NOT FOUND NOTIFICATION */}
                  {!matchedInquiry && lookupSearched && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
                      <p className="font-medium">{t.haccpDocsPage.lookupNotFound}</p>
                      <div className="pt-1">
                        <a href="/#daftar-online" className="font-extrabold text-brand-blue hover:underline">
                          {t.haccpDocsPage.applyLink}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* UPLOAD FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* File Upload Box */}
                  <div className="space-y-2 border-2 border-dashed border-brand-navy/30 p-6 bg-blue-50/40 text-center rounded-3xl">
                    <label className="font-extrabold text-brand-navy text-xs uppercase tracking-wider block">
                      {lang === "en" 
                        ? "Attach SNI CXC 1:1969 (2024) Document File (PDF, DOCX, ZIP - Max 25MB) *" 
                        : "Lampirkan Berkas Dokumen SNI CXC 1:1969 (2024) (PDF, DOCX, ZIP - Maks 25MB) *"}
                    </label>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {lang === "en" ? "Choose file from your device:" : "Pilih file dokumen dari komputer / HP Anda:"}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.rar"
                      onChange={handleFileChange}
                      className="block w-full max-w-sm mx-auto text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:border-0 file:text-xs file:font-extrabold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark file:rounded-xl cursor-pointer"
                    />
                    {selectedFile && (
                      <div className="mt-3 bg-white border border-slate-200 p-3 rounded-xl inline-flex items-center gap-3 text-xs">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="font-bold text-slate-800 truncate max-w-xs">{selectedFile.name}</span>
                        <span className="text-slate-400 font-mono text-[11px]">({selectedFile.size})</span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Additional Explanations / Notes (Optional)" : "Keterangan Tambahan / Catatan Berkas (Opsional)"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={lang === "en" ? "e.g. SNI CXC 1:1969 GHP & HACCP Plan document package version 2024..." : "Contoh: Paket dokumen SNI CXC 1:1969 (GHP, HACCP Plan, dan lampiran legalitas)..."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue resize-none"
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
                        <span>{lang === "en" ? "Uploading Document..." : "Mengunggah Dokumen..."}</span>
                      </>
                    ) : (
                      <span>{lang === "en" ? "Submit SNI CXC 1:1969 (2024) Document →" : "Kirim Berkas Dokumen SNI CXC 1:1969 (2024) →"}</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BerkasHaccpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-400">Memuat Portal Berkas HACCP...</div>}>
      <BerkasHaccpContent />
    </Suspense>
  );
}
