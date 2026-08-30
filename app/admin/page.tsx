"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminSertifikasi from "../../components/AdminSertifikasi";
import AdminGaleri from "../../components/AdminGaleri";
import AdminTim from "../../components/AdminTim";
import AdminProyek from "../../components/AdminProyek";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Database, ShieldCheck } from "lucide-react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Global Alert Notification Toast state
  const [adminAlert, setAdminAlert] = useState<{
    type: "success" | "destructive" | "info" | "warning";
    title: string;
    message: string;
  } | null>(null);

  const triggerAlert = (type: "success" | "destructive" | "info" | "warning", title: string, message: string) => {
    setAdminAlert({ type, title, message });
    setTimeout(() => {
      setAdminAlert(null);
    }, 4500);
  };

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
      await fetchData();
      triggerAlert("success", "Status Berhasil Diperbarui", `Status pengajuan telah diubah menjadi "${newStatus}".`);
    } catch (err) {
      console.error("Failed to update status:", err);
      triggerAlert("destructive", "Gagal Memperbarui Status", "Terjadi kesalahan koneksi saat menyimpan status.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Handle Login Validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (username === "admin" && password === "haccp2026") {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fq_admin_session", "true");
      }
      triggerAlert("success", "Login Berhasil", "Selamat datang kembali di Panel Admin.");
    } else {
      setLoginError("Kombinasi Username atau Password salah.");
    }
  };

  // Handle Session Termination
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("fq_admin_session");
      }
    }
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

            {/* Login Form with Shadcn Alert on Error */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <Alert variant="destructive" className="animate-fade-in bg-rose-50 border-rose-200">
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                  <AlertTitle className="text-rose-900 font-bold">Autentikasi Gagal</AlertTitle>
                  <AlertDescription className="text-rose-700 text-xs">{loginError}</AlertDescription>
                </Alert>
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
                    placeholder="nama@fqcert.com atau username admin..."
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
                    placeholder="••••••••"
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

              {/* Checkbox & Forgot Password Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-slate-300"
                  />
                  <span>Ingat Saya</span>
                </label>
                <a
                  href="#hint"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Kredensial Pengujian: Username = admin | Password = haccp2026");
                  }}
                  className="font-bold text-slate-500 hover:text-brand-blue transition-colors"
                >
                  Lupa Password?
                </a>
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

              {/* Credential Hint Box */}
              <div className="bg-blue-50/60 border border-blue-200/60 p-3.5 rounded-2xl text-xs text-slate-600 space-y-1">
                <p className="font-extrabold text-brand-navy text-[11px] uppercase tracking-wider">
                  💡 Kredensial Pengujian Administrator:
                </p>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span>Username: <code className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">admin</code></span>
                  <span>Password: <code className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">haccp2026</code></span>
                </div>
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
      onLogout={handleLogout}
    >
      {/* FLOATING SHADCN ALERT NOTIFICATION TOAST */}
      {adminAlert && (
        <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-fade-in shadow-2xl">
          <Alert variant={adminAlert.type} className="border shadow-lg bg-white/95 backdrop-blur-md">
            {adminAlert.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
            {adminAlert.type === "destructive" && <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />}
            {adminAlert.type === "info" && <Info className="h-5 w-5 text-blue-600 shrink-0" />}
            {adminAlert.type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />}
            <div className="flex justify-between items-start w-full ml-1">
              <div>
                <AlertTitle className="font-bold text-sm leading-tight">{adminAlert.title}</AlertTitle>
                <AlertDescription className="text-xs text-slate-600 mt-0.5 leading-relaxed">{adminAlert.message}</AlertDescription>
              </div>
              <button
                onClick={() => setAdminAlert(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold ml-2 p-1 cursor-pointer bg-transparent border-none"
              >
                ✕
              </button>
            </div>
          </Alert>
        </div>
      )}

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
              
              {/* SYSTEM STATUS SHADCN ALERT */}
              <Alert variant="info" className="bg-blue-50/80 border-blue-200">
                <Database className="h-4 w-4 text-brand-blue" />
                <AlertTitle className="text-blue-900 font-bold">Sinkronisasi Database Cloud Terhubung</AlertTitle>
                <AlertDescription className="text-blue-700 text-xs">
                  Semua data pengajuan sertifikasi, galeri foto, proyek client, dan tim auditor tersinkronisasi secara real-time ke Supabase & LocalStorage.
                </AlertDescription>
              </Alert>

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
                    <span className="bg-blue-50 text-blue-600 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-wide border border-blue-200/50">
                      Tim Auditor
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block truncate">
                      Auditor &amp; Tim Ahli
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mt-1">
                      {teamMembers.length} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Personel</span>
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span className="truncate">Kelola Tim</span>
                    <span>&rarr;</span>
                  </div>
                </div>

                {/* Stats 3: Gallery - Full width on mobile row 2 */}
                <div
                  onClick={() => setActiveTab("galeri")}
                  className="col-span-2 sm:col-span-1 bg-white border border-slate-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-xl sm:text-2xl shadow-inner">
                      🖼️
                    </div>
                    <span className="bg-cyan-50 text-cyan-700 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-wide border border-cyan-200/50">
                      Dokumentasi Foto
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-heading block truncate">
                      Album Foto Kegiatan
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mt-1">
                      {gallery.length} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Foto</span>
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-extrabold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span className="truncate">Kelola Galeri Foto</span>
                    <span>&rarr;</span>
                  </div>
                </div>

              </div>

              {/* Two Column details dashboard: Recent submissions and Quick Operations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Column Left: Recent submittal list (Span 8) */}
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-xs">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tracking-tight">
                        Pengajuan Sertifikasi Terbaru
                      </h4>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Permohonan sertifikasi HACCP yang baru saja dikirimkan klien.
                      </p>
                    </div>
                    <span className="bg-brand-blue/10 text-brand-blue text-[9px] sm:text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shrink-0">
                      Recent Entry
                    </span>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="text-slate-400 text-xs py-8 text-center font-medium">Belum ada pengajuan masuk saat ini.</p>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {inquiries.slice(0, 4).map((inq) => (
                        <div key={inq.id} className="py-3.5 sm:py-4 flex items-center justify-between text-xs gap-3 sm:gap-4 hover:bg-slate-50/60 p-2 sm:p-2.5 rounded-2xl transition-colors">
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 font-black flex items-center justify-center text-xs sm:text-sm shrink-0 border border-slate-200">
                              {inq.companyName.charAt(0)}
                            </div>
                            <div className="space-y-0.5 sm:space-y-1 min-w-0">
                              <h5 className="font-extrabold text-slate-900 truncate text-xs sm:text-sm">{inq.companyName}</h5>
                              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                                PIC: {inq.picName} | {inq.phone}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono font-extrabold text-slate-700 block text-[10px] sm:text-xs bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                              {inq.ticketNumber}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 block mt-0.5 sm:mt-1">
                              {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab("sertifikasi")}
                      className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border border-slate-200 rounded-xl sm:rounded-2xl text-center shadow-xs"
                    >
                      Buka Semua Pengajuan Sertifikasi &rarr;
                    </button>
                  </div>
                </div>

                {/* Column Right: Fast operations (Span 4) - 2x2 Grid on Mobile */}
                <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 sm:space-y-6 shadow-xs">
                  <div className="pb-3 sm:pb-4 border-b border-slate-100">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tracking-tight">
                      Aksi Cepat Admin
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Navigasi kilat ke modul manajemen.
                    </p>
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

            </div>
          )}

          {/* TAB 2: CERTIFICATION MANAGEMENTS */}
          {activeTab === "sertifikasi" && (
            <AdminSertifikasi inquiries={inquiries} onUpdateStatus={handleUpdateStatus} triggerAlert={triggerAlert} />
          )}

          {/* TAB 3: PROJECT MANAGEMENTS */}
          {activeTab === "proyek" && (
            <AdminProyek projects={projects} onRefresh={fetchData} triggerAlert={triggerAlert} />
          )}

          {/* TAB 4: TEAM / PEGAWAI MANAGEMENTS */}
          {activeTab === "pegawai" && (
            <AdminTim teamMembers={teamMembers} onRefresh={fetchData} triggerAlert={triggerAlert} />
          )}

          {/* TAB 5: GALLERY MANAGEMENTS */}
          {activeTab === "galeri" && (
            <AdminGaleri gallery={gallery} onRefresh={fetchData} triggerAlert={triggerAlert} />
          )}
        </>
      )}
    </AdminLayout>
  );
}
