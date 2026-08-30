"use client";

import React, { useState } from "react";
import { ProjectItem, createProject, updateProject, deleteProject, compressImage } from "../lib/db";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface AdminProyekProps {
  projects: ProjectItem[];
  onRefresh: () => void;
  triggerAlert?: (type: "success" | "destructive" | "info" | "warning", title: string, message: string) => void;
}

export default function AdminProyek({ projects, onRefresh, triggerAlert }: AdminProyekProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    category: "LOGISTIK & RITEL MODERN",
    desc: "",
    image: ""
  });

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800, 0.75);
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        setFormError("");
      } catch (err) {
        console.error("Error compressing project image:", err);
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormError("");
    setFormData({
      name: "",
      category: "LOGISTIK & RITEL MODERN",
      desc: "",
      image: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormError("");
    setFormData({
      name: project.name,
      category: project.category,
      desc: project.desc,
      image: project.image
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.desc.trim() || !formData.image.trim()) {
      setFormError("Harap lengkapi nama proyek, deskripsi, dan foto!");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateProject(editingId, formData);
        if (triggerAlert) {
          triggerAlert("info", "Proyek Diperbarui", `Data proyek "${formData.name}" berhasil diperbarui.`);
        }
      } else {
        await createProject(formData);
        if (triggerAlert) {
          triggerAlert("success", "Proyek Ditambahkan", `Proyek "${formData.name}" berhasil ditambahkan.`);
        }
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      if (triggerAlert) {
        triggerAlert("destructive", "Gagal Menyimpan", "Terjadi kesalahan saat menyimpan data proyek.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek sektor "${name}"?`)) {
      return;
    }

    try {
      await deleteProject(id);
      onRefresh();
      if (triggerAlert) {
        triggerAlert("warning", "Proyek Dihapus", `Proyek "${name}" telah dihapus.`);
      }
    } catch (err) {
      console.error(err);
      if (triggerAlert) {
        triggerAlert("destructive", "Gagal Menghapus", "Terjadi kesalahan saat menghapus data proyek.");
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Container */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
            Kelola Proyek Client (Our Latest Projects)
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Total proyek sertifikasi yang tampil di Landing Page: {projects.length} item.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Cari nama proyek / perusahaan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-brand-blue font-medium"
          />

          <button
            onClick={handleOpenAddModal}
            className="w-full sm:w-auto px-4 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-xs transition-all duration-200 cursor-pointer rounded-xl border-none shadow-md shadow-brand-navy/20 flex items-center justify-center gap-2 active:scale-98"
          >
            ➕ Tambah Proyek Baru
          </button>
        </div>
      </div>

      {/* MOBILE CARD VIEW (VISIBLE ON MOBILE ONLY: < md) */}
      <div className="space-y-4 md:hidden">
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-400 font-medium text-xs">
            Belum ada data proyek terdaftar.
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-14 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug truncate">
                    {p.name}
                  </h4>
                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full">
                    {p.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {p.desc}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEditModal(p)}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider cursor-pointer border-none rounded-xl text-center shadow-xs active:scale-95"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] uppercase tracking-wider cursor-pointer border-none rounded-xl text-center shadow-xs active:scale-95"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE VIEW (VISIBLE ON DESKTOP ONLY: >= md) */}
      <div className="hidden md:block bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead className="bg-slate-50/80 text-slate-400 uppercase font-black tracking-wider">
            <tr>
              <th className="px-6 py-4">Foto Proyek</th>
              <th className="px-6 py-4">Nama Perusahaan / Client</th>
              <th className="px-6 py-4">Kategori Sektor</th>
              <th className="px-6 py-4">Deskripsi Ruang Lingkup Audit</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                  Belum ada data proyek terdaftar.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3">
                    <div className="w-16 h-12 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-xs relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-900 leading-snug">
                    {p.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs line-clamp-2">
                    {p.desc}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer border-none rounded-lg transition-all shadow-xs"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer border-none rounded-lg transition-all shadow-xs"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM TAMBAH / EDIT PROYEK - DRIBBBLE ROUNDED MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          
          <div className="bg-white border border-slate-200/80 w-full max-w-xl relative z-10 shadow-2xl overflow-hidden my-8 rounded-3xl">
            <div className="bg-brand-navy text-white py-5 px-6 flex items-center justify-between border-b border-white/10">
              <h3 className="font-extrabold tracking-wide text-xs sm:text-sm font-heading">
                {editingId ? "Edit Data Proyek Client" : "Tambah Proyek Client Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-brand-cyan border-none bg-transparent cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
              {formError && (
                <Alert variant="destructive" className="bg-rose-50 border-rose-200">
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                  <AlertTitle className="text-rose-900 font-bold">Validasi Form</AlertTitle>
                  <AlertDescription className="text-rose-700 text-xs">{formError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Nama Perusahaan / Client *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Boga Katering Utama..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200/80 bg-slate-50 text-xs focus:bg-white focus:outline-brand-blue rounded-xl font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Kategori Sektor *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200/80 bg-slate-50 text-xs font-bold focus:bg-white focus:outline-brand-blue rounded-xl"
                >
                  <option value="INDUSTRI PANGAN">INDUSTRI PANGAN</option>
                  <option value="JASA BOGA">JASA BOGA / SPPG</option>
                  <option value="HORECA">HORECA (Hotel, Resto, Kafe)</option>
                  <option value="MINUMAN">INDUSTRI MINUMAN & AMDK</option>
                  <option value="OLAHAN SUSU">OLAHAN SUSU / DAIRY</option>
                  <option value="INDUSTRI PERIKANAN">INDUSTRI PERIKANAN / SEAFOOD</option>
                  <option value="INDUSTRI PETERNAKAN">INDUSTRI PETERNAKAN / DAGING</option>
                  <option value="LOGISTIK PANGAN">LOGISTIK & COLD STORAGE</option>
                </select>
              </div>

              {/* Direct File Manager Upload Box */}
              <div className="space-y-2 border-2 border-dashed border-brand-navy/30 p-5 bg-blue-50/40 text-center rounded-2xl">
                <label className="font-extrabold text-brand-navy text-xs uppercase tracking-wider block">
                  📁 Unggah Foto Proyek dari File Manager / Laptop / HP *
                </label>
                <p className="text-[11px] text-slate-500 font-medium">
                  Klik di bawah ini untuk memilih berkas foto proyek dari komputer Anda:
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-extrabold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark file:rounded-xl cursor-pointer"
                />

                {formData.image && (
                  <div className="pt-3 border-t border-slate-200 mt-2 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Preview Foto Proyek:</span>
                    <img src={formData.image} alt="Preview Foto Proyek" className="h-28 w-auto object-cover border border-slate-300 rounded-xl shadow-md" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-800 block">Deskripsi Singkat Proyek Sektor *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ketik rincian singkat cakupan ruang lingkup sertifikasi sektor ini..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200/80 bg-slate-50 text-xs focus:bg-white focus:outline-brand-blue resize-none rounded-xl font-medium"
                />
              </div>

              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-widest cursor-pointer border-none rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-extrabold text-xs uppercase tracking-widest cursor-pointer border-none disabled:opacity-50 rounded-xl shadow-md"
                >
                  {loading ? "Menyimpan..." : "Simpan Proyek"}
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
