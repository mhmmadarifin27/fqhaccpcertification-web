"use client";

import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const menuItems = [
    { id: "dashboard", label: "Dashboard Ringkasan", icon: "📊" },
    { id: "sertifikasi", label: "Ajukan Sertifikasi", icon: "📝" },
    { id: "proyek", label: "Kelola Proyek / Sektor", icon: "🏗️" },
    { id: "pegawai", label: "Kelola Pegawai / Tim", icon: "👥" },
    { id: "galeri", label: "Kelola Galeri Foto", icon: "🖼️" }
  ];

  return (
    <Sidebar className="border-r border-slate-200/80 bg-slate-950 text-white">
      {/* BRAND HEADER */}
      <SidebarHeader className="p-4 border-b border-white/10 flex flex-col justify-center">
        <div className="flex items-center gap-3 w-full justify-center">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-1.5 shrink-0 shadow-inner">
            <img
              src="/logo2.png"
              alt="Logo PT Food Quality Certification"
              className="w-full h-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h1 className="font-black text-xs tracking-widest leading-none text-white font-heading truncate">
                FOOD QUALITY
              </h1>
              <p className="text-[9px] font-extrabold tracking-widest text-brand-cyan uppercase mt-1">
                CERTIFICATION
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* PROFILE PILL CARD */}
      <div className={cn(
        "my-4 border border-white/10 rounded-2xl flex items-center transition-all duration-300",
        isCollapsed ? "mx-2 p-2 justify-center bg-transparent" : "mx-4 p-3 bg-white/5 gap-3"
      )}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-500 border border-white/20 flex items-center justify-center font-extrabold text-white text-sm shadow-sm shrink-0">
          A
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white leading-tight truncate">Administrator</h4>
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse shrink-0"></span>
              Active Session
            </p>
          </div>
        )}
      </div>

      {/* NAVIGATION MENU */}
      <SidebarContent className={isCollapsed ? "px-2 py-2" : "px-4 py-2"}>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase px-2 mb-2">
              NAVIGATION MENU
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={isCollapsed ? "justify-center px-0 py-3 rounded-xl" : ""}
                  >
                    <span className={isCollapsed ? "text-xl" : "text-base"}>{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER LOGOUT BUTTON */}
      <SidebarFooter className="p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          title={isCollapsed ? "Keluar Panel" : undefined}
          className={cn(
            "w-full bg-rose-900/80 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 border border-rose-700/50 cursor-pointer rounded-xl flex items-center justify-center shadow-md hover:shadow-lg active:scale-95",
            isCollapsed ? "py-3 text-lg" : "py-3 px-4 gap-2"
          )}
        >
          <span>🚪</span>
          {!isCollapsed && <span>Keluar Panel</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AdminLayout({
  children,
  activeTab,
  setActiveTab,
  onLogout
}: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-[#f8fafc] text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
        
        {/* SHADCN COLLAPSIBLE SIDEBAR */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        {/* MAIN WORKSPACE INSET */}
        <SidebarInset>
          {/* FLUID TOP HEADER BAR */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-4 px-6 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-20 print:hidden shadow-xs">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {activeTab === "dashboard" && "Dashboard Ringkasan Analytics"}
                  {activeTab === "sertifikasi" && "Pengajuan Sertifikasi HACCP"}
                  {activeTab === "proyek" && "Kelola Proyek / Sektor Client"}
                  {activeTab === "pegawai" && "Kelola Pegawai & Tim Auditor"}
                  {activeTab === "galeri" && "Kelola Galeri Dokumentasi"}
                </h2>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Selamat datang kembali, Administrator PT Food Quality Certification.
                </p>
              </div>
            </div>

            {/* Header Right Widgets: Live Badge */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>Portal Live Status</span>
              </div>
            </div>
          </header>

          {/* WORKSPACE CONTENT AREA */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}
