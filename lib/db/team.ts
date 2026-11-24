import { supabase, isSupabaseConfigured } from "../supabase";
import { getLocal, setLocal } from "./storage";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  isLead?: boolean;
  image: string;
  education: string[];
  experience: string;
  standards: string[];
  haccp: string[];
  auditorExp: string;
  motto: string;
}

const PLACEHOLDER_TEAM_IMAGES = new Set(["", "/hero1.jpg", "/hero2.jpg", "/iso.jpg"]);

const TEAM_CANVA_PHOTOS: Array<{ match: string; photo: string }> = [
  { match: "bobby", photo: "/team/muhammad-bobby.png" },
  { match: "diky", photo: "/team/diky-faqih.png" },
  { match: "bambang", photo: "/team/bambang-dwi.png" },
  { match: "galuh", photo: "/team/galuh-tri.png" },
  { match: "atika", photo: "/team/atika-yahdiyani.png" },
  { match: "fayza", photo: "/team/fayza-allya.png" },
  { match: "agessty", photo: "/team/agessty-ika.png" },
  { match: "diah", photo: "/team/diah-puspitasari.png" },
  { match: "ihshan", photo: "/team/ihshan-habi.png" },
  { match: "inshan", photo: "/team/ihshan-habi.png" },
  { match: "dhifan", photo: "/team/muhammad-dhifan.png" },
  { match: "laili", photo: "/team/laili-nailul.png" },
  { match: "anin", photo: "/team/anin-luthfi.png" },
  { match: "rafida", photo: "/team/rafida-cahya.png" },
  { match: "argawi", photo: "/team/argawi-kandito.png" },
];

export function resolveTeamPhoto(name: string, currentImage?: string | null): string {
  const trimmed = (currentImage || "").trim();
  if (trimmed && !PLACEHOLDER_TEAM_IMAGES.has(trimmed)) {
    return trimmed;
  }
  const lower = (name || "").toLowerCase();
  const found = TEAM_CANVA_PHOTOS.find((entry) => lower.includes(entry.match));
  return found ? found.photo : trimmed || "/hero1.jpg";
}

export const SEED_TEAM: TeamMember[] = [
  {
    id: "muhammad-bobby",
    name: "Muhammad Bobby, S.H., M.H.",
    role: "Direktur",
    category: "manajemen",
    isLead: true,
    image: "/team/muhammad-bobby.png",
    education: [],
    experience: "Direktur PT Food Quality Certification — pemimpin perusahaan dan penanggung jawab tata kelola lembaga sertifikasi HACCP.",
    standards: [],
    haccp: [],
    auditorExp: "Pimpinan Lembaga Sertifikasi HACCP PT Food Quality Certification.",
    motto: "Mewujudkan tata kelola sertifikasi keamanan pangan yang independen, profesional, dan terpercaya."
  },
  {
    id: "diky-faqih",
    name: "Dr. Diky Faqih Maulana, M.H.",
    role: "Wakil Direktur",
    category: "manajemen",
    isLead: true,
    image: "/team/diky-faqih.png",
    education: [],
    experience: "Wakil Direktur PT Food Quality Certification — mendukung dan mengawasi pelaksanaan kebijakan perusahaan.",
    standards: [],
    haccp: [],
    auditorExp: "Pengawas Kebijakan & Tata Kelola Lembaga Sertifikasi HACCP PT Food Quality Certification.",
    motto: "Tata kelola yang akuntabel menjadi fondasi integritas dan ketidakberpihakan lembaga sertifikasi."
  },
  {
    id: "bambang-dwi",
    name: "Bambang Dwi Wijatniko, S.T.P., M.Agr.Sc., M.Sc., Ph.D.",
    role: "Manajer Mutu / Auditor HACCP",
    category: "tphp-ugm",
    isLead: true,
    image: "/team/bambang-dwi.png",
    education: [
      "S1 Teknologi Pangan dan Hasil Pertanian, Universitas Gadjah Mada (UGM)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM) & Kyoto University",
      "S3 Food Chemistry, Hiroshima University, Jepang"
    ],
    experience: "2018 s.d sekarang: Dosen di Departemen Teknologi Pangan dan Hasil Pertanian, Universitas Gadjah Mada (UGM).",
    standards: ["Pelatihan Refreshment AMI (FTP UGM, 2019)"],
    haccp: [
      "Pelatihan & Uji Kompetensi Cara Produksi Pangan Olahan yang Baik / CPPOB (JMKP, November 2024)",
      "Pelatihan & Uji Kompetensi Sensory Analyst (SEAFAST IPB, Oktober 2025)"
    ],
    auditorExp: "Auditor AMI (Audit Mutu Internal) Fakultas Teknologi Pertanian UGM tahun 2019-2020.",
    motto: "Inovasi teknologi pangan harus berjalan beriringan dengan jaminan keamanan dan mutu konsumsi publik."
  },
  {
    id: "atika-yahdiyani",
    name: "Atika Yahdiyani Ikhsani, S.TP., M.Sc.",
    role: "Manajer Operasional / Auditor HACCP",
    category: "uin-suka",
    isLead: true,
    image: "/team/atika-yahdiyani.png",
    education: [
      "S1 Teknologi Pangan dan Hasil Pertanian, Universitas Brawijaya (UB) Malang",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)",
      "Sedang Menempuh Pendidikan S3 Ilmu Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "2014-2020: Dosen dan Staf LPPM Universitas Muhammadiyah Surakarta (UMS); 2019 s.d. sekarang: Dosen Kimia UIN Sunan Kalijaga Yogyakarta; 2022 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: [
      "Pelatihan Keamanan Pangan & Sistem ISO 22000 (2015)",
      "Pelatihan ISO/IEC 17065:2012 Persyaratan Lembaga Sertifikasi Produk, Proses, Jasa (2022)"
    ],
    haccp: [
      "Sertifikasi Internal Auditor Keamanan Pangan BNSP (JMKP, 2015)",
      "Sertifikasi Kompetensi BNSP Auditor Halal (2022, Diperpanjang 2024)",
      "Sertifikasi Kompetensi Penerapan CPPOB (JMKP, 2025)"
    ],
    auditorExp: "Tim Konsolidasi Pembentukan LPH dan Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    motto: "Tinjauan kesesuaian dokumen regulasi menjamin obyektivitas dan validitas sertifikasi secara hukum."
  },
  {
    id: "galuh-tri",
    name: "Galuh Tri Pambekti, S.E., M.E.K.",
    role: "Manajer Administrasi dan Keuangan",
    category: "manajemen",
    isLead: true,
    image: "/team/galuh-tri.png",
    education: [],
    experience: "Manajer Administrasi dan Keuangan PT Food Quality Certification — mengelola administrasi umum, keuangan, dan sumber daya perusahaan.",
    standards: [],
    haccp: [],
    auditorExp: "Manajemen Administrasi, Keuangan, & Sumber Daya PT Food Quality Certification.",
    motto: "Pelayanan administrasi yang transparan dan tertib mendukung proses sertifikasi yang profesional."
  },
  {
    id: "fayza-allya",
    name: "Fayza Allya Kallista, S.Pi., M.Sc.",
    role: "Auditor HACCP",
    category: "tphp-ugm",
    isLead: false,
    image: "/team/fayza-allya.png",
    education: [
      "S1 Teknologi Hasil Perikanan, Universitas Gadjah Mada (UGM)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "April 2024 s.d. Sekarang: Asisten Dosen Teknologi Pangan dan Hasil Pertanian UGM; September-Desember 2020: Asisten Laboratorium Sosial Ekonomi Perikanan UGM; Januari 2020: Magang QC di PT. Surya Alam Tunggal; Juli 2019: Magang di LPPMHP Dinas Kelautan dan Perikanan DIY.",
    standards: ["Pelatihan Penilaian Mutu Produk Perikanan Ekspor"],
    haccp: [
      "Quality Control Training (PT Mindo Education, 2019)",
      "Quality Assurance Training (PT Mindo Education, 2019)"
    ],
    auditorExp: "Spesialis Mutu Produk Hasil Perikanan dan Kelautan; Auditor HACCP PT Food Quality Certification.",
    motto: "Pengendalian suhu dan kecepatan rantai logistik menentukan kesegaran serta keamanan komoditas perikanan."
  },
  {
    id: "agessty-ika",
    name: "Agessty Ika Nurlita, S.Si., M.Si.",
    role: "Auditor HACCP",
    category: "uin-suka",
    isLead: true,
    image: "/team/agessty-ika.png",
    education: [
      "S1 Biologi, Institut Pertanian Bogor (IPB University)",
      "S2 Mikrobiologi, Institut Pertanian Bogor (IPB University)"
    ],
    experience: "2019 s.d. sekarang: Dosen Biologi UIN Sunan Kalijaga Yogyakarta; 2023 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: ["Pelatihan Regulasi Audit Jaminan Produk Halal"],
    haccp: ["Pelatihan Teknis Higienitas Pangan & Mikrobiologi Dasar"],
    auditorExp: "Auditor Halal terakreditasi di LPH UIN Sunan Kalijaga Yogyakarta sejak 2023; Auditor HACCP PT Food Quality Certification.",
    motto: "Mikrobiologi memberikan kunci dasar untuk memahami dan mengendalikan bahaya kontaminasi produk pangan."
  },
  {
    id: "rafida-cahya",
    name: "Rafida Cahyaningrum, S.T.P., M.Sc.",
    role: "Auditor HACCP",
    category: "tphp-ugm",
    isLead: false,
    image: "/team/rafida-cahya.png",
    education: [
      "S1 Teknologi Pangan, Universitas Jenderal Soedirman (UNSOED)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "Februari 2026 s.d. sekarang: Asisten Peneliti Dosen Teknologi Pangan dan Hasil Pertanian (TPHP), Universitas Gadjah Mada (UGM).",
    standards: ["Training and Workshop of Implementing Food Safety Management System ISO 22000:2018 (Catalyst Consulting, September 2021)"],
    haccp: [
      "Training and Workshop of Implementing Food Safety Management System FSSC 22000 Version 5.1 (Catalyst Consulting, September 2021)",
      "Training and Workshop of Food Safety, Food Defense, and Food Fraud Prevention Control / HACCP, TACCP, VACCP (Catalyst Consulting, September 2021)"
    ],
    auditorExp: "Asisten Peneliti & Auditor HACCP PT Food Quality Certification.",
    motto: "Keamanan pangan dicapai melalui penerapan standar sistem manajemen yang konsisten dan terukur."
  },
  {
    id: "anin-luthfi",
    name: "Anin Luthfi Wulandharu, S.T.P., M.Sc.",
    role: "Auditor HACCP",
    category: "auditor",
    isLead: false,
    image: "/team/anin-luthfi.png",
    education: [],
    experience: "Personel Teknis & Auditor HACCP PT Food Quality Certification.",
    standards: [],
    haccp: [],
    auditorExp: "Tim Auditor HACCP (Personel Teknis) PT Food Quality Certification.",
    motto: "Komitmen terhadap audit keamanan pangan yang objektif, teliti, dan sesuai standar SNI CXC 1:1969."
  },
  {
    id: "diah-puspitasari",
    name: "Diah Puspitasari, S.Pi., M.Sc.",
    role: "Auditor HACCP",
    category: "auditor",
    isLead: false,
    image: "/team/diah-puspitasari.png",
    education: [],
    experience: "Personel Teknis & Auditor HACCP PT Food Quality Certification.",
    standards: [],
    haccp: [],
    auditorExp: "Tim Auditor HACCP (Personel Teknis) PT Food Quality Certification.",
    motto: "Pengendalian mutu dan keamanan pangan yang konsisten melindungi konsumen di setiap tahap produksi."
  },
  {
    id: "ihshan-habi",
    name: "Ihshan Habi Ashsaadiq, S.Pt., M.Sc.",
    role: "Auditor HACCP",
    category: "auditor",
    isLead: false,
    image: "/team/ihshan-habi.png",
    education: [],
    experience: "Personel Teknis & Auditor HACCP PT Food Quality Certification.",
    standards: [],
    haccp: [],
    auditorExp: "Tim Auditor HACCP (Personel Teknis) PT Food Quality Certification.",
    motto: "Penerapan sistem keamanan pangan yang tepat menjaga kualitas produk dari hulu hingga hilir."
  },
  {
    id: "muhammad-dhifan",
    name: "Muhammad Dhifan Rafiuddin, S.T., M.Sc.",
    role: "Auditor HACCP",
    category: "tphp-ugm",
    isLead: false,
    image: "/team/muhammad-dhifan.png",
    education: [
      "S1 Teknologi Pangan, Universitas Pasundan (UNPAS)",
      "S2 Ilmu Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "Februari 2026 s.d. sekarang: Asisten Peneliti Dosen Teknologi Pangan dan Hasil Pertanian (TPHP), Universitas Gadjah Mada (UGM).",
    standards: ["Sertifikasi FSSC 22000 V. 5.1 including ISO 22000:2018 (Premysis Consulting, 2021)"],
    haccp: [
      "Pelatihan HACCP & GMP Based on ISO 22002-1 (Premysis Consulting, 2021)",
      "Pelatihan Halal Assurance System Based on HAS 23000 (Premysis Consulting, 2021)"
    ],
    auditorExp: "Auditor HACCP & Spesialis Sistem Manajemen Mutu Industri Pangan.",
    motto: "Perancangan program prasyarat (GMP) yang kuat adalah fondasi utama keberhasilan sistem HACCP."
  },
  {
    id: "laili-nailul",
    name: "apt. Laili Nailul Muna, S.Farm., M.Sc.",
    role: "Auditor HACCP",
    category: "uin-suka",
    isLead: true,
    image: "/team/laili-nailul.png",
    education: [
      "S1 Farmasi, Universitas Ahmad Dahlan (UAD) Yogyakarta",
      "Pendidikan Profesi Apoteker, Universitas Ahmad Dahlan (UAD) Yogyakarta",
      "S2 Farmasi, Universitas Gadjah Mada (UGM)"
    ],
    experience: "2017 s.d. sekarang: Apoteker Praktisi; 2019 s.d. sekarang: Dosen Biomedis UIN Sunan Kalijaga Yogyakarta; 2023 s.d. sekarang: Auditor Halal LPH UIN Sunan Kalijaga Yogyakarta.",
    standards: [
      "Sertifikasi Apoteker Penanggung Jawab Fasilitas",
      "Pelatihan Regulasi Audit Jaminan Produk Halal (2023)"
    ],
    haccp: ["Pelatihan Mutu Farmasi & Toksikologi Bahan Pangan"],
    auditorExp: "Auditor Halal terdaftar di LPH UIN Sunan Kalijaga sejak 2023; Auditor HACCP PT Food Quality Certification.",
    motto: "Aspek halal dan thoyyib (mutu & keamanan) adalah dua pilar yang saling melengkapi dalam rantai pangan."
  },
  {
    id: "argawi-kandito",
    name: "Dr. Argawi Kandito, S.P., M.Sc.",
    role: "Auditor HACCP",
    category: "auditor",
    isLead: false,
    image: "/team/argawi-kandito.png",
    education: [],
    experience: "Personel Teknis & Auditor HACCP PT Food Quality Certification.",
    standards: [],
    haccp: [],
    auditorExp: "Tim Auditor HACCP (Personel Teknis) PT Food Quality Certification.",
    motto: "Keamanan pangan berbasis bukti ilmiah menjamin kepercayaan dan keberlanjutan industri pangan."
  }
];

interface SupabasePegawaiRow {
  id: number | string;
  name: string;
  role: string;
  category?: string | null;
  is_lead?: boolean | null;
  image_url?: string | null;
  image?: string | null;
  education?: string[] | null;
  experience?: string | null;
  standards?: string[] | null;
  haccp?: string[] | null;
  auditor_exp?: string | null;
  motto?: string | null;
}

function mapSupabaseRow(item: SupabasePegawaiRow): TeamMember {
  const rawImage = item.image_url || item.image || "";
  return {
    id: item.id.toString(),
    name: item.name,
    role: item.role,
    category: item.category || "auditor",
    isLead: Boolean(item.is_lead),
    image: resolveTeamPhoto(item.name, rawImage),
    education: Array.isArray(item.education) ? item.education : [],
    experience: item.experience || "-",
    standards: Array.isArray(item.standards) ? item.standards : [],
    haccp: Array.isArray(item.haccp) ? item.haccp : [],
    auditorExp: item.auditor_exp || item.experience || "-",
    motto: item.motto || "Komitmen terhadap keamanan dan mutu pangan nasional."
  };
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("pegawai")
        .select("*")
        .order("id", { ascending: true });

      if (!error && Array.isArray(data)) {
        return (data as SupabasePegawaiRow[]).map(mapSupabaseRow);
      }
      console.warn("Supabase team fetch error, falling back to LocalStorage:", error);
    } catch (e) {
      console.warn("Supabase team connection error, falling back to LocalStorage:", e);
    }
  }
  const localMembers = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  let changed = false;
  const upgraded = localMembers.map((member) => {
    const resolved = resolveTeamPhoto(member.name, member.image);
    if (resolved !== member.image) {
      changed = true;
      return { ...member, image: resolved };
    }
    return member;
  });
  if (changed) {
    setLocal("hacpp_team", upgraded);
  }
  return upgraded;
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id">
): Promise<TeamMember> => {
  const resolvedImage = resolveTeamPhoto(member.name, member.image);
  const preparedMember: Omit<TeamMember, "id"> = {
    ...member,
    image: resolvedImage,
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("pegawai")
      .insert([
        {
          name: preparedMember.name,
          role: preparedMember.role,
          category: preparedMember.category,
          is_lead: preparedMember.isLead || false,
          image_url: preparedMember.image,
          education: preparedMember.education || [],
          experience: preparedMember.experience || "",
          standards: preparedMember.standards || [],
          haccp: preparedMember.haccp || [],
          auditor_exp: preparedMember.auditorExp || "",
          motto: preparedMember.motto || ""
        }
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error inserting team member to Supabase:", error);
      throw new Error(error.message || "Gagal menyimpan pegawai ke database.");
    }

    return mapSupabaseRow(data as SupabasePegawaiRow);
  }

  // Fallback LocalStorage when Supabase is not configured
  const newMember: TeamMember = {
    ...preparedMember,
    id: `team-${Date.now()}`
  };
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  localList.push(newMember);
  setLocal("hacpp_team", localList);
  return newMember;
};

export const updateTeamMember = async (
  id: string,
  updatedData: Partial<TeamMember>
): Promise<boolean> => {
  if (isSupabaseConfigured && supabase) {
    const dbId = id.startsWith("team-") ? -1 : parseInt(id, 10);
    if (dbId !== -1 && !isNaN(dbId)) {
      const patch: Record<string, unknown> = {};
      if (updatedData.name !== undefined) patch.name = updatedData.name;
      if (updatedData.role !== undefined) patch.role = updatedData.role;
      if (updatedData.category !== undefined) patch.category = updatedData.category;
      if (updatedData.isLead !== undefined) patch.is_lead = updatedData.isLead;
      if (updatedData.image !== undefined) {
        patch.image_url = resolveTeamPhoto(updatedData.name || "", updatedData.image);
      }
      if (updatedData.education !== undefined) patch.education = updatedData.education;
      if (updatedData.experience !== undefined) patch.experience = updatedData.experience;
      if (updatedData.standards !== undefined) patch.standards = updatedData.standards;
      if (updatedData.haccp !== undefined) patch.haccp = updatedData.haccp;
      if (updatedData.auditorExp !== undefined) patch.auditor_exp = updatedData.auditorExp;
      if (updatedData.motto !== undefined) patch.motto = updatedData.motto;

      const { error } = await supabase.from("pegawai").update(patch).eq("id", dbId);
      if (error) {
        console.error("Error updating team member in Supabase:", error);
        throw new Error(error.message || "Gagal memperbarui data pegawai di database.");
      }
      return true;
    }
  }

  // Fallback LocalStorage
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  const updatedList = localList.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  setLocal("hacpp_team", updatedList);
  return true;
};

export const deleteTeamMember = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured && supabase) {
    const dbId = id.startsWith("team-") ? -1 : parseInt(id, 10);
    if (dbId !== -1 && !isNaN(dbId)) {
      const { error } = await supabase.from("pegawai").delete().eq("id", dbId);
      if (error) {
        console.error("Error deleting team member from Supabase:", error);
        throw new Error(error.message || "Gagal menghapus data pegawai dari database.");
      }
      return true;
    }
  }

  // Fallback LocalStorage
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  const updatedList = localList.filter((item) => item.id !== id);
  setLocal("hacpp_team", updatedList);
  return true;
};
