import { supabase, isSupabaseConfigured } from "../supabase";
import { getLocal, setLocal } from "./storage";

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  year?: string;
}

export const SEED_PROJECTS: ProjectItem[] = [
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
