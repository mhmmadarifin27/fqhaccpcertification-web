"use client";

import React, { useState } from "react";
import { GalleryItem, createGallery, deleteGallery, compressImage } from "../lib/db";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "./ConfirmModal";

interface AdminGaleriProps {
  gallery: GalleryItem[];
  onRefresh: () => void;
}

export default function AdminGaleri({ gallery, onRefresh }: AdminGaleriProps) {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Custom Delete Confirm Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({
    isOpen: false,
    id: "",
    title: "",
  });

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Audit");
  const [imageUrl, setImageUrl] = useState("");

  const sampleImages = [
    { label: "Pabrik Susu", url: "/hero1.jpg" },
    { label: "Auditor Training", url: "/hero2.jpg" },
    { label: "Serah Terima", url: "/iso.jpg" },
    { label: "Piagam/Sertifikat", url: "/kan-logo.png" }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800, 0.75);
        setImageUrl(compressedBase64);
        showToast({
          title: "Foto Terpilih",
          message: "Foto dokumentasi siap untuk diunggah.",
          type: "info",
        });
      } catch (err) {
        console.error("Error compressing image:", err);
        showToast({
          title: "Gagal Memproses Gambar",
          message: "Format gambar tidak didukung atau terjadi kesalahan.",
          type: "error",
        });
      }
    }
  };

  const handleOpenModal = () => {
    setTitle("");
    setDescription("");
    setCategory("Audit");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      showToast({
        title: "Data Belum Lengkap",
        message: "Harap lengkapi semua bidang wajib dan pilih foto!",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      await createGallery({
        title,
        description,
        category,
        imageUrl
      });
      setIsModalOpen(false);
      showToast({
        title: "Dokumentasi Diunggah",
        message: `Foto "${title}" berhasil ditambahkan ke Galeri!`,
        type: "success",
      });
      onRefresh(); // Refresh gallery parent state list
    } catch (err) {
      console.error(err);
      showToast({
        title: "Gagal Mengunggah",
        message: "Terjadi kesalahan saat mengunggah foto galeri.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePromptDelete = (id: string, itemTitle: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      title: itemTitle,
    });
  };

  const handleConfirmDelete = async () => {
    const { id, title: itemTitle } = deleteModal;
    setDeleteModal({ isOpen: false, id: "", title: "" });

    try {
      await deleteGallery(id);
      showToast({
        title: "Foto Dihapus",
        message: `Dokumentasi "${itemTitle}" berhasil dihapus dari Galeri.`,
        type: "success",
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      showToast({
        title: "Gagal Menghapus",
        message: "Terjadi kendala saat menghapus item galeri.",
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upload trigger bar - DRIBBBLE ROUNDED CARD */}
      <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-heading">
            Galeri Dokumentasi Kegiatan
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Total dokumentasi foto saat ini: {gallery.length} file.
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-xs transition-all duration-200 cursor-pointer rounded-xl border-none shadow-md shadow-brand-navy/20 flex items-center gap-2 active:scale-98"
        >
          ➕ Unggah Foto Baru
        </button>
      </div>

      {/* Gallery Cards Grid - ROUNDED CARDS */}
      {gallery.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl py-16 text-center text-slate-400 font-medium shadow-xs">
          Belum ada foto galeri terunggah. Klik tombol di atas untuk menambah dokumentasi foto pertama Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative aspect-square w-full bg-slate-100 border-b border-slate-150 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Info Text */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">{item.date}</span>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-1 font-heading">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handlePromptDelete(item.id, item.title)}
                  className="px-3 py-1.5 border border-red-200 text-red-700 bg-red-50/60 hover:bg-red-50 hover:text-red-800 transition-colors text-[10px] font-extrabold uppercase tracking-wider cursor-pointer rounded-xl"
                >
                  🗑️ Hapus Dokumentasi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE NEW PHOTO MODAL FORM - ROUNDED DRIBBBLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          
          <div className="bg-white border border-slate-200/80 w-full max-w-xl relative z-10 shadow-2xl overflow-hidden my-8 rounded-3xl">
            {/* Modal Header */}
            <div className="bg-brand-navy text-white py-5 px-6 flex items-center justify-between border-b border-white/10">
              <h3 className="font-extrabold tracking-wide text-xs sm:text-sm font-heading">
                Unggah Foto Dokumentasi Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-brand-cyan border-none bg-transparent cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
              {/* Photo Title */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Judul Dokumentasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama/judul dokumentasi foto..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-slate-800 focus:bg-white focus:outline-brand-blue rounded-xl font-medium transition-all"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Kategori Foto *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-slate-800 font-bold focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
                >
                  <option value="Audit">Audit Lapangan</option>
                  <option value="Event">Seremonial / Event</option>
                  <option value="Pelatihan">Edukasi / Pelatihan</option>
                  <option value="Penghargaan">Penghargaan / Akreditasi</option>
                  <option value="Lainnya">Lain-lain</option>
                </select>
              </div>

              {/* Direct File Manager Upload Box */}
              <div className="space-y-2 border-2 border-dashed border-brand-navy/30 p-5 bg-blue-50/40 text-center rounded-2xl">
                <label className="font-extrabold text-brand-navy text-xs uppercase tracking-wider block">
                  📁 Unggah Foto dari File Manager / Laptop / HP *
                </label>
                <p className="text-[11px] text-slate-500 font-medium">
                  Klik di bawah ini untuk memilih file foto (.jpg, .png, .jpeg) dari perangkat Anda:
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-extrabold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark file:rounded-xl cursor-pointer"
                />

                {imageUrl && (
                  <div className="pt-3 border-t border-slate-200 mt-2 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Preview Foto Terpilih:</span>
                    <img src={imageUrl} alt="Preview Foto Dokumentasi" className="h-28 w-auto object-cover border border-slate-300 rounded-xl shadow-md" />
                  </div>
                )}
              </div>

              {/* Description textarea */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Keterangan / Deskripsi Singkat *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ketik deskripsi singkat mengenai foto dokumentasi..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-slate-800 focus:bg-white focus:outline-brand-blue rounded-xl font-medium transition-all resize-none"
                />
              </div>

              {/* Form Actions Footer */}
              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer rounded-xl border-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer border-none disabled:opacity-50 rounded-xl shadow-md"
                >
                  {loading ? "Menyimpan..." : "Simpan Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL (REPLACES BROWSER CONFIRM) */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Foto Galeri?"
        message={`Apakah Anda yakin ingin menghapus dokumentasi "${deleteModal.title}"? Foto yang dihapus tidak dapat dikembalikan.`}
        confirmText="Ya, Hapus Foto"
        cancelText="Batal"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: "", title: "" })}
      />

    </div>
  );
}
