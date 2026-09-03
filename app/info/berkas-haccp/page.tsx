"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";
import { useToast } from "../../../context/ToastContext";
import { createHaccpDocSubmission } from "../../../lib/db";

const DOC_CATEGORIES = [
  { id: "bundle-all", label: "Bundel Lengkap Semua Dokumen Persiapan Audit (ZIP / PDF)" },
  { id: "manual-haccp", label: "Manual / Pedoman Sistem Manajemen HACCP" },
  { id: "flow-diagram", label: "Diagram Alir Proses Produksi & Layout Fasilitas" },
  { id: "hazard-ccp", label: "Tabel Analisis Bahaya & Critical Control Points (CCP Plan)" },
  { id: "sk-tim", label: "Surat Keputusan (SK) Tim Keamanan Pangan / HACCP" },
  { id: "legalitas-nib", label: "Izin Usaha, NIB, & Legalitas Perusahaan" },
  { id: "internal-audit", label: "Laporan Audit Internal & Tinjauan Manajemen Terakhir" }
];

export default function BerkasHaccpPage() {
  const { t, lang } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    ticketNumber: "",
    companyName: "",
    picName: "",
    picPhone: "",
    picEmail: "",
    productScope: "",
    documentCategory: "bundle-all",
    notes: ""
  });

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    data: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        showToast({
          title: lang === "en" ? "File Too Large" : "Ukuran File Terlalu Besar",
          message: lang === "en" ? "Maximum file size is 20MB." : "Batas maksimal ukuran file adalah 20MB.",
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
    if (!formData.companyName || !formData.picName || !formData.picPhone || !formData.picEmail || !formData.productScope) {
      showToast({
        title: lang === "en" ? "Incomplete Form" : "Data Belum Lengkap",
        message: lang === "en" ? "Please fill in all mandatory fields (*)." : "Mohon lengkapi seluruh kolom wajib bertanda (*).",
        type: "warning"
      });
      return;
    }

    if (!selectedFile) {
      showToast({
        title: lang === "en" ? "No File Attached" : "File Belum Dipilih",
        message: lang === "en" ? "Please select a document file (.pdf, .docx, or .zip) to upload." : "Mohon pilih file berkas (.pdf, .docx, atau .zip) yang akan diunggah.",
        type: "warning"
      });
      return;
    }

    setSubmitting(true);
    try {
      const categoryObj = DOC_CATEGORIES.find((c) => c.id === formData.documentCategory) || DOC_CATEGORIES[0];
      const result = await createHaccpDocSubmission({
        companyName: formData.companyName,
        picName: formData.picName,
        picPhone: formData.picPhone,
        picEmail: formData.picEmail,
        productScope: formData.productScope,
        documentCategory: formData.documentCategory,
        documentCategoryLabel: categoryObj.label,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileData: selectedFile.data,
        notes: formData.ticketNumber ? `[Tiket Registrasi: ${formData.ticketNumber}] ${formData.notes}` : formData.notes
      });

      setSubmittedTicket(result.ticketNumber);
      showToast({
        title: lang === "en" ? "Documents Uploaded" : "Berkas Berhasil Diunggah",
        message: lang === "en" 
          ? `Documents submitted under ticket ${result.ticketNumber}.` 
          : `Berkas audit tercatat resmi dengan tiket ${result.ticketNumber}. Tim verifikator akan segera memeriksa dokumen Anda.`,
        type: "success"
      });
    } catch (err) {
      console.error("HACCP document upload error:", err);
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
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
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

        {/* Audit Document Checklist Guide */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                📋 {t.haccpDocsPage.guideTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.haccpDocsPage.guideSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-brand-navy font-black text-sm block">1. Dokumen Sistem HACCP</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Manual HACCP, Kebijakan Mutu & Keamanan Pangan, Ruang Lingkup Produk, dan SOP Pengendalian Dokumen.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-brand-navy font-black text-sm block">2. Analisis Bahaya & CCP</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diagram alir proses produksi terverifikasi, lembar identifikasi bahaya, penetapan CCP, batas kritis, dan prosedur monitoring.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-brand-navy font-black text-sm block">3. Tim & Legalitas</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Surat Keputusan (SK) Tim HACCP, sertifikat pelatihan tim, Izin Usaha / NIB, serta laporan audit internal terakhir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Document Submission Form */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-12">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6 text-center space-y-2">
              <span className="inline-block bg-blue-50 text-brand-navy border border-blue-200 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {lang === "en" ? "PRE-AUDIT SUBMISSION" : "UNGGAH DOKUMEN PRA-AUDIT"}
              </span>
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
                  {lang === "en" ? "Documents Successfully Received!" : "Dokumen Berhasil Diterima!"}
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  {lang === "en" 
                    ? "Your pre-audit documentation has been saved in our audit repository. Our technical reviewer team will evaluate the completeness within 2 business days." 
                    : "Dokumen persiapan audit Anda telah tersimpan resmi dalam database audit kami. Tim verifikator teknis kami akan mengevaluasi kelengkapan berkas dalam 2 hari kerja."}
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
                      setFormData({
                        ticketNumber: "",
                        companyName: "",
                        picName: "",
                        picPhone: "",
                        picEmail: "",
                        productScope: "",
                        documentCategory: "bundle-all",
                        notes: ""
                      });
                    }}
                    className="px-6 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-brand-navy-dark transition-all border-none"
                  >
                    {lang === "en" ? "Upload Additional Documents" : "Unggah Dokumen Lainnya"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Application / Voucher Ticket (Optional)" : "Nomor Tiket Permohonan Sertifikasi (Opsional jika sudah ada)"}
                  </label>
                  <input
                    type="text"
                    value={formData.ticketNumber}
                    onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
                    placeholder={lang === "en" ? "e.g. HACCP-2026-3538" : "Contoh: HACCP-2026-3538 (Kosongkan jika belum memiliki tiket)"}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Company / Facility Name *" : "Nama Perusahaan / Fasilitas Produksi *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={lang === "en" ? "e.g. PT Agro Makmur Berjaya" : "Contoh: PT Agro Makmur Berjaya"}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "PIC / Food Safety Team Leader Name *" : "Nama PIC / Ketua Tim HACCP *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.picName}
                      onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                      placeholder={lang === "en" ? "e.g. Hendro Wibowo, S.T." : "Contoh: Hendro Wibowo, S.T."}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "WhatsApp / Phone Number *" : "Nomor WhatsApp / HP PIC *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.picPhone}
                      onChange={(e) => setFormData({ ...formData, picPhone: e.target.value })}
                      placeholder="Contoh: 0813-9876-5432"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      {lang === "en" ? "Official Company Email *" : "Email Resmi Perusahaan *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.picEmail}
                      onChange={(e) => setFormData({ ...formData, picEmail: e.target.value })}
                      placeholder="Contoh: qa.lead@agromakmur.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Product Scope / Food Category *" : "Ruang Lingkup Produk / Kategori Pangan *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productScope}
                    onChange={(e) => setFormData({ ...formData, productScope: e.target.value })}
                    placeholder={lang === "en" ? "e.g. Frozen Meat Processing & Packaging" : "Contoh: Pengolahan Daging Beku, Minuman Kemasan, Katering, Bakery, dll."}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Document Category *" : "Kategori Berkas yang Diunggah *"}
                  </label>
                  <select
                    value={formData.documentCategory}
                    onChange={(e) => setFormData({ ...formData, documentCategory: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-brand-blue"
                  >
                    {DOC_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Box */}
                <div className="space-y-2 border-2 border-dashed border-brand-navy/30 p-6 bg-blue-50/40 text-center rounded-3xl">
                  <label className="font-extrabold text-brand-navy text-xs uppercase tracking-wider block">
                    📁 {lang === "en" ? "Attach Document File (PDF, DOCX, ZIP - Max 20MB) *" : "Lampirkan File Dokumen (PDF, DOCX, ZIP - Maks 20MB) *"}
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

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    {lang === "en" ? "Additional Explanations / Notes (Optional)" : "Keterangan Tambahan / Penjelasan Dokumen (Opsional)"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={lang === "en" ? "e.g. Document revision version 2.0 with updated layout..." : "Contoh: Berkas versi 2.0 yang sudah mencakup revisi diagram alir dan CCP..."}
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
                      <span>{lang === "en" ? "Uploading Document..." : "Mengunggah Dokumen..."}</span>
                    </>
                  ) : (
                    <span>{lang === "en" ? "Submit Audit Documents →" : "Kirim Berkas Persiapan Audit →"}</span>
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
