import { supabase, isSupabaseConfigured } from "../supabase";
import { getLocal, setLocal } from "./storage";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

export const SEED_GALLERY: GalleryItem[] = [
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
