import { supabase, isSupabaseConfigured } from "./supabase";

export interface SertifikasiInquiry {
  id: string;
  companyName: string;
  companyAddress?: string;
  picName: string;
  phone: string;
  email: string;
  industry: string;
  haccpStatus: string;
  message: string;
  ticketNumber: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  year?: string;
}

export interface TrainingRegistration {
  id: string;
  ticketNumber: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  programId: string;
  programTitle: string;
  participantCount: number;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface HaccpDocSubmission {
  id: string;
  ticketNumber: string;
  companyName: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  productScope: string;
  documentCategory: string;
  documentCategoryLabel: string;
  fileName: string;
  fileSize?: string;
  fileData?: string;
  notes?: string;
  status: "submitted" | "under_review" | "verified" | "need_revision";
  createdAt: string;
}

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

// --- SEED DATA FOR LOCAL STORAGE FALLBACK ---

const SEED_INQUIRIES: SertifikasiInquiry[] = [
  {
    id: "inq-1",
    companyName: "PT Roti Prima Sejahtera",
    companyAddress: "Jl. Industri Bakery No. 12, Sleman, D.I. Yogyakarta",
    picName: "Ahmad Fauzi",
    phone: "+62 812-3456-7890",
    email: "fauzi@rotiprima.com",
    industry: "Produk Bakeri",
    haccpStatus: "Sedang Persiapan",
    message: "Pabrik roti dan pastry modern, membutuhkan audit sertifikasi HACCP untuk ekspansi distribusi supermarket.",
    ticketNumber: "HACCP-2026-1024",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-2",
    companyName: "PT Daging Segar Nusantara",
    companyAddress: "Kawasan Industri Boyolali Blok B5, Jawa Tengah",
    picName: "Anita Wijaya",
    phone: "+62 822-3344-5566",
    email: "anita@dagingsegar.co.id",
    industry: "Daging dan Produk Daging",
    haccpStatus: "Belum Diterapkan",
    message: "Fasilitas pemotongan dan pengolahan sosis/bakso beku memerlukan audit kesesuaian sistem HACCP.",
    ticketNumber: "HACCP-2026-3029",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-3",
    companyName: "PT Nutrisi Medika Husada",
    companyAddress: "Jl. Farmasi Gizi No. 88, Semarang, Jawa Tengah",
    picName: "Budi Santoso",
    phone: "+62 855-6677-8899",
    email: "budi@nutrisimedika.com",
    industry: "Pangan Olahan untuk Keperluan Gizi Khusus",
    haccpStatus: "Sudah Diterapkan",
    message: "Kami memproduksi pangan formula diet khusus dan MP-ASI, memerlukan sertifikasi resmi dari LSHACCP terakreditasi KAN.",
    ticketNumber: "HACCP-2026-8812",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-4",
    companyName: "Sentra Pangan Gizi Sejahtera (SPPG)",
    companyAddress: "Jl. Maguwoharjo No. 45, Depok, Sleman, DIY",
    picName: "Siti Rahmah",
    phone: "+62 811-9988-7766",
    email: "siti@sppgsejahtera.com",
    industry: "Jasa Boga / Pelayanan Pangan / SPPG",
    haccpStatus: "Sedang Persiapan",
    message: "Sentra Pengolahan Pangan Gizi untuk penyedia layanan makanan massal, mengajukan sertifikasi HACCP.",
    ticketNumber: "HACCP-2026-4401",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "inq-5",
    companyName: "CV Surya Bakery & Cake",
    companyAddress: "Jl. Raya Solo No. 102, Surakarta, Jawa Tengah",
    picName: "Joko Riyadi",
    phone: "+62 877-8899-0011",
    email: "joko@suryabakery.com",
    industry: "Produk Bakeri",
    haccpStatus: "Sudah Diterapkan",
    message: "Unit pengolahan cake dan roti kering kemasan toples untuk pasar ekspor.",
    ticketNumber: "HACCP-2026-9042",
    createdAt: new Date().toISOString()
  }
];

const SEED_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "PT Food Quality Certification Dapatkan Akreditasi Penuh dari KAN",
    content: "Kami dengan bangga mengumumkan bahwa PT FOOD QUALITY CERTIFICATION secara resmi telah terakreditasi penuh oleh Komite Akreditasi Nasional (KAN) dengan nomor registrasi LSHACCP-009-IDN. Dengan pencapaian akreditasi ini, kami siap menerbitkan sertifikat HACCP yang diakui secara nasional maupun internasional guna meningkatkan standar keamanan pangan produk Anda di kancah pasar global.",
    category: "Pengumuman",
    imageUrl: "/hero1.jpg",
    date: "12 Jul 2026"
  },
  {
    id: "news-2",
    title: "Pentingnya Penerapan HACCP pada UMKM Kuliner Modern",
    content: "Sistem Hazard Analysis and Critical Control Points (HACCP) kini tidak lagi hanya diperuntukkan bagi industri skala besar. UMKM kuliner modern juga didorong kuat untuk mengadopsi sistem ini demi meminimalkan bahaya kontaminasi fisik, kimia, dan biologi. Hal ini juga membantu memperkuat branding produk di mata pasar modern ritel yang menerapkan standar kelayakan higienitas tinggi.",
    category: "Edukasi",
    imageUrl: "/hero2.jpg",
    date: "10 Jul 2026"
  },
  {
    id: "news-3",
    title: "Workshop Keamanan Pangan Sukses Diselenggarakan di Yogyakarta",
    content: "PT FOOD QUALITY CERTIFICATION menyelenggarakan workshop intensif keamanan pangan yang dihadiri oleh lebih dari 40 perwakilan pelaku usaha kuliner dan catering se-Provinsi DIY. Workshop membahas tentang penyusunan manual HACCP, cara identifikasi titik kendali kritis (CCP), dan sosialisasi alur sertifikasi resmi terakreditasi KAN.",
    category: "Kegiatan",
    imageUrl: "/iso.jpg",
    date: "05 Jul 2026"
  }
];

const SEED_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Audit Lapangan di Pabrik Pengolahan Susu Yogyakarta",
    description: "Auditor PT Food Quality Certification mengecek tangki pasteurisasi dan titik kendali kritis suhu susu.",
    category: "Audit",
    imageUrl: "/hero1.jpg",
    date: "08 Jul 2026"
  },
  {
    id: "gal-2",
    title: "Penyerahan Sertifikat HACCP PT Segar Minuman Nusantara",
    description: "Prosesi penyerahan sertifikat kelayakan sistem HACCP pasca pemenuhan audit kesesuaian.",
    category: "Event",
    imageUrl: "/hero2.jpg",
    date: "07 Jul 2026"
  },
  {
    id: "gal-3",
    title: "Pelatihan Internal Calon Auditor Angkatan IV",
    description: "Kegiatan peningkatan kompetensi teknis bagi para auditor internal keamanan pangan.",
    category: "Pelatihan",
    imageUrl: "/iso.jpg",
    date: "04 Jul 2026"
  },
  {
    id: "gal-4",
    title: "Piagam Akreditasi Lembaga Sertifikasi KAN Resmi",
    description: "Sertifikat akreditasi LSHACCP-009-IDN yang diserahkan oleh ketua KAN pusat.",
    category: "Penghargaan",
    imageUrl: "/kan-logo.png",
    date: "01 Jul 2026"
  }
];

const SEED_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "PT Roti & Pastry Nusantara",
    category: "PRODUK BAKERI",
    desc: "Sertifikasi sistem HACCP untuk lini produksi aneka roti tawar, cake, pastry, dan biskuit berstandar industri modern.",
    image: "/hero1.jpg",
    year: "2025"
  },
  {
    id: "proj-2",
    name: "PT Daging Sejahtera Utama",
    category: "DAGING DAN PRODUK DAGING",
    desc: "Audit sertifikasi fasilitas pemotongan dan pengolahan daging sapi, daging unggas, sosis, bakso, dan produk olahan daging beku.",
    image: "/hero2.jpg",
    year: "2025"
  },
  {
    id: "proj-3",
    name: "PT Nutrisi Pangan Khusus",
    category: "PANGAN OLAHAN GIZI KHUSUS",
    desc: "Penerbitan sertifikat kesesuaian HACCP untuk unit formulasi pangan formula bayi (MP-ASI), pangan diet medis steril, dan nutrisi khusus.",
    image: "/iso.jpg",
    year: "2026"
  },
  {
    id: "proj-4",
    name: "PT Boga Sentra Pangan (SPPG)",
    category: "JASA BOGA / PELAYANAN PANGAN / SPPG",
    desc: "Sertifikasi HACCP Sentra Pengolahan Pangan Gizi (SPPG) dan jasa boga skala besar berkapasitas 15.000 porsi per hari.",
    image: "/hccp1.jpg",
    year: "2026"
  }
];

const SEED_TEAM: TeamMember[] = [
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

// --- HELPER STORAGE INITS ---

const getLocal = <T>(key: string, seed: T[]): T[] => {
  if (typeof window === "undefined") return seed;
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(data);
  } catch (e) {
    return seed;
  }
};

const setLocal = <T>(key: string, data: T[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn("LocalStorage quota exceeded, trying trimmed list:", err);
      try {
        localStorage.setItem(key, JSON.stringify(data.slice(-10)));
      } catch (fallbackErr) {
        console.error("LocalStorage write failed completely:", fallbackErr);
      }
    }
  }
};

// Helper to automatically compress uploaded image files to prevent LocalStorage QuotaExceededError
export const compressImage = (file: File, maxWidth = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// --- CORE EXPORT OPERATIONS ---

export const getInquiries = async (): Promise<SertifikasiInquiry[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("sertifikasi")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id.toString(),
          companyName: item.company_name,
          companyAddress: item.company_address || item.address || "",
          picName: item.pic_name,
          phone: item.phone,
          email: item.email,
          industry: item.industry,
          haccpStatus: item.haccp_status,
          message: item.message || "",
          ticketNumber: item.ticket_number,
          createdAt: item.created_at
        }));
      }
      console.warn("Supabase fetch error, falling back to LocalStorage:", error);
    } catch (e) {
      console.warn("Supabase connection error, falling back to LocalStorage:", e);
    }
  }
  return getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createInquiry = async (
  inquiry: Omit<SertifikasiInquiry, "id" | "createdAt">
): Promise<SertifikasiInquiry> => {
  const newInq: SertifikasiInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  // 1. Sync LocalStorage (Always)
  const localList = getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES);
  localList.unshift(newInq);
  setLocal("hacpp_inquiries", localList);

  // 2. Sync Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("sertifikasi").insert([
        {
          company_name: inquiry.companyName,
          company_address: inquiry.companyAddress || "",
          pic_name: inquiry.picName,
          phone: inquiry.phone,
          email: inquiry.email,
          industry: inquiry.industry,
          haccp_status: inquiry.haccpStatus,
          message: inquiry.message,
          ticket_number: inquiry.ticketNumber
        }
      ]);
      if (error) console.error("Error inserting to Supabase:", error);
    } catch (e) {
      console.error("Connection failed during Supabase insert:", e);
    }
  }

  return newInq;
};

export const getNews = async (): Promise<NewsItem[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          content: item.content,
          category: item.category,
          imageUrl: item.image_url,
          date: new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        }));
      }
      console.warn("Supabase berita fetch failed, falling back to LocalStorage:", error);
    } catch (e) {
      console.warn("Supabase berita connection error, falling back:", e);
    }
  }
  return getLocal<NewsItem>("hacpp_news", SEED_NEWS);
};

export const createNews = async (news: Omit<NewsItem, "id" | "date">): Promise<NewsItem> => {
  const newNews: NewsItem = {
    ...news,
    id: `news-${Date.now()}`,
    date: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  };

  // 1. LocalStorage
  const localList = getLocal<NewsItem>("hacpp_news", SEED_NEWS);
  localList.unshift(newNews);
  setLocal("hacpp_news", localList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("berita").insert([
        {
          title: news.title,
          content: news.content,
          category: news.category,
          image_url: news.imageUrl
        }
      ]);
      if (error) console.error("Error inserting news to Supabase:", error);
    } catch (e) {
      console.error("Connection failed during Supabase news insert:", e);
    }
  }

  return newNews;
};

export const deleteNews = async (id: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<NewsItem>("hacpp_news", SEED_NEWS);
  const updatedList = localList.filter((item) => item.id !== id);
  setLocal("hacpp_news", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      // Check if id is numeric (database serial) or string UUID
      const dbId = id.startsWith("news-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        const { error } = await supabase.from("berita").delete().eq("id", dbId);
        if (error) console.error("Error deleting news from Supabase:", error);
      } else {
        // Fallback for custom ids
        const { error } = await supabase.from("berita").delete().eq("title", localList.find(x => x.id === id)?.title);
        if (error) console.error("Error deleting news from Supabase:", error);
      }
    } catch (e) {
      console.error("Supabase news delete connection error:", e);
    }
  }

  return true;
};

export const getGallery = async (): Promise<GalleryItem[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id.toString(),
          title: item.title,
          description: item.description,
          category: item.category,
          imageUrl: item.image_url,
          date: new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        }));
      }
      console.warn("Supabase galeri fetch failed, falling back to LocalStorage:", error);
    } catch (e) {
      console.warn("Supabase galeri connection error, falling back:", e);
    }
  }
  return getLocal<GalleryItem>("hacpp_gallery", SEED_GALLERY);
};

export const createGallery = async (
  gallery: Omit<GalleryItem, "id" | "date">
): Promise<GalleryItem> => {
  const newGal: GalleryItem = {
    ...gallery,
    id: `gal-${Date.now()}`,
    date: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  };

  // 1. LocalStorage
  const localList = getLocal<GalleryItem>("hacpp_gallery", SEED_GALLERY);
  localList.unshift(newGal);
  setLocal("hacpp_gallery", localList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("galeri").insert([
        {
          title: gallery.title,
          description: gallery.description,
          category: gallery.category,
          image_url: gallery.imageUrl
        }
      ]);
      if (error) console.error("Error inserting gallery to Supabase:", error);
    } catch (e) {
      console.error("Connection failed during Supabase gallery insert:", e);
    }
  }

  return newGal;
};

export const deleteGallery = async (id: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<GalleryItem>("hacpp_gallery", SEED_GALLERY);
  const updatedList = localList.filter((item) => item.id !== id);
  setLocal("hacpp_gallery", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("gal-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        const { error } = await supabase.from("galeri").delete().eq("id", dbId);
        if (error) console.error("Error deleting gallery from Supabase:", error);
      } else {
        const { error } = await supabase.from("galeri").delete().eq("title", localList.find(x => x.id === id)?.title);
        if (error) console.error("Error deleting gallery from Supabase:", error);
      }
    } catch (e) {
      console.error("Supabase gallery delete connection error:", e);
    }
  }

  return true;
};

export const updateInquiryStatus = async (id: string, status: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<SertifikasiInquiry>("hacpp_inquiries", SEED_INQUIRIES);
  const updatedList = localList.map((item) =>
    item.id === id ? { ...item, haccpStatus: status } : item
  );
  setLocal("hacpp_inquiries", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("inq-") ? -1 : parseInt(id, 10);
      const targetItem = localList.find((item) => item.id === id);
      if (targetItem) {
        if (dbId !== -1 && !isNaN(dbId)) {
          const { error } = await supabase
            .from("sertifikasi")
            .update({ haccp_status: status })
            .eq("id", dbId);
          if (error) console.error("Error updating status in Supabase:", error);
        } else {
          const { error } = await supabase
            .from("sertifikasi")
            .update({ haccp_status: status })
            .eq("ticket_number", targetItem.ticketNumber);
          if (error) console.error("Error updating status in Supabase:", error);
        }
      }
    } catch (e) {
      console.error("Connection failed during Supabase status update:", e);
    }
  }

  return true;
};

// --- TEAM / PEGAWAI CRUD OPERATIONS ---

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

// --- PROJECT / SEKTOR MANAGEMENT OPERATIONS ---

export const getProjects = async (): Promise<ProjectItem[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("proyek")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          category: item.category,
          desc: item.desc || item.description || "",
          image: item.image_url || item.image,
          year: item.year || "2026"
        }));
      }
    } catch (e) {
      console.warn("Supabase project fetch failed, falling back to LocalStorage:", e);
    }
  }
  return getLocal<ProjectItem>("hacpp_projects", SEED_PROJECTS);
};

export const createProject = async (
  project: Omit<ProjectItem, "id">
): Promise<ProjectItem> => {
  const newProj: ProjectItem = {
    ...project,
    id: `proj-${Date.now()}`
  };

  // 1. LocalStorage
  const localList = getLocal<ProjectItem>("hacpp_projects", SEED_PROJECTS);
  localList.push(newProj);
  setLocal("hacpp_projects", localList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("proyek").insert([
        {
          name: project.name,
          category: project.category,
          desc: project.desc,
          image_url: project.image,
          year: project.year || "2026"
        }
      ]);
    } catch (e) {
      console.error("Supabase project insert failed:", e);
    }
  }

  return newProj;
};

export const updateProject = async (
  id: string,
  updatedData: Partial<ProjectItem>
): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<ProjectItem>("hacpp_projects", SEED_PROJECTS);
  const updatedList = localList.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  setLocal("hacpp_projects", updatedList);

  return true;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  // 1. LocalStorage
  const localList = getLocal<ProjectItem>("hacpp_projects", SEED_PROJECTS);
  const updatedList = localList.filter((item) => item.id !== id);
  setLocal("hacpp_projects", updatedList);

  // 2. Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const dbId = id.startsWith("proj-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        await supabase.from("proyek").delete().eq("id", dbId);
      }
    } catch (e) {
      console.error("Supabase project delete failed:", e);
    }
  }

  return true;
};

// --- TRAINING REGISTRATIONS (PELATIHAN) CRUD ---

export const SEED_TRAININGS: TrainingRegistration[] = [
  {
    id: "train-001",
    ticketNumber: "TR-2026-1048",
    fullName: "Budi Santoso, S.TP.",
    companyName: "PT Sumber Pangan Sejahtera",
    email: "budi.santoso@sumberpangan.co.id",
    phone: "081234567890",
    programId: "pengelolaan-haccp",
    programTitle: "Pengelolaan Keamanan Pangan Berbasis HACCP",
    participantCount: 3,
    notes: "Kebutuhan pelatihan tim mutu persiapan audit sertifikasi.",
    status: "confirmed",
    createdAt: "2026-08-25T09:30:00Z"
  },
  {
    id: "train-002",
    ticketNumber: "TR-2026-0904",
    fullName: "Dewi Lestari, S.Si.",
    companyName: "CV Nusantara Food Mandiri",
    email: "dewi.qa@nusantarafood.com",
    phone: "085712345678",
    programId: "penyusunan-dokumen-haccp",
    programTitle: "Pelatihan dan Sertifikasi Penyusunan Dokumen HACCP",
    participantCount: 2,
    notes: "Ingin bimbingan penyusunan HACCP plan dan diagram alir terverifikasi.",
    status: "pending",
    createdAt: "2026-09-01T14:15:00Z"
  }
];

export const getTrainingRegistrations = async (): Promise<TrainingRegistration[]> => {
  return getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
};

export const createTrainingRegistration = async (
  data: Omit<TrainingRegistration, "id" | "ticketNumber" | "createdAt" | "status">
): Promise<TrainingRegistration> => {
  const newReg: TrainingRegistration = {
    ...data,
    id: `train-${Date.now()}`,
    ticketNumber: `TR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  list.unshift(newReg);
  setLocal("hacpp_trainings", list);
  return newReg;
};

export const updateTrainingStatus = async (
  id: string,
  status: TrainingRegistration["status"]
): Promise<boolean> => {
  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  setLocal("hacpp_trainings", updated);
  return true;
};

export const deleteTrainingRegistration = async (id: string): Promise<boolean> => {
  const list = getLocal<TrainingRegistration>("hacpp_trainings", SEED_TRAININGS);
  const updated = list.filter((item) => item.id !== id);
  setLocal("hacpp_trainings", updated);
  return true;
};

// --- PRE-AUDIT HACCP DOCUMENT SUBMISSIONS CRUD ---

export const SEED_HACCP_DOCS: HaccpDocSubmission[] = [
  {
    id: "doc-001",
    ticketNumber: "DOC-2026-1042",
    companyName: "PT Daging Segar Nusantara",
    picName: "Anita Wijaya",
    picPhone: "+62 822-3344-5566",
    picEmail: "anita@dagingsegar.co.id",
    productScope: "Daging dan Produk Daging",
    documentCategory: "bundle-sni-cxc-1",
    documentCategoryLabel: "Bundel Lengkap Seluruh Dokumen SNI CXC 1:1969 (GHP/GMP + Rencana HACCP + Legalitas)",
    fileName: "Dokumen_Lengkap_SNI_CXC_1_1969_Daging_Segar_2026.pdf",
    fileSize: "6.8 MB",
    notes: "[Tiket Registrasi: HACCP-2026-3029] Sudah mencakup Manual Bagian 1 GHP dan Bagian 2 Rencana HACCP terverifikasi.",
    status: "verified",
    createdAt: "2026-08-28T11:00:00Z"
  },
  {
    id: "doc-002",
    ticketNumber: "DOC-2026-2189",
    companyName: "PT Roti Prima Sejahtera",
    picName: "Ahmad Fauzi",
    picPhone: "+62 812-3456-7890",
    picEmail: "fauzi@rotiprima.com",
    productScope: "Produk Bakeri",
    documentCategory: "haccp-plan-section2",
    documentCategoryLabel: "Bagian 2: Rencana HACCP & 7 Prinsip (Tabel Analisis Bahaya, Penetapan CCP, & Batas Kritis)",
    fileName: "Tabel_Analisis_Bahaya_CCP_Bakery_v2.pdf",
    fileSize: "2.8 MB",
    notes: "[Tiket Registrasi: HACCP-2026-1024] Revisi batas kritis tahap pemanggangan oven sesuai rekomendasi.",
    status: "under_review",
    createdAt: "2026-09-02T16:20:00Z"
  }
];

export const getHaccpDocSubmissions = async (): Promise<HaccpDocSubmission[]> => {
  return getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
};

export const createHaccpDocSubmission = async (
  data: Omit<HaccpDocSubmission, "id" | "ticketNumber" | "createdAt" | "status">
): Promise<HaccpDocSubmission> => {
  const newDoc: HaccpDocSubmission = {
    ...data,
    id: `doc-${Date.now()}`,
    ticketNumber: `DOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "submitted",
    createdAt: new Date().toISOString()
  };

  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  list.unshift(newDoc);
  setLocal("hacpp_docs", list);
  return newDoc;
};

export const updateHaccpDocStatus = async (
  id: string,
  status: HaccpDocSubmission["status"]
): Promise<boolean> => {
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  setLocal("hacpp_docs", updated);
  return true;
};

export const deleteHaccpDocSubmission = async (id: string): Promise<boolean> => {
  const list = getLocal<HaccpDocSubmission>("hacpp_docs", SEED_HACCP_DOCS);
  const updated = list.filter((item) => item.id !== id);
  setLocal("hacpp_docs", updated);
  return true;
};
