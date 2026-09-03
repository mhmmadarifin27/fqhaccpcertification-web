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

export const SEED_TEAM: TeamMember[] = [
  {
    id: "bambang-dwi",
    name: "Bambang Dwi Wijatniko, S.T.P., M.Agr.Sc., M.Sc., Ph.D.",
    role: "Lead Auditor & Ahli Teknologi Pangan",
    category: "tphp-ugm",
    isLead: true,
    image: "/hero1.jpg",
    education: [
      "S1 Teknologi Pangan dan Hasil Pertanian, Universitas Gadjah Mada (UGM)",
      "S2 Ilmu dan Teknologi Pangan, UGM & Kyoto University",
      "S3 Food Chemistry, Hiroshima University, Jepang"
    ],
    experience: "2018 s.d sekarang: Dosen di Departemen Teknologi Pangan dan Hasil Pertanian UGM.",
    standards: ["Pelatihan Refreshment AMI (FTP UGM, 2019)"],
    haccp: [
      "Pelatihan & Uji Kompetensi CPPOB (JMKP, November 2024)",
      "Pelatihan & Uji Kompetensi Sensory Analyst (SEAFAST IPB, 2025)"
    ],
    auditorExp: "Auditor AMI (Audit Mutu Internal) Fakultas Teknologi Pertanian UGM tahun 2019-2020.",
    motto: "Inovasi teknologi pangan harus berjalan beriringan dengan jaminan keamanan dan mutu konsumsi publik."
  },
  {
    id: "rafida-cahya",
    name: "Rafida Cahyaningrum, S.T.P., M. Sc.",
    role: "Spesialis Manajemen Keamanan Pangan & Peneliti",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan, Universitas Jenderal Soedirman (UNSOED)",
      "S2 Ilmu dan Teknologi Pangan, Universitas Gadjah Mada (UGM)"
    ],
    experience: "Februari 2026 s.d. sekarang: Asisten Peneliti Dosen TPHP UGM.",
    standards: ["Implementing Food Safety Management System ISO 22000:2018"],
    haccp: ["Implementing FSSC 22000 Version 5.1", "HACCP, TACCP, VACCP Training"],
    auditorExp: "Asisten Peneliti & Konsultan Teknis Mutu Pangan.",
    motto: "Keamanan pangan dicapai melalui penerapan standar sistem manajemen yang konsisten dan terukur."
  },
  {
    id: "agessty-ika",
    name: "Agessty Ika Nurlita, S.Si., M.Si.",
    role: "Auditor Halal & Akademisi Biologi",
    category: "uin-suka",
    isLead: true,
    image: "/hero1.jpg",
    education: [
      "S1 Biologi, IPB University",
      "S2 Mikrobiologi, IPB University"
    ],
    experience: "Dosen Biologi UIN Sunan Kalijaga; Auditor Halal LPH UIN Sunan Kalijaga.",
    standards: ["Pelatihan Regulasi Audit Jaminan Produk Halal"],
    haccp: ["Pelatihan Teknis Higienitas Pangan & Mikrobiologi Dasar"],
    auditorExp: "Auditor Halal terakreditasi di LPH UIN Sunan Kalijaga sejak 2023.",
    motto: "Mikrobiologi memberikan kunci dasar untuk memahami dan mengendalikan bahaya kontaminasi produk pangan."
  },
  {
    id: "muhammad-dhifan",
    name: "Muhammad Dhifan Rafiuddin, S.T., M.Sc.",
    role: "Ahli HACCP & GMP",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan, Universitas Pasundan (UNPAS)",
      "S2 Ilmu Teknologi Pangan, UGM"
    ],
    experience: "Asisten Peneliti Dosen TPHP UGM.",
    standards: ["Sertifikasi FSSC 22000 V. 5.1 including ISO 22000:2018"],
    haccp: ["Pelatihan HACCP & GMP Based on ISO 22002-1", "Halal Assurance System HAS 23000"],
    auditorExp: "Spesialis Pendamping Sistem Manajemen Mutu Industri Pangan.",
    motto: "Perancangan program prasyarat (GMP) yang kuat adalah fondasi utama keberhasilan sistem HACCP."
  },
  {
    id: "laili-nailul",
    name: "apt. Laili Nailul Muna, S.Farm., M.Sc.",
    role: "Auditor Halal & Dosen Biomedis",
    category: "uin-suka",
    isLead: true,
    image: "/iso.jpg",
    education: [
      "S1 Farmasi & Profesi Apoteker UAD",
      "S2 Farmasi, UGM"
    ],
    experience: "Apoteker Praktisi & Dosen Biomedis UIN Sunan Kalijaga.",
    standards: ["Sertifikasi Apoteker Penanggung Jawab Fasilitas"],
    haccp: ["Pelatihan Mutu Farmasi & Toksikologi Bahan Pangan"],
    auditorExp: "Auditor Halal terdaftar di LPH UIN Sunan Kalijaga.",
    motto: "Aspek halal dan thoyyib (mutu & keamanan) adalah dua pilar yang saling melengkapi dalam rantai pangan."
  },
  {
    id: "fayza-allya",
    name: "Fayza Allya Kallista, S.Pi., M.Sc.",
    role: "Spesialis Pengolahan & Pengendalian Mutu Perikanan",
    category: "tphp-ugm",
    isLead: false,
    image: "/hero1.jpg",
    education: [
      "S1 Teknologi Hasil Perikanan UGM",
      "S2 Ilmu dan Teknologi Pangan UGM"
    ],
    experience: "Asisten Dosen TPHP UGM; Magang QC PT Surya Alam Tunggal.",
    standards: ["Pelatihan Penilaian Mutu Produk Perikanan Ekspor"],
    haccp: ["Quality Control Training", "Quality Assurance Training"],
    auditorExp: "Spesialis Mutu Produk Hasil Perikanan dan Kelautan.",
    motto: "Pengendalian suhu dan kecepatan rantai logistik menentukan kesegaran serta keamanan komoditas perikanan."
  },
  {
    id: "atika-yahdiyani",
    name: "Atika Yahdiyani Ikhsani, S.TP., M.Sc.",
    role: "Auditor Halal & Spesialis ISO 22000 / 17065",
    category: "uin-suka",
    isLead: true,
    image: "/hero2.jpg",
    education: [
      "S1 Teknologi Pangan UB",
      "S2 Ilmu Pangan UGM",
      "Kandidat Doktor S3 Ilmu Pangan UGM"
    ],
    experience: "Dosen Kimia UIN Sunan Kalijaga; Auditor Halal LPH UIN Sunan Kalijaga.",
    standards: ["ISO/IEC 17065:2012 Lembaga Sertifikasi Produk"],
    haccp: ["Sertifikasi Auditor Keamanan Pangan BNSP", "Sertifikasi CPPOB"],
    auditorExp: "Tim Konsolidasi LPH & Auditor Halal LPH UIN Sunan Kalijaga.",
    motto: "Tinjauan kesesuaian dokumen regulasi menjamin obyektivitas dan validitas sertifikasi secara hukum."
  }
];

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("pegawai")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          role: item.role,
          category: item.category || "tphp-ugm",
          isLead: item.is_lead || false,
          image: item.image_url || item.image || "/hero1.jpg",
          education: Array.isArray(item.education) ? item.education : [item.experience || "S1 Teknologi Pangan"],
          experience: item.experience || "-",
          standards: Array.isArray(item.standards) ? item.standards : ["-"],
          haccp: Array.isArray(item.haccp) ? item.haccp : ["-"],
          auditorExp: item.auditor_exp || item.experience || "-",
          motto: item.motto || "Komitmen terhadap keamanan dan mutu pangan nasional."
        }));
      }
    } catch (e) {
      console.warn("Supabase team fetch error, falling back to LocalStorage:", e);
    }
  }
  return getLocal<TeamMember>("hacpp_team", SEED_TEAM);
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id">
): Promise<TeamMember> => {
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now()}`
  };

  // 1. LocalStorage
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  localList.push(newMember);
  setLocal("hacpp_team", localList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("pegawai").insert([
        {
          name: member.name,
          role: member.role,
          category: member.category,
          is_lead: member.isLead || false,
          image_url: member.image,
          experience: member.experience,
          auditor_exp: member.auditorExp,
          motto: member.motto
        }
      ]);
      if (error) console.error("Error inserting team member to Supabase:", error);
    } catch (e) {
      console.error("Connection failed during Supabase team insert:", e);
    }
  }

  return newMember;
};

export const updateTeamMember = async (
  id: string,
  updatedData: Partial<TeamMember>
): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  const updatedList = localList.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  setLocal("hacpp_team", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("team-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        await supabase
          .from("pegawai")
          .update({
            name: updatedData.name,
            role: updatedData.role,
            category: updatedData.category,
            is_lead: updatedData.isLead,
            image_url: updatedData.image,
            experience: updatedData.experience,
            motto: updatedData.motto
          })
          .eq("id", dbId);
      }
    } catch (e) {
      console.error("Supabase team update connection error:", e);
    }
  }

  return true;
};

export const deleteTeamMember = async (id: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<TeamMember>("hacpp_team", SEED_TEAM);
  const updatedList = localList.filter((item) => item.id !== id);
  setLocal("hacpp_team", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("team-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        await supabase.from("pegawai").delete().eq("id", dbId);
      }
    } catch (e) {
      console.error("Supabase team delete connection error:", e);
    }
  }

  return true;
};
