"use client";

import React, { useState } from "react";
import { TeamMember, createTeamMember, updateTeamMember, deleteTeamMember, compressImage } from "../lib/db";

interface AdminTimProps {
  teamMembers: TeamMember[];
  onRefresh: () => void;
}

export default function AdminTim({ teamMembers, onRefresh }: AdminTimProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "tphp-ugm",
    isLead: false,
    image: "",
    educationText: "",
    experience: "",
    auditorExp: "",
    motto: ""
  });

  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file, 800, 0.75);
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
      } catch (err) {
        console.error("Error compressing team photo:", err);
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      category: "tphp-ugm",
      isLead: false,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80",
      educationText: "S1 Teknologi Pangan, UGM\nS2 Ilmu Pangan, UGM",
      experience: "Dosen & Peneliti Keamanan Pangan",
      auditorExp: "Auditor Mutu Internal & Konsultan HACCP",
      motto: "Inovasi teknologi pangan harus berjalan beriringan dengan jaminan keamanan dan mutu."
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      category: member.category,
      isLead: !!member.isLead,
      image: member.image,
      educationText: Array.isArray(member.education) ? member.education.join("\n") : member.education || "",
      experience: member.experience,
      auditorExp: member.auditorExp,
      motto: member.motto
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      alert("Nama Lengkap dan Jabatan wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const eduArray = formData.educationText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        name: formData.name,
        role: formData.role,
        category: formData.category,
        isLead: formData.isLead,
        image: formData.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80",
        education: eduArray.length > 0 ? eduArray : ["S1 Teknologi Pangan"],
        experience: formData.experience,
        standards: ["Pelatihan Refreshment Standar Mutu"],
        haccp: ["Pelatihan Teknis HACCP & CPPOB"],
        auditorExp: formData.auditorExp,
        motto: formData.motto
      };

      if (editingId) {
        await updateTeamMember(editingId, payload);
      } else {
        await createTeamMember(payload);
      }

      setIsModalOpen(false);
      await onRefresh();
    } catch (err) {
      console.error("Error saving team member:", err);
      alert("Gagal menyimpan data pegawai.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar pegawai & tim auditor?`)) {
      setLoading(true);
      try {
        await deleteTeamMember(id);
        await onRefresh();
      } catch (err) {
        console.error("Error deleting team member:", err);
        alert("Gagal menghapus pegawai.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER & FILTER BAR - DRIBBBLE ROUNDED CARD */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-heading">
            Kelola Pegawai &amp; Tim Auditor
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Daftar tenaga ahli, auditor halal, dan profesional PT Food Quality Certification.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 pt-2">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Cari Nama Pegawai atau Jabatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-medium focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-bold focus:bg-white focus:outline-brand-blue rounded-xl transition-all"
            >
              <option value="all">Semua Kategori Affiliasi</option>
              <option value="tphp-ugm">Tenaga Ahli TPHP UGM</option>
              <option value="uin-suka">Auditor Halal UIN Sunan Kalijaga</option>
            </select>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="w-full md:w-auto px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-xs transition-all duration-200 cursor-pointer rounded-xl border-none shadow-md shadow-brand-navy/20 flex items-center justify-center gap-2 shrink-0 active:scale-98"
          >
            <span>➕</span>
            <span>Tambah Pegawai Baru</span>
          </button>
        </div>
      </div>

      {/* MOBILE CARD VIEW FOR PEGAWAI (VISIBLE ON MOBILE ONLY: < md) */}
      <div className="space-y-4 md:hidden">
        {filteredMembers.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center text-slate-400 font-medium text-xs">
            Tidak ada data pegawai yang sesuai dengan pencarian Anda.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3.5 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-slate-900 text-sm leading-snug truncate">
                      {member.name}
                    </h4>
                    {member.isLead && (
                      <span className="bg-brand-navy text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                        ★ Lead
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-brand-blue truncate">{member.role}</p>
                  <span className={`inline-block px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide border rounded-full ${
                    member.category === "tphp-ugm"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    {member.category === "tphp-ugm" ? "TPHP UGM" : "UIN Sunan Kalijaga"}
                  </span>
                </div>
              </div>

              {member.motto && (
                <p className="text-xs text-slate-500 italic font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                  &ldquo;{member.motto}&rdquo;
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEditModal(member)}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider cursor-pointer border-none rounded-xl text-center shadow-xs active:scale-95"
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] uppercase tracking-wider cursor-pointer border-none rounded-xl text-center shadow-xs active:scale-95"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TEAM MEMBERS TABLE (VISIBLE ON DESKTOP ONLY: >= md) */}
      <div className="hidden md:block bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <table className="min-w-full divide-y divide-slate-100 text-left border-collapse text-xs">
          <thead className="bg-slate-50/80 uppercase font-black text-slate-400 tracking-wider">
            <tr>
              <th className="px-6 py-4">Foto</th>
              <th className="px-6 py-4">Nama &amp; Gelar Lengkap</th>
              <th className="px-6 py-4">Jabatan / Role</th>
              <th className="px-6 py-4">Kategori Affiliasi</th>
              <th className="px-6 py-4">Status Professional</th>
              <th className="px-6 py-4 text-right">Aksi Kelola</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400 font-normal">
                  Tidak ada data pegawai yang sesuai dengan pencarian Anda.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shadow-xs">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-slate-900 text-sm leading-snug">{member.name}</p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5 line-clamp-1">&ldquo;{member.motto}&rdquo;</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-blue">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide border rounded-full ${
                      member.category === "tphp-ugm"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}>
                      {member.category === "tphp-ugm" ? "TPHP UGM" : "UIN Sunan Kalijaga"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.isLead ? (
                      <span className="bg-brand-navy text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        ★ Lead Professional
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] font-medium">Anggota Tim</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(member)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer border-none rounded-lg shadow-xs"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer border-none rounded-lg shadow-xs"
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

      {/* MODAL TAMBAH / EDIT PEGAWAI - ROUNDED DRIBBBLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-slate-200/80 shadow-2xl w-full max-w-2xl overflow-hidden my-8 rounded-3xl">
            
            <div className="bg-brand-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase font-heading tracking-wider">
                {editingId ? "✏️ Edit Profile Pegawai" : "➕ Tambah Pegawai / Auditor Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-slate-300 font-bold text-lg cursor-pointer bg-transparent border-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">Nama &amp; Gelar Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Dr. Ir. Ahmad Sudrajat, M.Sc."
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">Jabatan / Spesialisasi *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Contoh: Lead Auditor HACCP & Mikrobiologi"
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">Kategori Affiliasi</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                  >
                    <option value="tphp-ugm">Tenaga Ahli TPHP UGM</option>
                    <option value="uin-suka">Auditor Halal UIN Sunan Kalijaga</option>
                  </select>
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={formData.isLead}
                      onChange={(e) => setFormData({ ...formData, isLead: e.target.checked })}
                      className="w-4 h-4 accent-brand-blue"
                    />
                    <span className="font-extrabold text-slate-800 text-xs">Set sebagai Lead Professional / Auditor</span>
                  </label>
                </div>
              </div>

              {/* Direct File Manager Upload Box */}
              <div className="space-y-2 border-2 border-dashed border-brand-navy/30 p-4 bg-blue-50/40 text-center">
                <label className="font-extrabold text-brand-navy text-xs uppercase tracking-wider block">
                  📁 Unggah Pas Foto dari File Manager / Laptop / HP *
                </label>
                <p className="text-[11px] text-slate-500 font-normal">
                  Klik di bawah ini untuk memilih berkas foto pegawai dari perangkat Anda:
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-extrabold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark cursor-pointer"
                />

                {formData.image && (
                  <div className="pt-3 border-t border-slate-200 mt-2 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Preview Pas Foto:</span>
                    <img src={formData.image} alt="Preview Pas Foto" className="h-24 w-24 object-cover border border-slate-300 shadow-md" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Riwayat Pendidikan (Satu per baris)</label>
                <textarea
                  rows={2}
                  value={formData.educationText}
                  onChange={(e) => setFormData({ ...formData, educationText: e.target.value })}
                  placeholder="S1 Teknologi Pangan UGM&#10;S2 Ilmu Pangan UGM"
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">Pengalaman Kerja</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Dosen Teknologi Pangan &amp; Auditor Mutu"
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">Kualifikasi Auditor</label>
                  <input
                    type="text"
                    value={formData.auditorExp}
                    onChange={(e) => setFormData({ ...formData, auditorExp: e.target.value })}
                    placeholder="Auditor AMI &amp; Konsultan HACCP Terdaftar"
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">Motto / Prinsip Kerja</label>
                <input
                  type="text"
                  value={formData.motto}
                  onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                  placeholder="Penjaminan mutu pangan publik adalah prioritas utama..."
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-[#0a5c36]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer border-none"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-xs uppercase tracking-wider cursor-pointer border-none shadow-sm disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah Pegawai"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
