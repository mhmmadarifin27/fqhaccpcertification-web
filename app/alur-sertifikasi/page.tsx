"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

export default function AlurSertifikasiPage() {
  const { lang } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      <main className="pt-24 md:pt-36 pb-24">
        {/* Breadcrumb & Navigation */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <a href="/" className="hover:text-brand-navy transition-colors">
              {lang === "en" ? "Home" : "Beranda"}
            </a>
            <span>/</span>
            <span className="text-brand-navy font-bold">
              {lang === "en" ? "Certification Flowchart" : "Alur Sertifikasi Lengkap"}
            </span>
          </div>
        </div>

        {/* Hero Title Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <div className="space-y-4">
            <span className="inline-block bg-brand-navy/10 text-brand-navy border border-brand-navy/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest rounded-full">
              {lang === "en" ? "OFFICIAL AUDIT WORKFLOW • KAN LSHACCP-009-IDN" : "STANDAR RESMI AUDIT KEAMANAN PANGAN • KAN LSHACCP-009-IDN"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
              {lang === "en" ? "Complete HACCP Certification Process Flowchart" : "Alur Lengkap Proses Sertifikasi HACCP"}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
              {lang === "en"
                ? "Comprehensive visual guide and explanation of the HACCP Food Safety Management System certification stages, from application submission, document review, on-site audit, to official certificate issuance."
                : "Panduan visual komprehensif tahapan sertifikasi Sistem Manajemen Keamanan Pangan HACCP, mulai dari pengajuan permohonan, kajian dokumen SNI CXC 1:1969, audit lapangan, hingga penerbitan sertifikat resmi terakreditasi KAN."}
            </p>
          </div>
        </section>

        {/* Flowchart Image Showcase Container */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {lang === "en" ? "HACCP Certification Process Diagram" : "Diagram Alur Sertifikasi HACCP"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === "en"
                    ? "Standard operating procedure flow for HACCP certification at PT Food Quality Certification."
                    : "Standar operasional prosedur pelaksanaan sertifikasi HACCP di PT Food Quality Certification."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer border border-slate-300 active:scale-95 shrink-0 self-start sm:self-auto"
              >
                <span>🔍</span>
                <span>{lang === "en" ? "Zoom Full Diagram" : "Perbesar Gambar HD"}</span>
              </button>
            </div>

            {/* HD Image Frame - Preserves original proportions without squishing */}
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden">
              <img
                src="/alur-sertifikasi.jpeg"
                alt="Diagram Alur Sertifikasi HACCP PT Food Quality Certification"
                className="w-full h-auto max-w-4xl object-contain rounded-xl shadow-xs cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setIsZoomed(true)}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-2">
              <span>* Klik gambar untuk melihat tampilan ukuran penuh (HD).</span>
              <span className="font-semibold text-brand-navy">PT Food Quality Certification</span>
            </div>
          </div>
        </section>

        {/* Step by Step Breakdown Cards */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {lang === "en" ? "Detailed Explanation of Certification Stages" : "Penjelasan Rinci Rangkaian Tahapan Audit"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === "en"
                ? "Key steps undertaken during the certification journey."
                : "Uraian tahapan teknis dari awal permohonan hingga sertifikat diterbitkan."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center font-heading">
                  1
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Application & Scope Review" : "Pengajuan & Kaji Ulang Permohonan"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Applicant submits the certification application form. Our team verifies the applicant's product scope (Bakery, Meat, Special Dietary, Food Service/SPPG) and calculates audit mandays and fees."
                    : "Pemohon mengajukan formulir sertifikasi. Tim kami melakukan kaji ulang ruang lingkup produk (Bakeri, Daging, Gizi Khusus, atau Jasa Boga/SPPG) serta menghitung kebutuhan hari audit dan penawaran biaya."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-blue">
                Output: Kontrak Sertifikasi & Jadwal Audit
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center font-heading">
                  2
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Stage 1 Audit (Document Review)" : "Audit Tahap 1 (Kajian Dokumen)"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Evaluation of adequacy of the SNI CXC 1:1969 document system (Section 1 GHP/GMP and Section 2 HACCP Plan), product descriptions, flow diagrams, and facility preparedness."
                    : "Auditor memeriksa kecukupan dokumen sistem SNI CXC 1:1969 (Bagian 1 GHP/GMP dan Bagian 2 Rencana HACCP), deskripsi produk, diagram alir, serta kesiapan fasilitas sebelum audit lapangan."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-blue">
                Output: Laporan Audit Kecukupan Tahap 1
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center font-heading">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Stage 2 Audit (On-Site Conformity)" : "Audit Tahap 2 (Kesesuaian Lapangan)"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "On-site audit verifying actual implementation of food safety controls, monitoring of critical control points (CCP), sanitation practices, and employee competence."
                    : "Pelaksanaan audit langsung di fasilitas produksi untuk memverifikasi kesesuaian implementasi sistem, pemantauan titik kendali kritis (CCP), sanitasi, serta kompetensi personel."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-blue">
                Output: Laporan Audit Lapangan & Lembar Temuan
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center font-heading">
                  4
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Corrective Actions (CAPA)" : "Tindakan Perbaikan (CAPA)"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "If non-conformities are identified during audit, the company conducts root-cause analysis and submits corrective action evidence within the designated deadline."
                    : "Jika terdapat temuan ketidaksesuaian saat audit, perusahaan melakukan perbaikan akar masalah dan mengirimkan bukti tindakan perbaikan untuk diverifikasi oleh auditor."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-blue">
                Output: Verifikasi & Penutupan Temuan (Closing NC)
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-brand-navy text-white text-xs font-black flex items-center justify-center font-heading">
                  5
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Certification Decision Committee" : "Keputusan Panel Sertifikasi"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Independent technical review and certification decision by the Certification Committee based on objective audit evidence."
                    : "Evaluasi laporan independen dan pengambilan keputusan sertifikasi oleh Komite Sertifikasi berdasarkan bukti objektif seluruh rangkaian audit."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
                Output: Keputusan Kelulusan Sertifikasi
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center font-heading">
                  ✓
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {lang === "en" ? "Official Certificate Issuance" : "Penerbitan Sertifikat Resmi KAN"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Issuance of official HACCP certificate with KAN accreditation symbol, valid for 3 years subject to annual surveillance audits."
                    : "Penerbitan Sertifikat HACCP resmi berlogo KAN (LSHACCP-009-IDN) yang berlaku selama 3 tahun dengan pelaksanaan audit surveilans tahunan."}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
                Output: Sertifikat HACCP Resmi & Pengakuan Pasar
              </div>
            </div>
          </div>
        </section>

        {/* CTA Callout Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">
          <div className="bg-[#021526] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden border border-white/10 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                {lang === "en" ? "Ready to Start Your HACCP Certification?" : "Siap Mengajukan Sertifikasi HACCP Perusahaan Anda?"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === "en"
                  ? "Contact our team or register online now for expert guidance through each step of the certification process."
                  : "Daftarkan fasilitas usaha pangan Anda sekarang untuk pendampingan audit profesional bersama Lembaga Sertifikasi HACCP terakreditasi KAN."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="/#form-inquiry"
                className="px-8 py-4 bg-brand-blue hover:bg-brand-navy text-white text-xs font-extrabold uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95 border-none cursor-pointer"
              >
                {lang === "en" ? "Apply for HACCP Certification →" : "Ajukan Permohonan Sertifikasi Sekarang →"}
              </a>
              <a
                href="/info/berkas-haccp"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold uppercase tracking-widest rounded-full transition-all border border-white/20 active:scale-95"
              >
                {lang === "en" ? "Upload Pre-Audit Documents" : "Unggah Berkas Pra-Audit"}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FULLSCREEN HD ZOOM LIGHTBOX MODAL */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
            <button
              onClick={() => setIsZoomed(false)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 text-sm font-black transition-all cursor-pointer border-none flex items-center justify-center"
            >
              ✕ Tutup
            </button>
          </div>
          <div
            className="max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/alur-sertifikasi.jpeg"
              alt="Diagram Alur Lengkap Sertifikasi HACCP HD"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
