"use client";

import React, { useState } from "react";
import {
  ComplaintAppealItem,
  ComplaintAppealStatus,
  getComplaintAttachment,
  updateComplaintAppealStatus,
  deleteComplaintAppeal,
} from "../lib/db";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "./ConfirmModal";

interface AdminKeluhanProps {
  items: ComplaintAppealItem[];
  onRefresh: () => void;
}

const STATUS_BADGES: Record<ComplaintAppealStatus, { label: string; badgeClass: string }> = {
  received: {
    label: "Diterima",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  in_review: {
    label: "Dalam Kajian",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  resolved: {
    label: "Selesai",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export default function AdminKeluhan({ items, onRefresh }: AdminKeluhanProps) {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "keluhan" | "banding">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ComplaintAppealStatus>("all");

  const [selectedItem, setSelectedItem] = useState<ComplaintAppealItem | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [savingNote, setSavingNote] = useState(false);

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

  const filteredItems = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.ticketNumber.toLowerCase().includes(q) ||
      item.companyName.toLowerCase().includes(q) ||
      item.reporterName.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q);
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenDetail = (item: ComplaintAppealItem) => {
    setSelectedItem(item);
    setAdminNoteInput(item.adminNote || "");
  };

  const handleStatusChange = async (id: string, newStatus: ComplaintAppealStatus) => {
    try {
      await updateComplaintAppealStatus(id, newStatus);
      showToast({
        title: "Status Diperbarui",
        message: `Status laporan berhasil diubah ke "${STATUS_BADGES[newStatus].label}".`,
        type: "success",
      });
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status: newStatus });
      }
      onRefresh();
    } catch (err) {
      console.error("Failed updating complaint status:", err);
      showToast({
        title: "Gagal Memperbarui",
        message: "Terjadi kendala saat mengubah status keluhan/banding.",
        type: "error",
      });
    }
  };

  const handleSaveAdminNote = async () => {
    if (!selectedItem) return;
    setSavingNote(true);
    try {
      await updateComplaintAppealStatus(selectedItem.id, selectedItem.status, adminNoteInput.trim());
      setSelectedItem({ ...selectedItem, adminNote: adminNoteInput.trim() });
      showToast({
        title: "Catatan Disimpan",
        message: "Catatan tindak lanjut internal berhasil disimpan.",
        type: "success",
      });
      onRefresh();
    } catch (err) {
      console.error("Failed saving admin note:", err);
      showToast({
        title: "Gagal Menyimpan",
        message: "Tidak dapat menyimpan catatan tindak lanjut.",
        type: "error",
      });
    } finally {
      setSavingNote(false);
    }
  };

  const handleDownloadAttachment = async (item: ComplaintAppealItem) => {
    try {
      const dataUrl = await getComplaintAttachment(item.id);
      if (!dataUrl) {
        showToast({
          title: "Berkas Tidak Ditemukan",
          message: "Lampiran lokal tidak tersedia pada peramban ini.",
          type: "warning",
        });
        return;
      }
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = item.attachmentName || `${item.ticketNumber}_lampiran`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
    } catch (err) {
      console.error("Attachment download failed:", err);
      showToast({
        title: "Gagal Mengunduh",
        message: "Terjadi kendala saat membuka file lampiran.",
        type: "error",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteComplaintAppeal(deleteModal.id);
      showToast({
        title: "Laporan Dihapus",
        message: `Tiket ${deleteModal.ticket} telah dihapus.`,
        type: "info",
      });
      if (selectedItem?.id === deleteModal.id) {
        setSelectedItem(null);
      }
      onRefresh();
    } catch (err) {
      console.error("Failed to delete complaint:", err);
      showToast({
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus tiket.",
        type: "error",
      });
    } finally {
      setDeleteModal({ isOpen: false, id: "", ticket: "", company: "" });
    }
  };

  const normalizePhoneForWa = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("0")) return `62${digits.slice(1)}`;
    return digits;
  };

  return (
    <div className="space-y-6">
      {/* Toolbar Search & Filter */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col lg:flex-row gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nomor tiket, perusahaan, pelapor, atau subjek..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue"
        />
        <div className="flex flex-wrap gap-2.5">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | "keluhan" | "banding")}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-brand-blue cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            <option value="keluhan">Keluhan</option>
            <option value="banding">Banding</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | ComplaintAppealStatus)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-brand-blue cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="received">Diterima</option>
            <option value="in_review">Dalam Kajian</option>
            <option value="resolved">Selesai</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-10 text-center space-y-2 text-slate-500">
            <div className="text-3xl">⚖️</div>
            <p className="text-sm font-bold text-slate-700">Belum ada data keluhan atau banding</p>
            <p className="text-xs">Laporan yang dikirim dari halaman Keluhan dan Banding akan muncul di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Tiket & Tanggal</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Perusahaan & Pelapor</th>
                  <th className="py-3.5 px-4">Subjek</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item) => {
                  const formattedDate = new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        <span className="font-mono font-extrabold text-brand-navy block">
                          {item.ticketNumber}
                        </span>
                        <span className="text-[11px] text-slate-400">{formattedDate}</span>
                      </td>
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                            item.type === "banding"
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {item.type === "banding" ? "Banding" : "Keluhan"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <p className="font-bold text-slate-900">{item.companyName}</p>
                        <p className="text-[11px] text-slate-500">
                          PIC: {item.reporterName} ({item.phone})
                        </p>
                      </td>
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        <p className="font-semibold text-slate-800 line-clamp-2">{item.subject}</p>
                        {item.relatedTicketOrCert && (
                          <span className="text-[10px] font-mono text-slate-400">
                            Ref: {item.relatedTicketOrCert}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as ComplaintAppealStatus)
                          }
                          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold border cursor-pointer focus:outline-none ${STATUS_BADGES[item.status].badgeClass}`}
                        >
                          <option value="received">Diterima</option>
                          <option value="in_review">Dalam Kajian</option>
                          <option value="resolved">Selesai</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 align-top whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(item)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-700 font-bold text-[11px] rounded-xl cursor-pointer transition-colors border-none"
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                id: item.id,
                                ticket: item.ticketNumber,
                                company: item.companyName,
                              })
                            }
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-[11px] rounded-xl cursor-pointer transition-colors border border-rose-200 hover:border-rose-600"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[99980] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 text-brand-navy">
                    {selectedItem.ticketNumber}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                      selectedItem.type === "banding"
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {selectedItem.type === "banding" ? "Banding" : "Keluhan"}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${STATUS_BADGES[selectedItem.status].badgeClass}`}
                  >
                    {STATUS_BADGES[selectedItem.status].label}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading mt-2">
                  {selectedItem.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer border-none"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Perusahaan</span>
                <span className="font-extrabold text-slate-900">{selectedItem.companyName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Nama Pelapor</span>
                <span className="font-bold text-slate-800">{selectedItem.reporterName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Email</span>
                <span className="font-semibold text-slate-700">{selectedItem.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Telepon / WA</span>
                <span className="font-semibold text-slate-700">{selectedItem.phone}</span>
              </div>
              {selectedItem.relatedTicketOrCert && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">
                    Referensi Tiket / Sertifikat Terkait
                  </span>
                  <span className="font-mono font-bold text-brand-navy">
                    {selectedItem.relatedTicketOrCert}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Uraian Kronologi
              </span>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedItem.description}
              </div>
            </div>

            {selectedItem.attachmentName && (
              <div className="flex items-center justify-between gap-3 bg-blue-50/70 border border-blue-200 rounded-2xl p-3.5 text-xs">
                <span className="font-bold text-brand-navy truncate">
                  📎 {selectedItem.attachmentName}
                </span>
                <button
                  type="button"
                  onClick={() => handleDownloadAttachment(selectedItem)}
                  className="px-3.5 py-1.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-[11px] rounded-xl cursor-pointer border-none shrink-0"
                >
                  Unduh Lampiran
                </button>
              </div>
            )}

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Catatan Penanganan / Keputusan Internal
              </label>
              <textarea
                rows={3}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Catat hasil verifikasi atau ringkasan tindak lanjut komite..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:outline-brand-blue resize-y"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${normalizePhoneForWa(selectedItem.phone)}?text=${encodeURIComponent(
                      `Halo ${selectedItem.reporterName}, menindaklanjuti tiket ${selectedItem.ticketNumber} (${selectedItem.subject}) dari ${selectedItem.companyName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl no-underline"
                  >
                    Hubungi WhatsApp
                  </a>
                  <a
                    href={`mailto:${selectedItem.email}?subject=${encodeURIComponent(
                      `[${selectedItem.ticketNumber}] Tindak Lanjut ${selectedItem.type === "banding" ? "Banding" : "Keluhan"}`
                    )}`}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] rounded-xl no-underline"
                  >
                    Balas Email
                  </a>
                </div>
                <button
                  type="button"
                  disabled={savingNote}
                  onClick={handleSaveAdminNote}
                  className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl cursor-pointer border-none disabled:opacity-50"
                >
                  {savingNote ? "Menyimpan..." : "Simpan Catatan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Data Keluhan / Banding?"
        message={`Tiket ${deleteModal.ticket} dari ${deleteModal.company} akan dihapus secara permanen dari penyimpanan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: "", ticket: "", company: "" })}
      />
    </div>
  );
}
