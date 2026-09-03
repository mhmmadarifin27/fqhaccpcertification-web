"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getTeamMembers, TeamMember } from "../../../lib/db";
import { useLanguage } from "../../../context/LanguageContext";

// Extracted team data from Google Sheet with high-fidelity profiles
const TEAM_MEMBERS = [
  {
    id: "bambang-dwi",
    name: "Bambang Dwi Wijatniko, S.T.P., M.Agr.Sc., M.Sc., Ph.D.",
    role: "Lead Auditor & Ahli Teknologi Pangan",
    category: "tphp-ugm",
    isLead: true,
    image: "/hero1.jpg",
    education: [
      "S1 Teknologi Pangan dan Hasil Pertanian, Universitas Gadjah Mada (UGM)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM) & Kyoto University",
      "S3 Food Chemistry, Hiroshima University, Jepang"
    ],
    experience: "2018 s.d sekarang: Dosen di Departemen Teknologi Pangan dan Hasil Pertanian, Universitas Gadjah Mada (UGM).",
    standards: [
      "Pelatihan Refreshment AMI (FTP UGM, 2019)"
    ],
    haccp: [
      "Pelatihan & Uji Kompetensi Cara Produksi Pangan Olahan yang Baik / CPPOB (JMKP, November 2024)",
      "Pelatihan & Uji Kompetensi Sensory Analyst (SEAFAST IPB, Oktober 2025)"
    ],
    auditorExp: "Auditor AMI (Audit Mutu Internal) Fakultas Teknologi Pertanian UGM tahun 2019-2020.",
    motto: "Inovasi teknologi pangan harus berjalan beriringan dengan jaminan keamanan dan mutu konsumsi publik."
  },
  {
    id: "rafida-cahya",
    name: "Rafida Cahyaningrum, S.T.P., M. Sc.",
    role: "Spesialis Manajemen Keamanan Pangan & Peneliti",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan, Universitas Jenderal Soedirman (UNSOED)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "Februari 2026 s.d. sekarang: Asisten Peneliti Dosen Teknologi Pangan dan Hasil Pertanian (TPHP), Universitas Gadjah Mada (UGM).",
    standards: [
      "Training and Workshop of Implementing Food Safety Management System ISO 22000:2018 (Catalyst Consulting, September 2021)"
    ],
    haccp: [
      "Training and Workshop of Implementing Food Safety Management System FSSC 22000 Version 5.1 (Catalyst Consulting, September 2021)",
      "Training and Workshop of Food Safety, Food Defense, and Food Fraud Prevention Control / HACCP, TACCP, VACCP (Catalyst Consulting, September 2021)"
    ],
    auditorExp: "Belum terdaftar sebagai auditor eksternal.",
    motto: "Keamanan pangan dicapai melalui penerapan standar sistem manajemen yang konsisten dan terukur."
  },
  {
    id: "agessty-ika",
    name: "Agessty Ika Nurlita, S.Si., M.Si.",
    role: "Auditor Halal & Akademisi Biologi",
    category: "uin-suka",
    isLead: true,
    image: "/hero1.jpg",
    education: [
      "S1 Biologi, Institut Pertanian Bogor (IPB University)",
      "S2 Mikrobiologi, Institut Pertanian Bogor (IPB University)"
    ],
    experience: "2019 s.d. sekarang: Dosen Biologi UIN Sunan Kalijaga Yogyakarta; 2023 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: [
      "Pelatihan Regulasi Audit Jaminan Produk Halal"
    ],
    haccp: [
      "Pelatihan Teknis Higienitas Pangan & Mikrobiologi Dasar"
    ],
    auditorExp: "Auditor Halal terakreditasi di LPH (Lembaga Pemeriksa Halal) UIN Sunan Kalijaga Yogyakarta sejak tahun 2023.",
    motto: "Mikrobiologi memberikan kunci dasar untuk memahami dan mengendalikan bahaya kontaminasi produk pangan."
  },
  {
    id: "muhammad-dhifan",
    name: "Muhammad Dhifan Rafiuddin, S.T., M.Sc.",
    role: "Ahli HACCP & GMP",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan, Universitas Pasundan (UNPAS)",
      "S2 Ilmu Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "Februari 2026 s.d. sekarang: Asisten Peneliti Dosen Teknologi Pangan dan Hasil Pertanian (TPHP), Universitas Gadjah Mada (UGM).",
    standards: [
      "Sertifikasi FSSC 22000 V. 5.1 including ISO 22000:2018 (Premysis Consulting, 2021)"
    ],
    haccp: [
      "Pelatihan HACCP & GMP Based on ISO 22002-1 (Premysis Consulting, 2021)",
      "Pelatihan Halal Assurance System Based on HAS 23000 (Premysis Consulting, 2021)"
    ],
    auditorExp: "Belum terdaftar sebagai auditor eksternal.",
    motto: "Perancangan program prasyarat (GMP) yang kuat adalah fondasi utama keberhasilan sistem HACCP."
  },
  {
    id: "laili-nailul",
    name: "apt. Laili Nailul Muna, S.Farm., M.Sc.",
    role: "Auditor Halal & Dosen Biomedis",
    category: "uin-suka",
    isLead: true,
    image: "/iso.jpg",
    education: [
      "S1 Farmasi, Universitas Ahmad Dahlan (UAD) Yogyakarta",
      "Pendidikan Profesi Apoteker, Universitas Ahmad Dahlan (UAD) Yogyakarta",
      "S2 Farmasi, Universitas Gadjah Mada (UGM)"
    ],
    experience: "2017 s.d. sekarang: Apoteker Praktisi; 2019 s.d. sekarang: Dosen Biomedis UIN Sunan Kalijaga Yogyakarta; 2023 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: [
      "Sertifikasi Apoteker Penanggung Jawab Fasilitas",
      "Pelatihan Regulasi Audit Jaminan Produk Halal (2023)"
    ],
    haccp: [
      "Pelatihan Mutu Farmasi & Toksikologi Bahan Pangan"
    ],
    auditorExp: "Auditor Halal terdaftar di LPH (Lembaga Pemeriksa Halal) UIN Sunan Kalijaga Yogyakarta sejak tahun 2023.",
    motto: "Aspek halal dan thoyyib (mutu & keamanan) adalah dua pilar yang saling melengkapi dalam rantai pangan."
  },
  {
    id: "fayza-allya",
    name: "Fayza Allya Kallista, S.Pi., M.Sc.",
    role: "Spesialis Pengolahan & Pengendalian Mutu Perikanan",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero1.jpg",
    education: [
      "S1 Teknologi Hasil Perikanan, Universitas Gadjah Mada (UGM)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "April 2024 s.d. Sekarang: Asisten Dosen Teknologi Pangan dan Hasil Pertanian UGM; September-Desember 2020: Asisten Laboratorium Sosial Ekonomi Perikanan UGM; Januari 2020: Magang QC di PT. Surya Alam Tunggal; Juli 2019: Magang di LPPMHP Dinas Kelautan dan Perikanan DIY.",
    standards: [
      "Pelatihan Penilaian Mutu Produk Perikanan Ekspor"
    ],
    haccp: [
      "Quality Control Training (PT Mindo Education, 2019)",
      "Quality Assurance Training (PT Mindo Education, 2019)"
    ],
    auditorExp: "Belum terdaftar sebagai auditor eksternal.",
    motto: "Pengendalian suhu dan kecepatan rantai logistik menentukan kesegaran serta keamanan komoditas perikanan."
  },
  {
    id: "atika-yahdiyani",
    name: "Atika Yahdiyani Ikhsani, S.TP., M.Sc.",
    role: "Auditor Halal & Spesialis ISO 22000 / 17065",
    category: "uin-suka",
    isLead: true,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan dan Hasil Pertanian, Universitas Brawijaya (UB) Malang",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)",
      "Sedang Menempuh Pendidikan S3 Ilmu Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "2014-2020: Dosen dan Staf LPPM Universitas Muhammadiyah Surakarta (UMS); 2019 s.d. sekarang: Dosen Kimia UIN Sunan Kalijaga Yogyakarta; 2022 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: [
      "Pelatihan Keamanan Pangan & Sistem ISO 22000 (2015)",
      "Pelatihan ISO/IEC 17065:2012 Persyaratan Lembaga Sertifikasi Produk, Proses, Jasa (2022)"
    ],
    haccp: [
      "Sertifikasi Internal Auditor Keamanan Pangan BNSP (JMKP, 2015)",
      "Sertifikasi Kompetensi BNSP Auditor Halal (2022, Diperpanjang 2024)",
      "Sertifikasi Kompetensi Penerapan CPPOB (JMKP, 2025)"
    ],
    auditorExp: "Tim Konsolidasi Pembentukan LPH dan Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    motto: "Tinjauan kesesuaian dokumen regulasi menjamin obyektivitas dan validitas sertifikasi secara hukum."
  }
];

export default function TimPage() {
  const { t } = useLanguage();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await getTeamMembers();
      setMembers(data);
    };
    fetchTeam();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />

      {/* Main Content Container */}
      <main className="pt-24 md:pt-36 pb-20">
        
        {/* Hero / Banner */}
        <section className="bg-slate-50 text-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <span className="inline-block bg-brand-navy/10 text-brand-navy border border-brand-navy/20 px-3.5 py-1 text-xs font-black uppercase tracking-widest rounded-full">
              {t.nav.team}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-tight font-heading">
              {t.profilePages.tim.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed font-normal">
              {t.profilePages.tim.subtitle}
            </p>
          </div>
          <div className="border-t border-slate-200 mt-10 mb-2" />
        </section>

        {/* Card Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Card Grid - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group h-full rounded-3xl transition-all duration-300 hover:shadow-md"
              >
                {/* Photo Header */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug group-hover:text-brand-blue transition-colors font-heading min-h-[52px]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-brand-blue font-bold tracking-wide">
                      {member.role}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-[11px] font-extrabold text-brand-blue hover:text-brand-blue-hover uppercase tracking-widest transition-colors cursor-pointer focus:outline-none"
                    >
                      {t.teamUI.showDetail} &rarr;
                    </button>
                    <span className="w-6 h-6 bg-brand-blue/5 text-brand-blue text-xs flex items-center justify-center font-extrabold rounded-full">
                      ✓
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>

      {/* Interactive Profile Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-navy-dark/80 backdrop-blur-sm animate-fade-in">
          
          {/* Modal Container */}
          <div className="bg-white border border-slate-200 shadow-2xl w-full max-w-5xl relative z-10 overflow-hidden my-8 rounded-3xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900 hover:bg-brand-blue text-white flex items-center justify-center transition-all cursor-pointer border-none rounded-full"
              aria-label={t.teamUI.closeModal}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Split layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 items-stretch bg-slate-50 border-b border-slate-200">
              
              <div className="md:col-span-4 relative aspect-square md:aspect-auto min-h-[250px] bg-slate-200 rounded-2xl overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight font-heading leading-tight">
                    {selectedMember.name}
                  </h2>
                  <p className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                    {selectedMember.role}
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                    {t.teamUI.educationHistory}
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc pl-5 font-normal leading-relaxed">
                    {selectedMember.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote Callout Banner (Motto) */}
            <div className="bg-brand-navy text-brand-cyan relative overflow-hidden py-8 px-6 sm:px-12 text-center border-b border-white/5">
              <p className="text-sm sm:text-base md:text-lg font-medium italic max-w-3xl mx-auto leading-relaxed z-10 relative">
                &ldquo;{selectedMember.motto}&rdquo;
              </p>
            </div>

            {/* Expanded Bio Details */}
            <div className="p-6 sm:p-10 space-y-6 text-slate-700 max-h-[400px] overflow-y-auto">
              
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 font-heading">
                  {t.teamUI.workExperience}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedMember.experience}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 font-heading">
                    {t.teamUI.standardsTraining}
                  </h4>
                  {selectedMember.standards[0] === "-" ? (
                    <p className="text-xs text-slate-400 italic">{t.teamUI.noTraining}</p>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 font-normal leading-relaxed">
                      {selectedMember.standards.map((std, idx) => (
                        <li key={idx}>{std}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 font-heading">
                    {t.teamUI.haccpTraining}
                  </h4>
                  {selectedMember.haccp[0] === "-" ? (
                    <p className="text-xs text-slate-400 italic">{t.teamUI.noTraining}</p>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 font-normal leading-relaxed">
                      {selectedMember.haccp.map((hc, idx) => (
                        <li key={idx}>{hc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 font-heading">
                  {t.teamUI.auditorQualification}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedMember.auditorExp}
                </p>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 border-t border-slate-200 py-4 px-6 sm:px-10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedMember(null)}
                className="bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-extrabold uppercase tracking-widest py-3 px-8 transition-colors duration-200 cursor-pointer rounded-full shadow-md"
              >
                {t.teamUI.closeModal}
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
