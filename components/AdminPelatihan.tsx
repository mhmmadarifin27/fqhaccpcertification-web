"use client";

import React, { useState } from "react";
import { TrainingRegistration, updateTrainingStatus, deleteTrainingRegistration } from "../lib/db";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "./ConfirmModal";

interface AdminPelatihanProps {
  trainings: TrainingRegistration[];
  onRefresh: () => void;
}

export default function AdminPelatihan({ trainings, onRefresh }: AdminPelatihanProps) {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<TrainingRegistration | null>(null);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    ticket: string;
    name: string;
  }>({
    isOpen: false,
    id: "",
    ticket: "",
    name: "",
  });

  const filteredTrainings = trainings.filter((t) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      t.fullName.toLowerCase().includes(term) ||
      t.companyName.toLowerCase().includes(term) ||
      t.ticketNumber.toLowerCase().includes(term) ||
      t.programTitle.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: TrainingRegistration["status"]) => {
    try {
      await updateTrainingStatus(id, newStatus);
      showToast({
        title: "Status Pelatihan Diperbarui",
        message: `Status pendaftaran berhasil diubah menjadi "${newStatus}".`,
        type: "success"
      });
      onRefresh();
    } catch (err) {
      console.error("Failed to update training status:", err);
      showToast({
        title: "Gagal Update",
        message: "Terjadi kendala saat memperbarui status.",
        type: "error"
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrainingRegistration(deleteModal.id);
      showToast({
        title: "Pendaftaran Dihapus",
        message: `Pendaftaran ${deleteModal.ticket} (${deleteModal.name}) telah dihapus.`,
        type: "success"
      });
      setDeleteModal({ isOpen: false, id: "", ticket: "", name: "" });
      onRefresh();
    } catch (err) {
      console.error("Delete training error:", err);
      showToast({
        title: "Gagal Menghapus",
        message: "Terjadi kesalahan saat menghapus data.",
        type: "error"
      });
    }
  };

  const getStatusBadge = (status: TrainingRegistration["status"]) => {
    switch (status) {
      case "confirmed":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">✓ Dikonfirmasi</span>;
      case "completed":
        return <span className="bg-blue-50 text-brand-navy border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">★ Selesai Pelatihan</span>;
      case "cancelled":
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">✕ Dibatalkan</span>;
      default:
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase">⏳ Menunggu Konfirmasi</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Kelola Pendaftaran Pelatihan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar peserta & permohonan program pelatihan keamanan pangan HACCP, CPPOB/GMP, dan Internal Audit.
            </p>
          </div>
          <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-2xl text-xs font-bold shrink-0 self-start sm:self-auto">
            Total: <span className="text-brand-navy font-black text-sm">{trainings.length}</span> Pendaftar
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-8 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Cari Tiket, Nama Peserta, Perusahaan, atau Program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu Konfirmasi</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="completed">Selesai Pelatihan</option>
              <option value="cancelled">Dibatalkan</option>
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
              <th className="px-6 py-4">Peserta & Perusahaan</th>
              <th className="px-6 py-4">Program Pelatihan</th>
              <th className="px-6 py-4">Peserta</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredTrainings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-normal">
                  Tidak ada data pendaftaran pelatihan yang sesuai.
                </td>
              </tr>
            ) : (
              filteredTrainings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-brand-navy font-mono text-xs">{item.ticketNumber}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-slate-900 text-sm leading-snug">{item.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-normal">{item.companyName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">📱 {item.phone} • ✉️ {item.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-xs">{item.programTitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-black text-slate-800">{item.participantCount}</span> <span className="text-slate-400">org</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as TrainingRegistration["status"])}
                      className="text-[11px] font-bold py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer focus:outline-brand-blue"
                    >
                      <option value="pending">⏳ Menunggu</option>
                      <option value="confirmed">✓ Dikonfirmasi</option>
                      <option value="completed">★ Selesai</option>
                      <option value="cancelled">✕ Batal</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1.5 bg-brand-navy text-white font-bold text-[10px] uppercase tracking-wider rounded-lg cursor-pointer border-none shadow-2xs hover:bg-brand-navy-dark"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: item.id, ticket: item.ticketNumber, name: item.fullName })}
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
                <span className="text-[10px] text-brand-cyan uppercase font-bold tracking-widest">Detail Pendaftaran Pelatihan</span>
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
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Nama Peserta / PIC:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{selectedItem.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Perusahaan / Instansi:</span>
                  <span className="font-extrabold text-slate-900 text-sm">{selectedItem.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Kontak WhatsApp:</span>
                  <span className="font-bold text-slate-800">{selectedItem.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Alamat Email:</span>
                  <span className="font-bold text-slate-800">{selectedItem.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Program Pelatihan yang Dipilih:</span>
                <p className="font-bold text-slate-900 text-sm bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  🎓 {selectedItem.programTitle}
                </p>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-600">Perkiraan Jumlah Peserta:</span>
                <span className="font-black text-brand-navy text-sm">{selectedItem.participantCount} Orang</span>
              </div>

              {selectedItem.notes && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Catatan / Kebutuhan Khusus:</span>
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
                  href={`https://wa.me/${selectedItem.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo Bapak/Ibu ${selectedItem.fullName}, kami dari PT Food Quality Certification terkait pendaftaran pelatihan ${selectedItem.programTitle} (Tiket: ${selectedItem.ticketNumber}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>💬 Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Data Pendaftaran?"
        message={`Apakah Anda yakin ingin menghapus data pendaftaran pelatihan ${deleteModal.ticket} atas nama "${deleteModal.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus Data"
        cancelText="Batal"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: "", ticket: "", name: "" })}
      />
    </div>
  );
}
