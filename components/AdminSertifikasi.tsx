"use client";

import React, { useState } from "react";
import { SertifikasiInquiry } from "../lib/db";
import { useToast } from "../context/ToastContext";

interface AdminSertifikasiProps {
  inquiries: SertifikasiInquiry[];
  onUpdateStatus: (id: string, newStatus: string) => void;
}

export default function AdminSertifikasi({ inquiries, onUpdateStatus }: AdminSertifikasiProps) {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter inquiries based on search term, industry, and status sub-tab
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.picName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "all" || inq.industry === selectedIndustry;

    const matchesStatus =
      statusFilter === "all" || inq.haccpStatus === statusFilter;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // EXPORT TO EXCEL (.xls HTML Spreadsheet format for neat, formatted table opening in Microsoft Excel)
  const exportToExcel = () => {
    const formattedRows = filteredInquiries.map((inq, index) => {
      const formattedDate = new Date(inq.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      return `
        <tr style="background-color: ${index % 2 === 0 ? "#ffffff" : "#f8fafc"};">
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; font-family: monospace; text-align: center;">${inq.ticketNumber}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${formattedDate}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">${inq.companyName}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${inq.companyAddress || "-"}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${inq.picName}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${inq.phone}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${inq.email}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${inq.industry}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-weight: bold;">${inq.haccpStatus}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${inq.message || "-"}</td>
        </tr>
      `;
    }).join("");

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Laporan Pengajuan HACCP</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
      </head>
      <body>
        <h2 style="font-family: Arial, sans-serif; color: #0c4a2e; margin-bottom: 4px;">PT. FOOD QUALITY CERTIFICATION</h2>
        <p style="font-family: Arial, sans-serif; color: #475569; font-size: 12px; margin-top: 0;">TAJEM RT 004 RW 031, Maguwoharjo, Depok, Sleman, DIY 55282 | Laporan Pengajuan Sertifikasi HACCP</p>
        <table style="font-family: Arial, sans-serif; font-size: 12px; border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #0c4a2e; color: #ffffff; font-weight: bold; text-align: center;">
              <th style="border: 1px solid #083621; padding: 10px;">Nomor Tiket</th>
              <th style="border: 1px solid #083621; padding: 10px;">Tanggal Masuk</th>
              <th style="border: 1px solid #083621; padding: 10px;">Nama Perusahaan</th>
              <th style="border: 1px solid #083621; padding: 10px;">Alamat Perusahaan</th>
              <th style="border: 1px solid #083621; padding: 10px;">Nama PIC</th>
              <th style="border: 1px solid #083621; padding: 10px;">Nomor WhatsApp</th>
              <th style="border: 1px solid #083621; padding: 10px;">Email</th>
              <th style="border: 1px solid #083621; padding: 10px;">Sektor Industri</th>
              <th style="border: 1px solid #083621; padding: 10px;">Status HACCP</th>
              <th style="border: 1px solid #083621; padding: 10px;">Pesan Tambahan</th>
            </tr>
          </thead>
          <tbody>
            ${formattedRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan_sertifikasi_haccp_${Date.now()}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      title: "Ekspor Berhasil",
      message: `File laporan Excel dengan ${filteredInquiries.length} data berhasil diunduh.`,
      type: "success",
    });
  };

  // PRINT / EXPORT TO PDF
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* CSS STYLES FOR LANDSCAPE PRINT LAYOUT */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print-hide {
            display: none !important;
          }
          .print-show {
            display: block !important;
          }
          @page {
            size: landscape;
            margin: 15mm;
          }
          .print-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          th, td {
            border: 1px solid #333 !important;
            padding: 6px 8px !important;
            font-size: 10px !important;
            text-align: left !important;
          }
          th {
            background-color: #f1f5f9 !important;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* HEADER & FILTER BAR TOOLBAR - DRIBBBLE ROUNDED CARD WITH CETAK PDF BUTTON */}
      <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-xs space-y-5 print-hide">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 font-heading">
              Data Pengajuan Sertifikasi HACCP
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Kelola dan cetak laporan permohonan sertifikasi yang dikirimkan calon klien.
            </p>
          </div>

          {/* Action Export and Print Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={exportToExcel}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all duration-200 cursor-pointer rounded-xl border border-slate-200/80 shadow-xs active:scale-98 flex items-center gap-2"
            >
              <span>📊</span>
              <span>Ekspor Excel</span>
            </button>
            <button
              onClick={triggerPrint}
              className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs transition-all duration-200 cursor-pointer rounded-xl border-none shadow-md shadow-brand-navy/20 active:scale-98 flex items-center gap-2"
            >
              <span>🖨️</span>
              <span>Cetak PDF</span>
            </button>
          </div>
        </div>

        {/* SEARCH & SEKTOR FILTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Cari Perusahaan, PIC, atau No Tiket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:bg-white focus:outline-brand-blue transition-all"
            />
          </div>

          {/* Sektor Industri Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold focus:bg-white focus:outline-brand-blue transition-all cursor-pointer"
          >
            <option value="all">Semua Sektor Industri</option>
            <option value="Produk Bakeri">Produk Bakeri</option>
            <option value="Daging dan Produk Daging">Daging dan Produk Daging</option>
            <option value="Pangan Olahan untuk Keperluan Gizi Khusus">Pangan Olahan untuk Keperluan Gizi Khusus</option>
            <option value="Jasa Boga / Pelayanan Pangan / SPPG">Jasa Boga / Pelayanan Pangan / SPPG</option>
          </select>
        </div>
      </div>

      {/* STATUS FILTER SUB-TABS (ROUNDED PILL FILTER BAR) */}
      <div className="flex flex-wrap gap-2 print-hide">
        {[
          { id: "all", label: "Semua Status", count: inquiries.length },
          {
            id: "Belum Diterapkan",
            label: "Belum Diterapkan",
            count: inquiries.filter((i) => i.haccpStatus === "Belum Diterapkan").length
          },
          {
            id: "Sedang Persiapan",
            label: "Sedang Persiapan",
            count: inquiries.filter((i) => i.haccpStatus === "Sedang Persiapan").length
          },
          {
            id: "Sudah Diterapkan",
            label: "Sudah Diterapkan",
            count: inquiries.filter((i) => i.haccpStatus === "Sudah Diterapkan").length
          }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`py-2 px-4 text-xs font-extrabold transition-all duration-200 border cursor-pointer rounded-full flex items-center gap-2 ${
              statusFilter === tab.id
                ? "bg-brand-navy text-white border-brand-navy shadow-md shadow-brand-navy/20"
                : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 shadow-xs"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-2 py-0.5 font-black rounded-full ${
                statusFilter === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* NO DATA STATE */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl py-16 text-center text-slate-400 font-medium shadow-xs">
          Tidak ada data pengajuan dengan status ini yang cocok dengan pencarian Anda.
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE VIEW - DRIBBBLE ROUNDED TABLE CARD */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs print-hide">
            <table className="min-w-full divide-y divide-slate-100 text-left border-collapse text-xs">
              <thead className="bg-slate-50/80 uppercase font-black text-slate-400 tracking-wider">
                <tr>
                  <th className="px-6 py-4">No. Tiket</th>
                  <th className="px-6 py-4">Perusahaan</th>
                  <th className="px-6 py-4">PIC</th>
                  <th className="px-6 py-4">Sektor Industri</th>
                  <th className="px-6 py-4">Kesiapan HACCP</th>
                  <th className="px-6 py-4">Tanggal Masuk</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredInquiries.map((inq) => (
                  <React.Fragment key={inq.id}>
                    <tr
                      onClick={() => toggleExpand(inq.id)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-extrabold text-brand-blue font-mono">
                        <span className="bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-200/50">
                          {inq.ticketNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">{inq.companyName}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">{inq.picName}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{inq.industry}</td>
                      
                      {/* Interactive Status Select Dropdown with Pill styling */}
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={inq.haccpStatus}
                          onChange={(e) => onUpdateStatus(inq.id, e.target.value)}
                          className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide border rounded-full focus:outline-none cursor-pointer bg-white transition-all ${
                            inq.haccpStatus === "Sudah Diterapkan"
                              ? "text-emerald-700 border-emerald-300 bg-emerald-50"
                              : inq.haccpStatus === "Sedang Persiapan"
                              ? "text-amber-700 border-amber-300 bg-amber-50"
                              : "text-slate-600 border-slate-300 bg-slate-100"
                          }`}
                        >
                          <option value="Belum Diterapkan">Belum Diterapkan</option>
                          <option value="Sedang Persiapan">Sedang Persiapan</option>
                          <option value="Sudah Diterapkan">Sudah Diterapkan</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-slate-400 font-medium">
                        {new Date(inq.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[11px] font-extrabold uppercase tracking-widest text-[#0a5c36] hover:underline cursor-pointer border-none bg-transparent">
                          {expandedId === inq.id ? "Tutup ▲" : "Detail ▼"}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED ROW DETAIL */}
                    {expandedId === inq.id && (
                      <tr className="bg-slate-50/30">
                        <td colSpan={7} className="px-6 py-6 border-y border-slate-100">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Contact Details */}
                            <div className="space-y-2 border-r border-slate-200 pr-4">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                Kontak Informasi &amp; Alamat
                              </h4>
                              <div className="space-y-1.5 text-xs">
                                <p className="font-bold text-slate-700">
                                  📍 Alamat: <span className="font-normal text-slate-600">{inq.companyAddress || "-"}</span>
                                </p>
                                <p className="font-bold text-slate-700">
                                  📞 WhatsApp:{" "}
                                  <a
                                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-blue hover:underline"
                                  >
                                    {inq.phone}
                                  </a>
                                </p>
                                <p className="font-bold text-slate-700">
                                  ✉️ Email:{" "}
                                  <a href={`mailto:${inq.email}`} className="text-brand-blue hover:underline">
                                    {inq.email}
                                  </a>
                                </p>
                              </div>
                            </div>

                            {/* Inquiry Message */}
                            <div className="md:col-span-2 space-y-2">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                Pesan Pengajuan / Scope Keterangan
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal bg-white p-3 border border-slate-200">
                                {inq.message || "(Tidak ada pesan tambahan dari pengirim)"}
                              </p>
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* DEDICATED PRINT VIEW CONTAINER (print-show - hidden by default on screen) */}
          <div className="hidden print-show print-container w-full font-sans">
            
            {/* Official Kop Surat (Letterhead) */}
            <div className="border-b-2 border-slate-900 pb-3 mb-6 flex items-center justify-between">
              <div className="w-24 shrink-0 flex items-center justify-start">
                <img
                  src="/logo2.png"
                  alt="Logo PT Food Quality Certification"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="flex-1 text-center px-4">
                <h1 className="text-xl sm:text-2xl font-black uppercase font-heading text-slate-900 tracking-wide leading-tight">
                  PT. FOOD QUALITY CERTIFICATION
                </h1>
                <p className="text-xs text-slate-800 font-medium leading-relaxed mt-1">
                  TAJEM RT 004 RW 031 , RT 004, RW 031, Maguwoharjo, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55282,
                </p>
              </div>
              <div className="w-24 shrink-0"></div>
            </div>

            {/* Document Title */}
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-sm font-bold uppercase text-slate-800">
                  Laporan Pengajuan Permohonan Sertifikasi HACCP
                </h2>
                <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                  Filter Industri: {selectedIndustry === "all" ? "Semua Sektor" : selectedIndustry} | Status: {statusFilter === "all" ? "Semua Status" : statusFilter}
                </p>
              </div>
              <p className="text-[10px] text-slate-600 font-semibold">
                Tanggal Cetak: {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>

            {/* Print Table */}
            <table className="w-full">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>No. Tiket</th>
                  <th style={{ width: '15%' }}>Nama Perusahaan</th>
                  <th style={{ width: '18%' }}>Alamat Perusahaan</th>
                  <th style={{ width: '11%' }}>Nama PIC</th>
                  <th style={{ width: '12%' }}>No. WA / HP</th>
                  <th style={{ width: '14%' }}>Email</th>
                  <th style={{ width: '12%' }}>Sektor Industri</th>
                  <th style={{ width: '8%' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td className="font-bold">{inq.ticketNumber}</td>
                    <td className="font-semibold">{inq.companyName}</td>
                    <td>{inq.companyAddress || "-"}</td>
                    <td>{inq.picName}</td>
                    <td>{inq.phone}</td>
                    <td>{inq.email}</td>
                    <td>{inq.industry}</td>
                    <td>{inq.haccpStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
}
