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
    companyName: "CV Maju Jaya Pangan",
    companyAddress: "Jl. Industri Raya No. 12, Malang, Jawa Timur",
    picName: "Ahmad Fauzi",
    phone: "+62 812-3456-7890",
    email: "fauzi@majujayapangan.com",
    industry: "Industri Pengolahan Makanan",
    haccpStatus: "Sedang Persiapan",
    message: "Kami memiliki pabrik pengolahan keripik buah di Malang dan ingin mendapatkan sertifikasi HACCP secepatnya untuk keperluan ekspor.",
    ticketNumber: "HACCP-2026-1024",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: "inq-2",
    companyName: "PT Segar Harum Beverage",
    companyAddress: "Kawasan Industri Cikarang Blok B5, Bekasi, Jawa Barat",
    picName: "Anita Wijaya",
    phone: "+62 822-3344-5566",
    email: "anita@segarharum.co.id",
    industry: "Industri Minuman",
    haccpStatus: "Belum Diterapkan",
    message: "Ingin berkonsultasi mengenai persyaratan awal dan dokumen untuk pabrik pengisian air minum kemasan.",
    ticketNumber: "HACCP-2026-3029",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: "inq-3",
    companyName: "Resto Lezat Nikmat",
    companyAddress: "Jl. Malioboro No. 88, Yogyakarta",
    picName: "Budi Santoso",
    phone: "+62 855-6677-8899",
    email: "budi@lezatnikmat.com",
    industry: "Rumah Makan & Restoran",
    haccpStatus: "Sudah Diterapkan",
    message: "Kami sudah mengimplementasikan GMP dan HACCP mandiri, sekarang memerlukan audit sertifikasi pihak ketiga.",
    ticketNumber: "HACCP-2026-8812",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: "inq-4",
    companyName: "Catering Bunda Utama",
    companyAddress: "Jl. Solo Km 9 No. 45, Sleman, DIY",
    picName: "Siti Rahmah",
    phone: "+62 811-9988-7766",
    email: "siti@cateringbundautama.com",
    industry: "Jasa Boga / SPPG",
    haccpStatus: "Sedang Persiapan",
    message: "Mengajukan sertifikasi HACCP untuk pemenuhan syarat katering maskapai penerbangan di Bandara Adisutjipto.",
    ticketNumber: "HACCP-2026-4401",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: "inq-5",
    companyName: "Koperasi Susu Selo Mulyo",
    companyAddress: "Jl. Raya Boyolali No. 102, Boyolali, Jawa Tengah",
    picName: "Joko Riyadi",
    phone: "+62 877-8899-0011",
    email: "joko@selomulyo.org",
    industry: "Dairy Industry",
    haccpStatus: "Sudah Diterapkan",
    message: "Kami adalah koperasi peternak sapi perah dengan produk susu pasteurisasi kemasan cup. Ingin mendaftar audit sertifikasi KAN resmi.",
    ticketNumber: "HACCP-2026-9042",
    createdAt: new Date().toISOString() // Just now
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
    name: "PT Ritel Pangan Nusantara",
    category: "LOGISTIK & RITEL MODERN",
    desc: "Sertifikasi sistem HACCP untuk fasilitas gudang penyimpanan rantai dingin dan jaringan 45 gerai ritel modern di Indonesia.",
    image: "/hero1.jpg",
    year: "2025"
  },
  {
    id: "proj-2",
    name: "PT Samudra Frozen Foods",
    category: "INDUSTRI OLAHAN SEAFOOD",
    desc: "Audit sertifikasi fasilitas pabrik pemrosesan dan pembekuan udang ekspor standar kualifikasi internasional.",
    image: "/hero2.jpg",
    year: "2025"
  },
  {
    id: "proj-3",
    name: "PT Boga Katering Utama",
    category: "JASA BOGA IN-FLIGHT & INDUSTRI",
    desc: "Sertifikasi HACCP dapur pusat penyedia katering penerbangan dengan kapasitas produksi 10.000 porsi per hari.",
    image: "/iso.jpg",
    year: "2026"
  },
  {
    id: "proj-4",
    name: "PT Nusa Dairy Premium",
    category: "INDUSTRI OLAHAN SUSU",
    desc: "Penerbitan sertifikat kesesuaian HACCP untuk unit pengolahan dan pasteurisasi susu segar serta yogurt kemasan.",
    image: "/hero1.jpg",
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
