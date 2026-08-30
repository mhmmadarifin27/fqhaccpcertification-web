"use client";

import React, { useState } from "react";
import { NewsItem, createNews, deleteNews } from "../lib/db";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "./ConfirmModal";

interface AdminBeritaProps {
  news: NewsItem[];
  onRefresh: () => void;
}

export default function AdminBerita({ news, onRefresh }: AdminBeritaProps) {
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
  const [category, setCategory] = useState("Pengumuman");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const sampleImages = [
    { label: "Lab / Industri", url: "/hero1.jpg" },
    { label: "Bahan Pangan", url: "/hero2.jpg" },
    { label: "Event / Kantor", url: "/iso.jpg" }
  ];

  const handleOpenModal = () => {
    setTitle("");
    setCategory("Pengumuman");
    setImageUrl(sampleImages[0].url);
    setContent("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !imageUrl.trim()) {
      showToast({
        title: "Data Belum Lengkap",
        message: "Harap lengkapi semua bidang form!",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      await createNews({
        title,
        content,
        category,
        imageUrl
      });
      setIsModalOpen(false);
      showToast({
        title: "Berita Diterbitkan",
        message: `Artikel "${title}" berhasil diterbitkan!`,
        type: "success",
      });
      onRefresh(); // Refresh news parent state list
    } catch (err) {
      console.error(err);
      showToast({
        title: "Gagal Menerbitkan",
        message: "Terjadi kesalahan saat mengunggah berita.",
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
      await deleteNews(id);
      showToast({
        title: "Berita Dihapus",
        message: `Artikel "${itemTitle}" berhasil dihapus.`,
        type: "success",
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      showToast({
        title: "Gagal Menghapus",
        message: "Gagal menghapus berita.",
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Upload trigger bar */}
      <div className="bg-white border border-slate-200 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-heading">
            Daftar Publikasi Berita
          </h3>
          <p className="text-xs text-slate-400 font-normal">
            Total terbitan saat ini: {news.length} artikel.
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-5 py-2.5 bg-[#0c4a2e] hover:bg-[#0a3d26] text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-none border-none shadow-sm flex items-center gap-2"
        >
          ➕ Unggah Berita Baru
        </button>
      </div>

      {/* News Grid */}
      {news.length === 0 ? (
        <div className="bg-white border border-slate-200 py-16 text-center text-slate-400 font-medium">
          Belum ada berita terbit. Klik tombol di atas untuk menerbitkan berita pertama Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-150">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#0c4a2e] text-white text-[9px] font-extrabold uppercase px-2.5 py-1 tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* News Copy */}
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 block">{item.date}</span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug font-heading min-h-[44px] line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                    {item.content}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-250/30 flex justify-end">
                <button
                  onClick={() => handlePromptDelete(item.id, item.title)}
                  className="px-3 py-1.5 border border-red-200 text-red-700 bg-red-50/40 hover:bg-red-50 hover:text-red-800 transition-colors text-[10px] font-extrabold uppercase tracking-wider cursor-pointer rounded-none"
                >
                  🗑️ Hapus Artikel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE NEW NEWS MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-navy-dark/70 backdrop-blur-sm">
          
          <div className="bg-white border border-slate-200 w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#0c4a2e] text-white py-4 px-6 flex items-center justify-between border-b border-[#083621]">
              <h3 className="font-extrabold tracking-wide text-xs sm:text-sm uppercase font-heading">
                Unggah Artikel Berita Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-brand-cyan border-none bg-transparent cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs sm:text-sm">
              {/* Title input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Judul Berita *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul berita utama..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-[#0a5c36] focus:border-slate-400 transition-all rounded-none"
                />
              </div>

              {/* Grid Category & Custom URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:bg-white focus:outline-[#0a5c36] focus:border-slate-400 transition-all rounded-none"
                  >
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Edukasi">Edukasi</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                {/* Custom Image URL */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">URL Gambar *</label>
                  <input
                    type="url"
                    required
                    placeholder="Tautan gambar (https://...)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-[#0a5c36] focus:border-slate-400 transition-all rounded-none"
                  />
                </div>
              </div>

              {/* Template Image Selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Pilih Gambar Bawaan (Opsional):
                </label>
                <div className="flex gap-2">
                  {sampleImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className={`px-3 py-1.5 border text-[10px] font-bold uppercase transition-all cursor-pointer rounded-none ${
                        imageUrl === img.url
                          ? "bg-slate-200 text-slate-900 border-slate-400"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content textarea */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Isi Konten Berita *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Ketik narasi isi berita selengkapnya disini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-[#0a5c36] focus:border-slate-400 transition-all rounded-none resize-y"
                />
              </div>

              {/* Form Actions Footer */}
              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer rounded-none border-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#0c4a2e] hover:bg-[#0a3d26] text-white font-extrabold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-none border-none disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL (REPLACES BROWSER CONFIRM) */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Berita?"
        message={`Apakah Anda yakin ingin menghapus artikel "${deleteModal.title}" secara permanen?`}
        confirmText="Ya, Hapus Artikel"
        cancelText="Batal"
        type="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: "", title: "" })}
      />

    </div>
  );
}
