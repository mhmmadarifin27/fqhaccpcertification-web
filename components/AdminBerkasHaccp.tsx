"use client";

import React, { useState } from "react";
import { HaccpDocSubmission, updateHaccpDocStatus, deleteHaccpDocSubmission } from "../lib/db";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "./ConfirmModal";

interface AdminBerkasHaccpProps {
  documents: HaccpDocSubmission[];
  onRefresh: () => void;
}

export default function AdminBerkasHaccp({ documents, onRefresh }: AdminBerkasHaccpProps) {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<HaccpDocSubmission | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    ticket: string;
    company: string;
  }>({
    isOpen: false,
    id: "",
    ticket: "",
    company: "",
  });

  const filteredDocs = documents.filter((doc) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      doc.companyName.toLowerCase().includes(term) ||
      doc.picName.toLowerCase().includes(term) ||
      doc.ticketNumber.toLowerCase().includes(term) ||
      doc.productScope.toLowerCase().includes(term) ||
      doc.fileName.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || doc.documentCategory === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = async (id: string, newStatus: HaccpDocSubmission["status"]) => {
    try {
      await updateHaccpDocStatus(id, newStatus);
      showToast({
        title: "Status Berkas Diperbarui",
        message: `Status verifikasi berkas berhasil diubah menjadi "${newStatus}".`,
        type: "success"
      });
      onRefresh();
    } catch (err) {
      console.error("Failed to update doc status:", err);
      showToast({
        title: "Gagal Update",
        message: "Terjadi kendala saat memperbarui status berkas.",
        type: "error"
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteHaccpDocSubmission(deleteModal.id);
      showToast({
        title: "Berkas Dihapus",
        message: `Dokumen ${deleteModal.ticket} dari "${deleteModal.company}" telah dihapus.`,
        type: "success"
      });
      setDeleteModal({ isOpen: false, id: "", ticket: "", company: "" });
      onRefresh();
    } catch (err) {
      console.error("Delete doc error:", err);
      showToast({
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus berkas.",
        type: "error"
      });
    }
  };

  const getStatusBadge = (status: HaccpDocSubmission["status"]) => {
    switch (status) {
      case "verified":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">✓ Lolos Verifikasi Dokumen</span>;
      case "under_review":
        return <span className="bg-blue-50 text-brand-navy border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">🔍 Sedang Ditinjau Auditor</span>;
      case "need_revision":
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">⚠️ Perlu Revisi / Tambahan</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">📥 Berkas Baru Diterima</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Kelola Berkas Persiapan Audit HACCP
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dokumen pra-audit (Manual HACCP, CCP Matrix, Flow Diagram, SK Tim) yang diunggah pemohon sebelum audit tahap 1.
            </p>
          </div>
          <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-2xl text-xs font-bold shrink-0 self-start sm:self-auto">
            Total: <span className="text-brand-navy font-black text-sm">{documents.length}</span> Berkas Masuk
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-6 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Cari Tiket, Perusahaan, PIC, atau Nama File..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            >
              <option value="all">Semua Kategori Dokumen</option>
              <option value="bundle-sni-cxc-1">Bundel Lengkap SNI CXC 1:1969</option>
              <option value="ghp-gmp-section1">Bagian 1: GHP / GMP</option>
              <option value="haccp-plan-section2">Bagian 2: Rencana HACCP</option>
              <option value="flow-diagram-layout">Diagram Alir & Layout</option>
              <option value="sk-tim-kompetensi">SK Tim & Personel</option>
              <option value="legalitas-lab-test">Legalitas & Uji Lab</option>
              <option value="internal-audit-monev">Audit Internal</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            >
              <option value="all">Semua Status Verifikasi</option>
              <option value="submitted">Baru Diterima</option>
              <option value="under_review">Sedang Ditinjau</option>
              <option value="verified">Lolos Verifikasi</option>
              <option value="need_revision">Perlu Revisi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <table className="min-w-full divide-y divide-slate-100 text-left border-collapse text-xs">
          <thead className="bg-slate-50/80 uppercase font-black text-slate-400 tracking-wider">
            <tr>
              <th className="px-6 py-4">Tiket & Tanggal</th>
              <th className="px-6 py-4">Perusahaan & PIC</th>
              <th className="px-6 py-4">Kategori & Lampiran Berkas</th>
              <th className="px-6 py-4">Status Review</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-normal">
                  Tidak ada berkas persiapan audit yang sesuai.
                </td>
              </tr>
            ) : (
              filteredDocs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-brand-navy font-mono text-xs">{item.ticketNumber}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-slate-900 text-sm leading-snug">{item.companyName}</p>
                    <p className="text-[11px] text-slate-500 font-normal">PIC: {item.picName} ({item.picPhone})</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">📦 Ruang Lingkup: {item.productScope}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-xs">{item.documentCategoryLabel}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-brand-blue font-mono font-medium">
                      <span>📄</span>
                      <span className="truncate max-w-xs">{item.fileName}</span>
                      {item.fileSize && <span className="text-slate-400 text-[10px]">({item.fileSize})</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as HaccpDocSubmission["status"])}
                      className="text-[11px] font-bold py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer focus:outline-brand-blue"
                    >
                      <option value="submitted">📥 Diterima</option>
                      <option value="under_review">🔍 Ditinjau</option>
                      <option value="verified">✓ Lolos</option>
                      <option value="need_revision">⚠️ Revisi</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1.5 bg-brand-navy text-white font-bold text-[10px] uppercase tracking-wider rounded-lg cursor-pointer border-none shadow-2xs hover:bg-brand-navy-dark"
                    >
                      Detail & Unduh
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: item.id, ticket: item.ticketNumber, company: item.companyName })}
                      className="px-3 py-1.5 bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg cursor-pointer border-none shadow-2xs hover:bg-rose-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-slate-200/80 shadow-2xl w-full max-w-xl overflow-hidden my-8 rounded-3xl">
            <div className="bg-brand-navy text-white py-5 px-6 flex items-center justify-between border-b border-white/10">
              <div className="space-y-0.5">
                <span className="text-[10px] text-brand-cyan uppercase font-bold tracking-widest">Detail Berkas Persiapan Audit</span>
                <h3 className="font-extrabold text-base font-heading">{selectedItem.ticketNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white hover:text-brand-cyan border-none bg-transparent cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Nama Perusahaan:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{selectedItem.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">PIC / Lead Tim HACCP:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{selectedItem.picName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">WhatsApp:</span>
                  <span className="font-bold text-slate-800">{selectedItem.picPhone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Perusahaan:</span>
                  <span className="font-bold text-slate-800">{selectedItem.picEmail}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Ruang Lingkup Produk Pangan:</span>
                <p className="font-bold text-slate-900 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                  📦 {selectedItem.productScope}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Kategori Dokumen:</span>
                <p className="font-bold text-brand-blue text-sm">
                  {selectedItem.documentCategoryLabel}
                </p>
              </div>

              {/* File Attachment Box with Download Button */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">File Dokumen Terlampir:</span>
                  <p className="font-mono font-bold text-slate-900 text-xs truncate mt-0.5">{selectedItem.fileName}</p>
                  {selectedItem.fileSize && <span className="text-[10px] text-slate-400">Ukuran: {selectedItem.fileSize}</span>}
                </div>
                {selectedItem.fileData ? (
                  <a
                    href={selectedItem.fileData}
                    download={selectedItem.fileName}
                    className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <span>⬇️ Unduh Berkas</span>
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-400 italic">File data simulasi</span>
                )}
              </div>

              {selectedItem.notes && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Keterangan / Catatan Tambahan:</span>
                  <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl italic text-slate-600">
                    &ldquo;{selectedItem.notes}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-bold">Status:</span>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <a
                  href={`https://wa.me/${selectedItem.picPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo Bapak/Ibu ${selectedItem.picName} dari ${selectedItem.companyName}, kami dari Tim Verifikator PT Food Quality Certification terkait dokumen persiapan audit ${selectedItem.documentCategoryLabel} (Tiket: ${selectedItem.ticketNumber}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>💬 Chat PIC WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Dokumen Audit?"
        message={`Apakah Anda yakin ingin menghapus data berkas ${deleteModal.ticket} dari perusahaan "${deleteModal.company}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus Berkas"
        cancelText="Batal"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: "", ticket: "", company: "" })}
      />
    </div>
  );
}
