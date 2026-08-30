"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminSertifikasi from "../../components/AdminSertifikasi";
import AdminGaleri from "../../components/AdminGaleri";
import AdminTim from "../../components/AdminTim";
import AdminProyek from "../../components/AdminProyek";
import { useToast } from "../../context/ToastContext";
import ConfirmModal from "../../components/ConfirmModal";
import { supabase } from "../../lib/supabase";
import {
  SertifikasiInquiry,
  GalleryItem,
  TeamMember,
  ProjectItem,
  getInquiries,
  getGallery,
  getTeamMembers,
  getProjects,
  updateInquiryStatus
} from "../../lib/db";

export default function AdminPage() {
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Content states
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inquiries, setInquiries] = useState<SertifikasiInquiry[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Check sessionStorage for existing active session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionActive = sessionStorage.getItem("fq_admin_session") === "true";
      if (sessionActive) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Fetch all state lists from the database helper
  const fetchData = async () => {
    setLoading(true);
    try {
      const inqData = await getInquiries();
      const galData = await getGallery();
      const teamData = await getTeamMembers();
      const projData = await getProjects();

      setInquiries(inqData);
      setGallery(galData);
      setTeamMembers(teamData);
      setProjects(projData);
    } catch (e) {
      console.error("Error loading dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateInquiryStatus(id, newStatus);
      showToast({
        title: "Status Diperbarui",
        message: `Status permohonan berhasil diperbarui menjadi "${newStatus}".`,
        type: "success",
      });
      await fetchData();
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast({
        title: "Gagal Update",
        message: "Gagal memperbarui status pengajuan.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Handle Login Validation with Supabase Auth & fallback
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setLoginError("Silakan isi username/email dan password.");
      return;
    }

    // 1. Try Supabase Authentication
    if (supabase) {
      try {
        const emailToAuth = cleanUser.includes("@") ? cleanUser : `${cleanUser}@fqhaccp.com`;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailToAuth,
          password: cleanPass,
        });

        if (!error && data?.user) {
          setIsLoggedIn(true);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("fq_admin_session", "true");
          }
          showToast({
            title: "Login Berhasil",
            message: `Selamat datang kembali, ${data.user.email}!`,
            type: "success",
          });
          return;
        }
      } catch (err) {
        console.warn("Supabase auth check:", err);
      }
    }

    // 2. Direct validation support for Supabase user credentials & admin
    if (
      (cleanUser.toLowerCase() === "fqhaccpcertification@gmail.com" && cleanPass === "123456") ||
      (cleanUser.toLowerCase() === "admin" && (cleanPass === "123456" || cleanPass === "haccp2026"))
    ) {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fq_admin_session", "true");
      }
      showToast({
        title: "Login Berhasil",
        message: "Selamat datang di Dashboard Admin PT Food Quality Certification.",
        type: "success",
      });
    } else {
      setLoginError("Email / Username atau Password salah.");
      showToast({
        title: "Autentikasi Gagal",
        message: "Email / Username atau Password yang Anda masukkan tidak valid.",
        type: "error",
      });
    }
  };

  // Handle Session Termination
  const handleLogoutPrompt = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("fq_admin_session");
    }
    showToast({
      title: "Sesi Berakhir",
      message: "Anda telah berhasil keluar dari panel admin.",
      type: "info",
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  // --- RENDERING LOGIN PANEL (SPLIT SCREEN MATCHING USER REFERENCE IMAGE) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex bg-slate-50 text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
        
        {/* LEFT PANEL: LOGIN FORM (Full width on mobile, 50% on desktop) */}
        <div className="w-full lg:w-1/2 min-h-screen bg-white p-6 sm:p-12 flex flex-col justify-between relative z-10 shadow-2xl">
          
          {/* Top Bar: Company Logo & Mobile Beranda Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo2.png"
                alt="Logo PT Food Quality Certification"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div>
                <h1 className="font-black text-xs sm:text-sm text-slate-900 tracking-tight font-heading leading-tight">
                  PT FOOD QUALITY
                </h1>
                <p className="text-[9px] font-extrabold tracking-widest text-brand-cyan uppercase">
                  CERTIFICATION
                </p>
              </div>
            </div>

            {/* Mobile Beranda Link */}
            <a
              href="/"
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition-colors"
            >
              <span>🏠</span>
              <span>Beranda</span>
            </a>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-md mx-auto py-8 sm:py-12 space-y-6">
            
            {/* Header Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
                Selamat Datang!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                Silakan login untuk mengakses Dashboard Admin.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl font-bold text-xs text-center animate-fade-in">
                  ⚠ {loginError}
                </div>
              )}

              {/* Username Input with Mail Icon */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase font-heading block">
                  USERNAME / EMAIL ADDRESS
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 text-sm">
                    ✉️
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-brand-blue transition-all"
                  />
                </div>
              </div>

              {/* Password Input with Lock & Eye Toggle Icon */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase font-heading block">
                  PASSWORD
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 text-sm">
                    🔒
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-brand-blue transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-slate-300"
                  />
                  <span>Ingat Saya</span>
                </label>
              </div>

              {/* LOGIN BUTTON (Corporate Brand Blue Pill) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-blue hover:bg-brand-navy text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-none active:scale-98 text-center"
                >
                  LOGIN
                </button>
              </div>
            </form>

          </div>

          {/* Left Footer Copyright */}
          <div className="text-center text-[11px] text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} PT Food Quality Certification. Developed by IT FQCert.
          </div>

        </div>

        {/* RIGHT PANEL: SHOWCASE WITH OVERLAY & TOP BERANDA BUTTON (Visible on desktop >= lg) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 flex-col justify-between p-12 overflow-hidden">
          
          {/* Background Photo with Dark Gradient Overlay */}
          <img
            src="/hero1.jpg"
            alt="PT Food Quality Certification Showcase"
            className="absolute inset-0 w-full h-full object-cover opacity-30 filter scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#021526]/95 via-[#0a4b7c]/85 to-[#021526]/95 pointer-events-none" />

          {/* Top-Right Beranda Button */}
          <div className="relative z-20 flex justify-end">
            <a
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full border border-white/20 backdrop-blur-md transition-all duration-200 shadow-lg active:scale-95"
            >
              <span>🏠</span>
              <span>Beranda</span>
            </a>
          </div>

          {/* Showcase Quote Content */}
          <div className="relative z-20 max-w-xl my-auto space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black font-heading leading-tight text-white tracking-tight uppercase">
              MITRA TERPERCAYA SERTIFIKASI KEAMANAN PANGAN
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed italic">
              &ldquo;Mewujudkan industri pangan Indonesia yang aman, higienis, dan bermutu tinggi melalui pengujian dan akreditasi sertifikasi HACCP terakreditasi Komite Akreditasi Nasional (KAN).&rdquo;
            </p>
            <div className="w-14 h-1.5 bg-amber-400 rounded-full mt-4" />
          </div>

          {/* Right Bottom Footer Tag */}
          <div className="relative z-20 text-slate-400 text-[11px] font-semibold tracking-wider uppercase">
            Lembaga Sertifikasi HACCP Terakreditasi KAN (LSHACCP-009-IDN)
          </div>

        </div>

      </div>
    );
  }

  // --- RENDERING ADMIN WORKSPACE PANEL ---
  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogoutPrompt}
    >
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-navy/30 border-t-brand-navy animate-spin mx-auto rounded-full"></div>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
            Memuat Data Dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* TAB 1: DASHBOARD OVERVIEW SUMMARY */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Statistic widgets grid - Responsive 2-Column Mobile & 3-Column Desktop Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-6">
                
                {/* Stats 1: Inquiries */}
                <div
                  onClick={() => setActiveTab("sertifikasi")}
                  className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 text-brand-blue flex items-center justify-center text-xl sm:text-2xl shadow-inner">
                      📝
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-wide border border-emerald-200/50">
                      +12.5% Active
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block truncate">
                      Pendaftar Sertifikasi
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mt-1">
                      {inquiries.length} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Berkas</span>
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span className="truncate">Lihat Semua</span>
                    <span>&rarr;</span>
                  </div>
                </div>

                {/* Stats 2: Team Members */}
                <div
                  onClick={() => setActiveTab("pegawai")}
                  className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-xl sm:text-2xl shadow-inner">
                      👥
                    </div>
                    <span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-wide border border-indigo-200/50">
                      Expert Team
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block truncate">
                      Auditor &amp; Personel
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mt-1">
                      {teamMembers.length} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Orang</span>
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span className="truncate">Kelola Tim</span>
                    <span>&rarr;</span>
                  </div>
                </div>

                {/* Stats 3: Proyek & Sektor */}
                <div
                  onClick={() => setActiveTab("proyek")}
                  className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group space-y-3 sm:space-y-4 col-span-2 sm:col-span-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl sm:text-2xl shadow-inner">
                      🏗️
                    </div>
                    <span className="bg-amber-50 text-amber-600 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-wide border border-amber-200/50">
                      Live Projects
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block truncate">
                      Kategori Sektor
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mt-1">
                      {projects.length} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Proyek</span>
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-amber-600 group-hover:translate-x-1 transition-transform">
                    <span className="truncate">Kelola Sektor</span>
                    <span>&rarr;</span>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Action Grid */}
              <div className="bg-white border border-slate-200/80 p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase font-heading">
                    Aksi Pintar Administrator
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">Pintasan Cepat</span>
                </div>
                
                {/* 2-Column Grid on Mobile, Single Column on Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setActiveTab("sertifikasi")}
                    className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs transition-all duration-200 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-slate-50/80 bg-white cursor-pointer rounded-2xl shadow-xs hover:shadow-sm group space-y-2 lg:space-y-0"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-brand-blue flex items-center justify-center text-sm shrink-0">📊</span>
                      <span className="text-slate-800 font-extrabold text-[11px] sm:text-xs">Ekspor Data</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform hidden lg:inline">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("proyek")}
                    className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs transition-all duration-200 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-slate-50/80 bg-white cursor-pointer rounded-2xl shadow-xs hover:shadow-sm group space-y-2 lg:space-y-0"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-sm shrink-0">🏗️</span>
                      <span className="text-slate-800 font-extrabold text-[11px] sm:text-xs">Kelola Proyek</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform hidden lg:inline">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("pegawai")}
                    className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs transition-all duration-200 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-slate-50/80 bg-white cursor-pointer rounded-2xl shadow-xs hover:shadow-sm group space-y-2 lg:space-y-0"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm shrink-0">👥</span>
                      <span className="text-slate-800 font-extrabold text-[11px] sm:text-xs">Kelola Auditor</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform hidden lg:inline">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("galeri")}
                    className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs transition-all duration-200 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-slate-50/80 bg-white cursor-pointer rounded-2xl shadow-xs hover:shadow-sm group space-y-2 lg:space-y-0"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-sm shrink-0">📸</span>
                      <span className="text-slate-800 font-extrabold text-[11px] sm:text-xs">Foto Galeri</span>
                    </div>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform hidden lg:inline">&rarr;</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CERTIFICATION MANAGEMENTS */}
          {activeTab === "sertifikasi" && (
            <AdminSertifikasi inquiries={inquiries} onUpdateStatus={handleUpdateStatus} />
          )}

          {/* TAB 3: PROJECT MANAGEMENTS */}
          {activeTab === "proyek" && (
            <AdminProyek projects={projects} onRefresh={fetchData} />
          )}

          {/* TAB 4: TEAM / PEGAWAI MANAGEMENTS */}
          {activeTab === "pegawai" && (
            <AdminTim teamMembers={teamMembers} onRefresh={fetchData} />
          )}

          {/* TAB 5: GALLERY MANAGEMENTS */}
          {activeTab === "galeri" && <AdminGaleri gallery={gallery} onRefresh={fetchData} />}
        </>
      )}

      {/* CONFIRMATION MODAL FOR LOGOUT */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Keluar dari Panel Admin?"
        message="Sesi aktif administrator Anda akan ditutup. Anda harus memasukkan kredensial lagi untuk masuk."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="warning"
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </AdminLayout>
  );
}
