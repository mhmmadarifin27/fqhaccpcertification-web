import { supabase, isSupabaseConfigured } from "../supabase";
import { getLocal, setLocal } from "./storage";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
}

export const SEED_NEWS: NewsItem[] = [
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
      const dbId = id.startsWith("news-") ? -1 : parseInt(id, 10);
      if (dbId !== -1 && !isNaN(dbId)) {
        const { error } = await supabase.from("berita").delete().eq("id", dbId);
        if (error) console.error("Error deleting news from Supabase:", error);
      } else {
        const { error } = await supabase.from("berita").delete().eq("title", localList.find(x => x.id === id)?.title);
        if (error) console.error("Error deleting news from Supabase:", error);
      }
    } catch (e) {
      console.error("Supabase news delete connection error:", e);
    }
  }

  return true;
};
